# Budget Tracker

A full-stack budget tracker for logging income and expenses, filtering transaction history, and visualizing monthly spending by category.

Built to practice a complete client-server data flow: a typed REST API backed by MongoDB, aggregation-based reporting, and a React frontend that consumes it.

## Features

- Create, edit, and delete transactions (amount, type, category, date, description)
- Filter transactions by category and date range
- Monthly summary: total income, total expenses, net balance
- Category breakdown visualized as a pie chart (Recharts)

## Tech stack

**Frontend:** React, TypeScript, Vite, Recharts, Axios
**Backend:** Node.js, Express, TypeScript, Mongoose
**Database:** MongoDB

## Architecture

Two separate services communicating over a REST API:

```
budget-tracker/
  backend/    Express API — routes, Mongoose models, MongoDB aggregation for summaries
  frontend/   React app — form, transaction table, and chart, calling the API via Axios
```

The backend exposes CRUD endpoints for transactions and a `/summary` endpoint that uses a MongoDB aggregation pipeline to compute income/expense totals and per-category breakdowns server-side, rather than shipping raw data to the client and totaling it there.

## API reference

| Method | Endpoint | Description |
|--------|----------|--------------|
| GET | `/api/transactions` | List transactions (filter by `category`, `from`, `to`) |
| POST | `/api/transactions` | Create a transaction |
| PUT | `/api/transactions/:id` | Update a transaction |
| DELETE | `/api/transactions/:id` | Delete a transaction |
| GET | `/api/summary?month=YYYY-MM` | Income/expense/net totals + category breakdown |

## Getting started

**Prerequisites:** Node.js 18+, MongoDB (local install or [MongoDB Atlas](https://www.mongodb.com/atlas))

```bash
# 1. Clone the repo
git clone https://github.com/<your-username>/budget-tracker.git
cd budget-tracker

# 2. Backend setup
cd backend
cp .env.example .env   # edit MONGO_URI if using Atlas instead of local MongoDB
npm install
npm run dev             # runs on http://localhost:5000

# 3. Frontend setup (in a new terminal)
cd frontend
npm install
npm run dev              # runs on http://localhost:5173
```

Open `http://localhost:5173` in your browser.

macOS users can alternatively use the included `start-budget-tracker.command` / `stop-budget-tracker.command` scripts to run both servers with a double-click instead of two terminal windows.

## Project status / roadmap

This is an actively developed portfolio project. Currently implemented: the full CRUD flow above, backend aggregation, and the chart. Not yet implemented:

- [ ] Authentication (JWT), so transactions are scoped per user
- [ ] Automated tests (Jest on the API routes)
- [ ] Deployment (frontend on Vercel/Netlify, backend on Render/Railway, MongoDB Atlas)
- [ ] Budget limits per category with visual warnings
- [ ] CSV export/import

## License

MIT
