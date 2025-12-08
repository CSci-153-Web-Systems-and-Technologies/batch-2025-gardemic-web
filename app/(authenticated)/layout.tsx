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
        
        <div className="col-start-1 col-span-2">
          <Sidebar />
        </div>
        <div className="font-aclonica col-start-3 col-span-9">
          {children}
        </div>
      </div>        
    </>
  );
}
