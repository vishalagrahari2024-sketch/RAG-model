import React from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { FileText, Download } from 'lucide-react';

interface MockLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  ip: string;
  result: 'Success' | 'Denied' | 'Flagged';
}

export const AuditLogsPage: React.FC = () => {
  const mockLogs: MockLog[] = [
    { id: 'log-8801', timestamp: '2026-08-31 11:45:12', actor: 'sarah@enterprise.ai', action: 'USER_LOGIN_SUCCESS', resource: 'Auth Provider', ip: '192.168.1.104', result: 'Success' },
    { id: 'log-8802', timestamp: '2026-08-31 11:30:05', actor: 'david.k@enterprise.ai', action: 'RAG_QUERY_EXECUTE', resource: 'Doc Collection #4', ip: '10.0.4.12', result: 'Success' },
    { id: 'log-8803', timestamp: '2026-08-31 10:14:22', actor: 'external_user@test.com', action: 'RBAC_ACCESS_DENIED', resource: 'Doc #HIPAA-Audit', ip: '172.16.0.44', result: 'Denied' },
    { id: 'log-8804', timestamp: '2026-08-31 09:50:18', actor: 'api_token_prod_9', action: 'GUARDRAIL_PROMPT_BLOCK', resource: 'Chat Endpoint', ip: '52.14.99.1', result: 'Flagged' },
  ];

  const columns: Column<MockLog>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (row) => <span className="font-mono text-xs text-slate-400">{row.timestamp}</span>,
    },
    {
      key: 'actor',
      header: 'Actor / User',
      render: (row) => <span className="font-semibold text-xs text-slate-200">{row.actor}</span>,
    },
    {
      key: 'action',
      header: 'Security Event',
      render: (row) => <span className="font-mono text-xs text-cyan-300">{row.action}</span>,
    },
    {
      key: 'resource',
      header: 'Target Resource',
      render: (row) => <span className="text-xs text-slate-300">{row.resource}</span>,
    },
    {
      key: 'ip',
      header: 'IP Address',
      render: (row) => <span className="font-mono text-xs text-slate-500">{row.ip}</span>,
    },
    {
      key: 'result',
      header: 'Outcome',
      render: (row) => {
        if (row.result === 'Success') return <Badge variant="success" size="sm">Success</Badge>;
        if (row.result === 'Flagged') return <Badge variant="warning" size="sm" className="font-mono">Flagged</Badge>;
        return <Badge variant="danger" size="sm" className="font-mono">Denied</Badge>;
      },
    },
  ];

  return (
    <div className="space-y-6">
      <StatusBanner
        status="MOCK"
        phase="Phase 6 Pending"
        title="Immutable Security Audit Logs Ledger"
        description="This log view previews security event tracking. Cryptographically verified audit log streams and export compliance formats will be added in Phase 6."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-400" />
            Security Audit Trail
          </h2>
          <p className="text-xs text-slate-400">
            Immutable log of all authentication events, vector access checks, and guardrail triggers.
          </p>
        </div>
        <Button variant="outline" leftIcon={<Download className="w-4 h-4" />} disabled title="Phase 6 Pending">
          Export Compliance Log (Phase 6)
        </Button>
      </div>

      <Table
        columns={columns}
        data={mockLogs}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};
