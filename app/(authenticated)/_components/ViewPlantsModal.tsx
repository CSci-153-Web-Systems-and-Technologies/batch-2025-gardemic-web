"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client"; 
import { Button } from "@/components/ui/button"; 
import { X } from "lucide-react";

interface ViewPlantsModalProps {
  gardenId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewPlantsModal({ gardenId, isOpen, onClose }: ViewPlantsModalProps) {
  const supabase = createClient();
  const [plants, setPlants] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const fetchGardenPlants = async () => {
      setLoading(true);

      const { data, error } = await supabase
        .from("garden_plants")
        .select(`
          list_id,
          added_at,
          plant:plants (
            plant_id,
            name,
            growth
          )
        `)
        .eq("garden_id", gardenId);

      if (!error && data) {
        setPlants(data);
      }
      setLoading(false);
    };

    fetchGardenPlants();
  }, [gardenId, isOpen, supabase]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 font-montserrat">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Garden Plants</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto grow">
          {loading ? (
            <p className="text-center text-gray-500">Loading plants...</p>
          ) : plants.length === 0 ? (
            <p className="text-center text-gray-500">No plants in this garden yet.</p>
          ) : (
            <ul className="space-y-3">
              {plants.map((item) => (
                <li key={item.list_id} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border">
                  <div>
                    <p className="font-medium text-gray-900">{item.plant.name}</p>
                    <p className="text-sm text-gray-500">Growth: {item.plant.growth}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    Added: {new Date(item.added_at).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <Button onClick={onClose} className="w-full bg-gray-200 text-black hover:bg-gray-300">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}