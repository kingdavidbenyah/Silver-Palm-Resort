//interface FacilitiesCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement>

type FacilitiesCardProps = {
  icon?: React.ReactNode;
  facility: string;
  about: string;
  onClick?: () => void;
  className?: string;
};

export const FacilitiesCard: React.FC<FacilitiesCardProps> = ({
  icon,
  facility,
  about,
  onClick,
  className,
}) => {
  return (
    <div
      onClick={onClick}
      className={`grid grid-cols-1 gap-6 p-6 sm:p-7.5 lg:p-9 bg-facilitycardbg/5 max-w-[360px] rounded-xl border border-[#777777]/30 shadow-facilitycard ${className}`}
    >
      <div className="flex items-center gap-2">
        <span>{icon}</span>
        <span className="text-lg xl:text-xl font-medium text-neutral-10">{facility}</span>
      </div>
      <p className="text-bodySmall text-neutral-50">{about}</p>
    </div>
  );
};
