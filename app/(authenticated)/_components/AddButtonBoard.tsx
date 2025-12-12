"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ActionButton } from "./ActionButton";
import { useState } from "react";

export default function ButtonBoard() {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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
            <ActionButton onClick={handleLogout} variant={"destructive"} className="bg-destructive-red hover:bg-destructive-dark-red text-white font-medium text-lg px-6 py-5 rounded-md shadow-sm transition-colors">
                {isLoading ? "Logging out..." : "Logout"}
            </ActionButton>
        </div>
    )
}