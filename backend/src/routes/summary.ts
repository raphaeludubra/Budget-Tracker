import { Router, Request, Response } from "express";
import Transaction from "../models/Transaction";

const router = Router();

// GET /api/summary?month=2026-09
router.get("/", async (req: Request, res: Response) => {
  const { month } = req.query;
  const match: Record<string, unknown> = {};

  if (month) {
    const [year, mon] = (month as string).split("-").map(Number);
    const start = new Date(year, mon - 1, 1);
    const end = new Date(year, mon, 1);
    match.date = { $gte: start, $lt: end };
  }

  const totals = await Transaction.aggregate([
    { $match: match },
    { $group: { _id: "$type", total: { $sum: "$amount" } } },
  ]);

  const byCategory = await Transaction.aggregate([
    { $match: { ...match, type: "expense" } },
    { $group: { _id: "$category", total: { $sum: "$amount" } } },
    { $sort: { total: -1 } },
  ]);

  const income = totals.find((t) => t._id === "income")?.total ?? 0;
  const expense = totals.find((t) => t._id === "expense")?.total ?? 0;

  res.json({
    income,
    expense,
    net: income - expense,
    byCategory: byCategory.map((c) => ({ category: c._id, total: c.total })),
  });
});

export default router;
