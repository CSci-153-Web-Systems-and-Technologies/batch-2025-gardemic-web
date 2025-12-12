'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Plant } from '@/types';
import { PlantSidebar } from './_components/PlantSidebar';
import { PlantDetail } from './_components/PlantDetail';

export default function GardenPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [loading, setLoading] = useState(true);
  
  // New state to control mobile overlay visibility
  const [showMobileDetail, setShowMobileDetail] = useState(false);

  useEffect(() => {
    const fetchPlants = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .order('name');
      
      if (!error && data) {
        setPlants(data);
        if (data.length > 0) {
           setSelectedPlant(data[0]); 
        }
      }
      setLoading(false);
    };

    fetchPlants();
  }, []);

  const handlePlantSelect = (plant: Plant) => {
    setSelectedPlant(plant);
    setShowMobileDetail(true); // Trigger the overlay on mobile
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-accent-white relative">
      <PlantSidebar 
        plants={plants} 
        selectedId={selectedPlant?.plant_id || null} 
        onSelect={handlePlantSelect} 
      />
      

      <div 
        className={`
          fixed inset-0 z-50 bg-accent-white transition-transform duration-300 ease-in-out
          ${showMobileDetail ? 'translate-x-0' : 'translate-x-full'}
          md:relative md:inset-auto md:transform-none md:flex-1 md:translate-x-0
        `}
      >
        <PlantDetail 
          plant={selectedPlant} 
          onBack={() => setShowMobileDetail(false)}
        />
      </div>
    </div>
  );
}