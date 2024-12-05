import { getUser } from "@/api/user";
import Dashboard from "./_components/Dashboard";

export const dynamic = "force-dynamic";

export default async function Page() {
  const user = await getUser();
  return <Dashboard user={user} />;
}
