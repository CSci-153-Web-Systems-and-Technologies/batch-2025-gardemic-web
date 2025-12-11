'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Plant } from '@/types';
import { cn } from '@/lib/utils';

interface PlantSidebarProps {
  plants: Plant[];
  selectedId: string | null;
  onSelect: (plant: Plant) => void;
}

export const PlantSidebar = ({ plants, selectedId, onSelect }: PlantSidebarProps) => {
  const [search, setSearch] = useState('');

  const filteredPlants = plants.filter((p) => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-[#e0e0d0] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
      </div>

      {/* Scrollable List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
        {filteredPlants.map((plant) => {
          const isSelected = selectedId === plant.plant_id;
          return (
            <button
              key={plant.plant_id}
              onClick={() => onSelect(plant)}
              className={cn(
                "w-full flex items-center gap-4 p-3 rounded-lg transition-all duration-200 text-left relative overflow-hidden group",
                isSelected ? "bg-white shadow-sm" : "hover:bg-white/60"
              )}
            >
              {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-linear-to-b from-green-400 to-emerald-600" />}

              <div className="w-12 h-12 relative rounded-md overflow-hidden bg-gray-100 shrink-0">
                 <Image 
                   src={plant.image_url || "/placeholder-plant.png"} 
                   alt={plant.name} 
                   fill 
                   className="object-cover"
                 />
              </div>

              <div>
                <h3 className={cn("font-semibold text-sm", isSelected ? "text-gray-900" : "text-gray-700")}>
                  {plant.name}
                </h3>
                <p className="text-xs text-gray-400 italic">
                  {plant.scientific_name || 'Species unknown'}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
};