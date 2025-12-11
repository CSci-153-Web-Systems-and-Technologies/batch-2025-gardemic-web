import React from 'react';
import Image from 'next/image';
import { Sun, Droplet, Thermometer, Clock } from 'lucide-react';
import { Plant } from '@/types';

import PlantImage from "@/public/plant-placeholder.png"
import CareRequirementItem from './CareRequirementItem';

interface PlantDetailProps {
  plant: Plant | null;
}

export const PlantDetail = ({ plant }: PlantDetailProps) => {
  if (!plant) {
    return (
      <div className="flex-1 flex items-center justify-center font-extrabold font-montserrat bg-accent-white text-gray-400">
        Select a plant to view details
      </div>
    );
  }

  return (
    <main className="flex-1 bg-accent-white p-6 md:p-10 h-full overflow-y-auto flex justify-center font-montserrat">
      <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm border border-black p-8 md:p-12 min-h-200">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 relative rounded-lg overflow-hidden bg-gray-100 shadow-inner">
               <Image 
                 src={plant.image_url || PlantImage} 
                 alt={plant.name} 
                 fill 
                 className="object-cover"
               />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-1">{plant.name}</h1>
              <p className="text-lg text-gray-400 italic font-light">
                {plant.scientific_name || 'Scientific name unavailable'}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <section className="mb-8 border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About</h2>
          <p className="text-black leading-relaxed text-md">
            {plant.description || "No description available."}
          </p>
        </section>

        {/* Care Grid */}
        <section className="border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Care Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
            <CareRequirementItem 
              icon={<Sun className="w-6 h-6" />}
              label="Light"
              value={plant.light_requirements}
            />
            <CareRequirementItem 
              icon={<Droplet className="w-6 h-6" />}
              label="Water"
              value={plant.water_requirements}
            />
            <CareRequirementItem 
              icon={<Thermometer className="w-6 h-6" />}
              label="Temperature"
              value={plant.temperature_requirements}
            />
            <CareRequirementItem 
              icon={<Clock className="w-6 h-6" />}
              label="Growth Rate"
              value={plant.growth}
            />
          </div>
        </section>
      </div>
    </main>
  );
};