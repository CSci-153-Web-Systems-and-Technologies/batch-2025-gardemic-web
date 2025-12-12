import React from 'react';
import Image from 'next/image';
import { Sun, Droplet, Thermometer, Clock, ChevronLeft } from 'lucide-react';
import { Plant } from '@/types';

import PlantImage from "@/public/plant-placeholder.png"
import CareRequirementItem from './CareRequirementItem';

interface PlantDetailProps {
  plant: Plant | null;
  onBack?: () => void; 
}

export const PlantDetail = ({ plant, onBack }: PlantDetailProps) => {
  if (!plant) {
    return (
      <div className="flex-1 flex items-center justify-center font-extrabold font-montserrat bg-accent-white text-gray-400">
        Select a plant to view details
      </div>
    );
  }

  return (
    <main className="w-full h-full bg-accent-white p-4 md:p-10 overflow-y-auto flex flex-col items-center font-montserrat">
      
      {/* Mobile Back Button */}
      <div className="w-full max-w-3xl mb-4 md:hidden">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to List
        </button>
      </div>

      <div className="max-w-3xl w-full bg-white rounded-xl shadow-sm border border-black p-6 md:p-12 mb-20 md:mb-0">
        
        {/* Header */}
        <div className="border-b border-gray-200 pb-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-full md:w-24 h-48 md:h-24 relative rounded-lg overflow-hidden bg-gray-100 shadow-inner">
               <Image 
                 src={plant.image_url || PlantImage} 
                 alt={plant.name} 
                 fill 
                 className="object-cover"
               />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-1">{plant.name}</h1>
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