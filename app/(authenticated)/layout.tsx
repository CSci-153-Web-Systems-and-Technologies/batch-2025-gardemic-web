'use client'

import Sidebar from "@/components/Sidebar";
import ButtonBoard from "./_components/AddButtonBoard";
import Description from "./_components/Description";
import { NavBoard } from "./_components/NavBoard";

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
            <div className="flex flex-col bg-accent-white">
                <div className="flex flex-row justify-between h-24 border-b-4 border-b-black/20">
                    <div className="text-3xl font-montserrat font-bold py-6.5 pl-6">
                        Tasks
                    </div>

                    <ButtonBoard />

                </div>
                <div className="w-full h-14 border-b-4 border-b-black/20">
                    <NavBoard />
                </div>
            </div>
            {children}
          </main>
       </div>
    </>
  );
}
