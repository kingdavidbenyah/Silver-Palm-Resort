import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "lg";
  variant?: "primary" | "outline" | "ghost";
  onClick?: () => void;
  disabled?: boolean;
  btnClassName?: string;
  childClassName?: string;
  children: React.ReactNode;
}

const getButtonClasses = ({
  variant,
  size,
  disabled,
  btnClassName,
}: {
  variant: "primary" | "outline" | "ghost";
  size: "sm" | "lg";
  disabled: boolean;
  btnClassName?: string;
}) =>
  cn(
    "group relative overflow-hidden text-neutral-10 flex-center rounded-full font-semibold cursor-pointer transition-all duration-300",
    {
      //Size variation
      "px-[30px] py-[15px] text-[16px]": size === "lg" && variant === "primary",
      "px-[30px] py-[12.25px] text-[16px]":
        size === "lg" && variant === "outline",
      "text-[16px]": size === "lg" && variant === "ghost",

      "px-[20px] py-[10px] text-[14px]": size === "sm" && variant === "primary",
      "px-[20px] py-[7.25px] text-[14px]":
        size === "sm" && variant === "outline",
      "text-[14px]": size === "sm" && variant === "ghost",

      //Variant
      "bg-primary text-neutral-10 shadow-primary":
        variant === "primary" && !disabled,
      "bg-disabled cursor-not-allowed text-neutral-10":
        variant === "primary" && disabled,

      "bg-transparent hover:bg-primary text-primary hover:text-neutral-10 border-2 border-primary shadow-primary":
        variant === "outline" && !disabled,
      "bg-transparent cursor-not-allowed text-disabled border-2 border-disabled":
        variant === "outline" && disabled,

      "bg-transparent text-primary hover:text-primary-hover":
        variant === "ghost" && !disabled,
      "bg-transparent cursor-not-allowed text-disabled":
        variant === "ghost" && disabled,
    },
    btnClassName
  );

export const Button: React.FC<ButtonProps> = ({
  size = "lg",
  variant = "primary",
  onClick,
  disabled = false,
  btnClassName,
  childClassName,
  children,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={getButtonClasses({ variant, size, disabled, btnClassName })}
      disabled={disabled}
      {...props}
    >
      {/* Overlay animation */}
      {variant === "primary" && (
        <span
          className={cn(
            "absolute inset-0 bg-neutral-100/20 transform -translate-x-full transition-transform duration-400 ease-out",
            "group-hover:translate-x-0"
          )}
        ></span>
      )}

      <span className={`relative z-10 ${childClassName}`}>{children}</span>
    </button>
  );
};
