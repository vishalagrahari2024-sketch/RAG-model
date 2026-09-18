import type { Department } from './auth';

export interface RagChunk {
  id: string;
  docId: string;
  docName: string;
  department: Department;
  section: string;
  page?: number;
  text: string;
}

export interface RagCitation {
  docId: string;
  docName: string;
  department: Department;
  section: string;
  page?: number;
  snippet: string;
}

export interface RagMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isRestricted?: boolean;
  deniedReason?: string;
  citations?: RagCitation[];
  targetDepartment?: Department;
}
