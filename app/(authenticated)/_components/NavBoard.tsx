'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Gardens", href: "/gardens" },
  { name: "Tasks", href: "/tasks" },
];

export function NavBoard() {
  const pathname = usePathname();

  return (
    <nav className="w-full h-10 flex items-end justify-center bg-transparent mt-1.5">
      <div className="flex w-full h-full max-w-5xl bg-white border-x border-gray-100 shadow-sm md:rounded-xl overflow-hidden">
        
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex-1 flex items-center justify-center text-center font-medium text-sm md:text-base",
                "transition-all duration-200 ease-in-out",
                "border-b-4", 
                
                isActive 
                  ? "border-green-600 text-black bg-gray-50" 
                  : "border-transparent text-gray-500 hover:border-green-600 hover:text-gray-900 hover:bg-gray-50/50"
              )}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}