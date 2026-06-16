import { ReactNode } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
}

export default function GlassPanel({ children, className, as: Component = 'div' }: GlassPanelProps) {
  return (
    <Component className={cn("glass-panel", className)}>
      {children}
    </Component>
  );
}
