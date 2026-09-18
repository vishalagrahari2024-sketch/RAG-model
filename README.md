# Secure Enterprise RAG Platform with RBAC, Guardrails & Monitoring

An enterprise-grade **AI Security & Knowledge Management Platform** built with React 19, TypeScript, Vite, and Tailwind CSS in a **classic, realistic, student-developed enterprise software design**.

The platform demonstrates how employees from different departments (Finance, Manufacturing, HR, Executive) can query an enterprise knowledge assistant while **Role-Based Access Control (RBAC) is strictly enforced BEFORE retrieval**, preventing cross-departmental data leaks.

---

## 🚀 Core Architectural Concept

```text
User
  ↓
Authentication
  ↓
User Identity (Role + Department + Individual Permissions)
  ↓
Role-Based Dashboard (Finance, Manufacturing, Manager, CEO)
  ↓
Authorized Document Access (VIEW, UPLOAD, EDIT, DELETE)
  ↓
Pre-Retrieval RBAC Filter (Department & Document Clearance Boundary)
  ↓
RAG Retrieval (Authorized Chunks Only)
  ↓
LLM / Synthesis Engine
  ↓
Permission-Aware Answer + Grounded Citations
  ↓
Security Audit Log Trail (Allowed / Denied)
```

> **Security Rule**: RBAC is applied **BEFORE** RAG retrieval. Unauthorized documents are never retrieved or provided to the model.

---

## 🔐 Demonstration Accounts (1-Click Switcher on Login)

| Role | Department | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| **Finance Employee** | Finance | `finance.employee@demo-company.com` | `Finance123!` | View Finance docs, Ask Finance RAG. **Blocked from Manufacturing docs.** |
| **Manufacturing Employee** | Manufacturing | `manufacturing.employee@demo-company.com` | `Mfg123!` | View Mfg reports & SOPs, Ask Production RAG. **Blocked from Finance docs.** |
| **Department Manager** | Finance | `finance.manager@demo-company.com` | `Manager123!` | View, Upload, and **Edit** Finance department documents. |
| **CEO / Executive** | Executive | `ceo@demo-company.com` | `Ceo123!` | Authorized company-wide cross-departmental clearance and executive metrics. |
| **Enterprise Admin** | IT | `admin@enterprise.ai` | `Admin123!` | Complete administrative access. |

---

## 💻 How to Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/vishalagrahari2024-sketch/RAG-model.git
cd RAG-model

# 2. Install all requirements and dependencies
npm install

# 3. Start the development server
npm run dev
```

Open your browser at: `http://localhost:5173`

---

## 🛠️ Key Implemented Features

1. **Role-Based Dynamic Dashboards**:
   - Distinct tailored statistics, document feeds, and quick actions for Finance Employee, Manufacturing Employee, Finance Manager, and CEO.
2. **Pre-Retrieval Guarded RAG (`/chat`)**:
   - User clearance strip: Name, Role, Department, and Knowledge Clearance.
   - Authorized questions retrieve exact chunks with detailed source citations (Doc Name, Department, Section, Page).
   - Restricted questions trigger an immediate pre-retrieval block and return a permission violation notice.
   - 1-Click preset prompt testing buttons for rapid demonstration.
3. **Document Management (`/documents`)**:
   - Table of documents with Department and Access Scope badges.
   - Permission-aware actions: **View** modal (with text chunks), **Edit** modal (for users with EDIT permission), and **Delete** (for users with DELETE permission).
4. **Document Upload Pipeline (`/upload`)**:
   - Drag & drop / file chooser with metadata inputs.
   - Interactive pipeline: Uploading → Parsing & Chunking → RBAC Tagging → Ready for RAG.
5. **Security Audit Log Ledger (`/audit-logs`)**:
   - Real-time reactive ledger of all views, queries, denied attempts, and uploads with CSV export.
6. **Access Control Matrix (`/access-control`)**:
   - User identities and full role permissions matrix (VIEW, UPLOAD, EDIT, DELETE, RAG_ACCESS).
7. **Clean Enterprise UI/UX**:
   - Light gray application background (`#f8fafc`), dark readable text, subtle crisp borders, corporate tables, and zero neon/glassmorphism clutter.

---

## 🗺️ Roadmap & Phase Demarcation

- **Phase 1**: Authentication, Session Management & Enterprise Design System `[IMPLEMENTED]`
- **Phase 2**: Document Management, RBAC Pre-Retrieval Filtering & Working RAG `[IMPLEMENTED]`
- **Phase 3**: Dynamic Policy Engine & Custom Role Builder `[IMPLEMENTED MATRIX / EXTENSIBLE]`
- **Phase 4**: Prompt Injection & PII Regex Guardrails `[UI BLUEPRINT]`
- **Phase 5**: OpenTelemetry Real-Time Telemetry & Token Cost Tracking `[UI PREVIEW]`
- **Phase 6**: Immutable Cryptographic Audit Ledger `[PHASE 6 ROADMAP]`
