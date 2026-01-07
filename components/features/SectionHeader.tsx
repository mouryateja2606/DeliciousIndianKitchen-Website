"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
    description?: string;
    alignment?: "left" | "center"; // Forcing left alignment for consistency
    className?: string;
}

export function SectionHeader({ title, subtitle, description, alignment = "left", className = "" }: SectionHeaderProps) {
    return (
        <div className={`relative text-left w-full ${className}`}>
            <div className="flex flex-col gap-4">
                {/* Subtitle */}
                <h4 className="text-gold font-bold uppercase tracking-[0.2em] text-sm md:text-base border border-gold/20 bg-gold/5 px-4 py-1 rounded-full self-start">
                    {subtitle}
                </h4>
                {/* Title Row with Divider */}
                <div className="flex items-center gap-6">
                    <h2 className="text-3xl md:text-6xl font-serif font-bold text-white whitespace-normal md:whitespace-nowrap leading-tight break-words max-w-full">
                        {title}
                    </h2>
                    {/* The Divider Line "Highlight from left to right" */}
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-gold/80 via-gold/30 to-transparent origin-left" />
                </div>
                {/* Description */}
                {description && (
                    <p className="text-white/60 text-lg font-light max-w-2xl leading-relaxed">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
