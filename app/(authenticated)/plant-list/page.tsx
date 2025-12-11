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

  // 1. Fetch Data
  useEffect(() => {
    const fetchPlants = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('plants')
        .select('*')
        .order('name');
      
      if (!error && data) {
        setPlants(data);
        if (data.length > 0) setSelectedPlant(data[0]); // Default to first item
      }
      setLoading(false);
    };

    fetchPlants();
  }, []);

  if (loading) return <div>Loading...</div>;

  // 2. Render Layout
  return (
    <div className="flex h-screen w-full overflow-hidden bg-accent-white">
      {/* Left Sidebar */}
      <PlantSidebar 
        plants={plants} 
        selectedId={selectedPlant?.plant_id || null} 
        onSelect={setSelectedPlant} 
      />
      
      {/* Right Detail View */}
      <PlantDetail 
        plant={selectedPlant} 
      />
    </div>
  );
}