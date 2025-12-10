import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { ActionButtonProps } from "@/types";

export function ActionButton({ className, children, ...props }: ActionButtonProps) {

    return (
        <Button 
            {...props}
            className={cn("bg-primary-green hover:bg-accent-green text-white hover:text-black font-montserrat font-normal text-md px-4 py-6 rounded-md shadow-sm transition-colors"
            , className)}
        >
            {children}
        </Button>
    );

}