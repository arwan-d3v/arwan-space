import { InputHTMLAttributes } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function NeumInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full px-4 py-3 neum-inset focus:outline-none focus:ring-2 focus:ring-[#7ec8e3]/50 text-slate-200 placeholder-gray-400 bg-transparent transition-all",
        className
      )}
      {...props}
    />
  );
}
