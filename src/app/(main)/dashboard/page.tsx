import { getUser } from "@/api/user";
import Dashboard from "./_components/Dashboard";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export default async function Page() {
  const user = await getUser();
  return <Dashboard user={user} />;
}
