# Fake News Detector

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/Bun-1.3+-black.svg)](https://bun.sh/)
[![Prisma](https://img.shields.io/badge/Prisma-5.x-2D3748.svg)](https://www.prisma.io/)
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
- **Citizen (Regular)** - Submit reports, track status, view notifications
- **Citizen (Watcher)** - Privileged citizens who can submit evidence to ongoing investigations
- **Journalist** - Pick reports, conduct investigations, submit for review
- **Director** - Validate investigations, manage users, oversee publications

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
- Maximum 3 open reports per citizen (prevents spam)
- Maximum 1 active investigation per journalist (ensures quality)
- Limited revision attempts with clear rejection reasons
- Watcher promotion system for engaged citizens
- Engagement scoring to encourage participation

## Architecture

### Domain-Driven Design (DDD)

The application follows DDD principles with clear bounded contexts:

```
src/
├── domain/           # Business logic and entities
│   ├── entities/     # Core domain objects
│   ├── value-objects/# Immutable value types
│   └── services/     # Domain services
├── application/      # Use cases and application services
├── infrastructure/   # Technical implementations
│   ├── config/       # Database, Prisma
│   └── persistence/  # Repositories
└── interfaces/       # API controllers, DTOs
```

### Core Entities

| Entity | Responsibility |
|--------|---------------|
| `Actor` | Base user with role (CITIZEN/JOURNALIST/DIRECTOR) |
| `Citizen` | Report submission, watcher application, evidence submission |
| `Journalist` | Investigation management, draft creation, submission |
| `Director` | Validation, user management, inbox subject creation |
| `Report` | User-submitted suspicious content |
| `Investigation` | Journalist's fact-checking process and findings |
| `Evidence` | Supporting documents from watchers |
| `Publication` | Final approved analysis with verdict |

### Investigation Lifecycle

```
OPEN → IN_PROGRESS → PENDING_REVIEW → [PUBLISHED | NEEDS_REVISION | UNVERIFIABLE]
```

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
bunx prisma migrate dev  # Run migrations
bunx prisma studio       # Open Prisma Studio
bunx prisma generate       # Generate Prisma Client

# Testing
bun test                 # Run tests
```

## Project Structure

```
app/
├── server/
│   ├── src/
│   │   ├── domain/           # Domain layer
│   │   │   └── entities/
│   │   ├── application/      # Application layer
│   │   ├── infrastructure/   # Infrastructure layer
│   │   │   └── config/
│   │   │       └── prisma/   # Database schema
│   │   └── interfaces/       # Interface layer
│   └── prisma/
│       └── schema.prisma
└── web/                      # Frontend (if applicable)

doc/                          # Documentation diagrams
├── class/                    # Class diagrams
├── usecase/                  # Use case diagrams
├── sequence/                 # Sequence diagrams
└── erd/                      # Entity-Relationship diagrams
```

## Documentation

Comprehensive UML diagrams are available in the `/doc` directory:

- **[Class Diagrams](doc/class/)** - Domain model and relationships
- **[Use Case Diagrams](doc/usecase/)** - System functionality by actor
- **[Sequence Diagrams](doc/sequence/)** - Interaction flows
- **[ERD](doc/erd/)** - Database schema and relationships

## API Endpoints

### Authentication
- `POST /api/auth/login` - User authentication
- `POST /api/auth/logout` - User logout

### Reports
- `POST /api/reports` - Submit new report (Citizen)
- `GET /api/reports` - List available reports (Journalist)
- `GET /api/reports/:id` - Get report details

### Investigations
- `POST /api/investigations` - Create investigation (Journalist)
- `PATCH /api/investigations/:id` - Update investigation draft
- `POST /api/investigations/:id/submit` - Submit for review
- `POST /api/investigations/:id/validate` - Validate (Director)
- `POST /api/investigations/:id/reject` - Reject with reason (Director)

### Evidence
- `POST /api/evidence` - Submit evidence (Watcher only)
- `GET /api/investigations/:id/evidence` - List investigation evidence

### Watcher Applications
- `POST /api/watcher-applications` - Apply for watcher status
- `GET /api/watcher-applications` - List applications (Director)
- `PATCH /api/watcher-applications/:id/approve` - Approve application

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
