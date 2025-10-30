"use client";
import BookingForm from "@/components/cards/booking-card";
import { PageHeader } from "@/components/pageHeader";
import {
  SpecialAccommodation,
  StandardAccommodations,
} from "@/components/pages/accommodation-component";
import { useEffect, useState } from "react";

export default function AccommodationPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (in real app, this would be actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <PageHeader
        header="Accommodation"
        subHeader="Accommodation"
        image="https://i.pinimg.com/736x/d3/d2/c9/d3d2c95e12cf3d8a07e5cccb788af8c7.jpg"
        imgClassName="bg-[50%_55%]"
      />
      <SpecialAccommodation isLoading={isLoading} />

      <BookingForm />
      <StandardAccommodations isLoading={isLoading} />
    </div>
  );
}
