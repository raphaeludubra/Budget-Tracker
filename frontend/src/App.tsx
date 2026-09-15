import { useEffect, useState, useCallback } from "react";
import { getTransactions, getSummary, Transaction, Summary } from "./api";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SummaryChart from "./components/SummaryChart";
import "./index.css";

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);

  const refresh = useCallback(async () => {
    const [tx, sum] = await Promise.all([getTransactions(), getSummary()]);
    setTransactions(tx);
    setSummary(sum);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div className="app">
      <h1>Budget Tracker</h1>
      <TransactionForm onAdded={refresh} />
      {summary && <SummaryChart summary={summary} />}
      <TransactionList transactions={transactions} onChange={refresh} />
    </div>
  );
}
