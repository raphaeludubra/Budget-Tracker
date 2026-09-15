# Budget Tracker

A full-stack budget tracker: log income/expenses, filter transactions, and see a monthly summary with a category breakdown chart.

**Stack:** React + TypeScript (Vite) · Node.js + Express + TypeScript · MongoDB (Mongoose)

## Project structure

```
budget-tracker/
  backend/     Express API (CRUD + summary aggregation)
  frontend/    React app (form, table, chart)
```

## Setup

### 1. Backend

```bash
cd backend
cp .env.example .env   # set MONGO_URI (local Mongo or Atlas connection string)
npm install
npm run dev             # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev              # starts on http://localhost:5173, proxies /api to :5000
```

Open http://localhost:5173.

## API

| Method | Endpoint                | Description                          |
|--------|--------------------------|---------------------------------------|
| GET    | /api/transactions        | List transactions (filter by `category`, `from`, `to`) |
| POST   | /api/transactions        | Create a transaction                 |
| PUT    | /api/transactions/:id    | Update a transaction                 |
| DELETE | /api/transactions/:id    | Delete a transaction                 |
| GET    | /api/summary?month=YYYY-MM | Income/expense/net totals + category breakdown |

## Next steps (see the roadmap discussed with Claude)

- Add JWT auth so transactions are scoped per user
- Budget limits per category with visual warnings
- CSV export/import
- Deploy: frontend to Vercel/Netlify, backend to Render/Railway, DB to MongoDB Atlas
- Add Jest tests for the API routes
