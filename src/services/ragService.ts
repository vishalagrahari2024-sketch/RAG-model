import type { User, Department } from '../types/auth';
import type { RagMessage, RagCitation } from '../types/rag';
import { documentService } from './documentService';
import { auditService } from './auditService';

interface QueryIntent {
  targetDepartment: Department | 'General';
  keywords: string[];
}

class RagService {
  /**
   * Detects which departmental knowledge the user is asking about
   */
  private detectIntent(query: string): QueryIntent {
    const q = query.toLowerCase();

    // Manufacturing intent check
    if (
      q.includes('manufactur') ||
      q.includes('production') ||
      q.includes('plant') ||
      q.includes('pass rate') ||
      q.includes('quality control') ||
      q.includes('units') ||
      q.includes('defect') ||
      q.includes('sop') ||
      q.includes('facility') ||
      q.includes('safety manual') ||
      q.includes('line 2')
    ) {
      return { targetDepartment: 'Manufacturing', keywords: ['production', 'units', 'pass rate', 'quality', 'plant'] };
    }

    // Finance intent check
    if (
      q.includes('revenue') ||
      q.includes('finance') ||
      q.includes('financial') ||
      q.includes('profit') ||
      q.includes('expense') ||
      q.includes('budget') ||
      q.includes('crore') ||
      q.includes('ebitda') ||
      q.includes('cogs') ||
      q.includes('margin') ||
      q.includes('q4 financial')
    ) {
      return { targetDepartment: 'Finance', keywords: ['revenue', 'profit', 'expenses', 'budget', 'crore'] };
    }

    // Executive intent check
    if (
      q.includes('strategy') ||
      q.includes('m&a') ||
      q.includes('acquisition') ||
      q.includes('executive') ||
      q.includes('board') ||
      q.includes('ceo') ||
      q.includes('vision') ||
      q.includes('valuation')
    ) {
      return { targetDepartment: 'Executive', keywords: ['strategy', 'acquisition', 'expansion', 'vision', 'board'] };
    }

    // HR intent check
    if (
      q.includes('leave') ||
      q.includes('holiday') ||
      q.includes('handbook') ||
      q.includes('vacation') ||
      q.includes('parental') ||
      q.includes('recruitment') ||
      q.includes('referral') ||
      q.includes('ethics') ||
      q.includes('conduct')
    ) {
      return { targetDepartment: 'HR', keywords: ['leave', 'policy', 'handbook', 'working hours', 'recruitment'] };
    }

    return { targetDepartment: 'General', keywords: [] };
  }

  /**
   * Primary RAG Query Engine
   * Implements strict Pre-Retrieval RBAC:
   * 1. Check user RAG permission
   * 2. Filter knowledge base to user's authorized departments only
   * 3. If query targets an unauthorized department -> block retrieval immediately & audit
   * 4. Retrieve matching chunks only from authorized documents
   * 5. Generate grounded response with citations
   */
  public async query(user: User, userQuery: string): Promise<RagMessage> {
    // Artificial small delay to simulate neural embedding & retrieval
    await new Promise((resolve) => setTimeout(resolve, 500));

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Step 1: Permission check
    if (!user.permissions.includes('RAG_ACCESS')) {
      auditService.logEvent({
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
        department: user.department,
        action: 'RAG_QUERY',
        resource: 'Enterprise Knowledge Store',
        status: 'Denied',
        reason: 'User lacks RAG_ACCESS permission'
      });

      return {
        id: `msg-${Date.now()}`,
        sender: 'assistant',
        text: 'Access Denied: Your user account does not have permission to execute RAG knowledge retrieval queries. Please contact your system administrator.',
        isRestricted: true,
        deniedReason: 'Missing RAG_ACCESS permission',
        timestamp
      };
    }

    // Step 2: Determine intent & pre-retrieval boundary
    const intent = this.detectIntent(userQuery);
    const accessibleDocs = documentService.getAccessibleDocuments(user);

    // Step 3: Enforce pre-retrieval RBAC boundary
    // If user is targeting a specific department that they do NOT have clearance for
    if (intent.targetDepartment !== 'General' && intent.targetDepartment !== 'HR') {
      const isClearedForDept =
        user.role === 'CEO' ||
        user.role === 'Enterprise Admin' ||
        user.accessibleDepartments.includes(intent.targetDepartment);

      if (!isClearedForDept) {
        // Record denied security audit event
        auditService.logEvent({
          userEmail: user.email,
          userName: user.name,
          userRole: user.role,
          department: user.department,
          action: 'RAG_QUERY',
          resource: `${intent.targetDepartment} Knowledge Base`,
          targetDepartment: intent.targetDepartment,
          status: 'Denied',
          reason: `Pre-Retrieval RBAC Block: ${user.role} in ${user.department} attempted retrieval on restricted ${intent.targetDepartment} documents`
        });

        return {
          id: `msg-${Date.now()}`,
          sender: 'assistant',
          text: `**Access Denied by Pre-Retrieval RBAC Policy**\n\nThe requested information belongs to the **${intent.targetDepartment}** department.\n\nYour current account is authenticated as **${user.name}** (Role: **${user.role}**, Department: **${user.department}**). Under organization policy, your knowledge retrieval scope is restricted to: **${user.accessibleDepartments.join(', ')}**.\n\n*Security Protocol: The system enforced RBAC before retrieval. No documents from ${intent.targetDepartment} were searched, retrieved, or exposed to the model.*`,
          isRestricted: true,
          deniedReason: `Unauthorized Department Access (${intent.targetDepartment})`,
          targetDepartment: intent.targetDepartment,
          timestamp
        };
      }
    }

    // Step 4: Search authorized documents only
    const citations: RagCitation[] = [];
    let answerText = '';

    const queryLower = userQuery.toLowerCase();

    // Check Finance specific questions
    if (queryLower.includes('revenue') || queryLower.includes('q4') || queryLower.includes('profit')) {
      const q4Doc = accessibleDocs.find((d) => d.name.includes('Q4 Financial Report'));
      const revDoc = accessibleDocs.find((d) => d.name.includes('Revenue Analysis'));

      if (q4Doc) {
        answerText = `According to the **Q4 Financial Report 2026**:\n\n• **Revenue**: ₹48.5 Crore (14.2% YoY increase)\n• **Operating Expenses**: ₹31.2 Crore\n• **Net Profit**: ₹9.8 Crore (Net Margin: 20.2%)\n• **EBITDA**: ₹13.4 Crore\n\nFinancial performance for fourth quarter of FY 2025-26 remained strong with steady growth across recurring enterprise accounts.`;

        citations.push({
          docId: q4Doc.id,
          docName: q4Doc.name,
          department: q4Doc.department,
          section: 'Key Financial Figures & Highlights',
          page: 1,
          snippet: 'Total Revenue: ₹48.5 Crore (an increase of 14.2% YoY). Operating Expenses: ₹31.2 Crore. Net Profit: ₹9.8 Crore.'
        });

        if (revDoc) {
          citations.push({
            docId: revDoc.id,
            docName: revDoc.name,
            department: revDoc.department,
            section: 'Revenue Streams Breakdown',
            page: 2,
            snippet: 'Enterprise Software Licenses: 52% (₹25.2 Crore), Maintenance & Support: 28% (₹13.6 Crore).'
          });
        }
      }
    } else if (queryLower.includes('budget') || queryLower.includes('allocation')) {
      const budgetDoc = accessibleDocs.find((d) => d.name.includes('Annual Budget'));
      if (budgetDoc) {
        answerText = `Based on the **Annual Budget 2026** document, the corporate capital allocations are:\n\n• **Manufacturing & Operations**: ₹45.0 Crore\n• **Research & Engineering**: ₹32.0 Crore\n• **Sales & Business Development**: ₹24.0 Crore\n• **Human Resources**: ₹8.5 Crore\n• **Contingency Reserves**: ₹12.0 Crore`;

        citations.push({
          docId: budgetDoc.id,
          docName: budgetDoc.name,
          department: budgetDoc.department,
          section: 'Departmental Capital Allocations',
          page: 1,
          snippet: 'Manufacturing & Plant Ops: ₹45.0 Crore. Research & Engineering: ₹32.0 Crore. Sales: ₹24.0 Crore.'
        });
      }
    } else if (queryLower.includes('production') || queryLower.includes('units') || queryLower.includes('pass rate')) {
      const prodDoc = accessibleDocs.find((d) => d.name.includes('Production Report Q4'));
      if (prodDoc) {
        answerText = `According to the **Production Report Q4**:\n\n• **Total Production**: 125,000 units\n• **Quality Pass Rate**: 96.8% (Exceeding the >= 95% baseline)\n• **Defect Rate**: 3.2%\n• **Operating Facilities**: 3 active plants (Pune, Chennai, Gurgaon)\n\nPlant A achieved record throughput of 52,000 finished assemblies with zero unplanned downtime.`;

        citations.push({
          docId: prodDoc.id,
          docName: prodDoc.name,
          department: prodDoc.department,
          section: 'Executive Production Summary',
          page: 1,
          snippet: 'Total Production Output: 125,000 units. Quality Pass Rate: 96.8%. Active Production Facilities: 3 plants.'
        });
      }
    } else if (queryLower.includes('safety') || queryLower.includes('ppe') || queryLower.includes('hazard')) {
      const safetyDoc = accessibleDocs.find((d) => d.name.includes('Plant Safety Manual'));
      if (safetyDoc) {
        answerText = `According to the **Plant Safety Manual**, mandatory Personal Protective Equipment (PPE) includes:\n\n• High-visibility reflective vest\n• Steel-toe composite footwear\n• ANSI Z87 approved protective eye gear\n• Cut-resistant Kevlar gloves when handling stamped sheet metal.`;

        citations.push({
          docId: safetyDoc.id,
          docName: safetyDoc.name,
          department: safetyDoc.department,
          section: 'Mandatory PPE Protocols',
          page: 2,
          snippet: 'Mandatory PPE: High-visibility reflective vest, Steel-toe composite footwear, ANSI Z87 eye gear.'
        });
      }
    } else if (queryLower.includes('leave') || queryLower.includes('vacation') || queryLower.includes('holiday')) {
      const leaveDoc = accessibleDocs.find((d) => d.name.includes('Leave Policy'));
      if (leaveDoc) {
        answerText = `Based on the **Employee Leave Policy**:\n\n• **Annual Paid Leave**: 24 working days per calendar year\n• **Sick / Medical Leave**: 12 days per year\n• **Casual Leave**: 8 days per year\n• **Parental Leave**: 16 weeks fully paid primary caregiver leave\n\nLeave requests must be submitted at least 5 business days in advance via the internal portal.`;

        citations.push({
          docId: leaveDoc.id,
          docName: leaveDoc.name,
          department: leaveDoc.department,
          section: 'Leave Entitlements',
          page: 1,
          snippet: 'Annual Paid Leave: 24 working days. Sick Leave: 12 days. Parental Leave: 16 weeks fully paid.'
        });
      }
    } else if (queryLower.includes('strategy') || queryLower.includes('acquisition') || queryLower.includes('m&a')) {
      const stratDoc = accessibleDocs.find((d) => d.name.includes('Company Strategy'));
      if (stratDoc) {
        answerText = `According to the confidential **Company Strategy 2026**:\n\n• **Three-Year Vision**: Scale European manufacturing via precision fabrication acquisition in Germany.\n• **AI Platform Integration**: Deploy proprietary secured RAG and RBAC systems across all client touchpoints.\n• **Revenue Target**: Reach ₹500 Crore consolidated revenue by FY 2028-29.\n• **M&A Pipeline**: Target A valuation review scheduled for Q1 board meeting.`;

        citations.push({
          docId: stratDoc.id,
          docName: stratDoc.name,
          department: stratDoc.department,
          section: 'Three-Year Vision & M&A Pipeline',
          page: 1,
          snippet: 'Scale European manufacturing operations. Target ₹500 Crore consolidated top-line revenue by FY 2028-29.'
        });
      }
    }

    // Default fallback if no specific rule matched but user is authorized
    if (!answerText) {
      if (accessibleDocs.length > 0) {
        const topDoc = accessibleDocs[0];
        answerText = `Based on your authorized documents in **${user.accessibleDepartments.join(', ')}** (specifically ${topDoc.name}):\n\n${topDoc.description}\n\nYou can ask specific questions about revenue, quarterly reports, budget allocations, or policies available in your department.`;

        citations.push({
          docId: topDoc.id,
          docName: topDoc.name,
          department: topDoc.department,
          section: 'Document Summary',
          page: 1,
          snippet: topDoc.content.substring(0, 140) + '...'
        });
      } else {
        answerText = `No authorized documents matched your query in your clearance domain (${user.accessibleDepartments.join(', ')}).`;
      }
    }

    // Log authorized RAG query
    auditService.logEvent({
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      department: user.department,
      action: 'RAG_QUERY',
      resource: citations.map((c) => c.docName).join(', ') || 'Authorized Knowledge Base',
      targetDepartment: citations[0]?.department || user.department,
      status: 'Allowed',
      reason: `Retrieved ${citations.length} authorized document chunk(s) for query: "${userQuery.substring(0, 45)}..."`
    });

    return {
      id: `msg-${Date.now()}`,
      sender: 'assistant',
      text: answerText,
      citations,
      timestamp
    };
  }
}

export const ragService = new RagService();
