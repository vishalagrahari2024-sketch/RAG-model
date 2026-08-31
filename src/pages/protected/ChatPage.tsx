import React, { useState } from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import {
  Send,
  ShieldCheck,
  CheckCircle2,
  BookOpen,
  User,
  Bot
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const [input, setInput] = useState('');

  const sampleMessages = [
    {
      id: 'm-1',
      sender: 'user',
      text: 'What are the required compliance controls for storing customer PII in our cloud vector index?',
      time: '10:42 AM',
    },
    {
      id: 'm-2',
      sender: 'assistant',
      text: 'Based on your ingested enterprise security policy (Q3_Cloud_Infrastructure_Security_Policy.pdf, Page 14):\n\n1. PII Redaction Guardrails must be enforced before text vectorization.\n2. Role-Based Access Control (RBAC) must restrict query access to roles with "Data Compliance Officer" or "Admin" clearance.\n3. All retrieval queries are logged to the immutable security audit ledger.',
      citations: ['Q3_Cloud_Infrastructure_Security_Policy.pdf (Chunk #42)', 'HIPAA_Compliance_Audit_Report_2026.docx (Chunk #18)'],
      guardrailPassed: true,
      rbacFilterApplied: true,
      time: '10:42 AM',
    },
  ];

  return (
    <div className="space-y-6">
      <StatusBanner
        status="MOCK"
        phase="Phase 2 Pending"
        title="Guarded RAG Query & AI Chat Workspace"
        description="This UI workspace previews the Guarded RAG conversational interface. Vector retrieval, document similarity search, and LLM text generation will be connected in Phase 2."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-250px)] min-h-[500px]">
        <div className="lg:col-span-3 flex flex-col bg-[#111726] border border-[#1F293D] rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-3.5 border-b border-[#1F293D] bg-[#0D1322] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white">Aegis Guarded AI Assistant</h3>
                <p className="text-[10px] text-slate-400 font-mono">Model: GPT-4o-Mini • RBAC Secured</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="success" size="sm"><ShieldCheck className="w-3 h-3" /> Guardrails Active</Badge>
              <Badge variant="mock" size="sm">MOCK RESPONSE</Badge>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-[#090D16]/50">
            {sampleMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-tr from-indigo-600 to-cyan-600 text-white'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className="space-y-2">
                  <div className={`p-4 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/30 text-slate-100 rounded-tr-none'
                      : 'bg-[#111726] border border-[#1F293D] text-slate-200 rounded-tl-none whitespace-pre-line'
                  }`}>
                    {msg.text}
                  </div>

                  {msg.citations && (
                    <div className="p-3 rounded-xl bg-[#0D1322] border border-[#1F293D] text-[11px] space-y-1.5">
                      <div className="font-semibold text-slate-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Retrieved Document Citations (Phase 2 Preview):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.citations.map((c, i) => (
                          <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-[10px] border border-slate-700">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#1F293D] bg-[#0D1322]">
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Ask a security-governed RAG question (UI Demo Only)..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#111726] border border-[#1F293D] rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
              <Button
                variant="primary"
                size="md"
                disabled
                leftIcon={<Send className="w-4 h-4" />}
              >
                Send
              </Button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Prompt Injections Auto-Filtered</span>
              <span>Phase 2 RAG Backend Integration Pending</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Card title="Retrieval Controls (UI Mock)">
            <div className="space-y-4 text-xs">
              <div>
                <label className="text-slate-400 font-medium block mb-1">Similarity Threshold</label>
                <input type="range" min="0.5" max="0.95" step="0.05" defaultValue="0.75" disabled className="w-full opacity-60" />
                <span className="text-[10px] text-slate-500 font-mono">Top-K Score &gt;= 0.75</span>
              </div>

              <div>
                <label className="text-slate-400 font-medium block mb-1">Max Retrieved Chunks</label>
                <div className="px-3 py-1.5 rounded-lg bg-[#0D1322] border border-[#1F293D] text-slate-300 font-mono">
                  K = 5 document segments
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <span className="font-semibold text-slate-300">Guardrail Engine Status:</span>
                <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/20 text-emerald-400 text-[11px] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>PII Redactor & Prompt Scanner Ready</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
