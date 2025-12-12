import Modal from "@/components/ui/modal"

interface DeleteEntryModalProps
{
    isOpen: boolean; 
    onClose: () => void; 
    onConfirm: () => void
}

const DeleteEntryModal = ({ isOpen, onClose, onConfirm }: DeleteEntryModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Entry?">
      <div className="space-y-4">
        <p className="text-gray-600">
          Are you sure you want to delete this entry? This process is <span className="font-bold text-red-600">irreversible</span>.
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={onClose} className="rounded-lg px-4 py-2 text-black hover:text-white hover:bg-primary-green transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="rounded-lg bg-destructive-red px-4 py-2 text-white hover:bg-red-900 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteEntryModal;