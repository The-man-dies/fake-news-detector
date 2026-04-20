// migrate-ddd.js
// Script de migration automatique vers l'architecture DDD avec Factories
// Exécution : node migrate-ddd.js

const fs = require('fs')
const path = require('path')

// Configuration
const SERVER_PATH = path.join(process.cwd(), 'app', 'server')
const SRC_PATH = path.join(SERVER_PATH, 'src')

// Couleurs pour la console
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
}

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`)
}

function createDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    return true
  }
  return false
}

function writeFile(filePath, content) {
  const dir = path.dirname(filePath)
  createDirectory(dir)
  fs.writeFileSync(filePath, content, 'utf8')
}

// Structure DDD avec Factories (tout en anglais)
const structure = {
  // ==========================================
  // DOMAIN - ENTITIES
  // ==========================================
  'domain/entities/Admin.ts': `// domain/entities/Admin.ts
export class Admin {
  constructor(
    public readonly id: string,
    public name: string
  ) {}

  validateAnalysis(analysis: Analysis): void {}
  rejectAnalysis(analysis: Analysis, reason: string): void {}
  publishOfficially(analysis: Analysis): void {}
  publishCorrection(analysisId: string): void {}
  approveWatcherApplication(applicationId: string): void {}
  rejectWatcherApplication(applicationId: string): void {}
  banJournalist(journalistId: string, reason: string): void {}
  disableJournalist(journalistId: string, reason: string): void {}
  banCitizen(citizenId: string, reason: string): void {}
  disableCitizen(citizenId: string, reason: string): void {}
  addInboxSubject(subject: InboxSubject): void {}
  removeInboxSubject(subjectId: string): void {}
  getDashboard(): void {}
  getProfile(): void {}
}`,

  'domain/entities/Journalist.ts': `// domain/entities/Journalist.ts
export type JournalistStatus = 'BANNED' | 'DISABLED' | 'ACTIVE';

export class Journalist {
  constructor(
    public readonly id: string,
    public specialty: string,
    public status: JournalistStatus,
    public activeAnalysesCount: number = 0,
    public readonly maxActiveAnalyses: number = 1
  ) {}

  pickReport(): void {}
  writeAnalysis(report: Report): void {}
  linkAuthoritySource(source: AuthoritySource): void {}
  submitDraft(): void {}
  correctAnalysis(reason: string): void {}
  receiveEvidence(evidence: any): void {}
  canAnalyze(): boolean {
    return this.activeAnalysesCount < this.maxActiveAnalyses;
  }
  getHistory(): void {}
}`,

  'domain/entities/Citizen.ts': `// domain/entities/Citizen.ts
export type CitizenStatus = 'BANNED' | 'REGULAR' | 'WATCHER';

export class Citizen {
  constructor(
    public readonly id: string,
    public engagementScore: number,
    public status: CitizenStatus,
    public openReportsCount: number = 0,
    public readonly maxOpenReports: number = 3
  ) {}

  isWatcher(): boolean { return this.status === 'WATCHER'; }
  getEngagementScore(): number { return this.engagementScore; }
  canSubmitReport(): boolean { return this.openReportsCount < this.maxOpenReports; }
  submitReport(content: string): void {}
  getNotifications(): void {}
  applyForWatcher(): void {}
  submitEvidence(dossierId: string, artifact: any): void {}
  getProfile(): void {}
  getHistory(): void {}
}`,

  'domain/entities/Report.ts': `// domain/entities/Report.ts
export type ReportStatus = 'OPEN' | 'IN_PROGRESS' | 'NEEDS_REVISION' | 'PUBLISHED';

export class Report {
  constructor(
    public readonly id: string,
    public status: ReportStatus,
    public content: string,
    public mediaUrl?: string
  ) {}

  changeStatus(newStatus: ReportStatus): void {
    this.status = newStatus;
  }
}`,

  'domain/entities/Analysis.ts': `// domain/entities/Analysis.ts
export class Analysis {
  constructor(
    public readonly id: string,
    public reportId: string,
    public journalistId: string,
    public mediaCategory: string,
    public draftVerdict: string,
    public investigationNotes: string,
    public currentRejectionReason: string | null = null,
    public attemptCount: number = 0
  ) {}

  checkCoherence(): boolean { return true; }
  applyFeedback(reason: string): void {
    this.currentRejectionReason = reason;
    this.attemptCount++;
  }
}`,

  'domain/entities/WatcherEvidence.ts': `// domain/entities/WatcherEvidence.ts
export class WatcherEvidence {
  constructor(
    public readonly id: string,
    public analysisId: string,
    public watcherId: string,
    public artifact: string,
    public fileUrl?: string,
    public submissionDate: Date = new Date()
  ) {}
}`,

  'domain/entities/Publication.ts': `// domain/entities/Publication.ts
export class Publication {
  constructor(
    public readonly id: string,
    public analysisId: string,
    public approvedById: string,
    public finalVerdict: string,
    public publicationDate: Date = new Date(),
    public isCorrection: boolean = false
  ) {}

  generateBadgeNotification(): string {
    return \`New publication: \${this.finalVerdict.substring(0, 50)}\`;
  }
}`,

  'domain/entities/Notification.ts': `// domain/entities/Notification.ts
export class Notification {
  constructor(
    public readonly id: string,
    public citizenId: string,
    public message: string,
    public isRead: boolean = false,
    public createdAt: Date = new Date(),
    public publicationId?: string
  ) {}

  markAsRead(): void {
    this.isRead = true;
  }
}`,

  // ==========================================
  // DOMAIN - VALUE OBJECTS
  // ==========================================
  'domain/value-objects/AuthoritySource.ts': `// domain/value-objects/AuthoritySource.ts
export class AuthoritySource {
  constructor(
    public readonly institutionName: string,
    public readonly evidenceType: string,
    public readonly evidenceUrl: string
  ) {}
}`,

  'domain/value-objects/InboxSubject.ts': `// domain/value-objects/InboxSubject.ts
export class InboxSubject {
  constructor(
    public readonly id: string,
    public readonly theme: string,
    public readonly description: string
  ) {}
}`,

  // ==========================================
  // DOMAIN - FACTORIES
  // ==========================================
  'domain/factories/ReportFactory.ts': `// domain/factories/ReportFactory.ts
import { Report, ReportStatus } from '../entities/Report';
import { randomUUID } from 'crypto';

export interface CreateReportParams {
  content: string;
  mediaUrl?: string;
  citizenId: string;
}

export class ReportFactory {
  static create(params: CreateReportParams): Report {
    return new Report(
      randomUUID(),
      'OPEN' as ReportStatus,
      params.content,
      params.mediaUrl
    );
  }

  static createFromScratch(content: string, citizenId: string): Report {
    return this.create({ content, citizenId });
  }

  static createWithMedia(content: string, mediaUrl: string, citizenId: string): Report {
    return this.create({ content, mediaUrl, citizenId });
  }
}`,

  'domain/factories/AnalysisFactory.ts': `// domain/factories/AnalysisFactory.ts
import { Analysis } from '../entities/Analysis';
import { randomUUID } from 'crypto';

export interface CreateAnalysisParams {
  reportId: string;
  journalistId: string;
  mediaCategory: string;
  draftVerdict: string;
  investigationNotes: string;
}

export class AnalysisFactory {
  static create(params: CreateAnalysisParams): Analysis {
    return new Analysis(
      randomUUID(),
      params.reportId,
      params.journalistId,
      params.mediaCategory,
      params.draftVerdict,
      params.investigationNotes,
      null,
      0
    );
  }

  static createDraft(reportId: string, journalistId: string): Analysis {
    return this.create({
      reportId,
      journalistId,
      mediaCategory: 'UNCLASSIFIED',
      draftVerdict: 'UNVERIFIABLE',
      investigationNotes: ''
    });
  }

  static fromRejection(previousAnalysis: Analysis, reason: string): Analysis {
    const newAnalysis = this.create({
      reportId: previousAnalysis.reportId,
      journalistId: previousAnalysis.journalistId,
      mediaCategory: previousAnalysis.mediaCategory,
      draftVerdict: previousAnalysis.draftVerdict,
      investigationNotes: previousAnalysis.investigationNotes
    });
    newAnalysis.applyFeedback(reason);
    return newAnalysis;
  }
}`,

  'domain/factories/WatcherEvidenceFactory.ts': `// domain/factories/WatcherEvidenceFactory.ts
import { WatcherEvidence } from '../entities/WatcherEvidence';
import { randomUUID } from 'crypto';

export interface CreateEvidenceParams {
  analysisId: string;
  watcherId: string;
  artifact: string;
  fileUrl?: string;
}

export class WatcherEvidenceFactory {
  static create(params: CreateEvidenceParams): WatcherEvidence {
    return new WatcherEvidence(
      randomUUID(),
      params.analysisId,
      params.watcherId,
      params.artifact,
      params.fileUrl,
      new Date()
    );
  }

  static createWithFile(analysisId: string, watcherId: string, artifact: string, fileUrl: string): WatcherEvidence {
    return this.create({ analysisId, watcherId, artifact, fileUrl });
  }

  static createTextEvidence(analysisId: string, watcherId: string, artifact: string): WatcherEvidence {
    return this.create({ analysisId, watcherId, artifact });
  }
}`,

  'domain/factories/PublicationFactory.ts': `// domain/factories/PublicationFactory.ts
import { Publication } from '../entities/Publication';
import { randomUUID } from 'crypto';

export interface CreatePublicationParams {
  analysisId: string;
  approvedById: string;
  finalVerdict: string;
  isCorrection?: boolean;
}

export class PublicationFactory {
  static create(params: CreatePublicationParams): Publication {
    return new Publication(
      randomUUID(),
      params.analysisId,
      params.approvedById,
      params.finalVerdict,
      new Date(),
      params.isCorrection || false
    );
  }

  static createCorrection(analysisId: string, approvedById: string, originalVerdict: string): Publication {
    return this.create({
      analysisId,
      approvedById,
      finalVerdict: \`CORRECTION: \${originalVerdict}\`,
      isCorrection: true
    });
  }

  static createFromAnalysis(analysis: Analysis, approvedById: string): Publication {
    return this.create({
      analysisId: analysis.id,
      approvedById,
      finalVerdict: analysis.draftVerdict
    });
  }
}`,

  'domain/factories/UserFactory.ts': `// domain/factories/UserFactory.ts
import { Citizen, CitizenStatus } from '../entities/Citizen';
import { Journalist, JournalistStatus } from '../entities/Journalist';
import { Admin } from '../entities/Admin';
import { randomUUID } from 'crypto';

export interface CreateCitizenParams {
  id?: string;
  email: string;
  engagementScore?: number;
  status?: CitizenStatus;
}

export interface CreateJournalistParams {
  id?: string;
  email: string;
  specialty: string;
  status?: JournalistStatus;
}

export class UserFactory {
  static createCitizen(params: CreateCitizenParams): Citizen {
    return new Citizen(
      params.id || randomUUID(),
      params.engagementScore || 0,
      params.status || 'REGULAR',
      0,
      3
    );
  }

  static createWatcherCitizen(email: string): Citizen {
    return this.createCitizen({
      email,
      status: 'WATCHER',
      engagementScore: 50
    });
  }

  static createJournalist(params: CreateJournalistParams): Journalist {
    return new Journalist(
      params.id || randomUUID(),
      params.specialty,
      params.status || 'ACTIVE',
      0,
      1
    );
  }

  static createAdmin(name: string, id?: string): Admin {
    return new Admin(id || randomUUID(), name);
  }
}`,

  'domain/factories/NotificationFactory.ts': `// domain/factories/NotificationFactory.ts
import { Notification } from '../entities/Notification';
import { randomUUID } from 'crypto';

export class NotificationFactory {
  static create(citizenId: string, message: string, publicationId?: string): Notification {
    return new Notification(
      randomUUID(),
      citizenId,
      message,
      false,
      new Date(),
      publicationId
    );
  }

  static createPublicationNotification(citizenId: string, publicationTitle: string, publicationId: string): Notification {
    return this.create(
      citizenId,
      \`New publication: "\${publicationTitle}" has been published\`,
      publicationId
    );
  }

  static createAnalysisNotification(journalistId: string, analysisId: string, status: string): Notification {
    return this.create(
      journalistId,
      \`Your analysis \${analysisId} has been \${status}\`
    );
  }

  static createBatch(citizenIds: string[], message: string): Notification[] {
    return citizenIds.map(citizenId => this.create(citizenId, message));
  }
}`,

  // ==========================================
  // DOMAIN - REPOSITORY INTERFACES
  // ==========================================
  'domain/repositories/IReportRepository.ts': `// domain/repositories/IReportRepository.ts
import { Report } from '../entities/Report';

export interface IReportRepository {
  save(report: Report): Promise<void>;
  findById(id: string): Promise<Report | null>;
  listInbox(): Promise<Report[]>;
  findByCitizenId(citizenId: string): Promise<Report[]>;
}`,

  'domain/repositories/IAnalysisRepository.ts': `// domain/repositories/IAnalysisRepository.ts
import { Analysis } from '../entities/Analysis';

export interface IAnalysisRepository {
  save(analysis: Analysis): Promise<void>;
  findById(id: string): Promise<Analysis | null>;
  findByJournalistId(journalistId: string): Promise<Analysis[]>;
  findPendingReviews(): Promise<Analysis[]>;
}`,

  'domain/repositories/IUserRepository.ts': `// domain/repositories/IUserRepository.ts
import { Citizen } from '../entities/Citizen';
import { Journalist } from '../entities/Journalist';
import { Admin } from '../entities/Admin';

export interface IUserRepository {
  findCitizenById(id: string): Promise<Citizen | null>;
  findJournalistById(id: string): Promise<Journalist | null>;
  findAdminById(id: string): Promise<Admin | null>;
  updateCitizen(citizen: Citizen): Promise<void>;
  updateJournalist(journalist: Journalist): Promise<void>;
  banUser(userId: string, reason: string): Promise<void>;
}`,

  // ==========================================
  // APPLICATION - SERVICES
  // ==========================================
  'application/services/FactCheckingService.ts': `// application/services/FactCheckingService.ts
import { IReportRepository } from '../../domain/repositories/IReportRepository';
import { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { ReportFactory } from '../../domain/factories/ReportFactory';
import { AnalysisFactory } from '../../domain/factories/AnalysisFactory';
import { PublicationFactory } from '../../domain/factories/PublicationFactory';
import { NotificationFactory } from '../../domain/factories/NotificationFactory';

export class FactCheckingService {
  constructor(
    private reportRepository: IReportRepository,
    private analysisRepository: IAnalysisRepository,
    private userRepository: IUserRepository
  ) {}

  async handleNewReport(citizenId: string, content: string, mediaUrl?: string): Promise<void> {
    const citizen = await this.userRepository.findCitizenById(citizenId);
    if (!citizen) throw new Error('Citizen not found');
    
    if (!citizen.canSubmitReport()) {
      throw new Error('Maximum number of open reports reached');
    }
    
    const report = ReportFactory.create({ content, mediaUrl, citizenId });
    await this.reportRepository.save(report);
  }

  async handleAdminApproval(adminId: string, analysisId: string): Promise<void> {
    const analysis = await this.analysisRepository.findById(analysisId);
    if (!analysis) throw new Error('Analysis not found');
    
    const publication = PublicationFactory.createFromAnalysis(analysis, adminId);
    // Save publication and notify
  }

  async handleAdminRejection(adminId: string, analysisId: string, reason: string): Promise<void> {
    const analysis = await this.analysisRepository.findById(analysisId);
    if (!analysis) throw new Error('Analysis not found');
    
    analysis.applyFeedback(reason);
    await this.analysisRepository.save(analysis);
  }

  async handleWatcherEvidenceSubmission(citizenId: string, dossierId: string, artifact: any): Promise<void> {}
  async handleJournalistBan(adminId: string, journalistId: string, reason: string): Promise<void> {}
  async handleJournalistDisable(adminId: string, journalistId: string, reason: string): Promise<void> {}
  async handleCitizenBan(adminId: string, citizenId: string, reason: string): Promise<void> {}
  async handleWatcherApplication(adminId: string, applicationId: string, decision: string): Promise<void> {}
}`,

  'application/services/QueryService.ts': `// application/services/QueryService.ts
import { IReportRepository } from '../../domain/repositories/IReportRepository';
import { IAnalysisRepository } from '../../domain/repositories/IAnalysisRepository';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class QueryService {
  constructor(
    private reportRepository: IReportRepository,
    private analysisRepository: IAnalysisRepository,
    private userRepository: IUserRepository
  ) {}

  async getCitizenHistory(citizenId: string): Promise<any> {
    return await this.reportRepository.findByCitizenId(citizenId);
  }

  async getCitizenProfile(citizenId: string): Promise<any> {
    return await this.userRepository.findCitizenById(citizenId);
  }

  async getJournalistHistory(journalistId: string): Promise<any> {
    return await this.analysisRepository.findByJournalistId(journalistId);
  }

  async getJournalistProfile(journalistId: string): Promise<any> {
    return await this.userRepository.findJournalistById(journalistId);
  }

  async getAdminDashboard(adminId: string): Promise<any> {
    const pendingReviews = await this.analysisRepository.findPendingReviews();
    return { pendingReviews };
  }

  async getAdminProfile(adminId: string): Promise<any> {
    return await this.userRepository.findAdminById(adminId);
  }

  async getNotifications(userId: string): Promise<any> {
    return [];
  }

  async listAvailableInbox(): Promise<any> {
    return await this.reportRepository.listInbox();
  }
}`,

  'application/services/SecurityService.ts': `// application/services/SecurityService.ts
export class SecurityService {
  async authenticate(token: string): Promise<boolean> {
    return true;
  }

  async checkAccess(role: string, action: string): Promise<boolean> {
    return true;
  }
}`,

  // ==========================================
  // INTERFACES - ROUTES
  // ==========================================
  'interfaces/routes/reportRoutes.ts': `// interfaces/routes/reportRoutes.ts
import { Hono } from 'hono';

const reportRoutes = new Hono();

reportRoutes.get('/', (c) => c.json({ message: 'Reports list' }));
reportRoutes.post('/', (c) => c.json({ message: 'Report created' }, 201));
reportRoutes.get('/inbox', (c) => c.json({ message: 'Inbox list' }));

export { reportRoutes };`,

  'interfaces/routes/analysisRoutes.ts': `// interfaces/routes/analysisRoutes.ts
import { Hono } from 'hono';

const analysisRoutes = new Hono();

analysisRoutes.get('/', (c) => c.json({ message: 'Analyses list' }));
analysisRoutes.post('/:id/approve', (c) => c.json({ message: 'Analysis approved' }));
analysisRoutes.post('/:id/reject', (c) c.json({ message: 'Analysis rejected' }));

export { analysisRoutes };`,

  'interfaces/routes/adminRoutes.ts': `// interfaces/routes/adminRoutes.ts
import { Hono } from 'hono';

const adminRoutes = new Hono();

adminRoutes.get('/dashboard', (c) => c.json({ message: 'Admin dashboard' }));
adminRoutes.post('/users/:id/ban', (c) => c.json({ message: 'User banned' }));
adminRoutes.post('/watcher/:id/approve', (c) => c.json({ message: 'Watcher application approved' }));

export { adminRoutes };`,

  'interfaces/middlewares/authMiddleware.ts': `// interfaces/middlewares/authMiddleware.ts
import { Context, Next } from 'hono';

export async function authMiddleware(c: Context, next: Next) {
  const token = c.req.header('Authorization');
  
  if (!token) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  
  await next();
}`,

  // ==========================================
  // SHARED
  // ==========================================
  'shared/types.ts': `// shared/types.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}`,

  'shared/errors.ts': `// shared/errors.ts
export class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainError';
  }
}

export class NotFoundError extends DomainError {
  constructor(entity: string, id: string) {
    super(\`\${entity} with id \${id} not found\`);
    this.name = 'NotFoundError';
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class BusinessRuleError extends DomainError {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessRuleError';
  }
}`,

  // ==========================================
  // MAIN INDEX
  // ==========================================
  'index.ts': `// index.ts - DDD Entry Point
import { Hono } from 'hono';
import { reportRoutes } from './interfaces/routes/reportRoutes';
import { analysisRoutes } from './interfaces/routes/analysisRoutes';
import { adminRoutes } from './interfaces/routes/adminRoutes';

const app = new Hono();

// Routes
app.route('/api/reports', reportRoutes);
app.route('/api/analyses', analysisRoutes);
app.route('/api/admin', adminRoutes);

// Health check
app.get('/health', (c) => c.json({ 
  status: 'ok', 
  architecture: 'DDD',
  timestamp: new Date().toISOString()
}));

app.onError((err, c) => {
  console.error(\`Error: \${err.message}\`);
  return c.json({ error: 'Internal server error' }, 500);
});

export default app;
`,
}

// Exécution principale
async function main() {
  log('\n========================================', 'cyan')
  log('  DDD ARCHITECTURE MIGRATION', 'cyan')
  log('  WITH FACTORIES (ENGLISH)', 'cyan')
  log('========================================\n', 'cyan')

  if (!fs.existsSync(SERVER_PATH)) {
    log(`❌ Path not found: ${SERVER_PATH}`, 'red')
    log(`   Make sure you are at the project root`, 'yellow')
    process.exit(1)
  }

  log(`📁 Target directory: ${SRC_PATH}\n`, 'yellow')

  let createdCount = 0

  for (const [relativePath, content] of Object.entries(structure)) {
    const fullPath = path.join(SRC_PATH, relativePath)
    writeFile(fullPath, content)
    createdCount++
    log(`  ✓ ${relativePath}`, 'green')
  }

  log(`\n✅ ${createdCount} files created successfully!`, 'green')

  log('\n========================================', 'cyan')
  log('  MIGRATION COMPLETED SUCCESSFULLY!', 'green')
  log('========================================\n', 'cyan')

  log('📋 DDD Structure created with Factories:', 'yellow')
  log(`   ${SRC_PATH}/`, 'white')
  log('   ├── domain/', 'white')
  log('   │   ├── entities/      # Business entities', 'white')
  log('   │   ├── value-objects/  # Value objects', 'white')
  log(
    '   │   ├── factories/      # 🔧 FACTORIES (complex object creation)',
    'white',
  )
  log('   │   └── repositories/   # Repository interfaces', 'white')
  log('   ├── application/        # Services and DTOs', 'white')
  log('   ├── infrastructure/     # Implementations', 'white')
  log('   ├── interfaces/         # Routes and controllers', 'white')
  log('   └── shared/             # Common types and errors', 'white')

  log('\n📦 Available Factories:', 'cyan')
  log('   • ReportFactory           - Report creation', 'white')
  log(
    '   • AnalysisFactory         - Analysis creation (draft, retry)',
    'white',
  )
  log('   • WatcherEvidenceFactory  - Evidence creation', 'white')
  log(
    '   • PublicationFactory      - Publication creation (correction)',
    'white',
  )
  log(
    '   • UserFactory             - Citizen, journalist, admin creation',
    'white',
  )
  log('   • NotificationFactory     - Notification creation (batch)', 'white')

  log('\n🚀 Next steps:', 'cyan')
  log('   1. cd app/server', 'white')
  log('   2. bun install', 'white')
  log('   3. bun prisma generate', 'white')
  log('   4. bun run dev', 'white')
}

main().catch(console.error)
