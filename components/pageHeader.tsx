"use client";
import { useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import TextType from "./animations/type-text";

interface pageHeaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  header: string;
  subHeader?: string;
  image: string;
  imgClassName?: string;
  subText?: string;
  headerHeight?: string;
}

export const PageHeader: React.FC<pageHeaderProps> = ({
  header,
  subHeader,
  image,
  imgClassName,
  subText,
  headerHeight
}) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxBg = document.getElementById("parallax-bg");
      if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrolled * 0.3}px)`; // smaller multiplier = slower
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${
        headerHeight ? headerHeight : "h-[350px]"
      } relative overflow-hidden`}
    >
      {/* Background Image - z-10 */}
      <div
        id="parallax-bg"
        style={{
          transform: "translateY(0px)",
          backgroundImage: `url('${image}')`,
        }}
        className={`absolute inset-0 z-10 bg-cover ${imgClassName}`}
      ></div>

      {/* Overlay - z-20 */}
      <div className="absolute -inset-5 bg-[var(--hero-overlay)] backdrop-blur-[1.5px]  h-[125%] w-[125%] z-20"></div>

      {/* Content */}
      <div
        className={`relative flex flex-col items-center ${
          subText ? "h-full justify-center" : "h-[75%] justify-end "
        }  space-y-[15px] z-30`}
      >
        <div className="text-[26px] sm:text-3xl md:text-[33px] xl:text-4xl font-medium text-neutral-10 text-center">
          <TextType
            text={[header]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={false}
            cursorCharacter="|"
          />
        </div>
        {subText && (
          <p className="text-neutral-50 text-herosub max-w-[790px] text-center px-5">
            {subText}
          </p>
        )}
        {subHeader && (
          <p className="text-neutral-50 text-herosub flex items-center gap-[10px] md:gap-[12px] lg:gap-[15px]">
            Home{" "}
            <BsChevronRight className="w-4 h-4 md:w-5 md:h-5 text-neutral-10" />
            <span className=" text-neutral-10 font-medium">{subHeader}</span>
          </p>
        )}
      </div>
    </div>
  );
};
