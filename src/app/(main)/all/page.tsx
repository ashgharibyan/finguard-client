import { getAllExpenses } from "@/api/expenseApi";
import { getUser } from "@/api/user";
import AllExpenses from "./_components/AllExpenses";
import { EnhancedExpenseType } from "@/types/types";
import { serverFetch } from "@/api/api-client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const [expenses, currentUser] = await Promise.all([
    serverFetch<EnhancedExpenseType[]>("/Expenses"),
    getUser(),
  ]);

  return <AllExpenses expenses={expenses} currentUser={currentUser} />;
}
