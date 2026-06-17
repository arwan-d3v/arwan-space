import { ReactNode, ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeumButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  active?: boolean;
}

export default function NeumButton({ children, className, active, ...props }: NeumButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 font-medium text-slate-300 transition-all focus:outline-none flex items-center justify-center gap-2",
        active ? "neum-inset text-[#7ec8e3]" : "neum-button",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
