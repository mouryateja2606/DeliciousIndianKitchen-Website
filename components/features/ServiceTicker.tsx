"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export function ServiceTicker() {
    const { language } = useLanguage();
    // Using direct strings or getting from translations if available.
    // For now, I'll add them to translations to ensure they are translatable.

    const { services } = translations[language];

    // Duplicate the list to ensure seamless looping
    const tickerItems = [
        services.kids,
        services.dietary,
        services.fresh,
        services.reservation,
        services.halal,
        services.takeaway,
        services.party,
        services.wifi,
        services.batters,
    ];

    // Create a long list for loop
    const content = [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems];

    return (
        <div className="w-full max-w-[100vw] bg-gold py-4 overflow-hidden border-y border-white/10 relative z-30">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex gap-12 md:gap-24"
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 60, // Slower speed to reduce blur
                    }}
                    style={{ willChange: "transform", transform: "translateZ(0)" }} // Hardware acceleration hints
                >
                    {content.map((item, index) => (
                        <span
                            key={index}
                            className="text-black font-bold uppercase tracking-widest text-[10px] md:text-base flex items-center gap-4"
                        >
                            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-black rounded-full" /> {/* Bullet point */}
                            {item}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
