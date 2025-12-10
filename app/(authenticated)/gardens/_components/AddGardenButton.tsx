import { ActionButton } from "../../_components/ActionButton"

interface AddGardenButtonProps {
    onAddGardenClick: () => void;
}
export default function AddGardenButton({onAddGardenClick}: AddGardenButtonProps) 
{
    const handleAddGardenClick = () => {
        onAddGardenClick();
    }

    return (
        <ActionButton onClick={handleAddGardenClick}>
            Add Garden
        </ActionButton>
    )
}