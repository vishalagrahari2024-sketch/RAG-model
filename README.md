# RAG Platform with RBAC, Guardrails & Monitoring

An enterprise-grade **AI Security & RAG Governance Platform** built with React 19, TypeScript, Vite, and Tailwind CSS.

## 🚀 Overview & Current Phase

- **Current Phase**: **PHASE 1 — Foundation, Authentication & UI Shell**
- **Architecture**: Modular enterprise architecture separating Authentication, Design System, Application Shell, and UI placeholders for future RAG, RBAC, Guardrails, and Observability engines.

## 🔐 Phase 1 Features Implemented

- **Authentication System**:
  - Registration with real-time password strength meter and criteria checklist.
  - Login with password visibility toggle, remember-me session persistence, and error handling.
  - Forgot/Reset Password flow token simulation.
  - Persistent `AuthService` abstraction (`localStorage` & `sessionStorage`).
  - Protected route security guards (`ProtectedRoute`).
- **Enterprise Design System**:
  - Dark-themed UI (`#090D16` palette) with reusable components (`Button`, `Input`, `Card`, `Badge`, `Alert`, `Modal`, `Table`, `StatusBanner`).
  - Explicit status demarcation badges (`[IMPLEMENTED]`, `[MOCK / UI ONLY]`, `[FUTURE PHASE PENDING]`).
- **Application Navigation & Shell**:
  - Collapsible sidebar navigation, header with user profile menu, active tenant indicator, and notification drawer.
- **Public & Protected Workspaces**:
  - Public Landing page showcasing platform value proposition and SOC 2 / ISO 27001 compliance standards.
  - Executive Dashboard with metrics preview cards, recent query activity table, and security timeline.
  - Settings page with live user profile, tenant details, and session token inspection.

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + Glassmorphism accents
- **Icons**: Lucide React
- **Router**: React Router DOM v7

## 💻 How to Run Locally

```bash
# Clone the repository
git clone https://github.com/vishalagrahari2024-sketch/RAG-model.git
cd RAG-model

# Install dependencies
npm install

# Start development server
npm run dev
```

### Pre-seeded Demo Credentials
- **Email**: `admin@enterprise.ai`
- **Password**: `Admin123!`

## 🗺️ Future Roadmap

- **Phase 2**: RAG Ingestion Pipeline, Chunking, Vector DB, and Retrieval Synthesis
- **Phase 3**: Role-Based Access Control (RBAC) & Secured Vector Metadata Filtering
- **Phase 4**: Real-time AI Guardrails, Prompt Injection Scanners, PII Redaction
- **Phase 5**: Telemetry Observability, Latency Tracing, Token Cost Metrics
- **Phase 6**: Audit Logs Ledger & Production Hardening
