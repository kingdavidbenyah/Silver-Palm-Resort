import { useState, useRef, useEffect } from "react";
import { ChevronsUpDown } from "lucide-react";
import { IoCalendarOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { main } from "framer-motion/client";
import accommodationData from "@/public/data/accommodation.json";
import Image from "next/image";
import { NumberPicker } from "../ui/number-picker";

export default function BookingForm() {
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numGuests, setNumGuests] = useState("");
  const [numRooms, setNumRooms] = useState("");
  const [roomType, setRoomType] = useState("");
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [showGuestsPicker, setShowGuestsPicker] = useState(false);
  const [showRoomsPicker, setShowRoomsPicker] = useState(false);
  const [showRoomTypePicker, setShowRoomTypePicker] = useState(false);

  // Refs for outside click detection
  const checkInRef = useRef<HTMLDivElement>(null);
  const checkOutRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);
  const roomsRef = useRef<HTMLDivElement>(null);
  const roomTypeRef = useRef<HTMLDivElement>(null);

  // Close all pickers
  const closeAllPickers = () => {
    setShowCheckInCalendar(false);
    setShowCheckOutCalendar(false);
    setShowGuestsPicker(false);
    setShowRoomsPicker(false);
    setShowRoomTypePicker(false);
  };

  // Handle outside clicks
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        checkInRef.current &&
        !checkInRef.current.contains(target) &&
        checkOutRef.current &&
        !checkOutRef.current.contains(target) &&
        guestsRef.current &&
        !guestsRef.current.contains(target) &&
        roomsRef.current &&
        !roomsRef.current.contains(target) &&
        roomTypeRef.current &&
        !roomTypeRef.current.contains(target)
      ) {
        closeAllPickers();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = () => {
    console.log({ checkInDate, checkOutDate, numGuests, numRooms, roomType });
    alert("Booking submitted! Check console for details.");
  };

  // Get unique room types from accommodation data
  const specialRooms = accommodationData[0].rooms;
  const standardRooms = accommodationData[1].rooms;

  const formatDate = (dateString: any) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  type CalendarPickerProps = {
    value: string;
    onChange: (v: string) => void;
    onClose: () => void;
    show: boolean;
  };

  const CalendarPicker = ({
    value,
    onChange,
    onClose,
    show,
  }: CalendarPickerProps) => {
    if (!show) return null;

    const today = new Date().toISOString().split("T")[0];

    return (
      <div className="absolute -left-3.5 z-50 mt-2 bg-gray-50 rounded-lg shadow-2xl p-4 border border-[var(--testimonial-border)]">
        <label
          htmlFor="date"
          className="block mb-2 text-sm font-medium text-neutral-90"
        >
          Select a date
        </label>
        <input
          type="date"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            onClose();
          }}
          min={today}
          className="w-full p-2 border border-[var(--testimonial-border)] rounded focus:outline-none focus:ring-1 focus:ring-primary text-[var(--minor-text)] [color-scheme:dark] dark:[color-scheme:light]"
          autoFocus
        />
      </div>
    );
  };

  type RoomTypePickerProps = {
    value: string;
    onChange: (v: string) => void;
    onClose: () => void;
    show: boolean;
  };

  const RoomTypePicker = ({
    value,
    onChange,
    onClose,
    show,
  }: RoomTypePickerProps) => {
    if (!show) return null;

    return (
      <div className="absolute left-0 z-50 mt-2 bg-gray-50 rounded-lg shadow-2xl p-4 border border-[var(--testimonial-border)] w-[280px] md:w-[320px]">
        <div className="max-h-[400px] overflow-y-auto scrollbar-hide space-y-4">
          {/* Special Accommodations */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-90 mb-3">
              Special
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {specialRooms.map((room) => (
                <button
                  key={room.name}
                  type="button"
                  onClick={() => {
                    onChange(room.name);
                    onClose();
                  }}
                  className={`cursor-pointer flex flex-col items-start p-2 rounded-lg border text-left transition-all ${
                    value === room.name
                      ? "bg-primary/10 border-primary"
                      : "bg-white border-[var(--testimonial-border)] hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  <div className="w-full h-16 relative mb-2 rounded overflow-hidden">
                    <Image
                      src={room.imageUrl}
                      alt={room.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <span className="text-xs font-medium text-neutral-90 line-clamp-2">
                    {room.name}
                  </span>
                  <span className="text-xs text-primary font-semibold mt-1">
                    ${room.price}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Standard Accommodations */}
          <div>
            <h4 className="text-sm font-semibold text-neutral-90 mb-3">
              Standard
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {standardRooms.map((room) => (
                <button
                  key={room.name}
                  type="button"
                  onClick={() => {
                    onChange(room.name);
                    onClose();
                  }}
                  className={`flex flex-col items-start p-2 rounded-lg border text-left transition-all ${
                    value === room.name
                      ? "bg-primary/10 border-primary"
                      : "bg-white border-[var(--testimonial-border)] hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  <div className="w-full h-16 relative mb-2 rounded overflow-hidden">
                    <Image
                      src={room.imageUrl}
                      alt={room.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-neutral-90 line-clamp-2">
                    {room.name}
                  </span>
                  <span className="text-xs text-primary font-semibold mt-1">
                    ${room.price}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <main className="w-full lg:max-w-5xl mx-auto md:flex md:justify-center">
      <div className="lg:hidden bg-white w-full px-[30px] py-[25px]">
        <div className="flex flex-col md:flex-row items-start justify-between gap-5 max-w-[550px] md:max-w-full mx-auto">
          <h2 className="text-h4 font-semibold text-dark-bg tracking-wide">
            BOOK
            <br />
            YOUR ROOM
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <div className="space-y-4 w-full">
              {/* Check-In Date */}
              <div className="relative" ref={checkInRef}>
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    closeAllPickers();
                    setShowCheckInCalendar(true);
                  }}
                >
                  <input
                    type="text"
                    value={formatDate(checkInDate)}
                    placeholder="Check-In Date"
                    readOnly
                    className="text-bodySmall w-full h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] cursor-pointer focus:outline-none focus:border-primary transition-colors"
                  />
                  <IoCalendarOutline className="absolute right-3 top-3.5 text-secondary/60 w-4 h-4" />
                </div>
                <CalendarPicker
                  value={checkInDate}
                  onChange={setCheckInDate}
                  onClose={() => setShowCheckInCalendar(false)}
                  show={showCheckInCalendar}
                />
              </div>
              {/* Check-Out Date */}
              <div className="relative" ref={checkOutRef}>
                <div
                  className="relative cursor-pointer"
                  onClick={() => {
                    closeAllPickers();
                    setShowCheckOutCalendar(true);
                  }}
                >
                  <input
                    type="text"
                    value={formatDate(checkOutDate)}
                    placeholder="Check-Out Date"
                    readOnly
                    className="text-bodySmall w-full h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] cursor-pointer focus:outline-none focus:border-primary transition-colors"
                  />
                  <IoCalendarOutline className="absolute right-3 top-3.5 text-secondary/60 w-4 h-4" />
                </div>
                <CalendarPicker
                  value={checkOutDate}
                  onChange={setCheckOutDate}
                  onClose={() => setShowCheckOutCalendar(false)}
                  show={showCheckOutCalendar}
                />
              </div>
            </div>
            <div className="space-y-4 w-full">
              {/* Number of Rooms */}
              <div className="relative" ref={roomsRef}>
                <input
                  type="text"
                  value={numRooms}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      setNumRooms(val);
                    }
                  }}
                  placeholder="Number of Rooms"
                  className="text-bodySmall w-full h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] pr-10 focus:outline-none focus:border-primary transition-colors"
                />
                <ChevronsUpDown
                  onClick={() => {
                    closeAllPickers();
                    setShowRoomsPicker(!showRoomsPicker);
                  }}
                  className="absolute right-3 top-3.5 text-secondary/70 w-4 h-4 cursor-pointer hover:text-primary transition-colors"
                />
                <NumberPicker
                  value={numRooms}
                  onChange={setNumRooms}
                  onClose={() => setShowRoomsPicker(false)}
                  show={showRoomsPicker}
                  numberOfWhat="rooms"
                />
              </div>
              {/* Number of Guests */}
              <div className="relative" ref={guestsRef}>
                <input
                  type="text"
                  value={numGuests}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val === "" || /^\d+$/.test(val)) {
                      setNumGuests(val);
                    }
                  }}
                  placeholder="Number of Guests"
                  className="text-bodySmall w-full h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] pr-10 focus:outline-none focus:border-primary transition-colors"
                />
                <ChevronsUpDown
                  onClick={() => {
                    closeAllPickers();
                    setShowGuestsPicker(true);
                  }}
                  className="absolute right-3 top-3.5 text-secondary/70 w-4 h-4 cursor-pointer hover:text-primary transition-colors"
                />
                <NumberPicker
                  value={numGuests}
                  onChange={setNumGuests}
                  onClose={() => setShowGuestsPicker(false)}
                  show={showGuestsPicker}
                  numberOfWhat="guests"
                />
              </div>
            </div>
            <div className=" space-y-5 md:space-y-3">
              {/* Room Type */}
              <div className="relative" ref={roomTypeRef}>
                <input
                  type="text"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  placeholder="Room Type"
                  readOnly
                  className="text-bodySmall w-full h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] pr-10 cursor-pointer focus:outline-none focus:border-primary transition-colors"
                  onClick={() => {
                    closeAllPickers();
                    setShowRoomTypePicker(true);
                  }}
                />
                <ChevronsUpDown
                  onClick={() => {
                    closeAllPickers();
                    setShowRoomTypePicker(true);
                  }}
                  className="absolute right-3 top-3.5 text-secondary/70 w-4 h-4 cursor-pointer hover:text-primary transition-colors"
                />
                <RoomTypePicker
                  value={roomType}
                  onChange={setRoomType}
                  onClose={() => setShowRoomTypePicker(false)}
                  show={showRoomTypePicker}
                />
              </div>
              {/* Book Now Button */}
              <div className="flex items-end">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSubmit}
                  btnClassName="w-2/3 md:w-full mx-auto"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden bg-white w-full lg:flex flex-col md:flex-row items-center justify-between px-[30px] py-[25px] gap-5">
        <h2 className="text-h4 font-semibold text-dark-bg tracking-wide">
          BOOK
          <br />
          YOUR ROOM
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px]">
          <div className="space-y-3">
            {/* Check-In Date */}
            <div className="relative" ref={checkInRef}>
              <div
                className="relative cursor-pointer w-fit"
                onClick={() => {
                  closeAllPickers();
                  setShowCheckInCalendar(true);
                }}
              >
                <input
                  type="text"
                  value={formatDate(checkInDate)}
                  placeholder="Check-In Date"
                  readOnly
                  className="text-bodySmall w-[230px] h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] cursor-pointer focus:outline-none focus:border-primary transition-colors"
                />
                <IoCalendarOutline className="absolute right-3 top-3.5 text-secondary/60 w-4 h-4" />
              </div>
              <CalendarPicker
                value={checkInDate}
                onChange={setCheckInDate}
                onClose={() => setShowCheckInCalendar(false)}
                show={showCheckInCalendar}
              />
            </div>
            {/* Check-Out Date */}
            <div className="relative" ref={checkOutRef}>
              <div
                className="relative cursor-pointer w-fit"
                onClick={() => {
                  closeAllPickers();
                  setShowCheckOutCalendar(true);
                }}
              >
                <input
                  type="text"
                  value={formatDate(checkOutDate)}
                  placeholder="Check-Out Date"
                  readOnly
                  className="text-bodySmall w-[230px] h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] cursor-pointer focus:outline-none focus:border-primary transition-colors"
                />
                <IoCalendarOutline className="absolute right-3 top-3.5 text-secondary/60 w-4 h-4" />
              </div>
              <CalendarPicker
                value={checkOutDate}
                onChange={setCheckOutDate}
                onClose={() => setShowCheckOutCalendar(false)}
                show={showCheckOutCalendar}
              />
            </div>
          </div>
          <div className="space-y-3">
            {/* Number of Rooms */}
            <div className="relative w-[230px]" ref={roomsRef}>
              <input
                type="text"
                value={numRooms}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d+$/.test(val)) {
                    setNumRooms(val);
                  }
                }}
                placeholder="Number of Rooms"
                className="text-bodySmall w-full h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] pr-10 focus:outline-none focus:border-primary transition-colors"
              />
              <ChevronsUpDown
                onClick={() => {
                  closeAllPickers();
                  setShowRoomsPicker(true);
                }}
                className="absolute right-3 top-3.5 text-secondary/70 w-4 h-4 cursor-pointer hover:text-primary transition-colors"
              />
              <NumberPicker
                value={numRooms}
                onChange={setNumRooms}
                onClose={() => setShowRoomsPicker(false)}
                show={showRoomsPicker}
                numberOfWhat="rooms"
              />
            </div>
            {/* Number of Guests */}
            <div className="relative w-[230px]" ref={guestsRef}>
              <input
                type="text"
                value={numGuests}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || /^\d+$/.test(val)) {
                    setNumGuests(val);
                  }
                }}
                placeholder="Number of Guests"
                className="text-bodySmall w-full h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] pr-10 focus:outline-none focus:border-primary transition-colors"
              />
              <ChevronsUpDown
                onClick={() => {
                  closeAllPickers();
                  setShowGuestsPicker(true);
                }}
                className="absolute right-3 top-3.5 text-secondary/70 w-4 h-4 cursor-pointer hover:text-primary transition-colors"
              />
              <NumberPicker
                value={numGuests}
                onChange={setNumGuests}
                onClose={() => setShowGuestsPicker(false)}
                show={showGuestsPicker}
                numberOfWhat="guests"
              />
            </div>
          </div>
          <div className="space-y-3">
            {/* Room Type */}
            <div className="relative w-[230px]" ref={roomTypeRef}>
              <input
                type="text"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                placeholder="Room Type"
                readOnly
                className="text-bodySmall w-full h-[45px] border-2 border-secondary text-secondary placeholder:text-secondary p-[14px] pr-10 cursor-pointer focus:outline-none focus:border-primary transition-colors"
                onClick={() => {
                  closeAllPickers();
                  setShowRoomTypePicker(true);
                }}
              />
              <ChevronsUpDown
                onClick={() => {
                  closeAllPickers();
                  setShowRoomTypePicker(true);
                }}
                className="absolute right-3 top-3.5 text-secondary/70 w-4 h-4 cursor-pointer hover:text-primary transition-colors"
              />
              <RoomTypePicker
                value={roomType}
                onChange={setRoomType}
                onClose={() => setShowRoomTypePicker(false)}
                show={showRoomTypePicker}
              />
            </div>
            {/* Book Now Button */}
            <div className="flex items-end">
              <Button
                variant="primary"
                size="lg"
                onClick={handleSubmit}
                btnClassName="w-2/3 mx-auto"
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
