import type { Metadata } from "next";
import { HeaderNav } from "@/components/HeaderNav";
import { Inter } from "next/font/google";
import module from "./Layout.module.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Uni enhance app",
  description: "Please login to use the application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${module.container}`}>
        <HeaderNav />
        <div className={module.childrenContainer}>{children}</div>
      </body>
    </html>
  );
}
