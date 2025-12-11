import { JournalEntry } from "@/types";
import { Trash2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface EntryContentProps
{
  entry: JournalEntry | null; 
  onEdit: () => void; 
  onDelete: () => void;    
}

const EntryContent = ({ 
  entry, 
  onEdit, 
  onDelete 
}: EntryContentProps) => {
  if (!entry) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-[#FDFCF6] text-gray-400">
        Select an entry to view details
      </div>
    );
  }

  return (
    <div className="flex h-full w-full justify-center overflow-y-auto bg-[#FDFCF6] p-8">
      <div className="w-full max-w-3xl rounded-xl border border-gray-300 bg-[#F2F1EA] p-8 shadow-sm h-fit min-h-[600px] relative">
        

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
          <h1 className="mb-2 text-4xl font-bold text-gray-900">{entry.title}</h1>
          <p className="text-sm text-gray-500">Date: {formatDate(entry.created_at)}</p>
        </div>

        <hr className="border-gray-300 mb-8" />

        <div className="prose prose-stone max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
          {entry.content}
        </div>

        <hr className="border-gray-400 mt-12" />
      </div>
    </div>
  );
};

export default EntryContent;