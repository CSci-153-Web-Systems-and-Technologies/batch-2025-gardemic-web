import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { ActionButton } from '../../_components/ActionButton';

type SidebarProps = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onCreate: () => void
};

const JournalSidebar = ({ 
  searchQuery, 
  setSearchQuery,
  onCreate
}: SidebarProps) => {
  

  return (
    <div className="flex h-full w-full flex-col border-r border-[#dcdcdc] bg-[#FDFCF6] p-4 md:w-80 lg:w-96">
      
      <div className="mb-6 flex items-center justify-between gap-2">
        <h2 className="text-xl font-bold text-gray-800">Journal</h2> 
        <ActionButton 
          onClick={onCreate}
          className="flex items-center gap-2 py-2 px-3 text-xs font-medium h-fit"
        >
          <Plus size={16} />
          <span>New Entry</span>
        </ActionButton>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-full border border-gray-200 bg-white py-2 pl-10 pr-10 text-sm shadow-sm focus:border-green-500 focus:outline-none"
        />
        <SlidersHorizontal className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-500" />
      </div>


    </div>
  );
};

export default JournalSidebar;