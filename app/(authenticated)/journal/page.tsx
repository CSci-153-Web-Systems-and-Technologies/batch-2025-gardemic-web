'use client';

import React, { useState, useEffect } from 'react';

import { useJournal } from '@/hooks/use-journal'; 

import JournalSidebar from './_components/EntrySidebar';
import EntryContent from './_components/EntryContent';
import EditEntryModal from './_components/EditModal';
import DeleteEntryModal from './_components/DeleteEntryModal';
import { JournalEntry } from '@/types';

export default function JournalPage() 
{
    const { 
    entries, 
    loading, 
    totalCount, 
    currentPage, 
    setCurrentPage, 
    searchQuery, 
    setSearchQuery, 
    createEntry,
    updateEntry, 
    deleteEntry 
  } = useJournal();

  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);


  useEffect(() => {
    if (!loading && entries.length > 0) {
      const isSelectedInList = entries.some(e => e.journal_id === selectedEntry?.journal_id);
      
      if (!selectedEntry || !isSelectedInList) {
        setSelectedEntry(entries[0]);
      }
    } else if (entries.length === 0) {
      setSelectedEntry(null);
    }
  }, [entries, loading, selectedEntry]);


  const handleSave = async (id: string, title: string, content: string) => {
    await updateEntry(id, title, content);
    setSelectedEntry(prev => prev ? { ...prev, title, content } : null);

    setIsEditOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedEntry) {

      await deleteEntry(selectedEntry.journal_id);
      

      setIsDeleteOpen(false);
      setSelectedEntry(null); 

    }
  };

  const handleCreateEntry = async () => {
    const newEntry = await createEntry();
    if (newEntry) {
      setSelectedEntry(newEntry); 
      setIsEditOpen(true); 
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans bg-[#FDFCF6]">
      

      <JournalSidebar 
        entries={entries}
        selectedId={selectedEntry?.journal_id || null}
        onSelect={setSelectedEntry}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalCount={totalCount}
        onCreate={handleCreateEntry}
      />


      <main className="flex-1 h-full relative">
        {loading && entries.length === 0 ? (

           <div className="flex h-full w-full items-center justify-center text-gray-400 animate-pulse">
             Loading journal entries...
           </div>
        ) : (
          <EntryContent 
            entry={selectedEntry} 
            onEdit={() => setIsEditOpen(true)}
            onDelete={() => setIsDeleteOpen(true)}
          />
        )}
      </main>


      {selectedEntry && (
        <>
          <EditEntryModal 
            entry={selectedEntry}
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            onSave={handleSave}
          />
          
          <DeleteEntryModal 
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </div>
  );
}