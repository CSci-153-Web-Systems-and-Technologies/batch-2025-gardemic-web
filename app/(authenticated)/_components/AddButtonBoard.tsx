"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ActionButton } from "./ActionButton";
import { useState } from "react";

export default function ButtonBoard() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleAddTask = () => {
        alert('Add Task clicked!');
    }

    const handleAddGarden = () => {
        alert('Add Garden clicked!');
    }

    const handleLogout = async () => {
        setIsLoading(true);
        const supabase = createClient();

        await supabase.auth.signOut();

        router.refresh();

        router.push("/");

        setIsLoading(false);
    }

    return (
        <div className="flex items-center gap-6 py-4 pr-10">
            <ActionButton onClick={handleAddTask}>
                Add Task
            </ActionButton>

            <ActionButton onClick={handleAddGarden}>
                Add Garden
            </ActionButton>

            <ActionButton onClick={handleLogout} variant={"destructive"}>
                {isLoading ? "Logging out..." : "Logout"}
            </ActionButton>
        </div>
    )
}