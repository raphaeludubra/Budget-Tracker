import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Summary } from "../api";

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#ef4444", "#06b6d4", "#a855f7"];

interface Props {
  summary: Summary;
}

export default function SummaryChart({ summary }: Props) {
  return (
    <div className="summary">
      <div className="summary-totals">
        <div>Income: ${summary.income.toFixed(2)}</div>
        <div>Expenses: ${summary.expense.toFixed(2)}</div>
        <div>Net: ${summary.net.toFixed(2)}</div>
      </div>

      {summary.byCategory.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={summary.byCategory}
              dataKey="total"
              nameKey="category"
              outerRadius={100}
              label
            >
              {summary.byCategory.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
