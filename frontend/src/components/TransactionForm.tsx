import { useState, FormEvent } from "react";
import { createTransaction, TransactionType } from "../api";

interface Props {
  onAdded: () => void;
}

export default function TransactionForm({ onAdded }: Props) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("expense");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!amount || !category) return;

    await createTransaction({
      amount: parseFloat(amount),
      type,
      category,
      description,
      date,
    });

    setAmount("");
    setCategory("");
    setDescription("");
    onAdded();
  }

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.01"
        min="0"
        required
      />
      <select value={type} onChange={(e) => setType(e.target.value as TransactionType)}>
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <button type="submit">Add</button>
    </form>
  );
}
