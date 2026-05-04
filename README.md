# Fake News Detector

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3+-black.svg)](https://bun.sh/)
[![Prisma](https://img.shields.io/badge/Prisma-7.6-2D3748.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-336791.svg)](https://www.postgresql.org/)

> A collaborative fact-checking platform that empowers citizens and journalists to combat misinformation through a structured, transparent verification process.

## Overview

Fake News Detector is a **Domain-Driven Design (DDD)** based platform that facilitates collaborative fact-checking. The system connects three distinct user roles in a structured workflow to verify information accuracy and publish transparent analysis results.

### Business Vision

In an era of information overload, distinguishing fact from fiction is critical. This platform creates an ecosystem where:
- **Citizens** contribute by reporting suspicious content and providing evidence
- **Journalists** conduct thorough investigations using professional methodology
- **Directors** ensure quality control and editorial standards

## Key Features

### Multi-Role Collaboration
- **Citizen (REGULAR)** - Submit reports (max 3 open), track status, view notifications, apply for Watcher status
- **Citizen (WATCHER)** - Privileged citizens who can submit evidence to ongoing investigations (+2 engagement points)
- **Journalist** - Pick reports, conduct investigations (max 1 active), submit for review
- **Director (EDITORIAL_DIRECTOR)** - Validate investigations, publish/archive results, manage users, approve Watcher applications

### Structured Fact-Checking Workflow
```
Report → Investigation → Review → Publication
```

1. **Submission** - Citizens submit suspicious content with media
2. **Assignment** - Journalists pick available reports and start investigations
3. **Evidence Collection** - Watchers contribute supporting evidence
4. **Validation** - Directors review and approve investigations
5. **Publication** - Verified analysis is published with final verdict

### Quality Control Mechanisms
- **Citizen Report Limit** - Maximum 3 open reports per citizen (`MAX_REPORTING_PER_CITIZEN_AT_A_TIME = 3`)
- **Journalist Investigation Limit** - Maximum 1 active investigation per journalist (`MAX_INVESTIGATIONS_PER_JOURNALIST_AT_A_TIME = 1`)
- **Evidence Submission Restriction** - Only citizens with `WATCHER` type can submit evidence
- **Watcher Promotion System** - Citizens apply via `WatcherApplication`; Director approves/rejects
- **Revision Attempt Limits** - Maximum attempts for correction cycles (`MAX_REVISION_ATTEMPTS`, `MAX_CORRECTION_ATTEMPTS`)
- **Media Origin Tracking** - All media tracked by origin: `CITIZEN_REPORT`, `DIRECTOR_INITIATED`, `JOURNALIST_PROOF`
- **Source Media Classification** - Citizen/Director media require category, reliability, justification by journalist
- **Journalist Proof Requirements** - Journalist-added media require authority source, no classification fields
- **Watcher Evidence Media** - Watcher contributions require at least one media with complete classification
- **Engagement Scoring** - Points awarded for participation (submit report: +1, submit evidence: +2, publication: +2)
- **Account Status Management** - ACTIVE, DISABLED, BANNED states with reasons (SPAM, ABUSE, FRAUD, INACTIVITY, USER_REQUEST, OTHER)

## Architecture

### Domain-Driven Design (DDD)

The application follows DDD principles with clear bounded contexts:

```
src/
├── domain/              # Business logic and entities
│   ├── entities/        # Core domain objects
│   ├── value-objects/   # Immutable value types (Media, VerifiedMedia, etc.)
│   ├── factories/       # Entity factories
│   ├── repositories/    # Repository interfaces
│   ├── services/        # Domain services
│   └── processes/       # Complex business processes (workflow orchestration)
├── application/      # Use cases and application services
├── infrastructure/   # Technical implementations
│   ├── config/       # Database, Prisma
│   └── persistence/  # Repositories
└── interfaces/       # API controllers, DTOs
```

### Core Entities

| Entity | Responsibility | Key Invariants |
|--------|---------------|----------------|
| `Citizen` | Report submission, watcher application, evidence submission (if WATCHER) | Max 3 open reports; Only WATCHER can submit evidence |
| `Journalist` | Investigation management, draft creation, submission for review | Max 1 active investigation at a time |
| `Director` | Validation, user management, inbox subject creation, watcher approval | Cannot validate own work; Editorial oversight |
| `Report` | User-submitted suspicious content with theme, title, content | Can only be picked if status is OPEN |
| `Investigation` | Journalist's fact-checking process with verdict and media category | Max revision attempts; Requires media category before submission |
| `Evidence` | Supporting documents submitted by Watchers | Linked to investigation; Submitter must be WATCHER |
| `Publication` | Final approved analysis with verdict | Can be marked as correction |
| `WatcherApplication` | Request for citizen to become WATCHER | Status: PENDING → APPROVED/REJECTED |
| `Notification` | System alerts for users | Types: PUBLICATION, CORRECTION, ALERT, ARCHIVED_PUBLICATION. Targeted notifications for archived investigations |
| `InboxSubject` | Topics created by Directors for organization | Managed by Directors only; Origin: REPORT or DIRECTOR_INITIATED |

### Investigation Lifecycle

```
OPEN → IN_PROGRESS → PENDING_REVIEW → [PUBLISHED | ARCHIVED | NEEDS_REVISION → IN_PROGRESS]
```

**Status Definitions:**
- **OPEN** - Initial state when journalist picks a report
- **IN_PROGRESS** - Journalist working on draft (can edit media category, verdict, notes)
- **PENDING_REVIEW** - Submitted to Director for validation
- **NEEDS_REVISION** - Director rejected; sent back for corrections
- **PUBLISHED** - Director approved; investigation is public
- **ARCHIVED** - Investigation with UNVERIFIABLE verdict (cannot be verified)

**Transitions:**
- Journalist: `OPEN` → `IN_PROGRESS` → `PENDING_REVIEW`
- Director: `PENDING_REVIEW` → `PUBLISHED` (if verdict is TRUE/FALSE/MISLEADING)
- Director: `PENDING_REVIEW` → `ARCHIVED` (if verdict is UNVERIFIABLE)
- Director: `PENDING_REVIEW` → `NEEDS_REVISION` (rejection with feedback)
- Journalist: `NEEDS_REVISION` → `IN_PROGRESS` (correction cycle)

### Domain Values

**Media Categories** (Classification of suspicious content):
- `CONTEXT_COLLAPSE` - Missing or altered context
- `MANIPULATED` - Edited or doctored content
- `FABRICATED` - Completely false/original creation
- `SATIRE` - Parody or satirical content presented as fact
- `MISLEADING` - Partially true but misleading presentation
- `IMPOSTOR` - Impersonation or false attribution
- `OTHER` - Does not fit other categories

**Verdicts** (Final determination):
- `TRUE` - Content is accurate
- `FALSE` - Content is completely false
- `MISLEADING` - Content is partially true but misleading
- `UNVERIFIABLE` - Cannot be verified (leads to ARCHIVED status)

**Standard Publication Verdicts**: `TRUE`, `FALSE`, `MISLEADING` (can be published)
**Archive-only Verdict**: `UNVERIFIABLE` (must be archived, not published)

**Notification Types**:
- `PUBLICATION` - New publication available (broadcast to all citizens)
- `CORRECTION` - Published content corrected
- `ALERT` - System or administrative alert
- `ARCHIVED_PUBLICATION` - Investigation archived with UNVERIFIABLE verdict (targeted: journalist + citizen + watchers only)

**Notification Behavior**:
- **Publications** (TRUE/FALSE/MISLEADING verdicts): Broadcast to all citizens + journalist notification
- **Archived Publications** (UNVERIFIABLE verdicts): Targeted notifications only to stakeholders (journalist who investigated, citizen who reported, watchers who contributed evidence)

## Technology Stack

- **Runtime**: [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- **Framework**: [Hono](https://hono.dev/) - Lightweight web framework
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- **Language**: TypeScript with strict type checking
- **Architecture**: Domain-Driven Design (DDD)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.3.6 or higher
- PostgreSQL 15 or higher
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fake-news-detector
```

2. Install dependencies:
```bash
bun install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. Run database migrations:
```bash
cd app/server
bunx prisma migrate dev
```

5. Start the development server:
```bash
bun run dev
```

### Available Scripts

```bash
# Development
bun run dev              # Start development server
bun run build            # Build for production
bun run start            # Start production server

# Database
bun run migrate          # Run migrations
bun run deploy           # Deploy migrations to production
bunx prisma studio       # Open Prisma Studio
bun run generate         # Generate Prisma Client

# Testing
bun test                 # Run tests
```

## Project Structure

```
app/
├── server/
│   ├── src/
│   │   ├── domain/              # Domain layer
│   │   │   ├── entities/        # Core domain entities
│   │   │   ├── value-objects/   # Media, VerifiedMedia, EvidenceMedia, etc.
│   │   │   ├── factories/       # Entity factories
│   │   │   ├── repositories/    # Repository interfaces
│   │   │   ├── services/        # Domain services
│   │   │   └── processes/       # Workflow orchestration (investigationStatusWorkflow, investigationReviewReadiness, investigationMediaCopy)
│   │   ├── application/         # Application layer
│   │   │   └── services/        # Use cases & app services
│   │   ├── infrastructure/      # Infrastructure layer
│   │   │   ├── config/          # Database, Prisma config
│   │   │   └── persistence/     # Repository implementations
│   │   └── interfaces/          # Interface layer (API controllers, DTOs)
│   └── prisma/                  # Prisma schema & migrations
└── web/                         # Frontend (if applicable)

doc/                             # Documentation diagrams
├── class/                       # Class diagrams
├── usecase/                     # Use case diagrams
├── sequence/                    # Sequence diagrams
├── erd/                         # Entity-Relationship diagrams
└── ddd-summary.md               # DDD documentation

shared/                          # Shared constants, types, errors
├── constants.ts                 # Business rule constants
├── types.ts                     # Shared type definitions
└── errors.ts                    # Domain & business rule errors
```

## Documentation

Comprehensive UML diagrams are available in the `/doc` directory:

- **[Class Diagrams](doc/class/)** - Domain model and relationships
- **[Use Case Diagrams](doc/usecase/)** - System functionality by actor
- **[Sequence Diagrams](doc/sequence/)** - Interaction flows
- **[ERD](doc/erd/)** - Database schema and relationships
- **[DDD Summary](doc/ddd-summary.md)** - Domain-Driven Design documentation

## Role-Based Permissions Matrix

### Report & Investigation Management
| Permission | Citizen | Journalist | Director | Notes |
|:-----------|:-------:|:----------:|:--------:|:------|
| Submit Report | ✅ | ❌ | ❌ | Max 3 open reports; Must be ACTIVE |
| Submit Evidence | ✅ | ❌ | ❌ | Requires WATCHER type |
| Pick Report | ❌ | ✅ | ❌ | Max 1 active investigation; Report must be OPEN |
| Draft Investigation | ❌ | ✅ | ❌ | Update media category, verdict, notes |
| Submit for Review | ❌ | ✅ | ❌ | Must have media category set |
| Correct Investigation | ❌ | ✅ | ❌ | After rejection; Limited attempts |

### Validation & Publishing
| Permission | Citizen | Journalist | Director | Notes |
|:-----------|:-------:|:----------:|:--------:|:------|
| Validate Investigation | ❌ | ❌ | ✅ | Approve or reject |
| Publish Result | ❌ | ❌ | ✅ | Only TRUE/FALSE/MISLEADING verdicts |
| Archive Investigation | ❌ | ❌ | ✅ | Only UNVERIFIABLE verdicts |
| Reject for Revision | ❌ | ❌ | ✅ | Send back with feedback |

### User & Watcher Management
| Permission | Citizen | Journalist | Director | Notes |
|:-----------|:-------:|:----------:|:--------:|:------|
| Apply for Watcher | ✅ | ❌ | ❌ | Must be REGULAR citizen |
| Approve/Reject Watcher App | ❌ | ❌ | ✅ | Review motivation |
| Ban/Disable/Activate Users | ❌ | ❌ | ✅ | All actor types |
| Create Inbox Subjects | ❌ | ❌ | ✅ | Organizational topics |

### Legend
- ✅ **Allowed** — Role has permission
- ❌ **Denied** — Role cannot perform action
- * **Conditional** — Requires additional criteria

## API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout

### Reports
- `POST /api/reports` - Submit new report (Citizen)
- `GET /api/reports` - List available reports (Journalist - OPEN status only)
- `GET /api/reports/:id` - Get report details
- `PATCH /api/reports/:id` - Update report content (if not picked)

### Investigations
- `POST /api/investigations` - Create investigation from report (Journalist picks report)
- `GET /api/investigations` - List investigations (filtered by role)
- `GET /api/investigations/:id` - Get investigation details
- `PATCH /api/investigations/:id/draft` - Update investigation draft (mediaCategory, draftVerdict, notes)
- `POST /api/investigations/:id/submit` - Submit for director review
- `POST /api/investigations/:id/publish` - Publish investigation (Director - TRUE/FALSE/MISLEADING verdicts)
- `POST /api/investigations/:id/archive` - Archive investigation (Director - UNVERIFIABLE verdicts)
- `POST /api/investigations/:id/reject` - Reject with feedback (Director → NEEDS_REVISION)
- `POST /api/investigations/:id/correct` - Submit corrected draft (Journalist after rejection)

### Evidence
- `POST /api/evidence` - Submit evidence (Watcher only)
- `GET /api/investigations/:id/evidence` - List evidence for investigation
- `DELETE /api/evidence/:id` - Remove evidence (Watcher who submitted it)

### Publications
- `GET /api/publications` - List published investigations
- `GET /api/publications/:id` - Get publication details
- `POST /api/publications/:id/correction` - Mark as correction (Director)

### Watcher Applications
- `POST /api/watcher-applications` - Apply for watcher status (Citizen)
- `GET /api/watcher-applications` - List applications (Director)
- `POST /api/watcher-applications/:id/approve` - Approve application (Director)
- `POST /api/watcher-applications/:id/reject` - Reject application (Director)

### User Management (Director only)
- `GET /api/users` - List all users
- `POST /api/users/:id/ban` - Ban user (with reason)
- `POST /api/users/:id/disable` - Disable user (with reason)
- `POST /api/users/:id/activate` - Activate user
- `GET /api/users/:id/profile` - Get user profile with engagement score

### Notifications
- `GET /api/notifications` - List user notifications
- `POST /api/notifications/:id/read` - Mark as read
- `POST /api/notifications/:id/unread` - Mark as unread
- `POST /api/notifications/read-all` - Mark all as read

### Inbox Subjects (Director only)
- `POST /api/inbox-subjects` - Create new subject
- `GET /api/inbox-subjects` - List subjects
- `POST /api/inbox-subjects/:id/archive` - Archive subject

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ to combat misinformation and promote information integrity.**
