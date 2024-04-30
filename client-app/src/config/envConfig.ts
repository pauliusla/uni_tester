export const beApiUrl = () => {
  return process.env.NEXTAUTH_SECRET || "http://localhost:8000";
};
