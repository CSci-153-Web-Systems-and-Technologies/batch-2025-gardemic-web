import ButtonBoard from "../_components/AddButtonBoard";
import { NavBoard } from "../_components/NavBoard";

export default function Protected()
{
    return (
        <div className="flex flex-col h-38 bg-accent-white">
            <div className="flex flex-row justify-between h-24 border-b-4 border-b-black/20">
                <div className="text-3xl font-montserrat font-bold py-6.5 pl-6">
                    Tasks
                </div>

                <ButtonBoard />

            </div>
            <div className="w-full h-14 border-b-4 border-b-black/20">
                <NavBoard />
            </div>
        </div>
    );
}