import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/utils/supabase/client'; 
import { JournalEntry } from '@/types';

export const useJournal = () => {
  const supabase = createClient();
  
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const ITEMS_PER_PAGE = 10;

  const fetchEntries = useCallback(async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('journal_entries')
        .select('*', { count: 'exact' });

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      setEntries(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching entries:', error);
    } finally {
      setLoading(false);
    }
  }, [supabase, currentPage, searchQuery]);

  const createEntry = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user)
    {
    console.error("User must be logged in to create an entry");
      return null;
    }
    
    const newEntry = {
      title: 'Untitled Entry',
      content: '',
      user_id: user.id, 
    };

    const { data, error } = await supabase
      .from('journal_entries')
      .insert([newEntry])
      .select()
      .single(); 

    if (error) throw error;

    await fetchEntries();
    
    return data; } catch (error) {
    console.error('Error creating entry:', error);
    return null;
  }
};
  
  const updateEntry = async (id: string, title: string, content: string) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .update({ title, content })
        .eq('journal_id', id);

      if (error) throw error;
      
      fetchEntries(); 
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('journal_id', id);

      if (error) throw error;
      
      if (entries.length === 1 && currentPage > 1) {
        setCurrentPage(p => p - 1);
      } else {
        fetchEntries();
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEntries();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchEntries]);

  return {
    entries,
    loading,
    totalCount,
    currentPage,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    updateEntry,
    createEntry,
    deleteEntry,
    refresh: fetchEntries
  };
};