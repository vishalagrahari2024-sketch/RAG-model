import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
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
      {/* Title */}
      <div className="pb-2 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">Chat</h1>
        <p className="text-xs text-gray-500">
          Query documents with pre-retrieval role-based access control
        </p>
      </div>

      {/* User Clearance Strip */}
      <div className="p-3 bg-white border border-gray-200 rounded-md flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-3 flex-wrap">
          <div>
            <span className="text-gray-500">User: </span>
            <strong className="text-gray-900">{user?.name}</strong>
          </div>
          <span className="text-gray-300">|</span>
          <div>
            <span className="text-gray-500">Role: </span>
            <strong className="text-blue-600">{user?.role}</strong>
          </div>
          <span className="text-gray-300">|</span>
          <div>
            <span className="text-gray-500">Department: </span>
            <strong className="text-gray-900">{user?.department}</strong>
          </div>
          <span className="text-gray-300">|</span>
          <div>
            <span className="text-gray-500">Accessible Scope: </span>
            <strong className="text-gray-900 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
              {user?.accessibleDepartments.join(', ')}
            </strong>
          </div>
        </div>

        <span className="text-xs text-gray-600">
          ● Pre-retrieval filter active
        </span>
      </div>

      {/* Chat and Test Queries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col bg-white border border-gray-200 rounded-md h-[560px] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-2.5 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-800">
              RAG Assistant
            </span>
            <span className="text-xs text-gray-500">
              Scope: {user?.accessibleDepartments.join(', ')}
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fafafa]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-md text-xs leading-relaxed max-w-2xl border ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : msg.isRestricted
                      ? 'bg-red-50 text-red-900 border-red-200 whitespace-pre-line'
                      : 'bg-white text-gray-900 border-gray-200 whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Grounded Citations */}
                {msg.citations && msg.citations.length > 0 && (
                  <div className="mt-2 p-2.5 rounded-md bg-white border border-gray-200 text-xs space-y-1.5 max-w-2xl">
                    <span className="font-semibold text-gray-800 block text-[11px]">
                      Sources Consulted ({msg.citations.length} document chunks):
                    </span>
                    <div className="space-y-1">
                      {msg.citations.map((c, i) => (
                        <div key={i} className="p-1.5 rounded bg-gray-50 border border-gray-200 text-[11px]">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{c.docName}</span>
                            <span className="text-[10px] text-gray-600">Dept: {c.department}</span>
                          </div>
                          <div className="text-gray-500 text-[10px]">
                            Section: {c.section} {c.page ? `• Page ${c.page}` : ''}
                          </div>
                          <p className="text-gray-700 italic mt-0.5">"{c.snippet}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-gray-400 mt-0.5 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="text-xs text-gray-500 flex items-center gap-2 py-2">
                <span>Checking clearance and searching authorized documents...</span>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t border-gray-200 bg-white">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Ask a question based on ${user?.department} documents...`}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
                className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600"
              />
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!input.trim() || isLoading}
              >
                Send
              </Button>
            </form>
          </div>
        </div>

        {/* Right Sidebar: Preset Test Queries */}
        <div className="space-y-3">
          <div className="p-3.5 bg-white border border-gray-200 rounded-md space-y-2">
            <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Test Queries
            </h3>
            <p className="text-xs text-gray-500">
              Click any query below to test authorized vs. restricted RBAC retrieval:
            </p>

            <div className="space-y-1.5 pt-1">
              {getPresetQueries().map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(item.query)}
                  disabled={isLoading}
                  className="w-full text-left p-2 rounded border border-gray-200 hover:border-blue-500 hover:bg-blue-50/40 text-xs transition-colors cursor-pointer"
                >
                  <span className="text-gray-800 font-medium block">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white border border-gray-200 rounded-md text-xs text-gray-600 space-y-1.5">
            <h3 className="font-semibold text-gray-900">How It Works:</h3>
            <p className="text-[11px] leading-relaxed">
              1. <strong>Pre-Retrieval Check</strong>: The system verifies if your role and department can access the requested information.
            </p>
            <p className="text-[11px] leading-relaxed">
              2. <strong>Unauthorized Queries</strong>: Cross-department queries are stopped before retrieval and logged in the audit ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
