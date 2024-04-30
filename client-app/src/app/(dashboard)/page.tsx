import { getServerSideSession } from "@/providers/ServerSessionProvider";

export default async function Home() {
  const serverSession = await getServerSideSession();

  console.log({ serverSession });

  return (
    <main>
      <div>You are logged in</div>
    </main>
  );
}
