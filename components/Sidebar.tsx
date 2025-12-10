import { useState } from "react";
import { SidebarHeader } from "./SidebarHeader"
import { SidebarToggle } from "./ui/sidebar-toggle"
import { SidebarItem } from "./ui/sidebar-item";
import { PrimarySidebarItems, SecondarySidebarItems } from "./SidebarItemConfig";
import { useSidebarLogic } from "@/hooks/sidebar-logic"
import { SidebarProfile } from "./SidebarProfile";

import { MenuItemConfig } from "@/types";

export default function Sidebar() {
    const { isOpen, isLocked, toggleLock, containerProps } = useSidebarLogic();
    const [activeItem, setActiveItem] = useState('Tasks');

    const renderNavItems = (items: MenuItemConfig[]) => (
    items.map((item) => (
      <SidebarItem 
        key={item.id}
        icon={item.icon} 
        label={item.label} 
        isOpen={isOpen} 
        isActive={activeItem === item.id}
        onClick={() => setActiveItem(item.id)}
      />
    ))
  );

    return (
        <>
            <aside
                {...containerProps}
                className={`
                    shrink-0 relative h-screen bg-accent-green shadow-xl flex flex-col py-6 px-3
                    transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]
                    ${isOpen ? 'w-64' : 'w-20'}
                `}
            >
                <SidebarToggle isLocked={isLocked} onToggle={toggleLock} />

                <SidebarHeader isOpen={isOpen} />

                {/* --- Main Navigation --- */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2 no-scrollbar">
                    {renderNavItems(PrimarySidebarItems)}
                </div>

                <div className="my-4 border-t border-sage-600/50 w-full" />

                {/* --- Secondary Navigation --- */}
                <div className="mb-6 space-y-2">
                    {renderNavItems(SecondarySidebarItems)}
                </div>

                <SidebarProfile 
                    name="Froakie" 
                    avatarUrl="https://picsum.photos/200" 
                    isOpen={isOpen}
                />
            </aside>
        </>
    )
}