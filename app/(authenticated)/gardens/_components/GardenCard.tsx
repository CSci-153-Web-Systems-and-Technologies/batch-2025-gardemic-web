import Image from "next/image";
import { ActionButton } from "@/app/(authenticated)/_components/ActionButton";
import { GardenWithCount } from "@/types";
import GardenImage from "@/public/garden-card-image.jpg";

interface GardenCardProps {
  garden: GardenWithCount;
}

export function GardenCard({ garden }: GardenCardProps) {
  const formattedDate = new Date(garden.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const plantCount = garden.garden_plants?.[0]?.count ?? 0;

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

        <div className="flex gap-4 mt-auto pt-2">
            <button>Add Plant</button>
            <button>View Plants</button>
        </div>
      </div>
    </div>
  );
}