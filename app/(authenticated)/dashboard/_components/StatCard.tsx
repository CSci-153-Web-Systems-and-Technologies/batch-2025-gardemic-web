import React, { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  count: number;
  icon: ReactNode;
  // We pass specific color classes for background, border, and text to match the mockup designs
  className?: string;
}

export function StatCard({ title, count, icon, className = "" }: StatCardProps) {
  return (
    <div className={`p-6 rounded-4xl border flex justify-between items-center shadow-sm max-w-sm ${className}`}>
      <div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold">{count}</p>
      </div>
      <div className="opacity-80">
        {icon}
      </div>
    </div>
  );
}