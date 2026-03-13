import { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  className?: string;
}

export function PrimaryButton({ children, className = "" }: PrimaryButtonProps) {
  return (
    <button className={`rounded-xl bg-[#0756b0] px-8 py-4 text-base font-bold text-white transition-all hover:bg-[#0756b0]/90 ${className}`}>
      {children}
    </button>
  );
}
