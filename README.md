# VERBOS

VERBOS is a full‑stack productivity workspace that combines:

- **Authentication & user profiles**
- **Rich document management**
- **Notebook pages for structured notes**
- **Kanban‑style task management (boards, statuses, labels, priorities)**

The project is split into:

- **`verbos_backend`** – FastAPI + PostgreSQL REST API
- **`verbos_frontend`** – Next.js 15 (App Router) + React + Redux UI

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
  - [PostgreSQL Setup](#1-postgresql-setup)
  - [Backend Setup](#2-backend-setup)
  - [Frontend Setup](#3-frontend-setup)
- [Verification](#verification)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Core Features](#core-features)
- [Troubleshooting](#troubleshooting)
- [Development Notes](#development-notes)

---

## Prerequisites

Before starting, ensure you have the following installed:

- **Python** 3.11+ ([Download](https://www.python.org/downloads/))
  - Verify: `python --version` or `python3 --version`
- **Node.js** 18+ and **npm** ([Download](https://nodejs.org/))
  - Verify: `node --version` and `npm --version`
- **PostgreSQL** 12+ ([Download](https://www.postgresql.org/download/))
  - Verify: `psql --version`
- **Git** (for cloning the repository)

---

## Quick Start

```bash
# 1. Clone the repository (if not already done)
cd Verbos

# 2. Set up PostgreSQL database
# See "PostgreSQL Setup" section below

# 3. Set up backend
cd verbos_backend
python -m venv .venv
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# Windows CMD:
.venv\Scripts\activate.bat
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
# Create .env file (see Backend Setup section)
alembic upgrade head
uvicorn app.main:app --reload

# 4. Set up frontend (in a new terminal)
cd ../verbos_frontend
npm install
npm run dev
```

The backend will run on `http://localhost:8000` and the frontend on `http://localhost:3000`.

---

## Detailed Setup

### 1. PostgreSQL Setup

#### Install PostgreSQL

- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/) and run the installer
- **macOS**: `brew install postgresql@15` or download from [postgresql.org](https://www.postgresql.org/download/macosx/)
- **Linux**: `sudo apt-get install postgresql postgresql-contrib` (Ubuntu/Debian) or use your distribution's package manager

#### Create Database

1. **Start PostgreSQL service**
   - Windows: PostgreSQL should start automatically as a service
   - macOS: `brew services start postgresql@15`
   - Linux: `sudo systemctl start postgresql`

2. **Access PostgreSQL**
   ```bash
   # Default user is usually 'postgres'
   psql -U postgres
   # Or if you need to specify host/port:
   psql -U postgres -h localhost -p 5432
   ```

3. **Create database and user** (run these SQL commands in psql):
   ```sql
   -- Create a new database
   CREATE DATABASE verbos;
   
   -- Create a user (optional, you can use 'postgres' user)
   CREATE USER verbos_user WITH PASSWORD 'your_password_here';
   
   -- Grant privileges
   GRANT ALL PRIVILEGES ON DATABASE verbos TO verbos_user;
   
   -- Exit psql
   \q
   ```

4. **Verify database exists**
   ```bash
   psql -U postgres -l | grep verbos
   ```

#### Connection String Format

Your database connection string should follow this format:
```
postgresql+psycopg2://username:password@host:port/database_name
```

Examples:
- Using default postgres user: `postgresql+psycopg2://postgres:your_password@localhost:5432/verbos`
- Using custom user: `postgresql+psycopg2://verbos_user:your_password@localhost:5432/verbos`
- Different port: `postgresql+psycopg2://postgres:your_password@localhost:5433/verbos`

---

### 2. Backend Setup

#### Step 1: Navigate to Backend Directory

```bash
cd verbos_backend
```

#### Step 2: Create Virtual Environment

```bash
# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows PowerShell:
.venv\Scripts\Activate.ps1

# Windows CMD:
.venv\Scripts\activate.bat

# macOS/Linux:
source .venv/bin/activate
```

You should see `(.venv)` in your terminal prompt when activated.

#### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

#### Step 4: Configure Environment Variables

Create a `.env` file in the `verbos_backend/` directory:

```bash
# Windows PowerShell:
New-Item -Path .env -ItemType File

# macOS/Linux:
touch .env
```

Add the following content to `.env`:

```env
DATABASE_URL=postgresql+psycopg2://postgres:your_password@localhost:5432/verbos
```

**Important**: Replace `your_password` with your actual PostgreSQL password and adjust the connection string if you:
- Used a different username
- Changed the database name
- Are using a different port (default is 5432)

#### Step 5: Run Database Migrations

```bash
# Make sure your virtual environment is activated
alembic upgrade head
```

This will create all necessary tables in your PostgreSQL database.

**Expected output**: You should see migration messages indicating tables were created.

#### Step 6: Start the Backend Server

```bash
uvicorn app.main:app --reload
```

**Expected output**:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

The API will be available at:
- **API**: `http://localhost:8000`
- **API Docs (Swagger)**: `http://localhost:8000/docs`
- **Alternative API Docs (ReDoc)**: `http://localhost:8000/redoc`

#### Verify Backend is Running

Open your browser and visit `http://localhost:8000`. You should see:
```json
{"message": "verbose backend is working"}
```

Or visit `http://localhost:8000/docs` to see the interactive API documentation.

---

### 3. Frontend Setup

#### Step 1: Navigate to Frontend Directory

Open a **new terminal window** (keep the backend running) and navigate to:

```bash
cd verbos_frontend
```

#### Step 2: Install Dependencies

```bash
npm install
```

This may take a few minutes as it installs all Node.js dependencies.

#### Step 3: Start the Development Server

```bash
npm run dev
```

**Expected output**:
```
  ▲ Next.js 15.5.2
  - Local:        http://localhost:3000
  - ready started server on 0.0.0.0:3000
```

The frontend will be available at `http://localhost:3000`.

#### Frontend Configuration

The frontend is pre-configured to connect to the backend at `http://localhost:8000` (see `src/lib/axiosInstance.ts`). No additional configuration is needed for local development.

---

## Verification

### Test the Complete Setup

1. **Backend Health Check**
   - Visit `http://localhost:8000` → Should return `{"message": "verbose backend is working"}`
   - Visit `http://localhost:8000/docs` → Should show Swagger UI

2. **Frontend Loads**
   - Visit `http://localhost:3000` → Should show the VERBOS homepage

3. **Create an Account**
   - Navigate to `http://localhost:3000/auth/signup`
   - Fill in the registration form
   - Submit and verify you can log in

4. **Test API Endpoints**
   - After logging in, try creating a document or notebook
   - Check the browser's Network tab to see API calls to `http://localhost:8000`

### Common Verification Commands

```bash
# Check if PostgreSQL is running
# Windows:
Get-Service postgresql*

# macOS/Linux:
sudo systemctl status postgresql
# or
pg_isready

# Check if backend is responding
curl http://localhost:8000
# or visit in browser

# Check if frontend is responding
curl http://localhost:3000
# or visit in browser

# Check database connection (from backend directory with venv activated)
python -c "from app.db.session import engine; engine.connect(); print('Database connection successful!')"
```

---

## Project Structure

```text
Verbos/
├── verbos_backend/              # FastAPI backend
│   ├── app/
│   │   ├── main.py              # FastAPI app entry point
│   │   ├── core/
│   │   │   └── config.py        # Configuration (reads DATABASE_URL)
│   │   ├── db/
│   │   │   ├── session.py       # Database session & engine
│   │   │   └── migrations/      # Alembic migrations
│   │   ├── users/               # Authentication & user management
│   │   ├── document/            # Document CRUD operations
│   │   ├── notebook/            # Notebook & page management
│   │   ├── task_manager/        # Task management (Kanban)
│   │   ├── models.py            # SQLAlchemy models
│   │   └── middlewares/         # Auth middleware
│   ├── requirements.txt         # Python dependencies
│   ├── alembic.ini              # Alembic configuration
│   └── .env                     # Environment variables (create this)
│
└── verbos_frontend/             # Next.js frontend
    ├── src/
    │   ├── app/                 # Next.js App Router pages
    │   │   ├── auth/            # Login/signup pages
    │   │   ├── document/        # Document pages
    │   │   ├── notebook/        # Notebook pages
    │   │   └── task-manager/    # Task manager pages
    │   ├── components/          # React components
    │   ├── redux/               # Redux store & slices
    │   ├── lib/                 # Utilities (axios instance)
    │   └── providers/           # Context providers
    ├── package.json             # Node.js dependencies
    └── next.config.ts           # Next.js configuration
```

---

## Tech Stack

### Backend
- **FastAPI** – Modern Python web framework
- **SQLAlchemy** – ORM for database operations
- **Alembic** – Database migrations
- **PostgreSQL** – Relational database
- **JWT** – Authentication tokens
- **python-dotenv** – Environment variable management

### Frontend
- **Next.js 15** – React framework with App Router
- **React 19** – UI library
- **TypeScript** – Type-safe JavaScript
- **Redux Toolkit** – State management
- **Axios** – HTTP client
- **Radix UI** – Accessible component primitives
- **Tailwind CSS** – Utility-first CSS framework

---

## Core Features

### User Authentication
- User registration and login
- JWT-based sessions with access & refresh tokens
- Secure password hashing (bcrypt)
- Profile management (view, update, delete)
- Protected routes with middleware

### Documents
- Create, read, update, and delete documents
- Rich text content support
- Per-user ownership and authorization
- Document listing and search

### Notebooks & Pages
- Create multiple notebooks per user
- Hierarchical structure: Notebook → Pages
- Create, update, and delete pages
- Validation to prevent empty names
- Ownership checks for security

### Task Management (Kanban)
- **Workspaces** – Organize multiple boards
- **Boards** – Kanban boards for projects
- **Tasks** – Individual task items with:
  - Priorities (Urgent, High, Medium, Low, None)
  - Due dates and start dates
  - Descriptions
  - Ordering for drag-and-drop
- **Statuses** – Customizable columns (e.g., To Do, In Progress, Done)
- **Labels** – Color-coded tags for categorization
- Many-to-many relationship between tasks and labels

---

## Troubleshooting

### Backend Issues

#### "Module not found" errors
```bash
# Make sure virtual environment is activated
# Reinstall dependencies
pip install -r requirements.txt
```

#### Database connection errors
- **Check PostgreSQL is running**: `pg_isready` or check services
- **Verify DATABASE_URL in .env**: Ensure password, username, host, port, and database name are correct
- **Test connection manually**:
  ```bash
  psql -U postgres -d verbos -h localhost -p 5432
  ```

#### Migration errors
```bash
# If migrations fail, you might need to reset (WARNING: deletes data)
# First, backup your data if needed
alembic downgrade base
alembic upgrade head

# Or create a fresh migration
alembic revision --autogenerate -m "description"
alembic upgrade head
```

#### Port 8000 already in use
```bash
# Find process using port 8000
# Windows:
netstat -ano | findstr :8000

# macOS/Linux:
lsof -i :8000

# Kill the process or use a different port:
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

#### "Cannot connect to backend" errors
- **Verify backend is running**: Visit `http://localhost:8000`
- **Check CORS settings**: Backend should allow `http://localhost:3000` (already configured)
- **Check browser console**: Look for CORS or network errors

#### npm install fails
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Database Issues

#### "Database does not exist"
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create the database
CREATE DATABASE verbos;
```

#### "Permission denied"
```sql
-- Grant necessary permissions
GRANT ALL PRIVILEGES ON DATABASE verbos TO your_username;
```

#### Reset database (WARNING: deletes all data)
```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE verbos;"
psql -U postgres -c "CREATE DATABASE verbos;"
cd verbos_backend
alembic upgrade head
```

### General Issues

#### Virtual environment not activating (Windows)
```powershell
# If you get "execution of scripts is disabled", run:
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

#### Python version issues
```bash
# Use python3 explicitly if needed
python3 -m venv .venv
python3 -m pip install -r requirements.txt
```

---

## Development Notes

### CORS Configuration
The backend is configured to allow requests from `http://localhost:3000`. To change this, edit `verbos_backend/app/main.py`:

```python
origins = ["http://localhost:3000", "https://your-production-domain.com"]
```

### Database Migrations
When you modify models in `app/models.py`:

```bash
# Generate a new migration
alembic revision --autogenerate -m "description of changes"

# Apply the migration
alembic upgrade head
```

### Environment Variables
- **Local development**: Use `.env` file (already in `.gitignore`)
- **Production**: Set environment variables in your hosting platform
- **Never commit**: `.env` files with real credentials

### API Documentation
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

### Running in Production

**Backend:**
```bash
# Build for production
pip install -r requirements.txt

# Run with production server (e.g., Gunicorn)
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
```

**Frontend:**
```bash
# Build static files
npm run build

# Start production server
npm start
```

---

## Scripts Quick Reference

### Backend
```bash
# Activate virtual environment
.venv\Scripts\Activate.ps1  # Windows PowerShell
source .venv/bin/activate    # macOS/Linux

# Run development server
uvicorn app.main:app --reload

# Run migrations
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "migration description"

# Check migration status
alembic current
alembic history
```

### Frontend
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

## Getting Help

If you encounter issues not covered here:

1. Check the browser console (F12) for frontend errors
2. Check the terminal where the backend is running for server errors
3. Verify all prerequisites are installed and up to date
4. Ensure PostgreSQL is running and accessible
5. Check that both backend and frontend are running on the correct ports



---

