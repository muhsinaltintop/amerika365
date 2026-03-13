import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  className?: string;
}

export function PrimaryButton({ children, className = "" }: PrimaryButtonProps) {
  return (
    <button className={`rounded-xl bg-[#0756b0] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#0756b0]/90 sm:px-8 sm:py-4 sm:text-base ${className}`}>
      {children}
    </button>
  );
}
