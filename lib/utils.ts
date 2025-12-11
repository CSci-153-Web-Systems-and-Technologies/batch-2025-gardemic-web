import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { JournalEntry, GroupedEntries } from '@/types';
import { Task } from "@/types";


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

export type TaskStatus = 'Ongoing' | 'Overdue' | 'Completed';

export const getTaskStatus = (task: Task, isMarkedComplete: boolean) => {
  // 1. Check Local State (Optimistic UI for immediate feedback)
  if (isMarkedComplete) return 'Completed';


  if (task.task_status === 'Completed') return 'Completed';

  if (task.end_date) {
    const today = new Date();
    const dueDate = new Date(task.end_date);
    today.setHours(0, 0, 0, 0); 
    dueDate.setHours(0, 0, 0, 0);

    if (today > dueDate) return 'Overdue';
  }

  return 'Ongoing';
}