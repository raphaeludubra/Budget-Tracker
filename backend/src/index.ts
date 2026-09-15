import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import transactionRoutes from "./routes/transactions";
import summaryRoutes from "./routes/summary";

dotenv.config();

const app = express();
// FRONTEND_URL restricts CORS to your deployed frontend in production.
// If unset (local dev), all origins are allowed.
const allowedOrigin = process.env.FRONTEND_URL;
app.use(cors(allowedOrigin ? { origin: allowedOrigin } : {}));
app.use(express.json());

app.use("/api/transactions", transactionRoutes);
app.use("/api/summary", summaryRoutes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/budget-tracker";

connectDB(MONGO_URI).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
