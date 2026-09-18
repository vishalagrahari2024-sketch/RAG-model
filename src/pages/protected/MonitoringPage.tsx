import React from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Activity, Clock, ShieldAlert, FileText, Cpu } from 'lucide-react';

interface SystemEvent {
  id: string;
  time: string;
  user: string;
  event: string;
  resource: string;
  status: 'Normal' | 'Blocked' | 'Warning';
}

export const MonitoringPage: React.FC = () => {
  const systemEvents: SystemEvent[] = [
    { id: 'ev-1', time: '13:42:10', user: 'finance.employee@demo-company.com', event: 'RAG_RETRIEVAL', resource: 'Q4 Financial Report 2026.pdf', status: 'Normal' },
    { id: 'ev-2', time: '13:30:15', user: 'finance.employee@demo-company.com', event: 'RBAC_PRE_FILTER_BLOCK', resource: 'Manufacturing Production SOP', status: 'Blocked' },
    { id: 'ev-3', time: '13:15:02', user: 'manufacturing.employee@demo-company.com', event: 'RAG_RETRIEVAL', resource: 'Production Report Q4.pdf', status: 'Normal' },
    { id: 'ev-4', time: '12:50:44', user: 'manufacturing.employee@demo-company.com', event: 'RBAC_CROSS_DEPT_BLOCK', resource: 'Annual Budget 2026.pdf', status: 'Blocked' },
    { id: 'ev-5', time: '12:10:30', user: 'ceo@demo-company.com', event: 'MULTI_DEPT_RETRIEVAL', resource: 'Executive Business Review.pdf', status: 'Normal' },
  ];

  const columns: Column<SystemEvent>[] = [
    {
      key: 'time',
      header: 'Time',
      render: (e) => <span className="text-xs font-mono text-slate-500">{e.time}</span>,
    },
    {
      key: 'user',
      header: 'User Account',
      render: (e) => <span className="text-xs font-medium text-slate-800">{e.user}</span>,
    },
    {
      key: 'event',
      header: 'Event Type',
      render: (e) => <span className="text-xs font-mono text-slate-700">{e.event}</span>,
    },
    {
      key: 'resource',
      header: 'Resource',
      render: (e) => <span className="text-xs text-slate-600 truncate max-w-xs block">{e.resource}</span>,
    },
    {
      key: 'status',
      header: 'Event Status',
      render: (e) => (
        <Badge variant={e.status === 'Normal' ? 'success' : e.status === 'Blocked' ? 'danger' : 'warning'} size="sm">
          {e.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <StatusBanner
        status="MOCK"
        phase="Phase 5 Roadmap"
        title="System Performance & Operational Monitoring (UI Preview)"
        description="Practical metrics tracking retrieval volume, latency benchmarks, and RBAC security blocks. Live OpenTelemetry metrics collector pending Phase 5."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-700" />
            System Monitoring & Telemetry
          </h2>
          <p className="text-xs text-slate-500">
            Real-time health of knowledge retrieval engines, response latency, and access violations.
          </p>
        </div>
      </div>

      {/* 5 Practical Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Queries</span>
            <Activity className="w-4 h-4 text-blue-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-2">1,248</div>
          <p className="text-[11px] text-slate-500 mt-1">Queries this billing cycle</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Avg Response Time</span>
            <Clock className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-2">1.8 sec</div>
          <p className="text-[11px] text-slate-500 mt-1">Target &lt; 2.5s benchmark</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Access Violations</span>
            <ShieldAlert className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600 font-mono mt-2">12 Blocked</div>
          <p className="text-[11px] text-slate-500 mt-1">Pre-retrieval blocks</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Failed Requests</span>
            <Cpu className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-2">4</div>
          <p className="text-[11px] text-slate-500 mt-1">0.3% error rate</p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Docs Retrieved</span>
            <FileText className="w-4 h-4 text-purple-700" />
          </div>
          <div className="text-2xl font-bold text-slate-900 font-mono mt-2">48</div>
          <p className="text-[11px] text-slate-500 mt-1">Active verified sources</p>
        </Card>
      </div>

      {/* Events Table */}
      <Card title="Recent System & Security Events">
        <Table
          columns={columns}
          data={systemEvents}
          keyExtractor={(row) => row.id}
        />
      </Card>
    </div>
  );
};
