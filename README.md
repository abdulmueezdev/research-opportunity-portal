# Research Opportunity Portal

A full-stack web application for a university research opportunities board. Faculty post, manage, and close research positions. Students browse, search, and filter opportunities by status.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS v4 |
| Backend | Node.js 20+, Express 5 (ESM), Zod validation |
| Database | MySQL 8.4 |
| API Testing | Bruno |

## Prerequisites

- Node.js 20+
- MySQL 8.4
- npm

## Setup & Run Instructions

### 1. Database Setup

```bash
mysql -u root -p < database/schema.sql
```

This creates the `research_portal` database, the `portal` user, and the `opportunities` table.

### 2. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env with your MySQL credentials
npm install
npm run dev
```

The backend starts on `http://localhost:4000`.

#### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `4000` | Backend server port |
| `DB_HOST` | `localhost` | MySQL host |
| `DB_USER` | `portal` | MySQL user |
| `DB_PASSWORD` | — | MySQL password for the portal user |
| `DB_NAME` | `research_portal` | Database name |
| `FRONTEND_ORIGIN` | `http://localhost:5173` | CORS allowed origin |

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`. Open it in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/opportunities` | Create a new opportunity |
| `GET` | `/api/opportunities` | List all opportunities |
| `GET` | `/api/opportunities/:id` | Get a specific opportunity |
| `PUT` | `/api/opportunities/:id` | Update an opportunity |
| `DELETE` | `/api/opportunities/:id` | Delete an opportunity |

All responses follow the envelope format:

```json
{ "success": true, "data": <T>, "message": "..." }
```

Validation errors return:

```json
{ "success": false, "error": { "code": "VALIDATION_ERROR", "message": "...", "details": [...] } }
```

## API Testing

A [Bruno](https://www.usebruno.com/) collection is included in the `bruno/` directory. Import it into Bruno and select the `dev` environment to test all 12 API test cases (including edge cases for validation and 404 handling).

## Project Structure

```
research-opportunity-portal/
├── backend/
│   └── src/
│       ├── config/          # env.js, db.js
│       ├── controllers/     # opportunity.controller.js
│       ├── middleware/       # validate.js, errorHandler.js, notFound.js
│       ├── repositories/    # opportunity.repository.js
│       ├── routes/          # opportunity.routes.js
│       ├── schemas/         # opportunity.schema.js (Zod)
│       ├── app.js
│       └── server.js
├── frontend/
│   └── src/
│       ├── api/             # Typed fetch wrappers
│       ├── components/
│       │   ├── atoms/       # Button, Input, StatusBadge, SkillChip, Sticker
│       │   ├── molecules/   # FilterPills, StatPills
│       │   └── organisms/   # Cards, Modals, NavBar, Hero, Grid
│       ├── hooks/           # useOpportunities, useToast
│       ├── types/           # TypeScript interfaces
│       └── App.tsx
├── database/
│   └── schema.sql
├── bruno/                   # API test collection
└── docs/                    # PRD, design specs, constraints
```

## Known Limitations

- No authentication or authorization (out of scope for Assignment 1).
- Runs locally only (not deployed).
- No file upload support.
- No pagination (all opportunities loaded at once).

## GitHub Repository

[Repository URL placeholder]

## Video Walkthrough

[Video URL placeholder]
