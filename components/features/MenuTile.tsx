"use client";

import { motion } from "framer-motion";
import { MenuItem } from "@/lib/types";
import Image from "next/image";

interface MenuTileProps {
    item: MenuItem;
    isActive: boolean;
}

export function MenuTile({ item, isActive }: MenuTileProps) {
    return (
        <motion.div
            animate={{
                scale: isActive ? 1.0 : 0.9,
                opacity: isActive ? 1 : 0.7,
                filter: isActive ? "blur(0px)" : "blur(2px)",
            }}
            transition={{ duration: 0.4 }}
            className={`
                relative w-80 md:w-96 flex-shrink-0 
                bg-white/10 backdrop-blur-md border border-white/10 
                rounded-3xl p-8 text-center 
                flex flex-col items-center gap-6
                ${isActive ? "shadow-[0_0_50px_rgba(255,215,0,0.15)] border-gold/30" : "shadow-none"}
            `}
        >
            {/* Circular Image Container */}
            <div className="relative w-48 h-48 -mt-20 rounded-full shadow-2xl border-4 border-black/50 overflow-hidden">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <span className="text-4xl">🍽️</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="space-y-3 mt-4">
                <h3 className="text-2xl font-serif font-bold text-white">
                    {item.title}
                </h3>
                <div className="w-12 h-1 bg-gold mx-auto rounded-full" />
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                </p>
            </div>

            {/* Price & Tags */}
            <div className="mt-auto pt-4 flex flex-col items-center gap-3">
                <span className="text-3xl font-serif text-gold">
                    €{item.price.toFixed(2)}
                </span>

                <div className="flex gap-2">
                    {item.attributes?.isVeg && (
                        <span className="text-[10px] uppercase font-bold px-3 py-1 bg-green-500/10 text-green-400 rounded-full border border-green-500/20">
                            Veg
                        </span>
                    )}
                    {item.attributes?.isSpicy && (
                        <span className="text-[10px] uppercase font-bold px-3 py-1 bg-red-500/10 text-red-400 rounded-full border border-red-500/20">
                            Spicy
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
