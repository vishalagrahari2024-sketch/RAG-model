import type { DocumentItem, DocumentUploadInput } from '../types/document';
import type { User, Department } from '../types/auth';
import { auditService } from './auditService';

const DOCUMENTS_STORAGE_KEY = 'rag_rbac_documents_v1';

export const INITIAL_DOCUMENTS: DocumentItem[] = [
  // --- FINANCE DOCUMENTS ---
  {
    id: 'doc-fin-01',
    name: 'Q4 Financial Report 2026.pdf',
    department: 'Finance',
    uploadedBy: 'Rahul Sharma',
    uploadedByEmail: 'finance.employee@demo-company.com',
    uploadDate: '2026-09-02',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Financial Reporting',
    size: '2.4 MB',
    chunksCount: 14,
    description: 'Quarterly financial performance, revenue breakdown, operating margins, and profit metrics for Q4 FY2025-26.',
    content: `Q4 Financial Report 2026

Executive Summary:
The report covers the financial performance of the organization during the fourth quarter of FY 2025-26.

Key Financial Figures:
- Total Revenue: ₹48.5 Crore (an increase of 14.2% YoY)
- Operating Expenses: ₹31.2 Crore
- Cost of Goods Sold (COGS): ₹7.5 Crore
- Net Profit: ₹9.8 Crore (Net Margin: 20.2%)
- EBITDA: ₹13.4 Crore

Quarterly Highlights:
Strong growth was recorded in enterprise recurring subscriptions and strategic client retention. Operating expenses remained well within budgeted allocations.`,
    createdDate: '2026-09-02T10:00:00.000Z',
    updatedDate: '2026-09-02T10:00:00.000Z'
  },
  {
    id: 'doc-fin-02',
    name: 'Annual Budget 2026.pdf',
    department: 'Finance',
    uploadedBy: 'Priya Patel',
    uploadedByEmail: 'finance.manager@demo-company.com',
    uploadDate: '2026-08-15',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Budgeting & Forecasts',
    size: '3.1 MB',
    chunksCount: 22,
    description: 'Corporate capital allocation, operational forecasts, and departmental expense caps for FY2026-27.',
    content: `Annual Budget 2026

Departmental Capital Allocations:
- Manufacturing & Plant Ops: ₹45.0 Crore
- Research & Engineering: ₹32.0 Crore
- Sales & Business Development: ₹24.0 Crore
- Human Resources & Talent: ₹8.5 Crore
- General & Administrative: ₹6.5 Crore

Contingency Reserves:
A total reserve of ₹12.0 Crore is set aside for supply chain volatility and unexpected compliance updates.`,
    createdDate: '2026-08-15T09:30:00.000Z',
    updatedDate: '2026-08-15T09:30:00.000Z'
  },
  {
    id: 'doc-fin-03',
    name: 'Revenue Analysis.pdf',
    department: 'Finance',
    uploadedBy: 'Rahul Sharma',
    uploadedByEmail: 'finance.employee@demo-company.com',
    uploadDate: '2026-08-28',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Revenue Analytics',
    size: '1.8 MB',
    chunksCount: 12,
    description: 'Product line revenue streams, client acquisition CAC, and gross margin trends across regional sectors.',
    content: `Revenue Analysis Q3-Q4 2026

Revenue Streams Breakdown:
- Enterprise Software Licenses: 52% (₹25.2 Crore)
- Maintenance & Support Contracts: 28% (₹13.6 Crore)
- Professional Implementation Services: 20% (₹9.7 Crore)

Key Insights:
Customer lifetime value increased by 18%, while gross revenue churn decreased to an all-time low of 1.2%.`,
    createdDate: '2026-08-28T14:15:00.000Z',
    updatedDate: '2026-08-28T14:15:00.000Z'
  },
  {
    id: 'doc-fin-04',
    name: 'Expense Report Q3.pdf',
    department: 'Finance',
    uploadedBy: 'Rahul Sharma',
    uploadedByEmail: 'finance.employee@demo-company.com',
    uploadDate: '2026-07-20',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Auditing',
    size: '1.4 MB',
    chunksCount: 9,
    description: 'Detailed breakdown of travel, cloud compute, facility maintenance, and third-party vendor charges.',
    content: `Expense Report Q3

Total Operating Overhead: ₹29.4 Crore
Cloud Infrastructure Costs: ₹4.8 Crore
Vendor Software & SaaS Licenses: ₹2.1 Crore
Facility Rent & Utilities: ₹3.5 Crore`,
    createdDate: '2026-07-20T11:00:00.000Z',
    updatedDate: '2026-07-20T11:00:00.000Z'
  },
  {
    id: 'doc-fin-05',
    name: 'Financial Policy.pdf',
    department: 'Finance',
    uploadedBy: 'Priya Patel',
    uploadedByEmail: 'finance.manager@demo-company.com',
    uploadDate: '2026-06-10',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Corporate Policy',
    size: '980 KB',
    chunksCount: 8,
    description: 'Official corporate expenditure policy, reimbursement approval hierarchy, and internal financial controls.',
    content: `Financial Policy and Internal Audit Guidelines

Approval Hierarchy:
- Up to ₹50,000: Department Manager approval required.
- Up to ₹5,00,000: VP / Finance Director approval required.
- Above ₹5,00,000: CFO / Executive Committee signoff required.`,
    createdDate: '2026-06-10T10:00:00.000Z',
    updatedDate: '2026-06-10T10:00:00.000Z'
  },

  // --- MANUFACTURING DOCUMENTS ---
  {
    id: 'doc-mfg-01',
    name: 'Production Report Q4.pdf',
    department: 'Manufacturing',
    uploadedBy: 'Amit Verma',
    uploadedByEmail: 'manufacturing.employee@demo-company.com',
    uploadDate: '2026-09-05',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Production Metrics',
    size: '3.4 MB',
    chunksCount: 16,
    description: 'Quarterly output totals, assembly line efficiency metrics, quality pass percentages, and facility logs.',
    content: `Production Report Q4

Total Production Output: 125,000 units
Quality Pass Rate: 96.8% (Target: >= 95.0%)
Defect / Rejection Rate: 3.2%
Active Production Facilities: 3 plants (Plant A - Pune, Plant B - Chennai, Plant C - Gurgaon)

Performance Summary:
Plant A achieved record throughput with 52,000 finished assemblies. All machines passed scheduled predictive maintenance checks.`,
    createdDate: '2026-09-05T09:00:00.000Z',
    updatedDate: '2026-09-05T09:00:00.000Z'
  },
  {
    id: 'doc-mfg-02',
    name: 'Manufacturing SOP.pdf',
    department: 'Manufacturing',
    uploadedBy: 'Amit Verma',
    uploadedByEmail: 'manufacturing.employee@demo-company.com',
    uploadDate: '2026-08-12',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Operations',
    size: '4.2 MB',
    chunksCount: 24,
    description: 'Standard Operating Procedures for automated conveyor lines, calibration steps, and safety gear requirements.',
    content: `Manufacturing Standard Operating Procedures (SOP)

Section 1: Shift Handover Checklist
Operators must inspect safety interlocks, lubricate robotic joints, and verify pneumatic pressure gauges before initiating conveyor belts.

Section 2: Emergency Stop Procedure
In the event of an automated line jam, hit the red E-Stop actuator immediately and notify the floor shift lead.`,
    createdDate: '2026-08-12T10:00:00.000Z',
    updatedDate: '2026-08-12T10:00:00.000Z'
  },
  {
    id: 'doc-mfg-03',
    name: 'Quality Control Guidelines.pdf',
    department: 'Manufacturing',
    uploadedBy: 'Amit Verma',
    uploadedByEmail: 'manufacturing.employee@demo-company.com',
    uploadDate: '2026-08-20',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Quality Assurance',
    size: '2.1 MB',
    chunksCount: 15,
    description: 'Six Sigma sampling criteria, optical sensor inspection thresholds, and batch quarantine protocols.',
    content: `Quality Control Guidelines & Tolerances

Tolerance Specifications:
- Critical dimensions: +/- 0.05 mm
- Surface finish: Ra < 0.8 um
- Tensile stress validation: 450 MPa minimum threshold

Batch Quarantine Protocol:
If two consecutive samples exceed variance limits, the entire 500-unit lot must be quarantined for secondary optical microscopy review.`,
    createdDate: '2026-08-20T11:00:00.000Z',
    updatedDate: '2026-08-20T11:00:00.000Z'
  },
  {
    id: 'doc-mfg-04',
    name: 'Plant Safety Manual.pdf',
    department: 'Manufacturing',
    uploadedBy: 'Amit Verma',
    uploadedByEmail: 'manufacturing.employee@demo-company.com',
    uploadDate: '2026-07-15',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Safety & Compliance',
    size: '1.9 MB',
    chunksCount: 11,
    description: 'Hazard identification, chemical storage protocols, fire evacuation paths, and personal protective equipment standards.',
    content: `Plant Safety & Hazard Manual

Mandatory Personal Protective Equipment (PPE):
- High-visibility reflective vest
- Steel-toe composite footwear
- ANSI Z87 approved protective eye gear
- Cut-resistant Kevlar gloves when handling stamped sheet metal`,
    createdDate: '2026-07-15T08:30:00.000Z',
    updatedDate: '2026-07-15T08:30:00.000Z'
  },
  {
    id: 'doc-mfg-05',
    name: 'Production Capacity Report.pdf',
    department: 'Manufacturing',
    uploadedBy: 'Amit Verma',
    uploadedByEmail: 'manufacturing.employee@demo-company.com',
    uploadDate: '2026-06-25',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Capacity Planning',
    size: '2.8 MB',
    chunksCount: 18,
    description: 'Annual throughput modeling, machine downtime metrics, and proposed capital expenditures for Line 4.',
    content: `Production Capacity & Utilization Report

Average Capacity Utilization: 88.4%
Total Theoretical Maximum Output: 145,000 units / quarter
Planned Overhaul: Line 2 will undergo 3 days of re-tooling in November to increase stamping speed by 15%.`,
    createdDate: '2026-06-25T14:00:00.000Z',
    updatedDate: '2026-06-25T14:00:00.000Z'
  },

  // --- HR DOCUMENTS ---
  {
    id: 'doc-hr-01',
    name: 'Employee Handbook.pdf',
    department: 'HR',
    uploadedBy: 'HR Administration',
    uploadedByEmail: 'hr@demo-company.com',
    uploadDate: '2026-05-10',
    documentType: 'PDF',
    visibility: 'Company-Wide',
    category: 'Human Resources',
    size: '2.2 MB',
    chunksCount: 20,
    description: 'Comprehensive guide to employee conduct, benefits, company culture, ethics, and workplace expectations.',
    content: `Employee Handbook

Code of Ethics & Conduct:
All team members are expected to maintain professional standards of integrity, transparency, and mutual respect.

Working Hours & Attendance:
Standard operating hours are 9:00 AM to 6:00 PM Monday through Friday with flexible core hours between 10:00 AM and 4:00 PM.`,
    createdDate: '2026-05-10T09:00:00.000Z',
    updatedDate: '2026-05-10T09:00:00.000Z'
  },
  {
    id: 'doc-hr-02',
    name: 'Leave Policy.pdf',
    department: 'HR',
    uploadedBy: 'HR Administration',
    uploadedByEmail: 'hr@demo-company.com',
    uploadDate: '2026-06-01',
    documentType: 'PDF',
    visibility: 'Company-Wide',
    category: 'Human Resources',
    size: '1.1 MB',
    chunksCount: 8,
    description: 'Official company guidelines for annual paid leave, medical leave, bereavement, and public holidays.',
    content: `Employee Leave Policy

Leave Entitlements:
- Annual Paid Leave: 24 working days per calendar year.
- Sick / Medical Leave: 12 days per year (medical certificate required for > 2 days).
- Casual Leave: 8 days per year.
- Parental Leave: 16 weeks fully paid primary caregiver leave.

Application Process:
Leave requests must be submitted through the internal HR portal at least 5 business days in advance for planned leaves.`,
    createdDate: '2026-06-01T10:00:00.000Z',
    updatedDate: '2026-06-01T10:00:00.000Z'
  },
  {
    id: 'doc-hr-03',
    name: 'Recruitment Policy.pdf',
    department: 'HR',
    uploadedBy: 'HR Administration',
    uploadedByEmail: 'hr@demo-company.com',
    uploadDate: '2026-04-18',
    documentType: 'PDF',
    visibility: 'Company-Wide',
    category: 'Human Resources',
    size: '1.3 MB',
    chunksCount: 10,
    description: 'Internal and external hiring standards, candidate interview scoring rubrics, and referral bonus program.',
    content: `Recruitment & Talent Acquisition Policy

Equal Opportunity:
Apex Global Industries is committed to meritocratic, bias-free recruiting across all business units.
Employee Referral Bonus:
Employees referring successful full-time candidates receive a referral incentive upon completion of the probationary 90 days.`,
    createdDate: '2026-04-18T11:00:00.000Z',
    updatedDate: '2026-04-18T11:00:00.000Z'
  },

  // --- EXECUTIVE DOCUMENTS ---
  {
    id: 'doc-exec-01',
    name: 'Company Strategy 2026.pdf',
    department: 'Executive',
    uploadedBy: 'Vikram Malhotra',
    uploadedByEmail: 'ceo@demo-company.com',
    uploadDate: '2026-09-01',
    documentType: 'PDF',
    visibility: 'Executive Only',
    category: 'Strategic Planning',
    size: '5.6 MB',
    chunksCount: 30,
    description: 'CONFIDENTIAL: Multi-year strategic expansion, M&A targets, enterprise AI integration roadmap, and valuation goals.',
    content: `Company Strategy 2026 - Executive Confidential

Three-Year Vision:
1. Scale European manufacturing operations by acquiring a mid-tier precision fabrication facility in Germany.
2. Integrate proprietary RAG and AI governance systems across all enterprise client touchpoints.
3. Target ₹500 Crore consolidated top-line revenue by FY 2028-29.

Confidential M&A Pipeline:
Target A (Automated Robotics) valuation review scheduled for Q1 board meeting.`,
    createdDate: '2026-09-01T08:00:00.000Z',
    updatedDate: '2026-09-01T08:00:00.000Z'
  },
  {
    id: 'doc-exec-02',
    name: 'Executive Business Review.pdf',
    department: 'Executive',
    uploadedBy: 'Vikram Malhotra',
    uploadedByEmail: 'ceo@demo-company.com',
    uploadDate: '2026-08-30',
    documentType: 'PDF',
    visibility: 'Executive Only',
    category: 'Board Governance',
    size: '3.8 MB',
    chunksCount: 20,
    description: 'Summary of quarterly departmental operational metrics prepared for the Board of Directors.',
    content: `Executive Business Review - Board of Directors Summary

Consolidated Performance:
- Finance: All targets exceeded with 20.2% net profit margin.
- Manufacturing: Output matched high expectations at 125,000 units.
- Enterprise Retention: 98.8% gross dollar retention rate.
- Risk Analysis: Supply chain commodity fluctuations tracked as moderate risk.`,
    createdDate: '2026-08-30T10:00:00.000Z',
    updatedDate: '2026-08-30T10:00:00.000Z'
  }
];

class DocumentService {
  constructor() {
    this.init();
  }

  private init() {
    const existing = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(INITIAL_DOCUMENTS));
    }
  }

  public getAllDocuments(): DocumentItem[] {
    try {
      const raw = localStorage.getItem(DOCUMENTS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  }

  /**
   * RBAC Pre-Check: Can this user VIEW this document?
   */
  public canUserView(user: User, doc: DocumentItem): boolean {
    if (!user.permissions.includes('VIEW')) return false;

    // CEO / Admin can view company-wide and their accessible depts
    if (user.role === 'CEO' || user.role === 'Enterprise Admin') {
      return true;
    }

    // Executive Only documents are restricted to CEO / Admin
    if (doc.visibility === 'Executive Only') {
      return false;
    }

    // Company-wide documents are viewable by any employee with VIEW permission
    if (doc.visibility === 'Company-Wide') {
      return true;
    }

    // Department documents require that user has clearance for that department
    return user.accessibleDepartments.includes(doc.department);
  }

  /**
   * RBAC Pre-Check: Can this user EDIT this document?
   */
  public canUserEdit(user: User, doc: DocumentItem): boolean {
    if (!user.permissions.includes('EDIT')) return false;

    // Enterprise Admin can edit
    if (user.role === 'Enterprise Admin') return true;

    // CEO can edit authorized documents
    if (user.role === 'CEO') return true;

    // Managers can edit documents belonging to their department
    if (user.role === 'Manager' && user.department === doc.department) {
      return true;
    }

    // Standard employee: by default cannot edit department documents
    return false;
  }

  /**
   * RBAC Pre-Check: Can this user DELETE this document?
   */
  public canUserDelete(user: User, _doc: DocumentItem): boolean {
    if (!user.permissions.includes('DELETE')) return false;
    if (user.role === 'Enterprise Admin') return true;
    if (user.role === 'CEO') return true;
    return false;
  }

  /**
   * RBAC Pre-Check: Can this user UPLOAD documents to a department?
   */
  public canUserUpload(user: User, targetDept: Department): boolean {
    if (!user.permissions.includes('UPLOAD')) return false;
    if (user.role === 'CEO' || user.role === 'Enterprise Admin') return true;
    return user.accessibleDepartments.includes(targetDept);
  }

  /**
   * Retrieves only documents the user is authorized to VIEW.
   * Enforced BEFORE UI rendering and RAG retrieval!
   */
  public getAccessibleDocuments(user: User): DocumentItem[] {
    const allDocs = this.getAllDocuments();
    return allDocs.filter((doc) => this.canUserView(user, doc));
  }

  /**
   * Retrieve single document with RBAC verification
   */
  public getDocumentById(user: User, id: string): DocumentItem | null {
    const allDocs = this.getAllDocuments();
    const doc = allDocs.find((d) => d.id === id);
    if (!doc) return null;

    const allowed = this.canUserView(user, doc);
    if (!allowed) {
      auditService.logEvent({
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
        department: user.department,
        action: 'VIEW',
        resource: doc.name,
        targetDepartment: doc.department,
        status: 'Denied',
        reason: `Unauthorized document view attempt: ${user.role} (${user.department}) not cleared for ${doc.name} (${doc.department})`
      });
      return null;
    }

    auditService.logEvent({
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      department: user.department,
      action: 'VIEW',
      resource: doc.name,
      targetDepartment: doc.department,
      status: 'Allowed',
      reason: `Document viewed with ${doc.department} clearance`
    });

    return doc;
  }

  /**
   * Uploads a new document if user has UPLOAD permission for target department
   */
  public async uploadDocument(user: User, input: DocumentUploadInput): Promise<DocumentItem> {
    if (!this.canUserUpload(user, input.department)) {
      auditService.logEvent({
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
        department: user.department,
        action: 'UPLOAD',
        resource: input.name,
        targetDepartment: input.department,
        status: 'Denied',
        reason: `User not authorized to upload to department: ${input.department}`
      });
      throw new Error(`You do not have permission to upload documents to the ${input.department} department.`);
    }

    const now = new Date();
    const formattedDate = now.toISOString().split('T')[0];

    const newDoc: DocumentItem = {
      id: `doc-up-${Date.now().toString(36)}`,
      name: input.name,
      department: input.department,
      uploadedBy: user.name,
      uploadedByEmail: user.email,
      uploadDate: formattedDate,
      documentType: input.documentType,
      visibility: input.visibility,
      category: input.category || 'General',
      size: input.fileSize || '1.5 MB',
      chunksCount: Math.floor(Math.random() * 10) + 8,
      description: input.description,
      content: input.content || `${input.name}\n\nUploaded by ${user.name} (${user.department})\n${input.description}`,
      createdDate: now.toISOString(),
      updatedDate: now.toISOString()
    };

    const allDocs = this.getAllDocuments();
    allDocs.unshift(newDoc);
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(allDocs));

    auditService.logEvent({
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      department: user.department,
      action: 'UPLOAD',
      resource: newDoc.name,
      targetDepartment: newDoc.department,
      status: 'Allowed',
      reason: `Document successfully uploaded and chunked for RAG (${newDoc.category})`
    });

    return newDoc;
  }

  /**
   * Updates an existing document if user has EDIT permission
   */
  public async updateDocument(
    user: User,
    id: string,
    updates: Partial<Pick<DocumentItem, 'name' | 'category' | 'description' | 'visibility' | 'content'>>
  ): Promise<DocumentItem> {
    const allDocs = this.getAllDocuments();
    const index = allDocs.findIndex((d) => d.id === id);
    if (index === -1) {
      throw new Error('Document not found');
    }

    const targetDoc = allDocs[index];
    if (!this.canUserEdit(user, targetDoc)) {
      auditService.logEvent({
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
        department: user.department,
        action: 'EDIT',
        resource: targetDoc.name,
        targetDepartment: targetDoc.department,
        status: 'Denied',
        reason: `User lacks EDIT permission for ${targetDoc.name}`
      });
      throw new Error(`You do not have permission to edit ${targetDoc.name}.`);
    }

    const updatedDoc: DocumentItem = {
      ...targetDoc,
      ...updates,
      updatedDate: new Date().toISOString()
    };

    allDocs[index] = updatedDoc;
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(allDocs));

    auditService.logEvent({
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      department: user.department,
      action: 'EDIT',
      resource: updatedDoc.name,
      targetDepartment: updatedDoc.department,
      status: 'Allowed',
      reason: `Document metadata and content successfully updated by ${user.role}`
    });

    return updatedDoc;
  }

  /**
   * Deletes a document if user has DELETE permission
   */
  public async deleteDocument(user: User, id: string): Promise<boolean> {
    const allDocs = this.getAllDocuments();
    const doc = allDocs.find((d) => d.id === id);
    if (!doc) return false;

    if (!this.canUserDelete(user, doc)) {
      auditService.logEvent({
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
        department: user.department,
        action: 'DELETE',
        resource: doc.name,
        targetDepartment: doc.department,
        status: 'Denied',
        reason: `User lacks DELETE authorization for ${doc.name}`
      });
      throw new Error(`You do not have permission to delete ${doc.name}.`);
    }

    const filtered = allDocs.filter((d) => d.id !== id);
    localStorage.setItem(DOCUMENTS_STORAGE_KEY, JSON.stringify(filtered));

    auditService.logEvent({
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      department: user.department,
      action: 'DELETE',
      resource: doc.name,
      targetDepartment: doc.department,
      status: 'Allowed',
      reason: `Document permanently purged by ${user.role}`
    });

    return true;
  }
}

export const documentService = new DocumentService();
