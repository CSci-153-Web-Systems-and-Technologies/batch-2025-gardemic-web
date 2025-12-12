import { JournalEntry } from "@/types";
import { Trash2, ChevronLeft } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EntryContentProps
{
  entry: JournalEntry | null; 
  onEdit: () => void; 
  onDelete: () => void;
  onBack?: () => void;
}

const EntryContent = ({ 
  entry, 
  onEdit, 
  onDelete,
  onBack 
}: EntryContentProps) => {
  if (!entry) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-accent-white text-gray-400">
        Select an entry to view details
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full overflow-hidden bg-accent-white p-4 md:p-8">
      
      {/* Mobile Back Button */}
      <div className="w-full max-w-3xl mx-auto mb-2 md:hidden">
        <button 
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 font-semibold text-sm transition-colors py-2"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Journal
        </button>
      </div>

      <div className="flex-1 w-full flex justify-center overflow-y-auto">
        <div className="w-full max-w-3xl rounded-xl border border-gray-300 bg-white/80 p-6 md:p-8 shadow-sm h-fit min-h-150 relative mb-20 md:mb-0">
          
          <div className="flex justify-end gap-2 mb-4">
            <button 
              onClick={onEdit} 
              className="flex items-center gap-2 rounded bg-[#3A5A40] px-4 py-2 text-sm text-white hover:bg-[#344e37] transition-colors"
            >
              Edit Entry
            </button>
            <button 
              onClick={onDelete}
              className="flex items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-200 hover:text-red-600 transition-colors"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <hr className="border-gray-400 mb-8" />

          {/* Content */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl md:text-4xl font-bold text-gray-900 wrap-break-words">{entry.title}</h1>
            <p className="text-sm text-gray-500">Date: {formatDate(entry.created_at)}</p>
          </div>

          <hr className="border-gray-300 mb-8" />

          <div className="prose prose-stone max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
            {entry.content}
          </div>

          <hr className="border-gray-400 mt-12" />
        </div>
      </div>
    </div>
  );
};

export default EntryContent;