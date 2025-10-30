"use client";

type NumberPickerProps = {
  value: string;
  onChange: (v: string) => void;
  onClose: () => void;
  show: boolean;
  numberOfWhat: "guests" | "rooms";
};

export const NumberPicker = ({
  value,
  onChange,
  onClose,
  show,
  numberOfWhat,
}: NumberPickerProps) => {
  if (!show) return null;

  const maxNumber = numberOfWhat === "guests" ? 20 : 12;
  const numbers = Array.from({ length: maxNumber }, (_, i) => i + 1);

  return (
    <div className="absolute -left-2.5 z-50 mt-2 bg-gray-50 rounded-lg shadow-2xl p-4 border border-[var(--testimonial-border)] w-[250px]">
      <label className="block mb-3 text-sm font-medium text-neutral-90">
        Select number of {numberOfWhat}
      </label>
      <div className="grid grid-cols-5 gap-2 max-h-[200px] overflow-y-auto scrollbar-hide">
        {numbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => {
              onChange(num.toString());
              onClose();
            }}
            className={`cursor-pointer p-2 rounded-full border text-sm font-medium transition-all ${
              value === num.toString()
                ? "bg-primary text-white border-primary"
                : "bg-gray-50 text-neutral-90 border-light-testimonial-border hover:border-primary hover:bg-primary/10"
            }`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
