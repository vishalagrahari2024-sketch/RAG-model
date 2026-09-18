import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Alert } from '../../components/common/Alert';
import {
  FileText,
  UploadCloud,
  Search,
  Eye,
  Edit,
  Trash2,
  Filter,
  MessageSquare
} from 'lucide-react';
import { documentService } from '../../services/documentService';
import type { DocumentItem } from '../../types/document';
import { useNavigate } from 'react-router-dom';

export const KnowledgeBasePage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>('ALL');
  const [viewingDoc, setViewingDoc] = useState<DocumentItem | null>(null);
  const [editingDoc, setEditingDoc] = useState<DocumentItem | null>(null);
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editContent, setEditContent] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Re-fetch accessible documents
  const allAccessibleDocs = user ? documentService.getAccessibleDocuments(user) : [];

  const filteredDocs = allAccessibleDocs.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDept === 'ALL' || doc.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const handleOpenView = (doc: DocumentItem) => {
    setErrorMessage(null);
    if (!user) return;
    const result = documentService.getDocumentById(user, doc.id);
    if (!result) {
      setErrorMessage(`RBAC Error: Access denied to view document "${doc.name}".`);
      return;
    }
    setViewingDoc(result);
  };

  const handleOpenEdit = (doc: DocumentItem) => {
    setErrorMessage(null);
    if (!user || !documentService.canUserEdit(user, doc)) {
      setErrorMessage(`Permission Denied: Your role (${user?.role}) does not have EDIT permission for ${doc.name}.`);
      return;
    }
    setEditingDoc(doc);
    setEditCategory(doc.category);
    setEditDescription(doc.description);
    setEditContent(doc.content);
  };

  const handleSaveEdit = async () => {
    if (!user || !editingDoc) return;
    try {
      await documentService.updateDocument(user, editingDoc.id, {
        category: editCategory,
        description: editDescription,
        content: editContent,
      });
      setSuccessMessage(`Document "${editingDoc.name}" successfully updated.`);
      setEditingDoc(null);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to update document.');
    }
  };

  const handleDelete = async (doc: DocumentItem) => {
    if (!user) return;
    if (!window.confirm(`Are you sure you want to permanently delete "${doc.name}"?`)) return;

    try {
      await documentService.deleteDocument(user, doc.id);
      setSuccessMessage(`Document "${doc.name}" deleted.`);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to delete document.');
    }
  };

  const columns: Column<DocumentItem>[] = [
    {
      key: 'name',
      header: 'Document Name',
      render: (doc) => (
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <button
              onClick={() => handleOpenView(doc)}
              className="font-semibold text-slate-900 text-xs text-left hover:text-blue-700 hover:underline"
            >
              {doc.name}
            </button>
            <div className="text-[10px] text-slate-500">{doc.category} • {doc.size}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (doc) => (
        <span className="text-xs font-medium text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {doc.department}
        </span>
      ),
    },
    {
      key: 'uploadedBy',
      header: 'Uploaded By',
      render: (doc) => (
        <div>
          <div className="text-xs text-slate-800">{doc.uploadedBy}</div>
          <div className="text-[10px] text-slate-400 font-mono">{doc.uploadDate}</div>
        </div>
      ),
    },
    {
      key: 'documentType',
      header: 'Type',
      render: (doc) => (
        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
          {doc.documentType}
        </span>
      ),
    },
    {
      key: 'visibility',
      header: 'Access Scope',
      render: (doc) => {
        const variant =
          doc.visibility === 'Company-Wide'
            ? 'success'
            : doc.visibility === 'Executive Only'
            ? 'danger'
            : 'neutral';
        return <Badge variant={variant} size="sm">{doc.visibility}</Badge>;
      },
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (doc) => {
        if (!user) return null;
        const canEdit = documentService.canUserEdit(user, doc);
        const canDelete = documentService.canUserDelete(user, doc);

        return (
          <div className="flex items-center gap-1">
            <button
              onClick={() => handleOpenView(doc)}
              className="p-1 text-slate-500 hover:text-blue-700 hover:bg-slate-100 rounded transition-colors"
              title="View Document"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            {canEdit && (
              <button
                onClick={() => handleOpenEdit(doc)}
                className="p-1 text-slate-500 hover:text-purple-700 hover:bg-slate-100 rounded transition-colors"
                title="Edit Document"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
            )}

            {canDelete && (
              <button
                onClick={() => handleDelete(doc)}
                className="p-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete Document"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <StatusBanner
        status="IMPLEMENTED"
        phase="Phase 2 Live"
        title="Enterprise Document Management & Access Boundary"
        description="Every document is tagged with Department and Access Scope metadata. Your current account only displays documents you are authorized to VIEW."
      />

      {errorMessage && (
        <Alert type="error" message={errorMessage} onClose={() => setErrorMessage(null)} />
      )}
      {successMessage && (
        <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />
      )}

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-700" />
            Enterprise Document Archive
          </h2>
          <p className="text-xs text-slate-500">
            Authorized documents currently cleared for user <strong>{user?.name}</strong> ({user?.department})
          </p>
        </div>

        {user?.permissions.includes('UPLOAD') && (
          <Button
            variant="primary"
            size="md"
            leftIcon={<UploadCloud className="w-4 h-4" />}
            onClick={() => navigate('/upload')}
          >
            Upload New Document
          </Button>
        )}
      </div>

      {/* Search & Filter Bar */}
      <Card className="p-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter authorized documents by title or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="ALL">All Authorized Departments</option>
              {user?.accessibleDepartments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept} Department
                </option>
              ))}
              <option value="HR">Human Resources</option>
            </select>
            <Badge variant="neutral" size="sm">
              {filteredDocs.length} Documents
            </Badge>
          </div>
        </div>
      </Card>

      {/* Documents Table */}
      <Table
        columns={columns}
        data={filteredDocs}
        keyExtractor={(row) => row.id}
      />

      {/* VIEW DOCUMENT MODAL */}
      <Modal
        isOpen={!!viewingDoc}
        onClose={() => setViewingDoc(null)}
        title={viewingDoc?.name || 'Document Details'}
        subtitle={`Department: ${viewingDoc?.department} • Access Scope: ${viewingDoc?.visibility}`}
        maxWidth="lg"
        footer={
          <div className="flex items-center justify-between w-full">
            <div className="text-[11px] text-slate-500 font-mono">
              Document ID: {viewingDoc?.id}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setViewingDoc(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
                onClick={() => {
                  setViewingDoc(null);
                  navigate('/chat');
                }}
              >
                Query in RAG Chat
              </Button>
            </div>
          </div>
        }
      >
        {viewingDoc && (
          <div className="space-y-4 text-xs">
            {/* Metadata Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-md bg-slate-50 border border-slate-200">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Uploaded By</span>
                <span className="font-semibold text-slate-800">{viewingDoc.uploadedBy}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Upload Date</span>
                <span className="font-semibold text-slate-800">{viewingDoc.uploadDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">File Size</span>
                <span className="font-semibold text-slate-800">{viewingDoc.size}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Vector Chunks</span>
                <span className="font-semibold text-slate-800 font-mono">{viewingDoc.chunksCount} chunks</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-1">Description</h4>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
                {viewingDoc.description}
              </p>
            </div>

            {/* Full Content */}
            <div>
              <h4 className="font-semibold text-slate-800 mb-1 flex items-center justify-between">
                <span>Document Content & Text Segments</span>
                <span className="text-[10px] text-slate-500 font-mono font-normal">Ready for RAG Search</span>
              </h4>
              <pre className="p-3.5 rounded-md bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
                {viewingDoc.content}
              </pre>
            </div>
          </div>
        )}
      </Modal>

      {/* EDIT DOCUMENT MODAL */}
      <Modal
        isOpen={!!editingDoc}
        onClose={() => setEditingDoc(null)}
        title={`Edit: ${editingDoc?.name}`}
        subtitle={`Authorized Department: ${editingDoc?.department} (Permission: EDIT)`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setEditingDoc(null)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveEdit}>
              Save Document Updates
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <Input
            label="Category"
            value={editCategory}
            onChange={(e) => setEditCategory(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Description</label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={3}
              className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Document Text Content</label>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={6}
              className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
