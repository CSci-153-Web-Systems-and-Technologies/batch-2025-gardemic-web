"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { GardenCard } from "./GardenCard";
import { GardenWithCount } from "@/types";

export default function GardenList() {
  const supabase = createClient();
  const [gardens, setGardens] = useState<GardenWithCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string | null>(null);


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

  useEffect(() => {
    fetchGardens();
  }, []);



  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {gardens.map((garden) => (
          <GardenCard
            key={garden.garden_id}
            garden={garden}
            onAddPlant={() => alert("Add Plant clicked")}
            onViewPlants={() => alert("View Plants clicked")}
          />
        ))}
      </div>
    </>
  );
}