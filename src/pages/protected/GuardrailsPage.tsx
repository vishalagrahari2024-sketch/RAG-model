import React, { useState } from 'react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const GuardrailsPage: React.FC = () => {
  const [promptInjection, setPromptInjection] = useState(true);
  const [sensitiveData, setSensitiveData] = useState(true);
  const [outputValidation, setOutputValidation] = useState(true);
  const [unauthorizedDetection, setUnauthorizedDetection] = useState(true);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-900">AI Guardrails</h1>
            <span className="text-xs text-gray-500 italic">(coming soon)</span>
          </div>
          <p className="text-xs text-gray-500">
            Safety rules and policy toggles for prompt and response governance
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
        >
          {savedNotice ? 'Saved' : 'Save Policies'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Control 1 */}
        <Card className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Prompt Injection Protection</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Detects adversarial system prompt overrides, DAN jailbreaks, and instructions attempting to bypass RBAC.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={promptInjection}
                onChange={(e) => setPromptInjection(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-700"></div>
            </label>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Enforcement Mode:</span>
            <Badge variant={promptInjection ? 'success' : 'neutral'} size="sm">
              {promptInjection ? 'Strict (Blocking)' : 'Disabled'}
            </Badge>
          </div>
        </Card>

        {/* Control 2 */}
        <Card className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Sensitive Information & PII Detection</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Automatically masks Social Security Numbers, corporate credit card numbers, and API tokens before lookup.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={sensitiveData}
                onChange={(e) => setSensitiveData(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-700"></div>
            </label>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Active Sanitizers:</span>
            <span className="text-slate-700 font-mono text-[11px]">SSN, Credit Cards, API Keys</span>
          </div>
        </Card>

        {/* Control 3 */}
        <Card className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Output Validation & Hallucination Check</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ensures that every generated response maps to retrieved source chunks and denies ungrounded assertions.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={outputValidation}
                onChange={(e) => setOutputValidation(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-700"></div>
            </label>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Citation Verification:</span>
            <Badge variant={outputValidation ? 'success' : 'neutral'} size="sm">
              {outputValidation ? 'Active' : 'Disabled'}
            </Badge>
          </div>
        </Card>

        {/* Control 4 */}
        <Card className="p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Unauthorized Request Detection</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Flags repetitive cross-department query patterns and immediately records security alerts to the audit trail.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={unauthorizedDetection}
                onChange={(e) => setUnauthorizedDetection(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-700"></div>
            </label>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Audit Trigger Threshold:</span>
            <span className="text-slate-700 font-mono text-[11px]">&gt;= 2 Denied Queries / hr</span>
          </div>
        </Card>
      </div>
    </div>
  );
};
