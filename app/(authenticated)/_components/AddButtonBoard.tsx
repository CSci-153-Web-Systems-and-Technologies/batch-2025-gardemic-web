"use client";

import { ActionButton } from "./ActionButton";

export default function ButtonBoard() {
    const handleAddTask = () => {
        alert('Add Task clicked!');
    }

    const handleAddGarden = () => {
        alert('Add Garden clicked!');
    }

    return (
        <div className="flex items-center gap-6 py-4 pr-10">
            <ActionButton onClick={handleAddTask}>
                Add Task
            </ActionButton>

            <ActionButton onClick={handleAddGarden}>
                Add Garden
            </ActionButton>
        </div>
    )
}