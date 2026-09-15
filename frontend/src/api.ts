import axios from "axios";

export type TransactionType = "income" | "expense";

export interface Transaction {
  _id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description?: string;
  date: string;
}

export interface Summary {
  income: number;
  expense: number;
  net: number;
  byCategory: { category: string; total: number }[];
}

// In production, set VITE_API_URL to your deployed backend's URL (e.g. https://your-app.onrender.com/api)
// In local dev, this falls back to "/api", which Vite proxies to localhost:5000/5001
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "/api" });

export const getTransactions = async (): Promise<Transaction[]> =>
  (await api.get("/transactions")).data;

export const createTransaction = async (
  tx: Omit<Transaction, "_id">
): Promise<Transaction> => (await api.post("/transactions", tx)).data;

export const deleteTransaction = async (id: string): Promise<void> => {
  await api.delete(`/transactions/${id}`);
};

export const getSummary = async (month?: string): Promise<Summary> =>
  (await api.get("/summary", { params: { month } })).data;
