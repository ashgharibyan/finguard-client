import { getUser } from "@/api/userApi";
import React from "react";
import Profile from "./_components/Profile";

export default async function Page() {
  const user = await getUser();

  return <Profile user={user} />;
}
