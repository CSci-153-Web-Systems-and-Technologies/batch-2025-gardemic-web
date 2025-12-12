import Image from "next/image";
import { ActionButton } from "@/app/(authenticated)/_components/ActionButton";
import { GardenWithCount } from "@/types";
import GardenImage from "@/public/garden-card-image.jpg";

interface GardenCardProps {
  garden: GardenWithCount;
  onAddPlant: (id: string) => void;
  onViewPlants: (id: string) => void;
  onDelete: (id: string) => void;
}

export function GardenCard({ garden, onAddPlant, onViewPlants, onDelete }: GardenCardProps) {
  const formattedDate = new Date(garden.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const plantCount = garden.garden_plants?.[0]?.count ?? 0;

  const handleDeleteClick = () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${garden.name}"? This cannot be undone.`);
    if (confirmed) {
      onDelete(garden.garden_id);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl font-montserrat shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full">
      <div className="relative w-full h-32 bg-gray-200">
        <Image 
          src={GardenImage} 
          alt={garden.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col grow p-4 gap-4">
        {/* Header */}
        <div>
          <h3 className="text-xl font-semibold text-black">{garden.name}</h3>
          
          <div className="mt-2 space-y-1 text-sm text-gray-700">
            <p>Created: {formattedDate}</p>
            <p>Plant Kinds Present: {plantCount}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          <ActionButton onClick={() => onAddPlant(garden.garden_id)}>
            Add Plant
          </ActionButton>
          
          <ActionButton onClick={() => onViewPlants(garden.garden_id)}>
            View Plants
          </ActionButton>

          {/* Delete Button */}
          <ActionButton 
            onClick={handleDeleteClick}
            className="bg-red-500 hover:bg-red-600 border-red-500 text-white ml-auto"
          >
            Delete
          </ActionButton>
        </div>
      </div>
    </div>
  );
}