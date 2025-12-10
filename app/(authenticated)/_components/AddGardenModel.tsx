"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface AddGardenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGardenAdded: () => void;
}

export function AddGardenModal({ isOpen, onClose, onGardenAdded }: AddGardenModalProps) {
  const supabase = createClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("You must be logged in.");

      const { error: insertError } = await supabase
        .from("gardens")
        .insert({
          name: name,
          description: description,
          user_id: user.id,
        });

      if (insertError) throw insertError;

      setName("");
      setDescription("");

      onGardenAdded();
      onClose();

    } catch (err: any) {
      console.error("Error creating garden:", err);
      setError(err.message || "Failed to create garden.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white p-6 rounded-md w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2>Create Garden</h2>
          <input 
            placeholder="Name" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="border p-2" 
            required 
          />
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
            className="border p-2" 
          />
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose}>Cancel</button>
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}