interface CareRequirementItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | null;
  subtext?: string;
}

export default function CareRequirementItem({ icon, label, value, subtext }: CareRequirementItemProps){

  return(
    <div className="flex items-start gap-3 p-2">
        <div className="text-emerald-600 mt-1">{icon}</div>
            <div className="flex flex-col">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
            <span className="text-sm font-medium text-gray-700 mt-1">{value || 'N/A'}</span>
            {subtext && <span className="text-xs text-gray-500">{subtext}</span>}
        </div>
    </div>
  )
}

