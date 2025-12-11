'use client'

import Sidebar from "@/components/Sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
       <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <main className="font-aclonica flex-1 overflow-y-auto">

            {children}
          </main>
       </div>
    </>
  );
}
