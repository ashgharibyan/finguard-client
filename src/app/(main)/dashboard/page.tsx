import { getUser } from "@/api/userApi";
import React from "react";
import Dashboard from "./_components/Dashboard";

export default async function Page() {
  const user = await getUser();

  return <Dashboard user={user} />;
}
