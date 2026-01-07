"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    yOffset?: number;
}

export function FloatingElement({
    children,
    className,
    delay = 0,
    duration = 4,
    yOffset = 20,
}: FloatingElementProps) {
    return (
        <motion.div
            className={cn("will-change-transform", className)}
            initial={{ y: 0 }}
            animate={{
                y: [0, -yOffset, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay,
            }}
        >
            {children}
        </motion.div>
    );
}
