import { Router, Request, Response } from "express";
import Transaction from "../models/Transaction";

const router = Router();

// GET /api/transactions?category=&from=&to=
router.get("/", async (req: Request, res: Response) => {
  const { category, from, to } = req.query;
  const filter: Record<string, unknown> = {};

  if (category) filter.category = category;
  if (from || to) {
    filter.date = {
      ...(from ? { $gte: new Date(from as string) } : {}),
      ...(to ? { $lte: new Date(to as string) } : {}),
    };
  }

  const transactions = await Transaction.find(filter).sort({ date: -1 });
  res.json(transactions);
});

// POST /api/transactions
router.post("/", async (req: Request, res: Response) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// PUT /api/transactions/:id
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Transaction not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

// DELETE /api/transactions/:id
router.delete("/:id", async (req: Request, res: Response) => {
  const deleted = await Transaction.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Transaction not found" });
  res.status(204).send();
});

export default router;
