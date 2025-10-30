"use client";
import TestimonialsData from "@/public/data/testimonials.json";

import { useEffect, useRef, useState } from "react";
import { FacilitiesCard } from "../cards/facilities-cards";
import Image from "next/image";
import {
  BsCaretLeftFill,
  BsCaretRightFill,
  BsCheckCircleFill,
} from "react-icons/bs";
import { Button } from "../ui/button";
import { TestimonialsCard } from "../cards/testimonials-card";
import CountUp from "../animations/count-up";
import { motion } from "framer-motion";
import Link from "next/link";

// OUR STORY
export const OurStory = () => {
  const exceptionalTraits = [
    {
      title: "Unforgettable Experiences",
      content: "Moments of joy designed to stay forever.",
    },
    {
      title: "Personalized Comfort",
      content: "Elegant spaces tailored to your every need.",
    },
    {
      title: "Culinary Excellence",
      content: "World-class flavors crafted with passion and precision.",
    },
    {
      title: "Sustainable Luxury",
      content: "Eco-friendly  living blended with timeless sophistication.",
    },
  ];

  return (
    <section className="min-h-[80%] flex-center">
      <div className="container-wide section-padding flex flex-col lg:flex-row items-center justify-center gap-24 lg:gap-14">
        {/* INFO */}
        <motion.div
          className="lg:max-w-1/2 space-y-[30px] px-4"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-[10px]">
            <motion.p
              className="text-primary text-herosub uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover Our Story
            </motion.p>
            <motion.p
              className="section-header text-left leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Your Private Haven for Endless Relaxation
            </motion.p>
            <p className="text-[15px] xl:text-base mt-[15px] leading-6 sm:leading-6.5 text-[var(--minor-text)] ">
              At Silver Palm Resort, luxury is found in life’s meaningful
              moments. Surrounded by tropical beauty and ocean breezes, we offer
              timeless elegance, heartfelt warmth, and lasting memories.
            </p>
          </div>

          <div className="space-y-[15px]">
            <p className="font-medium text-lg xl:text-xl text-[var(--major-text)] ">
              What Makes Us Exceptional:
            </p>
            <div className="space-y-[15px]">
              {exceptionalTraits.map((trait, index) => (
                <motion.div
                  className="flex items-center justify-start gap-[15px]"
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <p className="md:p-3 p-2.5 rounded-[10px] bg-primary/25 flex-center ">
                    <BsCheckCircleFill
                      width={50}
                      height={50}
                      className="text-primary w-4.5 h-4.5 md:w-6 md:h-6"
                    />
                  </p>
                  <ul className="space-y-[3px]">
                    <li className="text-[var(--major-text)]  text-base xl:text-lg font-medium">
                      {trait.title}
                    </li>
                    <li className="text-sm xl:text-base text-[var(--minor-text)] ">
                      {trait.content}
                    </li>
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <Link href="/about">
                <Button variant="primary" size="lg" btnClassName="mt-10">
                  Discover More
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        {/* IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative">
            <div className="relative border-4 border-secondary/15 rounded-[10px] overflow-hidden">
              <Image
                src="/img/receptionist.jpeg"
                alt="receptionist"
                width={585}
                height={390}
                className="object-center object-cover"
              />
            </div>

            <div className="lg:hidden absolute -bottom-2 -left-2 sm:-bottom-6 sm:-left-6 md:-bottom-8 md:-left-8 rounded-[10px] border-3 border-secondary/25 overflow-hidden">
              <Image
                src="/img/waitress.jpeg"
                alt="waitress"
                width={290}
                height={290}
                className="aspect-square w-absolute-about-image  object-cover object-center"
              />
            </div>
            <div className="hidden lg:flex absolute -bottom-2 -left-2 sm:-bottom-8 sm:-left-8 rounded-[10px] border-3 border-secondary/25 overflow-hidden">
              <Image
                src="/img/waitress.jpeg"
                alt="waitress"
                width={290}
                height={290}
                className="aspect-square w-absolute-about-image2  object-cover object-center"
              />
            </div>
            <div className="text-center absolute -top-4 -right-2 sm:-top-[calc(9%-1rem)] sm:-right-3 bg-[var(--bg-shade)] flex flex-col sm:flex-row items-center justify-center gap-3 px-[10px] sm:px-[15px] py-3 sm:py-5 rounded-xl shadow-milestonecard">
              <ul className=" space-y-[10px]">
                <li className="text-primary text-[28px] md:text-[32px] font-semibold">
                  {
                    <CountUp
                      from={0}
                      to={20}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                  }
                  +
                </li>
                <li className="text-caption text-[var(--major-text)]">
                  Years of Expertise
                </li>
              </ul>
              <ul className="space-y-[10px]">
                <li className="text-primary  text-[28px] md:text-[32px] font-semibold">
                  {
                    <CountUp
                      from={0}
                      to={800}
                      separator=","
                      direction="up"
                      duration={1}
                      className="count-up-text"
                    />
                  }
                  +
                </li>
                <li className="text-caption text-[var(--major-text)]">
                  Satisfied Guests
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

//REGAL FACILITIES
export const RegalFacilities = () => {
  const regalFacilities = [
    {
      icon: "/svg/fork-and-spoon.svg",
      title: "Restaurant",
      description:
        "Savor exquisite meals prepared with fresh, locally sourced ingredients in an inviting, nature-inspired atmosphere.",
    },
    {
      icon: "/svg/bicycle.svg",
      title: "Sports Club",
      description:
        "Stay active with our modern sports facilities, offering the perfect balance of recreation and wellness.",
    },
    {
      icon: "/svg/pool.svg",
      title: "Swimming Pool",
      description:
        "Dive into serenity in our crystal-clear pool, surrounded by greenery and designed for pure relaxation.",
    },
    {
      icon: "/svg/car-rental.svg",
      title: "Car Rental",
      description:
        "Explore your destination effortlessly with our reliable and eco-efficient car rental service.",
    },
    {
      icon: "/svg/dumbbell.svg",
      title: "Gymnesium",
      description:
        "Elevate your fitness routine in a fully equipped gym that blends technology, comfort, and sustainability.",
    },
    {
      icon: "/svg/glass-cup.svg",
      title: "Bar",
      description:
        "Unwind and socialize in style with refreshing cocktails and a cozy ambiance inspired by nature’s calm.",
    },
  ];
  return (
    <section className="relative bg-[url('/img/regal-facilities.jpeg')] bg-cover bg-bottom bg-fixed min-h-screen flex-center overflow-hidden text-neutral-50">
      <div className="absolute -inset-5 bg-[#0F0E1D]/85 backdrop-blur-[3px] h-[125%] w-[125%] z-10"></div>

      <div className="container-wide section-padding relative z-20 flex flex-col items-center justify-center gap-[80px] sm:gap-[90px] md:gap-[110px] h-full">
        <div className="space-y-4 text-center">
          <p className="section-header text-neutral-10">Regal Facilities</p>
          <p className="section-subheader text-neutral-50 ">
            Passionately devoted to sustainable and eco-conscious living.
          </p>
        </div>

        <div className="container-wide grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-center">
          {regalFacilities.map((facility, index) => (
            <div key={index}>
              <FacilitiesCard
                facility={facility.title}
                icon={
                  <Image
                    src={facility.icon}
                    alt={facility.title}
                    width={24}
                    height={24}
                  />
                }
                about={facility.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface testimonialProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

//TESTIMONIAL
export const Testimonial: React.FC<testimonialProps> = ({ isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll carousel every 5 seconds
  useEffect(() => {
    const startAutoScroll = () => {
      autoScrollIntervalRef.current = setInterval(() => {
        if (!carouselRef.current) return;

        const carousel = carouselRef.current;
        const cardWidth = 480;
        const gap = 30;
        const scrollAmount = cardWidth + gap;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;

        // If at the end, scroll back to start, otherwise scroll to next
        if (carousel.scrollLeft >= maxScroll - 10) {
          carousel.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }, 5000); // Auto-scroll every 5 seconds
    };

    startAutoScroll();

    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, []);

  // Pause auto-scroll when user is interacting
  const pauseAutoScroll = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  const resumeAutoScroll = () => {
    pauseAutoScroll();
    autoScrollIntervalRef.current = setInterval(() => {
      if (!carouselRef.current) return;

      const carousel = carouselRef.current;
      const cardWidth = 480;
      const gap = 30;
      const scrollAmount = cardWidth + gap;
      const maxScroll = carousel.scrollWidth - carousel.clientWidth;

      if (carousel.scrollLeft >= maxScroll - 10) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 5000);
  };

  // Track carousel scroll position and update dots
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleCarouselScroll = () => {
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Debounce to avoid too many updates while scrolling
      scrollTimeoutRef.current = setTimeout(() => {
        const scrollPosition = carousel.scrollLeft;
        const cardWidth = 480; // min-w-[480px]
        const gap = 30;
        const totalCardWidth = cardWidth + gap;

        // Calculate which card is most visible
        const newIndex = Math.round(scrollPosition / totalCardWidth);
        setCurrentIndex(
          Math.max(0, Math.min(TestimonialsData.length - 1, newIndex))
        );
      }, 50);
    };

    carousel.addEventListener("scroll", handleCarouselScroll);
    return () => {
      carousel.removeEventListener("scroll", handleCarouselScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [TestimonialsData.length]);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;

    pauseAutoScroll(); // Pause auto-scroll when user manually scrolls

    const container = carouselRef.current;
    const cardWidth = 480;
    const gap = 30;
    const scrollAmount = cardWidth + gap;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }

    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => {
      resumeAutoScroll();
    }, 10000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    pauseAutoScroll(); // Pause when user starts dragging
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Reduced multiplier for smoother drag
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-scroll after 10 seconds of inactivity
    setTimeout(() => {
      resumeAutoScroll();
    }, 10000);
  };

  const canScrollLeft = currentIndex > 0;
  const canScrollRight = currentIndex < TestimonialsData.length - 1;

  return (
    <section className="container-wide section-padding grid grid-cols-1 items-center justify-center gap-[50px] min-h-screen ">
      <div className="space-y-4 text-center">
        <p className="section-header">What Our Guests Say</p>
        <p className="section-subheader">
          Testimonials that speak to our commitment to comfort and hospitality.
        </p>
      </div>

      <div className="space-y-[30px]">
        {/* Carousel Container */}
        <div
          ref={carouselRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex items-center justify-start gap-[30px] overflow-x-auto scroll-smooth scrollbar-hide transition-all duration-500 ease-in-out ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            scrollBehavior: "smooth",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {TestimonialsData.map((data, index: any) => (
            <TestimonialsCard
              key={index}
              image={data.image}
              testimonial={data.testimonial}
              rating={data.rating}
              guestName={data.guestName}
              guestOccupation={data.guestOccupation}
              isVerified={data.isVerified}
              className="product-card"
              isLoading={isLoading}
            />
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {TestimonialsData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (!carouselRef.current) return;
                  const container = carouselRef.current;
                  const cardWidth = 480;
                  const gap = 30;
                  container.scrollTo({
                    left: index * (cardWidth + gap),
                    behavior: "smooth",
                  });
                }}
                className={`rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  index === currentIndex
                    ? "w-8 h-2 bg-primary"
                    : "w-2 h-2 bg-[var(--carousel-navigation)] hover:bg-neutral-70/60"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-6">
            {/* Previous Button */}
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`focus:outline-none ${
                canScrollLeft
                  ? " transition-colors  cursor-pointer "
                  : "opacity-30 cursor-not-allowed "
              }`}
              aria-label="Previous testimonial"
            >
              <BsCaretLeftFill
                className={`w-10 h-10 text-[var(--carousel-navigation)] hover:scale-105 transition-all duration-300 ${
                  canScrollLeft ? " hover:text-primary" : ""
                }`}
              />
            </button>

            {/* Next Button */}
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`focus:outline-none ${
                canScrollRight
                  ? " transition-colors  cursor-pointer"
                  : "opacity-30 cursor-not-allowed"
              }`}
              aria-label="Next testimonial"
            >
              <BsCaretRightFill
                className={`w-10 h-10 text-[var(--carousel-navigation)] ${
                  canScrollRight ? " hover:text-primary" : ""
                } hover:scale-105 transition-all duration-300`}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutComponent: React.FC<testimonialProps> = ({ isLoading }) => {
  return (
    <div>
      <OurStory />
      <RegalFacilities />
      <Testimonial isLoading={isLoading} />
    </div>
  );
};

export default AboutComponent;
