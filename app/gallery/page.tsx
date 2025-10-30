"use client";
import { PageHeader } from "@/components/pageHeader";
import { ResortGallery } from "@/components/pages/gallery";
import { CgScrollH } from "react-icons/cg";
import { useEffect, useState } from "react";

export default function GalleryPage() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading (in real app, this would be actual data fetching)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <PageHeader
        header="Gallery"
        subHeader="Gallery"
        image="https://i.pinimg.com/736x/5d/9c/d1/5d9cd1267880ae9329606dcd7260b585.jpg"
        imgClassName="bg-[50%_44%]"
      />
      <section className="max-w-[1350px] mx-auto px-4 sm:px-8 md:px-10 section-padding grid grid-cols-1 gap-[55px]">
        <div className="space-y-4 text-center">
          <p className="section-header">Silver Palm Resort Gallery</p>
          <p className="max-w-[660px] mx-auto section-subheader">
            Explore unforgettable moments through our lens.
          </p>
        </div>
        <div>
          <ResortGallery />
          <CgScrollH className="w-[50px] h-[50px] text-[var(--major-text)] mx-auto animate-bounce mt-10" />
        </div>
      </section>
    </main>
  );
}
