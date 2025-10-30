"use client";

import Image from "next/image";
import { ThemeToggle } from "./../components/ui/theme-toggle";
import { RoomCards } from "@/components/cards/rooms-card";
import { Button } from "@/components/ui/button";
import { BlogCard } from "./../components/cards/blog-card";
import { useEffect, useRef, useState } from "react";
import { RegalFacilities } from "@/components/pages/about-component";
import { OurStory } from "@/components/pages/about-component";
import { Testimonial } from "@/components/pages/about-component";
import accommodationData from "@/public/data/accommodation.json";
import { RoomCardSkeleton, BlogCardSkeleton } from "@/components/ui/skeleton";
import BlogPosts from "@/public/data/blog-posts.json";
import TextType from "@/components/animations/type-text";
import { motion } from "framer-motion";
import BookingForm from "@/components/cards/booking-card";
import { SignInModal } from "@/components/ui/sign-in-modal";
import { SignUpModal } from "@/components/ui/sign-up-modal";
import { RoomDetailsModal } from "@/components/ui/room-details-modal";
import { PaymentModal } from "@/components/ui/payment-modal";

type Room = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  typeOfAccommodation: string;
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const heroHeaders = [
    "Escape to Timeless Luxury",
    "Discover Your Perfect Getaway",
    "Luxury Inspired by Nature",
  ];
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

  // Simulate loading (in real app, this would be actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  const handleRoomClick = (room: Room) => {
    setSelectedRoom(room);
    setIsDetailsModalOpen(true);
  };

  const handleBookNow = (room: Room) => {
    setSelectedRoom(room);
    setIsPaymentModalOpen(true);
  };

  const handleBookFromDetails = () => {
    setIsDetailsModalOpen(false);
    setIsPaymentModalOpen(true);
  };

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden">
        {/* Background Image - z-10 */}
        <div
          id="parallax-bg"
          style={{ transform: "translateY(0px)" }}
          className="absolute inset-0 z-10  bg-[url('/img/hero.jpeg')] bg-cover bg-bottom"
        ></div>

        {/* Overlay - z-20 */}
        <div className="absolute -inset-5 bg-[var(--hero-overlay)] backdrop-blur-[1.5px]  h-[125%] w-[125%] z-20"></div>

        {/* Content - z-30 */}
        <div className="relative w-full min-h-screen flex-center z-30">
          <div className="space-y-[15px] text-center px-4">
            <div className="text-neutral-10 space-y-1.5">
              <p className="text-herosub font-medium">
                AWAY FROM A MONOTONOUS LIFE
              </p>
              <div className="text-heroheader font-bold leading-tight tracking-wide ">
                <TextType
                  text={heroHeaders}
                  typingSpeed={60}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </div>
            </div>
            <div className="space-y-8 flex flex-col items-center">
              <p className="max-w-[600px] text-neutral-50 text-herosub">
                Where sophistication meets serenity. Experience bespoke comfort,
                gourmet dining, and breathtaking views designed to indulge your
                every sense.
              </p>
              <div className="flex">
                <Button
                  variant="primary"
                  size="lg"
                  btnClassName="mx-auto"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Modals */}
      <SignInModal
        isOpen={isSignInModalOpen}
        onClose={() => setIsSignInModalOpen(false)}
        onSwitchToSignUp={() => setIsSignUpModalOpen(true)}
      />
      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSwitchToSignIn={() => setIsSignInModalOpen(true)}
      />

      {/* Room Modals */}
      <RoomDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        room={selectedRoom}
        onBookNow={handleBookFromDetails}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        room={selectedRoom}
      />

      <section className="lg:hidden w-full">
        <BookingForm />
      </section>

      {/* Hotel Accomodation */}
      <section className="relative section-padding grid grid-cols-1 items-center justify-center gap-[50px] min-h-screen ">
        <div className="hidden lg:flex w-full absolute mx-auto z-30 -top-20 ">
          <BookingForm />
        </div>

        <motion.div
          className="container-wide space-y-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-header lg:mt-20">Hotel Accommodation</p>
          <p className="section-subheader">
            Discover rooms designed for relaxation, style, and timeless luxury.
          </p>
        </motion.div>

        <div className="flex-center flex-wrap gap-5  p-5 lg:p-7 ">
          {accommodationData.map((category, categoryIndex) =>
            category.rooms.slice(0, 2).map((room, roomIndex) => (
              <motion.div
                key={`${categoryIndex}-${roomIndex}`}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: (categoryIndex * 2 + roomIndex) * 0.1,
                }}
              >
                <RoomCards
                  image={room.imageUrl}
                  roomType={room.name}
                  pricePerNight={room.price}
                  isLoading={isLoading}
                  onImageClick={() => handleRoomClick(room as Room)}
                  onTitleClick={() => handleRoomClick(room as Room)}
                  onBuyNowClick={() => handleBookNow(room as Room)}
                />
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* Regal Facilities */}
      <RegalFacilities />

      {/* OUR STORY */}
      <OurStory />


      {/* POST FROM BLOG */}
      <section className="bg-[var(--bg-shade)]">
        <div className="max-w-[1350px] mx-auto px-4 sm:px-8 md:px-10; section-padding grid grid-cols-1 items-center justify-center gap-[50px] min-h-screen">
          <div className="space-y-4 text-center">
            <p className="section-header">Latest posts from our blog</p>
            <p className="max-w-[660px] mx-auto section-subheader">
              Stay updated with our latest news, travel inspiration, and resort
              experiences.
            </p>
          </div>

          <div className="flex-center flex-wrap gap-10 px-2">
            {BlogPosts.slice(0, 3).map((info, index: number) => (
              <div key={index}>
                <BlogCard
                  image={info.image}
                  blogTitle={info.title}
                  description={info.description}
                  date={info.date}
                  tags={info.category}
                  isLoading={isLoading}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
