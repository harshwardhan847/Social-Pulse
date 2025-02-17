"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const MotionButton = motion.create(Button);

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedButton({
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    //@ts-expect-error Framer Motion button
    <MotionButton
      className={cn("text-lg", className)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </MotionButton>
  );
}
