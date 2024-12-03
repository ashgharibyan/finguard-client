import apiClient from "@/api/apiClient";
import React from "react";
import Dashboard from "./_components/CreateExpense";
import CreateExpense from "./_components/CreateExpense";
import { getUser } from "@/api/userApi";

export default async function Page() {
  const user = await getUser();

  return <CreateExpense user={user} />;
}
