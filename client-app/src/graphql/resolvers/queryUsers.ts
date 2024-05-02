import { getServerSideSession } from "@/common/session";

export const users = async (
  parent: any,
  args: any,
  contextValue: any,
  info: any
) => {
  const serverSession = await getServerSideSession();
  console.log({ serverSession });
  console.log("as cia", { parent, args, info, contextValue });

  const data = {
    id: 1,
    name: "XXX",
    lastName: "XXX",
    email: "XXX@XXXX.com",
    city: "XXX",
    address: "XXXX",
    country: "XXXXX",
    isAdmin: false,
  };

  return [data];
};
