import React from "react";
import CreateExpense from "./_components/CreateExpense";
import { getUser } from "@/api/userApi";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const user = await getUser();

  return <CreateExpense user={user} />;
}
