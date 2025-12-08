'use client'

import Sidebar from "@/components/Sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid grid-cols-12">
        <Sidebar />
        <div className="font-aclonica col-start-2 col-span-9">
          {children}
        </div>
      </div>        
    </>
  );
}
