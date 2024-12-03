import apiClient from "@/api/apiClient";
import { getUser } from "@/api/userApi";
import React from "react";
import Dashboard from "./_components/Profile";
import Profile from "./_components/Profile";

export default async function Page() {
  const user = await getUser();

  return <Profile user={user} />;
}
