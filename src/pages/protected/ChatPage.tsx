import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import {
  Send,
  ShieldCheck,
  BookOpen,
  User,
  Bot,
  Lock,
  Sparkles,
  Layers
} from 'lucide-react';
import { ragService } from '../../services/ragService';
import type { RagMessage } from '../../types/rag';

export const ChatPage: React.FC = () => {
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const initialMessages: RagMessage[] = [
    {
      id: 'm-init-1',
      sender: 'assistant',
      text: `Hello ${user?.name || 'User'}. I am the Apex RAG Knowledge Assistant.\n\nYour account has clearance to retrieve documents from: **${user?.accessibleDepartments.join(', ')}**.\n\nAll queries are verified against Role-Based Access Control policies before document retrieval. How can I assist you today?`,
      timestamp: '10:00 AM',
    }
  ];

  const [messages, setMessages] = useState<RagMessage[]>(initialMessages);

  // Suggested test queries tailored for the current user's role to demonstrate RBAC
  const getPresetQueries = () => {
    if (user?.department === 'Finance') {
      return [
        { label: 'Authorized: What was our Q4 revenue and net profit?', query: 'What was our Q4 revenue and net profit?' },
        { label: 'Authorized: Show departmental budget allocations for 2026', query: 'Show departmental budget allocations for 2026' },
        { label: 'Restricted (Mfg): What was the manufacturing production and pass rate in Q4?', query: 'What was the manufacturing production and pass rate in Q4?' },
        { label: 'Company-Wide: What is the employee leave policy?', query: 'What is the employee annual leave and sick leave policy?' },
      ];
    } else if (user?.department === 'Manufacturing') {
      return [
        { label: 'Authorized: What was our Q4 total production and quality pass rate?', query: 'What was our Q4 total production and quality pass rate?' },
        { label: 'Authorized: What are the plant safety and PPE requirements?', query: 'What are the plant safety and PPE requirements?' },
        { label: 'Restricted (Finance): What was the company revenue in Q4?', query: 'What was the company revenue and profit in Q4?' },
        { label: 'Company-Wide: What is the employee handbook code of conduct?', query: 'What is the employee handbook code of conduct?' },
      ];
    } else {
      return [
        { label: 'Finance: What was Q4 revenue and net profit?', query: 'What was our Q4 revenue and net profit?' },
        { label: 'Manufacturing: What was Q4 production output?', query: 'What was our Q4 total production output and pass rate?' },
        { label: 'Executive: What is the three-year company strategy?', query: 'What is the three-year company strategy and M&A pipeline?' },
        { label: 'HR: What is the annual leave entitlement?', query: 'What is the annual leave and parental leave entitlement?' },
      ];
    }
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || !user || isLoading) return;

    const userMessage: RagMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ragService.query(user, textToSend.trim());
      setMessages((prev) => [...prev, response]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: 'An error occurred during query execution. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <StatusBanner
        status="IMPLEMENTED"
        phase="Phase 2 Live"
        title="Role-Aware RAG Knowledge Assistant"
        description="RBAC is strictly enforced before retrieval. The assistant only retrieves document chunks from departments the authenticated user has clearance for."
      />

      {/* User Context Strip */}
      <div className="bg-white border border-slate-200 px-5 py-3 rounded-lg shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 flex-wrap">
          <div>
            <span className="text-slate-500">Logged in as: </span>
            <strong className="text-slate-900">{user?.name}</strong>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="text-slate-500">Role: </span>
            <strong className="text-blue-700">{user?.role}</strong>
          </div>
          <span className="text-slate-300">|</span>
          <div>
            <span className="text-slate-500">Department: </span>
            <strong className="text-slate-900">{user?.department}</strong>
          </div>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-500">Knowledge Clearance: </span>
            <strong className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              {user?.accessibleDepartments.join(', ')}
            </strong>
          </div>
        </div>

        <Badge variant="success" size="sm">Pre-Retrieval Filter Active</Badge>
      </div>

      {/* Main Chat Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col bg-white border border-slate-200 rounded-lg shadow-xs h-[600px] overflow-hidden">
          {/* Top Bar */}
          <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-blue-700 text-white">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Enterprise Knowledge Assistant</h3>
                <p className="text-[10px] text-slate-500 font-mono">Guarded RAG Engine • Pre-Retrieval Filtering</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="neutral" size="sm">Indexed: {user?.accessibleDepartments.join(', ')}</Badge>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 text-xs font-bold shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-700 text-white'
                    : msg.isRestricted
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-800 text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className="space-y-2 max-w-2xl">
                  {/* Message Bubble */}
                  <div className={`p-4 rounded-lg text-xs leading-relaxed border ${
                    msg.sender === 'user'
                      ? 'bg-blue-700 text-white border-blue-800 rounded-tr-none'
                      : msg.isRestricted
                      ? 'bg-amber-50/90 text-amber-950 border-amber-300 rounded-tl-none whitespace-pre-line'
                      : 'bg-white text-slate-800 border-slate-200 rounded-tl-none whitespace-pre-line shadow-xs'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Sources Used (only if retrieved and not restricted) */}
                  {msg.citations && msg.citations.length > 0 && (
                    <div className="p-3 rounded-md bg-white border border-slate-200 text-xs space-y-2 shadow-xs">
                      <div className="font-semibold text-slate-700 flex items-center gap-1.5 text-[11px]">
                        <BookOpen className="w-3.5 h-3.5 text-blue-700" />
                        <span>Sources Used ({msg.citations.length} Authorized Documents Retrieved):</span>
                      </div>
                      <div className="space-y-1.5">
                        {msg.citations.map((c, i) => (
                          <div key={i} className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px] space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800">{c.docName}</span>
                              <span className="px-1.5 py-0.2 rounded bg-blue-100 text-blue-800 text-[10px] font-mono">
                                Dept: {c.department}
                              </span>
                            </div>
                            <div className="text-slate-500 text-[10px]">
                              Section: {c.section} {c.page ? `• Page ${c.page}` : ''}
                            </div>
                            <p className="text-slate-600 italic">"{c.snippet}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className={`text-[10px] text-slate-400 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-500">
                <div className="w-6 h-6 rounded bg-slate-200 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-slate-600 animate-pulse" />
                </div>
                <span>Applying pre-retrieval RBAC filter & retrieving authorized chunks...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3.5 border-t border-slate-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Ask an authorized question based on ${user?.department} documents...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-slate-50 border border-slate-300 rounded-md px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!input.trim() || isLoading}
                leftIcon={<Send className="w-3.5 h-3.5" />}
              >
                Ask RAG
              </Button>
            </form>
          </div>
        </div>

        {/* Right Sidebar: Testing Queries & Verification Instructions */}
        <div className="space-y-4">
          <Card title="Mentor Test Queries" subtitle="1-Click RBAC Verification">
            <div className="space-y-2 text-xs">
              <p className="text-[11px] text-slate-500">
                Click a query to demonstrate how RBAC controls the retrieval boundary:
              </p>

              <div className="space-y-1.5 pt-1">
                {getPresetQueries().map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSend(item.query)}
                    disabled={isLoading}
                    className="w-full text-left p-2 rounded-md border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 text-[11px] transition-colors group"
                  >
                    <div className="flex items-center gap-1 font-semibold text-slate-800 group-hover:text-blue-700">
                      <Sparkles className="w-3 h-3 text-blue-600 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card title="Security Architecture">
            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-900 block flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-blue-700" /> Pre-Retrieval Rule
                </span>
                <p className="text-[11px] text-slate-500">
                  Documents outside <strong>{user?.accessibleDepartments.join(', ')}</strong> are excluded BEFORE vector similarity search.
                </p>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-semibold text-slate-900 block flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-700" /> Grounded Citations
                </span>
                <p className="text-[11px] text-slate-500">
                  Every answer displays exact document names, sections, and page references actually consulted.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
