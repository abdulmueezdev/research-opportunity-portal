# University Research Opportunity Portal

A full-stack web application for university campuses that enables faculty to publish and manage mentored research openings and allows students to browse, search, filter, and inspect research opportunities.

## Project Overview
The University Research Opportunity Portal streamlines academic mentorship by providing a real-time, interactive board of research openings across academic departments. Faculty members can create new listings, update requirements, close filled cohorts, and delete obsolete entries. Students can filter opportunities by status (`ALL`, `OPEN`, `CLOSED`), search across titles, departments, skills, and research areas in real time, and view detailed project specifications.

## Technology Stack
- **Backend:** Node.js 20+ (ES Modules) with Express 5.0.1, `mysql2/promise`, Zod 3.24+.
- **Frontend:** React 19 + TypeScript (strict mode) with Vite 8, Tailwind CSS v4.
- **Database:** MySQL 8.0+ (Relational `opportunities` table with strict constraints).
- **Testing:** Bruno API client collection (16 automated test cases).

## Prerequisites
- Node.js v20.10.0 or higher
- npm v10.0.0 or higher
- MySQL Server v8.0+ running locally

## Setup & Run Instructions

### Step 1: Database Setup
1. Start your local MySQL service:
   ```bash
   sudo systemctl start mysql
   ```
2. Import the project schema (from the project root):
   ```bash
   mysql -u root -p < database/schema.sql
   ```

### Step 2: Backend Configuration & Start
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` and configure your database credentials:
   ```ini
   PORT=4000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=research_portal
   FRONTEND_ORIGIN=http://localhost:5173
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   *(Backend runs on `http://localhost:4000`)*

### Step 3: Frontend Configuration & Start
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *(Frontend runs on `http://localhost:5173`)*

## REST API Specification

All API responses follow a uniform JSON envelope.

### Endpoints
| Method | Endpoint | Description | Status Codes |
|---|---|---|---|
| `POST` | `/api/opportunities` | Creates a new research opportunity | `201 Created`, `400 Bad Request` |
| `GET` | `/api/opportunities` | Lists all opportunities (newest first) | `200 OK` |
| `GET` | `/api/opportunities/:id` | Retrieves details of a specific opportunity | `200 OK`, `400`, `404 Not Found` |
| `PUT` | `/api/opportunities/:id` | Updates an existing opportunity | `200 OK`, `400`, `404 Not Found` |
| `DELETE` | `/api/opportunities/:id` | Deletes an opportunity | `200 OK`, `400`, `404 Not Found` |

## API Testing (Bruno Collection)
The repository includes a complete Bruno API collection in `bruno/Research Portal API`.

To run the automated tests:
1. Open the Bruno desktop app.
2. Click **Open Collection** and select the `bruno/Research Portal API` directory.
3. Click **Run Collection** to execute all 16 test cases.

## GitHub Repository
[https://github.com/abdulmueezdev/research-opportunity-portal](https://github.com/abdulmueezdev/research-opportunity-portal)
