import React, { useState } from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Modal } from '../../components/common/Modal';
import {
  Database,
  UploadCloud,
  Search,
  FileText,
  Lock,
  Eye,
  Trash2,
  Filter,
  Info
} from 'lucide-react';

interface MockDocument {
  id: string;
  name: string;
  category: string;
  size: string;
  chunks: number;
  rbacLevel: 'Admin Only' | 'Security & Exec' | 'All Employees';
  uploadedAt: string;
}

export const KnowledgeBasePage: React.FC = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const mockDocuments: MockDocument[] = [
    { id: 'doc-1', name: 'Q3_Cloud_Infrastructure_Security_Policy.pdf', category: 'DevOps & Sec', size: '2.4 MB', chunks: 148, rbacLevel: 'Security & Exec', uploadedAt: '2026-08-28' },
    { id: 'doc-2', name: 'HIPAA_Compliance_Audit_Report_2026.docx', category: 'Compliance', size: '4.1 MB', chunks: 310, rbacLevel: 'Admin Only', uploadedAt: '2026-08-25' },
    { id: 'doc-3', name: 'Employee_Handbook_and_IT_Usage_Policy.pdf', category: 'Human Resources', size: '1.2 MB', chunks: 85, rbacLevel: 'All Employees', uploadedAt: '2026-08-10' },
    { id: 'doc-4', name: 'Vector_Store_Partitioning_Architecture.md', category: 'Engineering', size: '540 KB', chunks: 42, rbacLevel: 'Security & Exec', uploadedAt: '2026-08-02' },
  ];

  const columns: Column<MockDocument>[] = [
    {
      key: 'name',
      header: 'Document Name',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-slate-200">{row.name}</div>
            <div className="text-[10px] text-slate-500">{row.category} • {row.size}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'chunks',
      header: 'Vector Chunks',
      render: (row) => (
        <span className="font-mono text-xs text-slate-300">{row.chunks} vectors</span>
      ),
    },
    {
      key: 'rbacLevel',
      header: 'RBAC Policy Level',
      render: (row) => {
        if (row.rbacLevel === 'Admin Only') return <Badge variant="danger" size="sm"><Lock className="w-3 h-3" /> Admin Only</Badge>;
        if (row.rbacLevel === 'Security & Exec') return <Badge variant="warning" size="sm"><Lock className="w-3 h-3" /> Exec & Sec</Badge>;
        return <Badge variant="neutral" size="sm">All Roles</Badge>;
      },
    },
    {
      key: 'uploadedAt',
      header: 'Ingested Date',
      render: (row) => <span className="text-xs text-slate-400 font-mono">{row.uploadedAt}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex items-center gap-2">
          <button
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800 transition-colors"
            title="Preview Vector Chunks (Mock)"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/40 transition-colors"
            title="Delete Document (Mock)"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <StatusBanner
        status="MOCK"
        phase="Phase 2 Pending"
        title="Knowledge Base & Document Ingestion Workspace"
        description="This UI interface previews document management. Actual document parsing, text chunking, embedding generation, and vector database persistence will be implemented in Phase 2."
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            Knowledge Base Management
          </h2>
          <p className="text-xs text-slate-400">
            Ingest, partition, and attach role-based access rules to enterprise documents.
          </p>
        </div>
        <Button
          variant="primary"
          leftIcon={<UploadCloud className="w-4 h-4" />}
          onClick={() => setIsUploadModalOpen(true)}
        >
          Upload Document (Preview)
        </Button>
      </div>

      <Card className="p-4 border-[#1F293D]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter ingested documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0D1322] border border-[#1F293D] rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" leftIcon={<Filter className="w-3.5 h-3.5" />}>
              Filter by Category
            </Button>
            <Badge variant="mock">4 UI SAMPLE RECS</Badge>
          </div>
        </div>
      </Card>

      <Table
        columns={columns}
        data={mockDocuments}
        keyExtractor={(row) => row.id}
      />

      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        title="Ingest New Document (UI Preview)"
        subtitle="Phase 2 Document Processing Pipeline Mock"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" disabled title="Phase 2 Pending">
              Submit to Pipeline (Disabled in Phase 1)
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs text-slate-300">
          <div className="p-8 rounded-xl border-2 border-dashed border-slate-700 bg-[#0D1322] text-center space-y-2">
            <UploadCloud className="w-10 h-10 text-slate-500 mx-auto" />
            <p className="font-semibold text-slate-200">Drag and drop enterprise PDF/DOCX file</p>
            <p className="text-slate-500 text-[11px]">Maximum file size: 50MB per document</p>
          </div>

          <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-amber-300">
            <Info className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Real upload parsing, token embedding generation, and vector index persistence will be enabled in Phase 2.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
};
