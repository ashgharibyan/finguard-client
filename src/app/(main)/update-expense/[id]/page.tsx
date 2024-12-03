import React from "react";
import { getExpense } from "@/api/expenseApi";
import { getUser } from "@/api/userApi";
import UpdateExpense from "./_components/UpdateExpense";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const expenseId = (await params).id;

  // Fetch the logged-in user and expense details
  const [user, expense] = await Promise.all([
    getUser(),
    getExpense(Number(expenseId)),
  ]);

  return <UpdateExpense user={user} expense={expense} />;
}
