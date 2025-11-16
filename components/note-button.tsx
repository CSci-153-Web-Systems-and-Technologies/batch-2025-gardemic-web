"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NoteButton() {
    const router = useRouter();

    const movePage = async () => {
        router.push("protected/notes");
    };

    return (
        <>
            <Button
            onClick={movePage}>
                Notes
            </Button>
        </>
    );
    
};