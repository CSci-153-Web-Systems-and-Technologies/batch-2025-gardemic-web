import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { JournalEntry, GroupedEntries } from '@/types';


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const groupEntriesByMonthYear = (entries: JournalEntry[]): GroupedEntries => {
  return entries.reduce((groups, entry) => {
    const date = new Date(entry.created_at);
    const key = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(entry);
    return groups;
  }, {} as GroupedEntries);
};