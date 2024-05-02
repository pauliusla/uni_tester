import { getServerSideSession } from "@/common/session";
import { getUsers } from "./_lib/users";

export default async function Home() {
  const serverSession = await getServerSideSession();
  const users = await getUsers();

  console.log({ serverSession, users });

  return (
    <main>
      <div>You are logged in</div>
    </main>
  );
}
