import Navbar from "@/components/Home/Navbar";
import Sidebar from "@/components/Home/Sidebar";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <section className="flex min-h-screen w-full overflow-hidden bg-primary/5 lg:gap-12">
      <div>
        <Sidebar />
      </div>

      <main className="w-full lg:ml-[240px]">
        <Navbar />
        <div className="px-6">{children}</div>
      </main>
    </section>
  );
}
