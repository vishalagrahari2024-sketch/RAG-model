import type { Department } from './auth';

export const DocumentType = {
  PDF: 'PDF',
  DOCX: 'DOCX',
  TXT: 'TXT',
} as const;
export type DocumentType = 'PDF' | 'DOCX' | 'TXT';

export const DocumentVisibility = {
  DepartmentOnly: 'Department Only',
  CompanyWide: 'Company-Wide',
  ExecutiveOnly: 'Executive Only',
  Restricted: 'Restricted',
} as const;
export type DocumentVisibility = 'Department Only' | 'Company-Wide' | 'Executive Only' | 'Restricted';

export interface DocumentItem {
  id: string;
  name: string;
  department: Department;
  uploadedBy: string;
  uploadedByEmail: string;
  uploadDate: string;
  documentType: DocumentType;
  visibility: DocumentVisibility;
  category: string;
  size: string;
  chunksCount: number;
  description: string;
  content: string;
  createdDate: string;
  updatedDate: string;
}

export interface DocumentUploadInput {
  name: string;
  department: Department;
  category: string;
  description: string;
  visibility: DocumentVisibility;
  documentType: DocumentType;
  fileSize?: string;
  content?: string;
}

export interface DocumentPermissions {
  canView: boolean;
  canUpload: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canRag: boolean;
}
