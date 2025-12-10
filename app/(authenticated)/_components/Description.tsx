import { cn } from "@/lib/utils";
import { DescriptionProps } from "@/types";

export default function Description({ title, subtitle, children, className }: DescriptionProps)
{
    return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-2 ml-6 mt-2", className)}>
      <div>
        <h1 className="text-2xl font-bold font-montserrat text-gray-900">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-500 font-montserrat text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>
      

      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}