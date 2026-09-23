# Project Status: Secure Enterprise RAG Platform with RBAC, Guardrails & Monitoring

## 1. Project Objective
Build a realistic, high-reliability enterprise knowledge management system demonstrating:
> **User Identity → Authentication → Authorization (RBAC) → Pre-Retrieval Filter → RAG Retrieval → Answer Generation + Grounded Citations → Audit Ledger**

The core security principle: **RBAC is strictly enforced BEFORE RAG retrieval**. Unauthorized documents are excluded at the retrieval boundary so the LLM never queries or leaks restricted departmental data.

---

## 2. Current Implementation Status Summary

| Attribute | Status Details |
| :--- | :--- |
| **Current Phase** | **PHASE 2 — Initial Working RAG, Document Management & Pre-Retrieval RBAC** |
| **Design Language** | **Nomadgroup.io-inspired system across the entire app** (public + protected + auth): display font **Archivo** (light 300, tight tracking) + body **DM Sans**, electric blue `#3636ff` accent (Tailwind `slate`/`blue` scales remapped in `@theme`), cream `#f4f3ee` / paper `#fafafa` surfaces, ink `#121212` headings and dark bands, highlight yellow `#f0e10d` accents, square inputs (`radius:0`) + pill CTA buttons, plus-sign dot textures, text-only "APEX RAG" wordmarks (no flag/thumbnail artwork), no password strength meter. |
| **Authentication & RBAC** | Pre-seeded organizational accounts with email identity, roles (`Employee`, `Manager`, `CEO`, `Enterprise Admin`), home departments (`Finance`, `Manufacturing`, `HR`, `Executive`, `IT`), and fine-grained action permissions (`VIEW`, `UPLOAD`, `EDIT`, `DELETE`, `RAG_ACCESS`). |
| **RAG Pipeline** | Pre-retrieval boundary filter, intent detection, factual chunk extraction, and grounded citations display. Cross-department queries produce permission denial notices and log audit violations. |
| **Build Status** | Fully compiling with zero errors. All routes active and protected. |

---

## 3. Pre-Seeded Demonstration Accounts

| Role | Name | Department | Email | Password | Permissions & Clearance Scope |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Finance Employee** | Rahul Sharma | Finance | `finance.employee@demo-company.com` | `Finance123!` | VIEW, UPLOAD, RAG_ACCESS • Scope: Finance docs only (Cannot view/retrieve Manufacturing) |
| **Manufacturing Employee** | Amit Verma | Manufacturing | `manufacturing.employee@demo-company.com` | `Mfg123!` | VIEW, UPLOAD, RAG_ACCESS • Scope: Manufacturing docs only (Cannot view/retrieve Finance) |
| **Department Manager** | Priya Patel | Finance | `finance.manager@demo-company.com` | `Manager123!` | VIEW, UPLOAD, EDIT, RAG_ACCESS • Scope: Finance department management & editing |
| **CEO / Executive** | Vikram Malhotra | Executive | `ceo@demo-company.com` | `Ceo123!` | VIEW, UPLOAD, EDIT, DELETE, RAG_ACCESS • Scope: Company-wide cross-departmental clearance |
| **Enterprise Admin** | Sarah Connor | IT | `admin@enterprise.ai` | `Admin123!` | All permissions • Scope: Enterprise-wide system administration |

*Note: The Login screen includes 1-click preset account buttons so mentors and evaluators can instantly test role switching.*

---

## 4. Detailed Feature Breakdown

### IMPLEMENTED & FULLY FUNCTIONAL

1. **Role-Based Dynamic Dashboards (`/dashboard`)**:
   - **Finance Employee**: Displays Finance document counts, user uploads, monthly queries, accessible reports, and Finance-specific quick query actions.
   - **Manufacturing Employee**: Displays Manufacturing document counts, SOPs, plant safety manuals, and production metrics.
   - **Department Manager**: Displays department documents, team size (18 members), monthly volume, and document edit controls.
   - **CEO / Executive**: Displays organization-wide document archive (286 docs), 6 active departments, cross-department query volume, and active user counts.

2. **Pre-Retrieval RBAC & Working RAG Assistant (`/chat`)**:
   - User context banner displaying User Name, Role, Home Department, and Authorized Knowledge Clearance.
   - Pre-retrieval filtering: Knowledge base is pruned to authorized departments **before** similarity search.
   - Authorized queries retrieve exact factual text chunks and render sources with Document Name, Department, Section, and Snippet.
   - Unauthorized cross-department queries (e.g. Finance employee asking for Manufacturing production reports) trigger immediate pre-retrieval blocking, returning an explicit RBAC denial notice without exposing data.
   - 1-Click preset queries allow immediate verification of authorized vs. blocked scenarios.

3. **Enterprise Document Management (`/documents`)**:
   - Table displaying Document Name, Department, Uploaded By, Date, Type, Access Scope, and Permission-Aware Actions.
   - **View Action**: Opens full document viewer modal displaying metadata, text segments, and chunking details.
   - **Edit Action**: Only accessible to users with `EDIT` permission (e.g., Department Manager, CEO); allows updating metadata and content.
   - **Delete Action**: Only accessible to users with `DELETE` permission (CEO, Admin).
   - Search by title/category and filter by Department.

4. **Document Ingestion Pipeline (`/upload`)**:
   - Accessible only to roles with `UPLOAD` permission.
   - Drag & drop or file selection, Document Title, Department selector, Category, Description, and Access Scope (Department Only, Company-Wide, Executive Only).
   - Multi-stage upload simulation: Uploading (100%) → Parsing text & vector chunking → Binding RBAC tags → Document Ready for RAG.
   - Ingested documents appear immediately in the document archive and can be queried in RAG.

5. **Security Audit Trail Ledger (`/audit-logs`)**:
   - Live reactive log recording all authentication events, document views, edits, uploads, and RAG queries.
   - Explicit `Allowed` vs `Denied` statuses with timestamp, user email, role, target department, and security reasons.
   - Filtering by status and search queries, plus CSV export capability.

6. **Access Control Panel (`/access-control`)**:
   - Corporate identities and role assignments table.
   - Visual Role Permissions Matrix displaying VIEW, UPLOAD, EDIT, DELETE, and RAG_ACCESS permissions.

7. **Authentication & Session Management (`/login`, `/register`, `/settings`)**:
   - Validation, show/hide password, session persistence (`localStorage` / `sessionStorage`), route protection, and logout.
   - User profile and cryptographic session inspection.

---

### SIMULATED / ROADMAP PLACEHOLDERS (Clearly demarcated with `MOCK`)

- **AI Guardrails Engine (`/guardrails`)**:
  - UI control toggles for Prompt Injection Protection, Sensitive Data (PII/SSN/API Keys) Masking, Output Validation, and Unauthorized Request Frequency Detection (`[MOCK / UI BLUEPRINT - Phase 4 Pending]`).
- **Monitoring & Telemetry (`/monitoring`)**:
  - Practical system metrics (Total Queries, Average Latency 1.8s, Access Violations, Failed Requests, Documents Retrieved) and recent events table (`[MOCK / UI PREVIEW - Phase 5 Pending]`).

---

## 5. Technology Stack & Architecture

- **Frontend**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 with global `@theme` palette remap (Nomad-style tokens: ink `#121212` / cream `#f4f3ee` / paper `#fafafa` / electric blue `#3636ff` / highlight `#f0e10d`) + marketing design system (`src/components/marketing/`: `Graphics.tsx`, `TopSections.tsx`, `MidSections.tsx`, `BottomSections.tsx`); fonts Archivo (display) + DM Sans (body)
- **Typography**: `Inter` (body) + `Plus Jakarta Sans` (headings/display) via Google Fonts
- **Icons**: Lucide React (brand/social glyphs are inline SVG)
- **Routing**: React Router DOM v7
- **Services Architecture**:
  - `authService.ts`: Authentication, user repository, session management
  - `documentService.ts`: Document archive, RBAC permission verification (`canUserView`, `canUserEdit`, `canUserDelete`, `canUserUpload`)
  - `ragService.ts`: Pre-retrieval RBAC filter, intent analysis, chunk retrieval, citation extraction
  - `auditService.ts`: Real-time reactive security audit trail with export
