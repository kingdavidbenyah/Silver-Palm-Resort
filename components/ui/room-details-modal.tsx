"use client";

import { Modal } from "./modal";
import { Button } from "./button";
import Image from "next/image";

interface RoomDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    typeOfAccommodation: string;
  } | null;
  onBookNow: () => void;
}

export const RoomDetailsModal = ({
  isOpen,
  onClose,
  room,
  onBookNow,
}: RoomDetailsModalProps) => {
  if (!room) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={room.name}
      modalClassName=" md:max-w-[850px] lg:max-w-[950px] md:h-auto"
      footer={        
        <div className="flex items-center justify-between ">
          <div>
            <p className="text-sm text-[var(--minor-text)]">Starting from</p>
            <p className="text-2xl font-bold text-[var(--major-text)]">
              ${room.price}
              <span className="text-sm font-normal text-[var(--minor-text)]">
                /night
              </span>
            </p>
          </div>
          <Button variant="primary" onClick={onBookNow}>
            Book Now
          </Button>
        </div>
      }
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-5 md:gap-10 items-center space-y-6">
        {/* Room Image */}
        <div className="relative w-full h-64 md:h-[350px] lg:h-[400px] xl:h-[500px] my-auto rounded-lg overflow-hidden">
          <Image
            src={room.imageUrl}
            alt={room.name}
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-6">
          {/* Room Category Badge */}
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                room.typeOfAccommodation === "special"
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-[var(--major-text)]/10 text-[var(--major-text)] border border-[var(--major-text)]/30"
              }`}
            >
              {room.typeOfAccommodation === "special"
                ? "Special Accommodation"
                : "Standard Accommodation"}
            </span>
          </div>

          {/* Room Description */}
          <div>
            <h3 className="txet-base md:text-lg font-semibold text-[var(--major-text)] mb-2">
              About This Room
            </h3>
            <p className="text-sm md:text-base text-[var(--minor-text)] leading-relaxed">
              {room.description}
            </p>
          </div>

          {/* Amenities (You can customize this) */}
          <div>
            <h3 className="text-base md:text-lg font-semibold text-[var(--major-text)] mb-3">
              Amenities
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs md:text-sm text-[var(--minor-text)]">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Free Wi-Fi
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Air Conditioning
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Room Service
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Flat Screen TV
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Private Bathroom
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span> Daily Housekeeping
              </li>
            </ul>
          </div>

          
        </div>
      </div>
    </Modal>
  );
};
