import Modal from "@/components/ui/modal";

interface DeleteGardenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  gardenName: string | null;
}

export const DeleteGardenModal = ({
  isOpen,
  onClose,
  onConfirm,
  gardenName,
}: DeleteGardenModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Garden?">
      <div className="space-y-4 font-montserrat">
        <p className="text-gray-600">
          Are you sure you want to delete <span className="font-semibold text-black">{gardenName}</span>? 
          This process is <span className="font-bold text-red-600">irreversible</span> and will remove all plants associated with it.
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-black hover:text-white hover:bg-primary-green transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-lg bg-destructive-red px-4 py-2 text-white hover:bg-red-900 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};