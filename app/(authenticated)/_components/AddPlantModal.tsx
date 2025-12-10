"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { Plant } from "@/types";

interface AddPlantModalProps {
  gardenId: string;
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onPlantAdded: () => void;
}

export function AddPlantModal({ gardenId, userId, isOpen, onClose, onPlantAdded }: AddPlantModalProps) {
  const supabase = createClient();
  const [allPlants, setAllPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(false);
  const [addingId, setAddingId] = useState<string | null>(null);


  useEffect(() => {
    if (!isOpen) return;
    
    const fetchLibrary = async () => {
      setLoading(true);
      const { data } = await supabase.from("plants").select("*");
      if (data) setAllPlants(data);
      setLoading(false);
    };

    fetchLibrary();
  }, [isOpen, supabase]);

  const handleAddToGarden = async (plantId: string) => {
    setAddingId(plantId);
    
    const { error } = await supabase.from("garden_plants").insert({
      garden_id: gardenId,
      plant_id: plantId,
      user_id: userId, 
    });

    if (error) {
      console.error("Error adding plant:", error);
      alert("Failed to add plant");
    } else {
      onPlantAdded(); 
      onClose();
    }
    setAddingId(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Add a Plant</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto grow">
          {loading ? (
            <p className="text-center text-gray-500">Loading library...</p>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {allPlants.map((plant) => (
                <div key={plant.plant_id} className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-medium">{plant.name}</p>
                    <p className="text-sm text-gray-500 truncate max-w-50">{plant.description}</p>
                  </div>
                  <Button 
                    size="sm"
                    disabled={addingId === plant.plant_id}
                    onClick={() => handleAddToGarden(plant.plant_id)}
                    className="bg-primary-green hover:bg-accent-green text-white"
                  >
                    {addingId === plant.plant_id ? "Adding..." : <Plus size={18} />}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}