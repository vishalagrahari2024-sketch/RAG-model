import React from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Activity, Cpu, Clock, Zap } from 'lucide-react';

export const MonitoringPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <StatusBanner
        status="MOCK"
        phase="Phase 5 Pending"
        title="Real-Time Observability & Token Cost Telemetry"
        description="This monitoring dashboard showcases the visual metrics layout. Real-time OpenTelemetry trace collectors, vector query latency hooks, and token expenditure monitoring will be connected in Phase 5."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            System Performance & Cost Telemetry
          </h2>
          <p className="text-xs text-slate-400">
            Track end-to-end RAG latency, embedding model throughput, and API expenditure.
          </p>
        </div>
        <Badge variant="mock">PHASE 5 PREVIEW</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">P99 Query Latency</span>
            <Clock className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-2">240 ms</div>
          <p className="text-xs text-slate-400 mt-1">Target threshold &lt; 350 ms</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">Total Tokens Consumed</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-2">1.84 M</div>
          <p className="text-xs text-slate-400 mt-1">Est. cost: $14.72 / day</p>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase text-slate-400">Vector Index Health</span>
            <Cpu className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-2">99.98%</div>
          <p className="text-xs text-slate-400 mt-1">Zero downtime recorded</p>
        </Card>
      </div>

      <Card title="Retrieval Latency Breakdown (UI Mock Graphic)">
        <div className="h-64 w-full bg-[#0D1322] border border-[#1F293D] rounded-xl flex items-center justify-center p-6 text-center">
          <div className="space-y-2">
            <Activity className="w-10 h-10 text-emerald-400/60 mx-auto animate-pulse" />
            <p className="text-xs font-semibold text-slate-300">Phase 5 OpenTelemetry Visualizer Preview</p>
            <p className="text-[11px] text-slate-500 font-mono">
              Vector Search (110ms) + Guardrail Check (14ms) + LLM Response Generation (116ms)
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
