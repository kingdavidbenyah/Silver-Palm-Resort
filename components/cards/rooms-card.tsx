import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface RoomCardsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onBuyNowClick?: () => void;
  onImageClick?: () => void;
  onTitleClick?: () => void;
  image?: string;
  roomType?: string;
  pricePerNight?: number;
  className?: string;
  isLoading?: boolean;
}

export const RoomCards: React.FC<RoomCardsProps> = ({
  onBuyNowClick,
  onImageClick,
  onTitleClick,
  image,
  roomType,
  pricePerNight,
  className,
  isLoading,
}) => {
  return (
    <div className={`flex-shrink-0 grid grid-cols-1 gap-6 p-3 ${className}`}>
      <div
        className="group/card relative overflow-hidden rounded-xl cursor-pointer"
        onClick={onImageClick}
      >
        {isLoading ? (
          <Skeleton className="w-[260px] h-[285px] rounded-xl" />
        ) : (
          <Image
            src={
              image ??
              "https://i.pinimg.com/736x/c4/fa/71/c4fa71644ce41e2cfa896dee49cd03ee.jpg"
            }
            alt={roomType ?? "Room Type"}
            width={260}
            height={300}
            className="w-[260px] h-[285px] object-center object-cover rounded-xl group-hover/card:scale-110 transition-transform duration-300"
          />
        )}
        <div className="absolute bottom-3 right-[calc(50%-60px)]">
          {isLoading ? (
            <Skeleton className="h-10 w-[120px] rounded-full" />
          ) : (
            <div onClick={(e) => e.stopPropagation()}>
              <Button variant="primary" size="sm" onClick={onBuyNowClick}>
                Book Now
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="text-center flex flex-col gap-[10px]">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-4/5 mx-auto " />
            <Skeleton className="h-5 w-1/2 mx-auto " />
          </>
        ) : (
          <>
            <p
              className="text-lg md:text-xl text-[var(--major-text)] font-semibold cursor-pointer hover:text-primary transition-colors duration-300"
              onClick={onTitleClick}
            >
              {roomType}
            </p>
            <p className="text-h4 font-semibold text-primary flex items-end justify-center gap-1">
              ${pricePerNight}
              <span className="text-bodyRegular font-medium">/night</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
