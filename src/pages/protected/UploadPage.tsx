import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Alert } from '../../components/common/Alert';
import {
  UploadCloud,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { documentService } from '../../services/documentService';
import type { Department } from '../../types/auth';
import type { DocumentType, DocumentVisibility } from '../../types/document';
import { useNavigate } from 'react-router-dom';

type ProcessingStep = 'idle' | 'uploading' | 'processing' | 'ready';

export const UploadPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docName, setDocName] = useState('');
  const [department, setDepartment] = useState<Department>(user?.department || 'Finance');
  const [category, setCategory] = useState('General');
  const [description, setDescription] = useState('');
  const [visibility, setVisibility] = useState<DocumentVisibility>('Department Only');
  const [docContent, setDocContent] = useState('');
  const [step, setStep] = useState<ProcessingStep>('idle');
  const [error, setError] = useState<string | null>(null);

  const canUpload = user?.permissions.includes('UPLOAD');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!docName) setDocName(file.name);
      if (!description) setDescription(`Uploaded ${file.name} for ${department} department knowledge.`);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!docName.trim()) {
      setError('Please provide a Document Name.');
      return;
    }

    if (!user || !canUpload) {
      setError('Permission Denied: Your role does not have UPLOAD permission.');
      return;
    }

    // Step 1: Uploading
    setStep('uploading');
    await new Promise((r) => setTimeout(r, 600));

    // Step 2: Processing (Chunking & Tagging)
    setStep('processing');
    await new Promise((r) => setTimeout(r, 800));

    try {
      const fileExt = docName.split('.').pop()?.toUpperCase() || 'PDF';
      const validDocType: DocumentType =
        fileExt === 'TXT' ? 'TXT' : fileExt === 'DOCX' ? 'DOCX' : 'PDF';

      await documentService.uploadDocument(user, {
        name: docName.trim(),
        department,
        category,
        description: description.trim() || `Enterprise document for ${department}`,
        visibility,
        documentType: validDocType,
        fileSize: selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB` : '1.8 MB',
        content: docContent.trim() || `${docName}\n\nDepartment: ${department}\nVisibility: ${visibility}\n\n${description}`,
      });

      // Step 3: Document ready for RAG
      setStep('ready');
    } catch (err: any) {
      setError(err.message || 'Failed to upload document.');
      setStep('idle');
    }
  };

  if (!canUpload) {
    return (
      <div className="space-y-6">
        <StatusBanner
          status="IMPLEMENTED"
          phase="Phase 2 Live"
          title="Upload Authorization Check"
          description="Document uploads require explicit UPLOAD permission."
        />
        <Alert
          type="warning"
          title="Access Restricted"
          message={`Your current role (${user?.role}) does not have UPLOAD permissions. Please contact your department manager.`}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <StatusBanner
        status="IMPLEMENTED"
        phase="Phase 2 Live"
        title="Ingest & Authorize New Document"
        description="Attach Role-Based Access Control metadata and department clearance tags during ingestion. Documents are immediately vectorized for authorized RAG queries."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <UploadCloud className="w-5 h-5 text-blue-700" />
            Upload Enterprise Document
          </h2>
          <p className="text-xs text-slate-500">
            Authorized for user <strong>{user?.name}</strong> • Allowed upload departments: {user?.accessibleDepartments.join(', ')}
          </p>
        </div>
      </div>

      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

      {step === 'ready' ? (
        <Card className="p-8 text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Upload Successful & Document Ready for RAG</h3>
            <p className="text-xs text-slate-600">
              <strong>"{docName}"</strong> has been processed, chunked, and tagged for the <strong>{department}</strong> department.
            </p>
          </div>

          <div className="p-4 rounded-md bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>1. Upload completed (100%)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>2. Document parsed & text chunked (Ready for embedding)</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>3. RBAC filter attached ({department} clearance required)</span>
            </div>
          </div>

          <div className="pt-3 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setStep('idle');
                setSelectedFile(null);
                setDocName('');
                setDescription('');
                setDocContent('');
              }}
            >
              Upload Another Document
            </Button>
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/documents')}
            >
              View in Documents Archive
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-5">
              <form onSubmit={handleUpload} className="space-y-4">
                {/* File Dropzone */}
                <div className="p-6 border-2 border-dashed border-slate-300 rounded-lg text-center bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <UploadCloud className="w-8 h-8 text-blue-700 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-slate-800">
                    {selectedFile ? selectedFile.name : 'Choose a file or drag and drop here'}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Supported formats: <strong>PDF, DOCX, TXT</strong> (Up to 50MB)
                  </p>

                  <label className="inline-block mt-3 px-3 py-1.5 rounded bg-white text-slate-700 font-medium text-xs border border-slate-300 hover:bg-slate-50 cursor-pointer shadow-xs">
                    <span>Browse Local Files</span>
                    <input
                      type="file"
                      accept=".pdf,.docx,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Document Title"
                    placeholder="e.g. Q4 Revenue Audit.pdf"
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    required
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Department</label>
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value as Department)}
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                    >
                      {user?.accessibleDepartments.map((d) => (
                        <option key={d} value={d}>{d} Department</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Category"
                    placeholder="e.g. Auditing, SOP, Guidelines"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-700">Access Scope (Visibility)</label>
                    <select
                      value={visibility}
                      onChange={(e) => setVisibility(e.target.value as DocumentVisibility)}
                      className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                    >
                      <option value="Department Only">Department Only (Restricted to {department})</option>
                      <option value="Company-Wide">Company-Wide (All Employees with VIEW permission)</option>
                      <option value="Executive Only">Executive Only (CEO / Board clearance)</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief summary of document contents and purpose..."
                    rows={2}
                    className="w-full bg-white border border-slate-300 rounded-md p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-700">
                    Document Text Content (Simulated Extraction)
                  </label>
                  <textarea
                    value={docContent}
                    onChange={(e) => setDocContent(e.target.value)}
                    placeholder="Enter or paste document text for RAG chunking..."
                    rows={4}
                    className="w-full bg-slate-50 border border-slate-300 rounded-md p-2.5 font-mono text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={step === 'uploading' || step === 'processing'}
                  className="w-full mt-2"
                >
                  {step === 'uploading'
                    ? 'Uploading file...'
                    : step === 'processing'
                    ? 'Processing for RAG & attaching RBAC...'
                    : 'Submit Document to RAG Pipeline'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Right Info Card */}
          <div className="space-y-4">
            <Card title="Ingestion Pipeline Stages">
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">File Validation</span>
                    <p className="text-[11px] text-slate-500">Supported formats: PDF, DOCX, TXT. File integrity verified.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Chunking & Vector Prep</span>
                    <p className="text-[11px] text-slate-500">Document split into 500-token chunks with 50-token overlap.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">RBAC Metadata Binding</span>
                    <p className="text-[11px] text-slate-500">Department and Visibility metadata attached to each chunk.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
