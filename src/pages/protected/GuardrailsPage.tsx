import React from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Sliders, Check, Save } from 'lucide-react';

export const GuardrailsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <StatusBanner
        status="MOCK"
        phase="Phase 4 Pending"
        title="AI Safety & Prompt Injection Guardrails Engine"
        description="This UI controls dashboard showcases the proposed guardrail rule configuration. Real-time prompt scanning, regex PII masking, and output safety verification will be implemented in Phase 4."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-cyan-400" />
            Guardrails & Safety Policies
          </h2>
          <p className="text-xs text-slate-400">
            Configure real-time threat mitigation rules prior to LLM text generation.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Save className="w-4 h-4" />} disabled title="Phase 4 Pending">
          Save Guardrail Policy (Disabled in Phase 1)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="1. Prompt Injection & Jailbreak Defense">
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0D1322] border border-[#1F293D]">
              <div>
                <span className="font-semibold text-slate-200 block">Adversarial Input Scanner</span>
                <span className="text-[11px] text-slate-400">Detect system prompt overrides & DAN jailbreaks</span>
              </div>
              <Badge variant="success">ACTIVE (MOCK)</Badge>
            </div>

            <div>
              <label className="text-slate-400 font-medium block mb-1">Sensitivity Threshold</label>
              <input type="range" min="0.1" max="1.0" step="0.05" defaultValue="0.85" disabled className="w-full opacity-60" />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>Relaxed (0.1)</span>
                <span>Strict Enforcement (0.85)</span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="2. Automated PII & Sensitive Data Redactor">
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#0D1322] border border-[#1F293D]">
              <div>
                <span className="font-semibold text-slate-200 block">Automatic Text Masking</span>
                <span className="text-[11px] text-slate-400">Mask PII in prompt before vector lookup</span>
              </div>
              <Badge variant="success">ACTIVE (MOCK)</Badge>
            </div>

            <div className="space-y-2">
              <span className="text-slate-400 font-medium block">Active Data Sanitizers:</span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Social Security Numbers</span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Credit Card Numbers</span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>API Keys & Bearer Tokens</span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center justify-between">
                  <span>Patient Medical IDs</span>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
