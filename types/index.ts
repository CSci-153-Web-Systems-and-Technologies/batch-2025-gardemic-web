import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

export interface InputFieldProps {
  label: string;
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
}

export interface LoginFormProps extends React.ComponentPropsWithoutRef<"div"> {}

export interface CreateAccountFormProps extends React.ComponentPropsWithoutRef<"div"> {}

export interface SidebarHeaderProps {
  isOpen: boolean;
}

export interface SidebarToggleProps {
  isLocked: boolean;
  onToggle: () => void;
}

export interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  isActive?: boolean;
  isOpen: boolean;
  onClick?: () => void;
}

export interface MenuItemConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface SidebarProfileProps {
  name: string;
  avatarUrl: string;
  isOpen: boolean;
}

export interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  children: React.ReactNode;
}

export interface DescriptionProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface Plant {
  plant_id: string;
  name: string;
  description: string | null;
  light_requirements: string | null;
  water_requirements: string | null;
  temperature_requirements: string | null;
  growth: string | null;
  created_at: string;
}

export interface Garden {
  garden_id: string;
  user_id: string;
  name: string;
  created_at: string;
}

export interface GardenPlant {
  id: string;
  garden_id: string;
  plant_id: string;
  user_id: string;
  added_at: string;
}

export interface GardenWithPlants extends Garden {
  garden_plants: {
    plant: Plant;
  }[];
}

export interface GardenWithCount extends Garden {
  garden_plants: { count: number }[];
}