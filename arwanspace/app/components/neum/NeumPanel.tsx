import { ReactNode } from 'react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface NeumPanelProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  inset?: boolean;
  sm?: boolean;
}

export default function NeumPanel({ children, className, as: Component = 'div', inset = false, sm = false }: NeumPanelProps) {
  const baseClass = inset ? 'neum-inset' : (sm ? 'neum-panel-sm' : 'neum-panel');

  return (
    <Component className={cn(baseClass, className)}>
      {children}
    </Component>
  );
}
