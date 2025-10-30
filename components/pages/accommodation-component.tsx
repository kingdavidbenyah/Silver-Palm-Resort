"use client";

import { RoomCards } from "../cards/rooms-card";
import { RoomDetailsModal } from "../ui/room-details-modal";
import { PaymentModal } from "../ui/payment-modal";
import accommotionData from "@/public/data/accommodation.json";
import { motion } from "framer-motion";
import { useState } from "react";

interface accommodationProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

type Room = {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  typeOfAccommodation: string;
};

export const SpecialAccommodation: React.FC<accommodationProps> = ({
  isLoading,
}) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const specialAccommodation = accommotionData.filter((acc: any) =>
    acc.title.toLowerCase().includes("special")
  );

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
    <section>
      {specialAccommodation.map((item, index) => (
        <div
          key={index}
          className="section-padding grid grid-cols-1 items-center justify-center gap-[50px] min-h-screen "
        >
          <motion.div
            className="container-wide space-y-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-header">{item.title}</p>
            <p className="section-subheader">{item.subHeader}</p>
          </motion.div>

          <div className="flex-center flex-wrap gap-5  p-5 lg:p-7 ">
            {item.rooms.map((room: any, roomIndex: any) => (
              <motion.div
                key={roomIndex}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: roomIndex * 0.1 }}
              >
                <RoomCards
                  image={room.imageUrl}
                  roomType={room.name}
                  pricePerNight={room.price}
                  isLoading={isLoading}
                  onImageClick={() => handleRoomClick(room)}
                  onTitleClick={() => handleRoomClick(room)}
                  onBuyNowClick={() => handleBookNow(room)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Modals */}
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
    </section>
  );
};

export const StandardAccommodations: React.FC<accommodationProps> = ({
  isLoading,
}) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  const standardAccommodation = accommotionData.filter((acc: any) =>
    acc.title.toLowerCase().includes("standard")
  );

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
    <section>
      {standardAccommodation.map((item, index) => (
        <div
          key={index}
          className="section-padding grid grid-cols-1 items-center justify-center gap-[50px] min-h-screen "
        >
          <motion.div
            className="container-wide space-y-4 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-header">{item.title}</p>
            <p className="section-subheader">{item.subHeader}</p>
          </motion.div>

          <div className="flex-center flex-wrap gap-5  p-5 lg:p-7 ">
            {item.rooms.map((room: any, roomIdx: any) => (
              <motion.div
                key={roomIdx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: roomIdx * 0.1 }}
              >
                <RoomCards
                  image={room.imageUrl}
                  roomType={room.name}
                  pricePerNight={room.price}
                  isLoading={isLoading}
                  onImageClick={() => handleRoomClick(room)}
                  onTitleClick={() => handleRoomClick(room)}
                  onBuyNowClick={() => handleBookNow(room)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Modals */}
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
    </section>
  );
};
