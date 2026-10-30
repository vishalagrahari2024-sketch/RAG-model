import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/rag_rbac_db';

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json({ limit: '15mb' }));

// --- MONGOOSE SCHEMAS & MODELS ---

// 1. User Schema
const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  role: { type: String, required: true },
  department: { type: String, required: true },
  tenant: { type: String, default: 'Apex Global Industries' },
  permissions: { type: [String], default: [] },
  accessibleDepartments: { type: [String], default: [] },
  createdAt: { type: String, default: () => new Date().toISOString() },
  passwordHash: { type: String, required: true }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);

// 2. Document Schema
const documentSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  uploadedBy: { type: String, required: true },
  uploadedByEmail: { type: String, required: true },
  uploadDate: { type: String, required: true },
  documentType: { type: String, default: 'PDF' },
  visibility: { type: String, default: 'Department Only' },
  category: { type: String, default: 'General' },
  size: { type: String, default: '1.0 MB' },
  chunksCount: { type: Number, default: 1 },
  description: { type: String, default: '' },
  content: { type: String, required: true },
  createdDate: { type: String, default: () => new Date().toISOString() },
  updatedDate: { type: String, default: () => new Date().toISOString() }
}, { timestamps: true });

export const Document = mongoose.model('Document', documentSchema);

// 3. Audit Log Schema
const auditLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  timestamp: { type: String, required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, default: 'Anonymous' },
  userRole: { type: String, default: 'Employee' },
  department: { type: String, default: 'General' },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  targetDepartment: { type: String, default: 'General' },
  status: { type: String, enum: ['Allowed', 'Denied'], required: true },
  reason: { type: String, required: true },
  ipAddress: { type: String, default: '127.0.0.1' },
  details: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

export const AuditLog = mongoose.model('AuditLog', auditLogSchema);

// --- INITIAL SEED DATA ---

const DEFAULT_USERS = [
  {
    id: 'usr-fin-01',
    name: 'Rahul Sharma',
    email: 'finance.employee@demo-company.com',
    role: 'Employee',
    department: 'Finance',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'RAG_ACCESS'],
    accessibleDepartments: ['Finance'],
    createdAt: '2026-01-15T09:00:00.000Z',
    passwordHash: 'Finance123!'
  },
  {
    id: 'usr-mfg-01',
    name: 'Amit Verma',
    email: 'manufacturing.employee@demo-company.com',
    role: 'Employee',
    department: 'Manufacturing',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'RAG_ACCESS'],
    accessibleDepartments: ['Manufacturing'],
    createdAt: '2026-02-10T10:30:00.000Z',
    passwordHash: 'Mfg123!'
  },
  {
    id: 'usr-mgr-01',
    name: 'Priya Patel',
    email: 'finance.manager@demo-company.com',
    role: 'Manager',
    department: 'Finance',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'EDIT', 'RAG_ACCESS'],
    accessibleDepartments: ['Finance'],
    createdAt: '2025-11-01T08:15:00.000Z',
    passwordHash: 'Manager123!'
  },
  {
    id: 'usr-ceo-01',
    name: 'Vikram Malhotra',
    email: 'ceo@demo-company.com',
    role: 'CEO',
    department: 'Executive',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'EDIT', 'DELETE', 'RAG_ACCESS'],
    accessibleDepartments: ['Finance', 'Manufacturing', 'HR', 'Executive'],
    createdAt: '2025-06-01T07:00:00.000Z',
    passwordHash: 'Ceo123!'
  },
  {
    id: 'usr-admin-01',
    name: 'Sarah Connor',
    email: 'admin@enterprise.ai',
    role: 'Enterprise Admin',
    department: 'IT',
    tenant: 'Apex Global Industries',
    permissions: ['VIEW', 'UPLOAD', 'EDIT', 'DELETE', 'RAG_ACCESS'],
    accessibleDepartments: ['Finance', 'Manufacturing', 'HR', 'Executive', 'IT'],
    createdAt: '2025-01-01T00:00:00.000Z',
    passwordHash: 'Admin123!'
  }
];

const DEFAULT_DOCUMENTS = [
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
    content: `Q4 Financial Report 2026\n\nExecutive Summary:\nThe report covers the financial performance of the organization during the fourth quarter of FY 2025-26.\n\nKey Financial Figures:\n- Total Revenue: ₹48.5 Crore (an increase of 14.2% YoY)\n- Operating Expenses: ₹31.2 Crore\n- Cost of Goods Sold (COGS): ₹7.5 Crore\n- Net Profit: ₹9.8 Crore (Net Margin: 20.2%)\n- EBITDA: ₹13.4 Crore\n\nQuarterly Highlights:\nStrong growth was recorded in enterprise recurring subscriptions and strategic client retention. Operating expenses remained well within budgeted allocations.`,
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
    content: `Annual Budget 2026\n\nDepartmental Capital Allocations:\n- Manufacturing & Plant Ops: ₹45.0 Crore\n- Research & Engineering: ₹32.0 Crore\n- Sales & Business Development: ₹24.0 Crore\n- Human Resources & Talent: ₹8.5 Crore\n- General & Administrative: ₹6.5 Crore\n\nContingency Reserves:\nA total reserve of ₹12.0 Crore is set aside for supply chain volatility and unexpected compliance updates.`,
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
    content: `Revenue Analysis Q3-Q4 2026\n\nRevenue Streams Breakdown:\n- Enterprise Software Licenses: 52% (₹25.2 Crore)\n- Maintenance & Support Contracts: 28% (₹13.6 Crore)\n- Professional Implementation Services: 20% (₹9.7 Crore)\n\nKey Insights:\nCustomer lifetime value increased by 18%, while gross revenue churn decreased to an all-time low of 1.2%.`,
    createdDate: '2026-08-28T14:15:00.000Z',
    updatedDate: '2026-08-28T14:15:00.000Z'
  },
  {
    id: 'doc-mfg-01',
    name: 'Production SOP 2026.pdf',
    department: 'Manufacturing',
    uploadedBy: 'Amit Verma',
    uploadedByEmail: 'manufacturing.employee@demo-company.com',
    uploadDate: '2026-09-01',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Standard Operating Procedures',
    size: '4.2 MB',
    chunksCount: 30,
    description: 'Standard operating procedure for automated assembly lines, robotic calibration, and safety emergency shutoffs.',
    content: `Production Standard Operating Procedures 2026\n\nSection 1: Automated Assembly Line Setup\n1. Ensure hydraulic pressure stabilizes between 45-50 PSI before engaging secondary conveyor systems.\n2. Execute pre-run robotic calibration cycle 04-B.\n3. Safety inspection must be signed off by Shift Supervisor prior to high-voltage initialization.\n\nSection 2: Emergency Response Protocol\nIn the event of thermal overload or emergency sensor trigger, depress red E-Stop button at Station 3 immediately. Clear the assembly bay within 90 seconds.`,
    createdDate: '2026-09-01T08:00:00.000Z',
    updatedDate: '2026-09-01T08:00:00.000Z'
  },
  {
    id: 'doc-mfg-02',
    name: 'Plant Safety Guidelines.pdf',
    department: 'Manufacturing',
    uploadedBy: 'Amit Verma',
    uploadedByEmail: 'manufacturing.employee@demo-company.com',
    uploadDate: '2026-08-10',
    documentType: 'PDF',
    visibility: 'Department Only',
    category: 'Safety & Compliance',
    size: '2.1 MB',
    chunksCount: 16,
    description: 'OSHA compliance requirements, personal protective equipment (PPE) mandates, and hazard reporting workflows.',
    content: `Plant Safety Guidelines & Hazard Prevention\n\nMandatory Safety Gear:\n- Class II Hard Hat with chinstrap\n- Steel-toed safety boots (ANSI Z41 compliant)\n- High-visibility reflective vest\n- Anti-scratch eye protection and ear defenders in noise zones exceeding 85dB.\n\nHazard Reporting:\nAll mechanical anomalies and near-miss occurrences must be logged within 2 hours of occurrence using incident portal terminal 4.`,
    createdDate: '2026-08-10T11:20:00.000Z',
    updatedDate: '2026-08-10T11:20:00.000Z'
  },
  {
    id: 'doc-hr-01',
    name: 'Employee Handbook 2026.pdf',
    department: 'HR',
    uploadedBy: 'Sarah Connor',
    uploadedByEmail: 'admin@enterprise.ai',
    uploadDate: '2026-01-10',
    documentType: 'PDF',
    visibility: 'Company-Wide',
    category: 'Company Policies',
    size: '1.5 MB',
    chunksCount: 18,
    description: 'General organizational code of conduct, leave policies, health benefits, and remote work regulations.',
    content: `Employee Handbook & Code of Conduct 2026\n\nLeave Policy:\n- Annual Paid Time Off: 24 Days\n- Sick Leave: 12 Days\n- Parental Leave: 26 Weeks for primary caregivers\n\nCode of Conduct:\nIntegrity, mutual respect, and strict compliance with intellectual property guidelines are core tenets of our enterprise. Harassment of any nature results in zero-tolerance disciplinary action.`,
    createdDate: '2026-01-10T09:00:00.000Z',
    updatedDate: '2026-01-10T09:00:00.000Z'
  },
  {
    id: 'doc-exec-01',
    name: 'Strategic Expansion Plan 2027.pdf',
    department: 'Executive',
    uploadedBy: 'Vikram Malhotra',
    uploadedByEmail: 'ceo@demo-company.com',
    uploadDate: '2026-08-30',
    documentType: 'PDF',
    visibility: 'Executive Only',
    category: 'Strategic Planning',
    size: '5.6 MB',
    chunksCount: 28,
    description: 'CONFIDENTIAL: Global market expansion, merger targets, and 5-year enterprise valuation roadmap.',
    content: `CONFIDENTIAL: Strategic Enterprise Expansion Roadmap 2027-2030\n\nTarget Acquisitions:\n- Tier-1 Industrial Automation Provider in Southeast Asia (Valuation: ₹120 Crore)\n- AI-driven Logistics Platform (Series B target)\n\nGeographic Rollout:\nPhase 1: Singapore and Tokyo regional hubs (Q1 2027)\nPhase 2: European distribution networks (Frankfurt and Amsterdam, Q3 2027).`,
    createdDate: '2026-08-30T16:00:00.000Z',
    updatedDate: '2026-08-30T16:00:00.000Z'
  }
];

const DEFAULT_AUDIT_LOGS = [
  {
    id: 'log-101',
    timestamp: '2026-09-18 10:14:02',
    userEmail: 'finance.employee@demo-company.com',
    userName: 'Rahul Sharma',
    userRole: 'Employee',
    department: 'Finance',
    action: 'VIEW',
    resource: 'Q4 Financial Report 2026.pdf',
    targetDepartment: 'Finance',
    status: 'Allowed',
    reason: 'Department clearance verified (Finance)',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-102',
    timestamp: '2026-09-18 10:22:15',
    userEmail: 'finance.employee@demo-company.com',
    userName: 'Rahul Sharma',
    userRole: 'Employee',
    department: 'Finance',
    action: 'RAG_QUERY',
    resource: 'Finance Knowledge Base',
    targetDepartment: 'Finance',
    status: 'Allowed',
    reason: 'Query: Q4 Revenue analysis - Authorized retrieval',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-103',
    timestamp: '2026-09-18 10:45:30',
    userEmail: 'finance.employee@demo-company.com',
    userName: 'Rahul Sharma',
    userRole: 'Employee',
    department: 'Finance',
    action: 'RAG_QUERY',
    resource: 'Manufacturing Production SOP',
    targetDepartment: 'Manufacturing',
    status: 'Denied',
    reason: 'Pre-Retrieval RBAC Violation: Employee not cleared for Manufacturing documents',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-104',
    timestamp: '2026-09-18 11:05:18',
    userEmail: 'finance.manager@demo-company.com',
    userName: 'Priya Patel',
    userRole: 'Manager',
    department: 'Finance',
    action: 'EDIT',
    resource: 'Annual Budget 2026.pdf',
    targetDepartment: 'Finance',
    status: 'Allowed',
    reason: 'Department Manager granted EDIT authorization',
    ipAddress: '192.168.1.88'
  },
  {
    id: 'log-105',
    timestamp: '2026-09-18 11:30:44',
    userEmail: 'manufacturing.employee@demo-company.com',
    userName: 'Amit Verma',
    userRole: 'Employee',
    department: 'Manufacturing',
    action: 'VIEW',
    resource: 'Production Report Q4.pdf',
    targetDepartment: 'Manufacturing',
    status: 'Allowed',
    reason: 'Department clearance verified (Manufacturing)',
    ipAddress: '192.168.2.45'
  }
];

// --- SEED DATABASE FUNCTION ---
async function seedDatabase() {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding default demo accounts into MongoDB...');
      await User.insertMany(DEFAULT_USERS);
      console.log('✅ Default users seeded successfully.');
    }

    const docCount = await Document.countDocuments();
    if (docCount === 0) {
      console.log('🌱 Seeding initial enterprise documents into MongoDB...');
      await Document.insertMany(DEFAULT_DOCUMENTS);
      console.log('✅ Default documents seeded successfully.');
    }

    const auditCount = await AuditLog.countDocuments();
    if (auditCount === 0) {
      console.log('🌱 Seeding initial audit logs into MongoDB...');
      await AuditLog.insertMany(DEFAULT_AUDIT_LOGS);
      console.log('✅ Default audit logs seeded successfully.');
    }
  } catch (err) {
    console.error('⚠️ Error seeding database:', err.message);
  }
}

// --- API ENDPOINTS ---

// Health Check
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  res.json({
    status: 'ok',
    database: dbStatus,
    timestamp: new Date().toISOString()
  });
});

// 1. AUTH ROUTES
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user || user.passwordHash !== password) {
      return res.status(401).json({ error: 'Invalid email or password. Please verify your credentials.' });
    }

    const userObj = user.toObject();
    delete userObj.passwordHash;
    delete userObj._id;
    delete userObj.__v;

    const token = `token_${user.role.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const expiresAt = new Date(Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000)).toISOString();

    res.json({
      user: userObj,
      token,
      expiresAt,
      rememberMe: !!rememberMe
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, department, tenantName } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(409).json({ error: 'An account with this email address already exists.' });
    }

    const dept = department || 'Finance';
    const newUser = new User({
      id: `usr-${Date.now().toString(36)}`,
      name: name.trim(),
      email: normalizedEmail,
      role: 'Employee',
      department: dept,
      tenant: tenantName ? tenantName.trim() : 'Apex Global Industries',
      permissions: ['VIEW', 'UPLOAD', 'RAG_ACCESS'],
      accessibleDepartments: [dept],
      createdAt: new Date().toISOString(),
      passwordHash: password
    });

    await newUser.save();

    const userObj = newUser.toObject();
    delete userObj.passwordHash;
    delete userObj._id;
    delete userObj.__v;

    const token = `token_employee_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    res.status(201).json({
      user: userObj,
      token,
      expiresAt,
      rememberMe: true
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

app.get('/api/auth/users', async (req, res) => {
  try {
    const users = await User.find({}, '-passwordHash -_id -__v').lean();
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch user list.' });
  }
});

app.post('/api/auth/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ error: 'Email and new password are required.' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: 'Invalid or expired password reset reference.' });
    }

    user.passwordHash = newPassword;
    await user.save();

    res.json({ success: true, message: 'Password successfully updated.' });
  } catch (err) {
    console.error('Password reset error:', err);
    res.status(500).json({ error: 'Internal server error during password reset.' });
  }
});

// 2. DOCUMENT ROUTES
app.get('/api/documents', async (req, res) => {
  try {
    const documents = await Document.find({}, '-_id -__v').sort({ createdDate: -1 }).lean();
    res.json(documents);
  } catch (err) {
    console.error('Error fetching documents:', err);
    res.status(500).json({ error: 'Failed to fetch documents.' });
  }
});

app.post('/api/documents', async (req, res) => {
  try {
    const docData = req.body;
    if (!docData.name || !docData.department || !docData.content) {
      return res.status(400).json({ error: 'Missing required document fields.' });
    }

    const id = docData.id || `doc-${Date.now().toString(36)}`;
    const newDoc = new Document({
      ...docData,
      id,
      uploadDate: docData.uploadDate || new Date().toISOString().split('T')[0],
      createdDate: docData.createdDate || new Date().toISOString(),
      updatedDate: docData.updatedDate || new Date().toISOString()
    });

    await newDoc.save();
    const docObj = newDoc.toObject();
    delete docObj._id;
    delete docObj.__v;

    res.status(201).json(docObj);
  } catch (err) {
    console.error('Error creating document:', err);
    res.status(500).json({ error: 'Failed to save document.' });
  }
});

app.put('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body, updatedDate: new Date().toISOString() };
    delete updates._id;
    delete updates.__v;

    const doc = await Document.findOneAndUpdate(
      { id },
      { $set: updates },
      { new: true, projection: '-_id -__v' }
    ).lean();

    if (!doc) {
      return res.status(404).json({ error: 'Document not found.' });
    }

    res.json(doc);
  } catch (err) {
    console.error('Error updating document:', err);
    res.status(500).json({ error: 'Failed to update document.' });
  }
});

app.delete('/api/documents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Document.findOneAndDelete({ id });
    if (!result) {
      return res.status(404).json({ error: 'Document not found.' });
    }
    res.json({ success: true, message: 'Document deleted successfully.' });
  } catch (err) {
    console.error('Error deleting document:', err);
    res.status(500).json({ error: 'Failed to delete document.' });
  }
});

// 3. AUDIT LOG ROUTES
app.get('/api/audit-logs', async (req, res) => {
  try {
    const logs = await AuditLog.find({}, '-_id -__v').sort({ createdAt: -1 }).lean();
    res.json(logs);
  } catch (err) {
    console.error('Error fetching audit logs:', err);
    res.status(500).json({ error: 'Failed to fetch audit logs.' });
  }
});

app.post('/api/audit-logs', async (req, res) => {
  try {
    const logData = req.body;
    const id = logData.id || `log-${Date.now().toString(36)}`;
    const newLog = new AuditLog({
      ...logData,
      id,
      timestamp: logData.timestamp || new Date().toLocaleString()
    });

    await newLog.save();
    const logObj = newLog.toObject();
    delete logObj._id;
    delete logObj.__v;

    res.status(201).json(logObj);
  } catch (err) {
    console.error('Error logging audit event:', err);
    res.status(500).json({ error: 'Failed to save audit log.' });
  }
});

// --- CONNECT TO MONGODB & START SERVER ---
async function startServer() {
  try {
    console.log(`📡 Connecting to MongoDB at: ${MONGODB_URI.replace(/:[^:@]+@/, ':****@')} ...`);
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');

    // Seed default demo data if empty
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`🚀 RBAC RAG Backend server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.log('ℹ️ Server starting in offline mode. Please verify your MONGODB_URI in .env.');
    app.listen(PORT, () => {
      console.log(`🚀 RBAC RAG Backend server running in fallback mode on http://localhost:${PORT}`);
    });
  }
}

startServer();
