# University Research Opportunity Portal

A full-stack, responsive web application for university campuses that enables faculty to publish and manage mentored research openings and allows students to browse, search, filter, and inspect research opportunities.

---

## 1. Project Overview

The **University Research Opportunity Portal** is designed to streamline academic mentorship by providing a real-time, interactive board of undergraduate and graduate research openings across academic departments. Faculty members can create new listings, update requirements, close filled cohorts, and delete obsolete entries. Students can filter opportunities by status (`ALL`, `OPEN`, `CLOSED`), search across titles, departments, skills, and research areas in real time, and view detailed project specifications.

---

## 2. Technology Stack

### Backend
- **Runtime & Framework:** Node.js 20+ (ES Modules) with Express 5.0.1
- **Database Client:** `mysql2/promise` with connection pooling and `dateStrings: true`
- **Validation:** Zod 3.24+ for strict schema parsing and validation error messages
- **Architecture:** Controller → Repository pattern (no redundant service layer, no `try/catch` boilerplate thanks to Express 5 native async error forwarding)
- **Security & Middleware:** `cors`, `dotenv`, global error handler with uniform JSON error envelope, 404 handler

### Frontend
- **Framework & Build:** React 19 + TypeScript (strict mode, zero `any` types) with Vite 8
- **Styling & Design System:** Tailwind CSS v4 using the Slush Design System (flat pastel collage, 1px solid black borders, 1600px pill buttons, zero drop shadows, zero gradients)
- **Typography:** `@fontsource/bowlby-one` for display headlines and `@fontsource-variable/inter` for body and UI elements
- **Dialogs & Modals:** Native HTML5 `<dialog>` elements with focus trapping, backdrop scrim, and keyboard Escape handling
- **Accessibility:** Full WCAG 2.1 AA compliance (semantic HTML landmarks, programmatic `<label>` associations, visible Voltage Violet focus outlines, ARIA live regions)

### Database
- **Database Engine:** MySQL 8.4+
- **Schema:** Relational table `opportunities` with strict constraints, unsigned identifiers, and auto-managed timestamps (`created_at`, `updated_at`)

### Testing & Verification
- **API Collection:** Bruno API client collection (`bruno/`) with 12 automated test cases (38 assertions)
- **DOM & E2E Verification:** Reticle MCP internal SDK driving live browser sessions and asserting DOM/network integrity

---

## 3. Setup & Run Instructions

### Prerequisites
- **Node.js:** v20.10.0 or higher
- **npm:** v10.0.0 or higher
- **MySQL Server:** v8.0 or v8.4+ running locally

---

### Step 1: Database Setup

1. Start your local MySQL service:
   ```bash
   sudo systemctl start mysql
   ```

2. Log into MySQL and import the project schema:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

   *Alternatively, if using the dedicated portal user:*
   ```bash
   mysql -u portal -p portal_db < database/schema.sql
   ```

3. Verify the `opportunities` table exists and the initial seed records are loaded:
   ```sql
   USE portal_db;
   SELECT id, title, area, faculty_name, status FROM opportunities;
   ```

---

### Step 2: Backend Configuration & Start

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables in `backend/.env`:
   ```ini
   PORT=4000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=portal
   DB_PASSWORD=portal_pass
   DB_NAME=portal_db
   FRONTEND_ORIGIN=http://localhost:5173
   ```

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will boot on `http://localhost:4000` with hot-reloading enabled.*

---

### Step 3: Frontend Configuration & Start

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Configure environment variables in `frontend/.env`:
   ```ini
   VITE_API_BASE_URL=http://localhost:4000
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *Vite will start the client at `http://localhost:5173/` (or `http://localhost:5174/` if 5173 is in use).*

5. Open your browser and navigate to the printed URL to interact with the application.

---

## 4. REST API Specification

All API responses follow a uniform JSON envelope:

**Success Response Envelope (`200 OK` / `201 Created`):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional human-readable confirmation"
}
```

**Error Response Envelope (`400 Bad Request` / `404 Not Found` / `500 Internal Server Error`):**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR | NOT_FOUND | INVALID_JSON | INTERNAL_ERROR",
    "message": "Detailed error summary",
    "details": [
      { "field": "available_positions", "message": "Must be an integer greater than or equal to 0" }
    ]
  }
}
```

### Endpoints

| Method | Endpoint | Description | Status Code |
|---|---|---|---|
| `POST` | `/api/opportunities` | Creates a new research opportunity listing | `201 Created` / `400 Bad Request` |
| `GET` | `/api/opportunities` | Lists all opportunities sorted newest first | `200 OK` |
| `GET` | `/api/opportunities/:id` | Retrieves full details of a specific opportunity | `200 OK` / `400` / `404 Not Found` |
| `PUT` | `/api/opportunities/:id` | Partial update of opportunity fields | `200 OK` / `400` / `404 Not Found` |
| `DELETE` | `/api/opportunities/:id` | Permanently deletes an opportunity | `200 OK` / `400` / `404 Not Found` |

---

## 5. API Testing (Bruno Collection)

The repository includes a complete Bruno API collection in `bruno/` configured with a development environment (`bruno/environments/dev.bru`).

### Automated Test Cases Included:
1. `01-create-opportunity-1.bru`: POST valid opportunity #1 (Visual SLAM & Drone Navigation).
2. `02-create-opportunity-2.bru`: POST valid opportunity #2 (Quantum Error Correction).
3. `03-create-opportunity-3.bru`: POST valid opportunity #3 (Bioinformatics Gene Regulatory Networks).
4. `04-get-all-opportunities.bru`: GET list of opportunities, validating array structure and 200 OK.
5. `05-get-opportunity-by-id.bru`: GET opportunity #1, verifying field integrity.
6. `06-update-opportunity.bru`: PUT partial update (title, available positions, deadline).
7. `07-close-opportunity.bru`: PUT `{ "status": "Closed" }`, verifying state transition.
8. `08-delete-opportunity.bru`: DELETE opportunity #3, verifying 200 OK and deletion envelope.
9. `09-get-deleted-opportunity.bru`: GET deleted opportunity #3, verifying `404 Not Found`.
10. `10-validation-missing-fields.bru`: POST invalid payload, verifying `400 VALIDATION_ERROR` with field details.
11. `11-get-invalid-id-format.bru`: GET `/api/opportunities/abc`, verifying `400 VALIDATION_ERROR`.
12. `12-get-nonexistent-id.bru`: GET `/api/opportunities/999999`, verifying `404 NOT_FOUND`.

### Running with Bruno GUI:
1. Open [Bruno](https://www.usebruno.com/).
2. Click **Open Collection** and select the `bruno/` directory in the repository root.
3. Select the **dev** environment in the top-right corner.
4. Click **Run Collection** to execute all 12 requests in sequence.

### Running Headless via CLI:
```bash
npx @usebruno/cli run bruno --env dev
```
*Result: 12/12 passed (38 assertions passed, 0 failures).*

---

## 6. Known Limitations

- **No Authentication / Authorization:** Per Assignment 1 specification, user accounts, authentication tokens, and role-based permissions (Faculty vs. Student) are out of scope. The interface operates under a trust-based open campus model.
- **Local Single-Node Deployment:** The application is architected for local server and development execution, with SQLite/MySQL single-instance data persistence.

---

## 7. Submission Deliverables

- **GitHub Repository:** [https://github.com/placeholder/research-opportunity-portal](https://github.com/placeholder/research-opportunity-portal)
- **One-Minute Demonstration Video:** [https://youtu.be/placeholder-demo-video](https://youtu.be/placeholder-demo-video)
- **Submission ZIP Archive:** `P24_XXXX_NAME_CLASS.zip` (packaged with full source, database schema, Bruno collection, and documentation).
