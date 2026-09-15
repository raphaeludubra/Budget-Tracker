import { Schema, model, Document } from "mongoose";

export type TransactionType = "income" | "expense";

export interface ITransaction extends Document {
  amount: number;
  type: TransactionType;
  category: string;
  description?: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    amount: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    date: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export default model<ITransaction>("Transaction", transactionSchema);
