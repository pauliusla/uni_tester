import { authOptions } from "@/config/authConfig";
import { getServerSession } from "next-auth";

export async function getServerSideSession() {
  return await getServerSession(authOptions);
}
