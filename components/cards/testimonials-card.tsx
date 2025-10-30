import { Star } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface TestimonialsCardProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  image?: string;
  testimonial: string;
  rating: number;
  guestName: string;
  guestOccupation: string;
  isVerified: boolean;
  className?: string;
  isLoading?: boolean;
}

const StarRating = ({ rating }: { rating: number }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        width={16}
        height={16}
        className="text-star w-3 h-3 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 fill-star flex-shrink-0"
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative inline-block">
        <Star
          width={16}
          height={16}
          className="text-star w-3 h-3 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 flex-shrink-0"
        />
        <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
          <Star
            width={16}
            height={16}
            className="text-star w-3 h-3 sm:w-3.5 sm:h-3.5 xl:w-4 xl:h-4 fill-star flex-shrink-0"
          />
        </div>
      </div>
    );
  }

  return <div className="flex items-center gap-1">{stars}</div>;
};

export const TestimonialsCard: React.FC<TestimonialsCardProps> = ({
  image,
  testimonial,
  rating,
  guestName,
  guestOccupation,
  isVerified,
  className,
  isLoading,
}) => {
  return (
    <div
      className={`overflow-hidden border border-[var(--testimonial-border)] rounded-[20px] ${
        isLoading
          ? "w-[320px] sm:w-[350px] md:w-[380px] lg:w-[480px]"
          : "max-w-[320px] sm:max-w-[350px] md:max-w-[380px] lg:max-w-[480px] "
      } flex-shrink-0 h-auto${className || ""}`}
    >
      <div className="bg-dark-bg-shade flex flex-col lg:flex-row items-center lg:items-start justify-center gap-5 border-t-[5px] border-primary px-[25px] pt-10 pb-[25px] rounded-[20px]">
        {isLoading ? (
          <Skeleton className="h-[80px] w-[80px] rounded-full" />
        ) : (
          <>
            {image && (
              <Image
                src={image}
                alt={guestName}
                width={80}
                height={80}
                className="aspect-square rounded-full object-cover object-top flex-shrink-0"
                unoptimized={image.startsWith("http")}
              />
            )}
          </>
        )}

        <div
          className={`grid grid-cols-1 gap-10 items-center ${
            isLoading ? "w-[315px]" : "max-w-[315px]"
          } `}
        >
          {/* Testimonial with Quote */}
          <div className="relative ">
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
                <Skeleton className="h-3 w-2/4" />
              </div>
            ) : (
              <>
                <p className="text-neutral-10 text-xs sm:text-sm leading-relaxed max-h-[90px] overflow-y-auto scrollbar-hide pr-2">
                  {testimonial}
                </p>
              </>
            )}

            <p className="absolute -bottom-3 right-0 bg-primary w-10 h-[30px] rounded-full flex-center">
              <Image
                src="/svg/quote.svg"
                alt="quote"
                width={15}
                height={11}
                className="flex-shrink-0"
              />
            </p>
          </div>
          {/* Rating, guestName, Occupation, and Verification Check */}
          <div className="grid grid-cols-1 gap-[5px]">
            {/* Rating, guestName, and Occupation */}
            <div className="grid grid-cols-1 items-start gap-[10px]">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-3 w-[25%]" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-2/4" />
                </div>
              ) : (
                <>
                  <StarRating rating={rating} />
                  <div className="space-y-1.5">
                    <p className="text-base xl:text-lg font-medium text-neutral-10">
                      {guestName}
                    </p>
                    <p className="text-sm xl:text-base font-medium text-neutral-50">
                      {guestOccupation}
                    </p>
                  </div>
                </>
              )}
            </div>
            {isVerified ? (
              <div className="w-full flex justify-end items-center gap-1">
                {isLoading ? (
                  <Skeleton className="h-3 w-[40%] mt-[5px]" />
                ) : (
                  <>
                    <Image
                      src="/svg/verified.svg"
                      alt="verified img"
                      width={24}
                      height={24}
                    />
                    <span className="text-verify text-bodySmall font-medium">
                      Verified
                    </span>
                  </>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
