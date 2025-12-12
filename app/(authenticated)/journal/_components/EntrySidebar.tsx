import React, { useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { JournalEntry } from '@/types'; 
import { formatDate, groupEntriesByMonthYear } from '@/lib/utils'; 
import { ActionButton } from '../../_components/ActionButton';

type SidebarProps = {
  entries: JournalEntry[];
  selectedId: string | null;
  onSelect: (entry: JournalEntry) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  onCreate: () => void
};

const JournalSidebar = ({ 
  entries, 
  selectedId, 
  onSelect, 
  searchQuery, 
  setSearchQuery,
  currentPage,
  onPageChange,
  totalCount,
  onCreate
}: SidebarProps) => {
  
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const groupedEntries = useMemo(() => groupEntriesByMonthYear(entries), [entries]);

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

      {/* Entry List - Added pb-24 for mobile nav clearance */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-24 md:pb-0">
        {entries.length === 0 ? (
          <div className="mt-10 text-center text-sm text-gray-500">
            {searchQuery ? "No matches found." : "No notes created, create entry?"}
          </div>
        ) : (
          Object.entries(groupedEntries).map(([group, groupEntries]) => (
            <div key={group} className="mb-6">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                {group}
              </h3>
              <div className="space-y-3">
                {groupEntries.map((entry) => (
                  <button
                    key={entry.journal_id}
                    onClick={() => onSelect(entry)}
                    className={`flex w-full flex-col items-start rounded-lg border p-3 transition-all hover:shadow-md ${
                      selectedId === entry.journal_id
                        ? 'border-l-4 border-l-green-500 border-y-white border-r-white  bg-white shadow-md'
                        : 'border-transparent bg-white shadow-sm hover:border-gray-200'
                    }`}
                  >
                    <div className="mb-1 w-full truncate text-left font-bold text-gray-800">
                      {entry.title}
                    </div>
                    <div className="mb-2 text-xs text-gray-400">
                      Made: {formatDate(entry.created_at)}
                    </div>
                    <p className="line-clamp-2 w-full text-left text-sm text-gray-600">
                      {entry.content}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 pb-20 md:pb-0">
          <button 
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            className="rounded p-1 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="text-xs text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            className="rounded p-1 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default JournalSidebar;