import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, error, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "h-11 w-full rounded-control border bg-white px-4 text-sm text-ink placeholder:text-ink-secondary/50",
      "border-purple-900/15 focus-visible:border-purple-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-700",
      error && "border-red-500 focus-visible:ring-red-500",
      className
    )}
    {...props}
  />
));
Input.displayName = "Input";
export { Input };
