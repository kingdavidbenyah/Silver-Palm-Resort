"use client"
import AboutComponent from "@/components/pages/about-component";
import { PageHeader } from "@/components/pageHeader";
import { useEffect, useState } from "react";

export default function AboutPage() {
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
        header="About"
        subHeader="About"
        image="https://i.pinimg.com/1200x/ed/e3/c2/ede3c2d3dcc5c12e407a2a086f22e0b2.jpg"
        imgClassName="bg-[50%_80%] "
      />
      <AboutComponent isLoading={isLoading} />
    </div>
  );
}
