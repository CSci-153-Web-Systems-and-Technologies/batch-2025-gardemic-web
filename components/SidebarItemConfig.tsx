import { 
  ClipboardList, 
  BookOpen, 
  Sprout, 
  Bell, 
  Settings 
} from 'lucide-react';

import { MenuItemConfig } from '@/types';

export const PrimarySidebarItems: MenuItemConfig[] = [
  { id: 'Tasks', label: 'Tasks', icon: <ClipboardList size={20} /> },
  { id: 'Plant List', label: 'Plant List', icon: <Sprout size={20} /> },
  { id: 'Journal', label: 'Journal', icon: <BookOpen size={20} /> },
];

export const SecondarySidebarItems: MenuItemConfig[] = [
  { id: 'Notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { id: 'Settings', label: 'Settings', icon: <Settings size={20} /> },
];