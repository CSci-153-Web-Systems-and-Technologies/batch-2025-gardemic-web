"use client";

import { useState, useEffect } from 'react';
import Modal from "@/components/ui/modal"

import { JournalEntry } from '@/types';

interface EntryModalProps
{
    entry: JournalEntry,
    isOpen: boolean,
    onClose: () => void,
    onSave: (id: string, title: string, content: string) => void
}


const EditEntryModal = ({ entry, isOpen, onClose, onSave }: EntryModalProps) => {
  const [title, setTitle] = useState(entry.title);
  const [content, setContent] = useState(entry.content);

  // Sync state when entry changes
  useEffect(() => {
    setTitle(entry.title);
    setContent(entry.content);
  }, [entry]);

  const handleFinish = () => {
    onSave(entry.journal_id, title, content);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleFinish}> 
      <div className="flex flex-col gap-4">
        <input 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-transparent text-3xl font-bold text-gray-800 focus:outline-none border-b border-transparent focus:border-green-600 placeholder-gray-400"
          placeholder="Entry Title"
        />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-64 w-full resize-none bg-transparent text-lg text-gray-600 focus:outline-none placeholder-gray-400"
          placeholder="Write your thoughts..."
        />
        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button 
            onClick={handleFinish}
            className="rounded-lg bg-green-700 px-6 py-2 text-white hover:bg-green-800 transition-colors"
          >
            Finish Entry
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditEntryModal;