"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ActionButton } from "./ActionButton";
import { notificationService } from "@/services/notificationService";

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

      try {
        const userName = user.user_metadata?.full_name || "User";
        
        await notificationService.create({
            userId: user.id,
            username: userName,
            type: 'Garden Creation',
            actionDetails: `created a garden, ${name}`,
            additionalInfo: description || `A new space for your plants named ${name}.`
        });
      } catch (notifyError) {
        console.error("Notification failed:", notifyError);
      }

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
    <div className="fixed inset-0 z-50 flex items-center justify-center font-montserrat bg-black/60 backdrop-blur-sm px-4">

      <div className="bg-accent-white border-2 border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative">
        
        <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-5">
          
          <div className="text-center space-y-2 mb-2">
            <h2 className="text-3xl font-bold text-black font-serif">Create New Garden</h2>
            <p className="text-gray-600 text-sm">
              Create a new garden to organize your plant spaces.
            </p>
          </div>

          <div className="space-y-1">
            <label htmlFor="gardenName" className="block text-base font-semibold text-gray-900">
              Garden Name
            </label>
            <input
              id="gardenName"
              type="text"
              placeholder="e.g: Veggie Garden"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 bg-white"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="gardenDesc" className="block text-base font-semibold text-gray-900">
              Description (optional)
            </label>
            <textarea
              id="gardenDesc"
              rows={4}
              placeholder="Describe your garden."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-700 bg-white resize-none"
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded border border-red-200 text-center">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center mt-4 pt-2 gap-4">
            
            <ActionButton 
              type="submit" 
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Garden"}
            </ActionButton>

            <ActionButton 
              variant={"destructive"}
              onClick={onClose}
              className="bg-destructive-red hover:bg-destructive-dark-red text-white font-medium text-lg px-8 py-2 rounded-md shadow-sm transition-colors"
            >
              Cancel
            </ActionButton>
            
          </div>

        </form>
      </div>
    </div>
  );
}