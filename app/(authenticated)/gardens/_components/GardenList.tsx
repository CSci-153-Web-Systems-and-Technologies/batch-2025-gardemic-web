"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { GardenCard } from "./GardenCard";
import { AddPlantModal } from "../../_components/AddPlantModal";
import { ViewPlantsModal } from "../../_components/ViewPlantsModal";
import { GardenWithCount } from "@/types";

export default function GardenList() {
  const supabase = createClient();
  const [gardens, setGardens] = useState<GardenWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const [activeGardenId, setActiveGardenId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);


  const fetchGardens = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user?.id ?? null);

      const { data, error } = await supabase
        .from("gardens")
        .select("*, garden_plants(count)")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setGardens(data as unknown as GardenWithCount[]);
    } catch (error) {
      console.error("Error loading gardens:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGarden = async (gardenId: string) => {
    try {
      const { error } = await supabase
        .from("gardens")
        .delete()
        .eq("garden_id", gardenId);

      if (error) throw error;

      setGardens((prevGardens) => 
        prevGardens.filter((g) => g.garden_id !== gardenId)
      );
      
    } catch (error) {
      console.error("Error deleting garden:", error);
      alert("Failed to delete garden. Please try again.");
    }
  };

  useEffect(() => {
    fetchGardens();
  }, []);


  const openAddModal = (id: string) => {
    setActiveGardenId(id);
    setIsAddModalOpen(true);
  };

  const openViewModal = (id: string) => {
    setActiveGardenId(id);
    setIsViewModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsViewModalOpen(false);
    setActiveGardenId(null);
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {gardens.map((garden) => (
          <GardenCard
            key={garden.garden_id}
            garden={garden}
            onAddPlant={openAddModal}
            onViewPlants={openViewModal}
            onDelete={handleDeleteGarden} 
          />
        ))}
      </div>

      {activeGardenId && currentUser && (
        <>
          <AddPlantModal
            isOpen={isAddModalOpen}
            onClose={closeModals}
            gardenId={activeGardenId}
            userId={currentUser}
            onPlantAdded={fetchGardens}
          />
          
          <ViewPlantsModal
            isOpen={isViewModalOpen}
            onClose={closeModals}
            gardenId={activeGardenId}
          />
        </>
      )}
    </>
  );
}