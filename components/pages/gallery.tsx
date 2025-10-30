import { motion } from "framer-motion";

export function ResortGallery() {
  const galleryImages = [
    {
      id: 1,
      src: "/img/gallery/gallery-1.jpeg",
      alt: "Spa Experience",
    },
    {
      id: 2,
      src: "/img/gallery/gallery-2.jpeg",
      alt: "Resort Pool",
    },
    {
      id: 3,
      src: "/img/gallery/gallery-3.jpeg",
      alt: "Concierge Service",
    },
    {
      id: 4,
      src: "/img/gallery/gallery-4.jpeg",
      alt: "Ocean View",
    },
    {
      id: 5,
      src: "/img/gallery/gallery-5.jpeg",
      alt: "Fine Dining",
    },
    {
      id: 6,
      src: "/img/gallery/gallery-6.jpeg",
      alt: "Resort Guests",
    },
    {
      id: 7,
      src: "/img/gallery/gallery-7.jpeg",
      alt: "Couple Romance",
    },
    {
      id: 8,
      src: "/img/gallery/gallery-8.jpeg",
      alt: "Couple Romance",
    },
    {
      id: 9,
      src: "/img/gallery/gallery-9.jpeg",
      alt: "Couple Romance",
    },
    {
      id: 10,
      src: "/img/gallery/gallery-10.jpeg",
      alt: "Couple Romance",
    },
    {
      id: 11,
      src: "/img/gallery/gallery-11.jpeg",
      alt: "Couple Romance",
    },
    {
      id: 12,
      src: "/img/gallery/gallery-12.jpeg",
      alt: "Couple Romance",
    },
  ];

  // Get the first and last images (full height columns)
  const firstImage = galleryImages[0];
  const lastImage = galleryImages[galleryImages.length - 1];

  // Get middle images (exclude first and last)
  const middleImages = galleryImages.filter(
    (_, index) => index !== 0 && index !== galleryImages.length - 1
  );

  // Split middle images into pairs for column grouping
  const grouped = [];
  for (let i = 0; i < middleImages.length; i += 2) {
    grouped.push(middleImages.slice(i, i + 2));
  }

  return (
    <div className="flex justify-start">
      <motion.div
        className="flex gap-3.5 xl:gap-5 overflow-x-auto scrollbar-hide  justify-start"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* FIRST COLUMN - Full height (675px) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="w-[200px] xl:w-[250px] h-[490px] xl:h-[595px] overflow-hidden">
            <motion.img
              src={firstImage.src}
              alt={firstImage.alt}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        {/* MIDDLE COLUMNS - Alternating heights */}
        {grouped.map((group, groupIndex) => (
          <motion.div
            key={groupIndex}
            className="flex flex-col gap-3.5 xl:gap-5"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + groupIndex * 0.1 }}
          >
            {group.map((img, index) => {
              // Determine if this pair should be tall-short or short-tall
              // Even pairs (0, 2, 4...): tall(400px) on top, short(250px) on bottom
              // Odd pairs (1, 3, 5...): short(250px) on top, tall(400px) on bottom
              const isTallFirst = groupIndex % 2 === 0;
              const heightClass =
                (isTallFirst && index === 0) || (!isTallFirst && index === 1)
                  ? "h-[300px] xl:h-[350px]" // Tall
                  : "h-[175px] xl:h-[225px]"; // Short

              return (
                <div
                  key={index}
                  className={`w-[200px] xl:w-[250px] ${heightClass} overflow-hidden`}
                >
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              );
            })}
          </motion.div>
        ))}

        {/* LAST COLUMN - Full height (675px) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 + grouped.length * 0.1 }}
        >
          <div className="w-[200px] xl:w-[250px] h-[490px] xl:h-[595px] overflow-hidden">
            <motion.img
              src={lastImage.src}
              alt={lastImage.alt}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
