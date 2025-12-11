'use client';

import { Search } from 'lucide-react';


export const PlantSidebar = () => {

  return (
    <aside className="w-full md:w-80 bg-white/80 border-r-4 border-[#e0e0d0]  h-full flex flex-col">
      <div className="p-6 pb-2">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Plant List</h2>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text"
            placeholder="Search ..."
            onChange={(e) => alert("you searched")}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#e0e0d0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
      </div>
    </aside>
  );
};