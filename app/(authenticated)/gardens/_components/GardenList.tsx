"use client";

import { useCallback ,useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { GardenCard } from "./GardenCard";
import { AddPlantModal } from "../../_components/AddPlantModal";
import { ViewPlantsModal } from "../../_components/ViewPlantsModal";
import { DeleteGardenModal } from "../_components/DeleteGardenModal";
import { GardenWithCount } from "@/types";

export default function GardenList() {
  const supabase = createClient();
  const [gardens, setGardens] = useState<GardenWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const [activeGardenId, setActiveGardenId] = useState<string | null>(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // State to store the specific garden being targeted for deletion
  const [gardenToDelete, setGardenToDelete] = useState<{id: string, name: string} | null>(null);

const fetchGardens = useCallback(async () => {
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
  }, [supabase]);

  useEffect(() => {
    fetchGardens();
  }, [fetchGardens]); 


  const openAddModal = (id: string) => {
    setActiveGardenId(id);
    setIsAddModalOpen(true);
  };

  const openViewModal = (id: string) => {
    setActiveGardenId(id);
    setIsViewModalOpen(true);
  };


  const openDeleteModal = (id: string, name: string) => {
    setGardenToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsViewModalOpen(false);
    setIsDeleteModalOpen(false);
    setActiveGardenId(null);
    setGardenToDelete(null);
  };

  // 2. Performs the actual deletion after confirmation
  const executeDeleteGarden = async () => {
    if (!gardenToDelete) return;

    try {
      const { error } = await supabase
        .from("gardens")
        .delete()
        .eq("garden_id", gardenToDelete.id);

      if (error) throw error;

      // Update UI
      setGardens((prevGardens) => 
        prevGardens.filter((g) => g.garden_id !== gardenToDelete.id)
      );
      
      closeModals();
    } catch (error) {
      console.error("Error deleting garden:", error);
      alert("Failed to delete garden.");
    }
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
            onDelete={openDeleteModal} 
          />
        ))}
      </div>


      <DeleteGardenModal 
        isOpen={isDeleteModalOpen}
        onClose={closeModals}
        onConfirm={executeDeleteGarden}
        gardenName={gardenToDelete?.name ?? null}
      />

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