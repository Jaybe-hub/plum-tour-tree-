import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-card border border-purple-900/10 bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover", className)} {...props} />
));
Card.displayName = "Card";
const CardImage = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("relative aspect-[4/3] w-full overflow-hidden rounded-t-card", className)} {...props} />
));
CardImage.displayName = "CardImage";
const CardBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5", className)} {...props} />
));
CardBody.displayName = "CardBody";
export { Card, CardImage, CardBody };
