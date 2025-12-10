"use client";

import Description from "../_components/Description";
import GardenList from "./_components/GardenList";
import AddGardenButton from "./_components/AddGardenButton";
import { AddGardenModal } from "../_components/AddGardenModel";
import { useState } from "react";

export default function GardensPage()
{
    const [isGardenModalOpen, setIsGardenModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    
    
    const handleGardenAdded = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    return (
        <>
          <div className="bg-accent-white h-full">
            <Description title="My Gardens" subtitle="Organize your plants via garden spaces"> 
                <AddGardenButton onAddGardenClick={() => setIsGardenModalOpen(true)}/>
            </Description>
            <GardenList key={refreshTrigger}/>

            <AddGardenModal 
                isOpen={isGardenModalOpen}
                onClose={() => setIsGardenModalOpen(false)}
                onGardenAdded={handleGardenAdded}
            />
          </div>
        </>
    );
}