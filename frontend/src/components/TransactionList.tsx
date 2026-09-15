import { Transaction, deleteTransaction } from "../api";

interface Props {
  transactions: Transaction[];
  onChange: () => void;
}

export default function TransactionList({ transactions, onChange }: Props) {
  async function handleDelete(id: string) {
    await deleteTransaction(id);
    onChange();
  }

  if (transactions.length === 0) {
    return <p>No transactions yet — add your first one above.</p>;
  }

  return (
    <table className="transaction-list">
      <thead>
        <tr>
          <th>Date</th>
          <th>Category</th>
          <th>Description</th>
          <th>Type</th>
          <th>Amount</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx._id}>
            <td>{new Date(tx.date).toLocaleDateString()}</td>
            <td>{tx.category}</td>
            <td>{tx.description}</td>
            <td>{tx.type}</td>
            <td className={tx.type === "income" ? "amount-income" : "amount-expense"}>
              {tx.type === "income" ? "+" : "-"}${tx.amount.toFixed(2)}
            </td>
            <td>
              <button onClick={() => handleDelete(tx._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
