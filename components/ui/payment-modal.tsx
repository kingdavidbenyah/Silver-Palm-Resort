"use client";

import { Modal } from "./modal";
import { Button } from "./button";
import { useState, useRef, useEffect } from "react";
import { useToast } from "./toast";
import { CreditCard, Calendar, Lock, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { NumberPicker } from "./number-picker";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    name: string;
    price: number;
    imageUrl: string;
  } | null;
}

export const PaymentModal = ({ isOpen, onClose, room }: PaymentModalProps) => {
  const { showToast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  type FormData = {
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
    checkIn: string;
    checkOut: string;
    numGuests: number;
    numRooms: number;
  };

  const [formData, setFormData] = useState<FormData>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    checkIn: "",
    checkOut: "",
    numGuests: 1,
    numRooms: 1,
  });

  const [showGuestsPicker, setShowGuestsPicker] = useState(false);
  const [showRoomsPicker, setShowRoomsPicker] = useState(false);

  const guestsRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);

  // Close all pickers
  const closeAllPickers = () => {
    setShowGuestsPicker(false);
    setShowRoomsPicker(false);
  };

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        guestsRef.current &&
        !guestsRef.current.contains(target) &&
        roomsRef.current &&
        !roomsRef.current.contains(target)
      ) {
        closeAllPickers();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!room) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (
    name: "numGuests" | "numRooms",
    value: string
  ) => {
    const parsed = value === "" ? 0 : parseInt(value, 10);
    setFormData(
      (prev) =>
        ({
          ...(prev as FormData),
          [name]: Number.isNaN(parsed) ? 0 : parsed,
        } as FormData)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.cardNumber ||
      !formData.cardName ||
      !formData.expiryDate ||
      !formData.cvv ||
      !formData.checkIn ||
      !formData.checkOut ||
      !formData.numGuests ||
      !formData.numRooms
    ) {
      showToast("Please fill in all fields", "error");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      showToast(
        `Booking confirmed for ${room.name}! Check your email for details.`,
        "success"
      );
      onClose();
      // Reset form
      setFormData({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
        checkIn: "",
        checkOut: "",
        numGuests: 1,
        numRooms: 1,
      });
    }, 2000);
  };

  const nights =
    formData.checkIn && formData.checkOut
      ? Math.ceil(
          (new Date(formData.checkOut).getTime() -
            new Date(formData.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  const rooms =
    formData.numRooms && formData.numRooms > 0 ? formData.numRooms : 1;
  const nightsUsed = nights > 0 ? nights : 1;
  const totalPrice = room.price * rooms * nightsUsed;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Complete Your Booking"
      modalClassName="max-w-md lg:max-w-lg"
      footer={
        <div className="flex justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isProcessing}
            btnClassName="flex-1 py-[8px] sm:py-[10px] md:py-[12px]"
            childClassName="text-[15px]"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isProcessing}
            btnClassName="w-2/3 py-[8px] sm:py-[10px] md:py-[12px]"
            form="payment-form"
            childClassName="text-[15px]"
          >
            {isProcessing ? "Processing..." : `Pay $${totalPrice}`}
          </Button>
        </div>
      }
    >
      <form
        id="payment-form"
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-6"
      >
        {/* Room Summary */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="w-14 md:w-[70px] h-14 md:h-[70px] relative flex-shrink-0">
            <Image
              src={room.imageUrl}
              alt={room.name}
              width={75}
              height={75}
              className="w-full h-full rounded-lg"
            />
          </div>
          <div className="w-full">
            <h3 className="font-semibold text-[var(--major-text)] mb-2">
              {room.name}
            </h3>
            <div className="flex justify-between text-sm">
              <span className="text-[var(--minor-text)]">
                ${room.price} × {nights > 0 ? `${nights} nights` : "1 night"}
              </span>
              <span className="font-semibold text-primary text-base">
                ${totalPrice}
              </span>
            </div>
          </div>
        </div>

        {/* Stay Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--major-text)] mb-2">
              Check-in Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--minor-text)]" />
              <input
                type="date"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
                className="text-sm lg:text-[15px] w-full pl-8 md:pl-10 pr-4 py-2.5 rounded-lg border border-[var(--major-text)]/20 bg-[var(--bg-shade)] text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:ring-[1.5px] focus:ring-primary truncate"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--major-text)] mb-2">
              Check-out Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--minor-text)]" />
              <input
                type="date"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
                min={formData.checkIn || new Date().toISOString().split("T")[0]}
                className="text-sm lg:text-[15px] w-full pl-8 md:pl-10 pr-4 py-2.5 rounded-lg border border-[var(--major-text)]/20 bg-[var(--bg-shade)] text-[var(--major-text)] focus:outline-none focus:ring-[1.5px] focus:ring-primary"
                required
              />
            </div>
          </div>
        </div>

        {/* Number of Guests and Rooms */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[var(--major-text)] mb-2">
              Number of Guests
            </label>
            <div className="relative" ref={guestsRef}>
              <input
                type="text"
                value={String(formData.numGuests)}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d+$/.test(val)) {
                    handleNumberChange("numGuests", val);
                  }
                }}
                placeholder="Guests"
                className="text-sm lg:text-[15px] w-full px-3 md:px-4 pr-10 py-2.5 rounded-lg border border-[var(--major-text)]/20 bg-[var(--bg-shade)] text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:ring-[1.5px] focus:ring-primary"
                required
              />
              <ChevronsUpDown
                onClick={() => {
                  closeAllPickers();
                  setShowGuestsPicker(true);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--minor-text)] cursor-pointer hover:text-primary transition-colors"
              />
              <NumberPicker
                value={String(formData.numGuests)}
                onChange={(val) => handleNumberChange("numGuests", val)}
                onClose={() => setShowGuestsPicker(false)}
                show={showGuestsPicker}
                numberOfWhat="guests"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--major-text)] mb-2">
              Number of Rooms
            </label>
            <div className="relative" ref={roomsRef}>
              <input
                type="text"
                value={String(formData.numRooms)}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d+$/.test(val)) {
                    handleNumberChange("numRooms", val);
                  }
                }}
                placeholder="Rooms"
                className="text-sm lg:text-[15px] w-full px-3 md:px-4 pr-10 py-2.5 rounded-lg border border-[var(--major-text)]/20 bg-[var(--bg-shade)] text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:ring-[1.5px] focus:ring-primary"
                required
              />
              <ChevronsUpDown
                onClick={() => {
                  closeAllPickers();
                  setShowRoomsPicker(true);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--minor-text)] cursor-pointer hover:text-primary transition-colors"
              />
              <NumberPicker
                value={String(formData.numRooms)}
                onChange={(val) => handleNumberChange("numRooms", val)}
                onClose={() => setShowRoomsPicker(false)}
                show={showRoomsPicker}
                numberOfWhat="rooms"
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[var(--major-text)] flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            Payment Information
          </h3>

          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-[var(--major-text)] mb-2">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              className="text-sm lg:text-[15px] w-full px-3 md:px-4 py-2.5 rounded-lg border border-[var(--major-text)]/20 bg-[var(--bg-shade)] text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:ring-[1.5px] focus:ring-primary"
              required
            />
          </div>

          {/* Card Name */}
          <div>
            <label className="block text-sm font-medium text-[var(--major-text)] mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Doe"
              className="text-sm lg:text-[15px] w-full px-3 md:px-4 py-2.5 rounded-lg border border-[var(--major-text)]/20 bg-[var(--bg-shade)] text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:ring-[1.5px] focus:ring-primary"
              required
            />
          </div>

          {/* Expiry and CVV */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--major-text)] mb-2">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                placeholder="MM/YY"
                maxLength={5}
                className="text-sm lg:text-[15px] w-full px-3 md:px-4 py-2.5 rounded-lg border border-[var(--major-text)]/20 bg-[var(--bg-shade)] text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:ring-[1.5px] focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--major-text)] mb-2">
                CVV
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--minor-text)]" />
                <input
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength={3}
                  className="text-sm lg:text-[15px] w-full pl-8 md:pl-10 pr-4 py-2.5 rounded-lg border border-[var(--major-text)]/20 bg-[var(--bg-shade)] text-[var(--major-text)] placeholder:text-[var(--minor-text)] focus:outline-none focus:ring-[1.5px] focus:ring-primary"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-start gap-2 p-3 rounded-lg bg-[#0cce77]/5 border border-[#0cce77]/20">
          <Lock className="h-4 w-4 text-[#0cce77] mt-0.5 flex-shrink-0" />
          <p className="text-xs text-[var(--minor-text)]">
            Your payment information is secure and encrypted. We never store
            your card details.
          </p>
        </div>
      </form>
    </Modal>
  );
};
