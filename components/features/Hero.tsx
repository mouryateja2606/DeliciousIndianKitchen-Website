"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FloatingElement } from "./FloatingElement";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { ServiceTicker } from "./ServiceTicker";
import { Leaf, MapPin } from "lucide-react";


const CAROUSEL_IMAGES: { src: string; alt: string; price: string; label: string; className?: string; style?: React.CSSProperties }[] = [
    { src: "/assets/hero_biryani_noshadow.png", alt: "Chicken Biryani", price: "15", label: "Chicken Biryani" },
    {
        src: "/assets/paneer_butter_masala_final.png",
        alt: "Paneer Butter Masala",
        price: "14",
        label: "Paneer Butter Masala",
    },
    { src: "/assets/dosa_idli_smoke_3d.png", alt: "South Indian Breakfast", price: "10", label: "Dosa & Idli" },
    { src: "/assets/hero_samosa.png", alt: "Crispy Samosa", price: "6", label: "Crispy Samosa" },
    { src: "/assets/hero_gulab.png", alt: "Gulab Jamun", price: "6", label: "Gulab Jamun" },
    { src: "/assets/hero_mango.png", alt: "Mango Lassi", price: "5", label: "Mango Lassi" },
];

export function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { language } = useLanguage();
    const { hero, items } = translations[language];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen w-full bg-transparent overflow-visible flex flex-col">

            <div className="flex flex-col md:flex-row w-full flex-grow md:gap-20">

                {/* LEFT SIDE: Background + Text */}
                <div className="relative w-full md:w-1/2 flex flex-col items-center md:items-start md:justify-center px-4 pt-48 pb-20 md:pt-0 md:pb-0">
                    {/* Background Image (Left Only) - Contained strictly here */}
                    <div className="absolute inset-x-0 bottom-0 top-40 md:top-24 z-0 select-none pointer-events-none">
                        <Image
                            src="/assets/spices.png"
                            alt="Spices Background"
                            fill
                            className="object-cover md:object-right-top"
                            priority
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
                    </div>

                    {/* Text Content - Positioned closer to center */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="relative z-20 flex flex-col items-center md:items-start text-center md:text-left space-y-4 w-full max-w-4xl px-4 md:px-0 md:pl-48 md:mt-48"
                    >


                        {/* Desktop Badge (Keep original for desktop if desired, or just use one? User said 'remove from top' implied mobile constraint. Let's keep desktop as is or hide it? The request was specific to mobile view optimization. I will hide the large one on mobile and show on desktop only) */}


                        <motion.div className="relative inline-block mb-2">
                            <h2 className="text-xl md:text-5xl font-bold text-gold uppercase tracking-widest relative z-20 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] whitespace-pre-line leading-tight">
                                {hero.subtitle}
                            </h2>
                        </motion.div>

                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] md:leading-[0.85] tracking-tighter uppercase drop-shadow-2xl">
                            {hero.title_line1} <br /> <span className="text-white">{hero.title_line2}</span>
                        </h1>

                        <p className="text-gray-200 max-w-xs md:max-w-md text-sm md:text-base font-light tracking-wide leading-relaxed pt-2 md:pt-4 drop-shadow-md">
                            {hero.description}
                        </p>
                    </motion.div>
                </div>


                {/* RIGHT SIDE: Carousel (Images) */}
                <div className="relative w-full md:w-1/2 flex items-center justify-center md:justify-start bg-transparent z-10 md:border-l border-white/5 md:pl-12 pb-20 md:pb-0">


                    <div className="relative w-full max-w-[280px] md:max-w-[550px] aspect-square flex items-center justify-center perspective-1000 mt-0 md:mt-24">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.7, x: 100 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.7, x: -100 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <FloatingElement duration={5} yOffset={20} className="relative w-full h-full">
                                    <Image
                                        src={CAROUSEL_IMAGES[currentIndex].src}
                                        alt={CAROUSEL_IMAGES[currentIndex].alt}
                                        fill
                                        className={`object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] mix-blend-screen ${CAROUSEL_IMAGES[currentIndex].className || ""}`}
                                        style={CAROUSEL_IMAGES[currentIndex].style || {}}
                                        priority
                                    />
                                </FloatingElement>
                            </motion.div>
                        </AnimatePresence>

                        {/* Dynamic Item Name Tag (Replacing Price) */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`label-${currentIndex}`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ delay: 0.3, type: "spring" }}
                                className={`absolute z-30 flex flex-col items-center justify-center w-full md:w-auto ${CAROUSEL_IMAGES[currentIndex].src.includes('paneer')
                                    ? 'bottom-2 md:-bottom-8 md:right-4' // Mobile: Moved up to bottom-2 (Positive)
                                    : 'bottom-2 md:bottom-10 md:right-10' // Mobile: Moved up to bottom-2 (Positive)
                                    }`}
                            >
                                <div className="bg-black/80 backdrop-blur-md border border-gold/40 p-3 md:p-6 rounded-2xl flex flex-col items-center justify-center shadow-2xl group cursor-default hover:scale-105 transition-transform max-w-[200px] text-center">
                                    <span className="text-lg md:text-2xl font-bold text-gold leading-tight">
                                        {items[CAROUSEL_IMAGES[currentIndex].label as keyof typeof items] || CAROUSEL_IMAGES[currentIndex].label}
                                    </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Mobile Google Rating Badge - Moved up for visibility */}
                    <a
                        href="#reviews"
                        className="absolute bottom-12 right-4 md:hidden z-50 pointer-events-auto"
                    >
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex flex-col items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full cursor-pointer"
                        >
                            <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center mb-0.5">
                                <Image src="/assets/google-icon.png" alt="G" width={10} height={10} className="object-contain" />
                            </div>
                            <span className="text-white font-bold text-[9px] leading-none">5.0 ★</span>
                        </motion.div>
                    </a>
                </div>



            </div>

            {/* Service Ticker at Top (Below Nav) - Nav height is 96px (h-24) */}
            <div className="absolute top-24 left-0 w-full z-40">
                <ServiceTicker />
            </div>

            {/* Modern Floating Nutritional Info Badge */}
            <motion.a
                href="#menu"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 1 }}
                className="absolute top-40 right-2 md:top-40 md:right-10 z-50 group"
            >
                <div className="relative w-20 h-20 md:w-32 md:h-32 flex items-center justify-center">
                    {/* Rotating Text Ring */}
                    <div className="absolute inset-0 animate-[spin_10s_linear_infinite] group-hover:pause">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <defs>
                                <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                            </defs>
                            <text className="text-[8px] md:text-[8px] font-bold fill-gold uppercase tracking-[2px]">
                                <textPath href="#circlePath" startOffset="50%" textAnchor="middle" className="fill-white text-[10px] font-bold tracking-[0.2em] uppercase">
                                    • {language === 'de' ? 'Nährwerte' : 'Nutritional'} • Info •
                                </textPath>
                            </text>
                        </svg>
                    </div>

                    {/* Center Circle with Icon */}
                    <div className="absolute inset-0 m-auto w-10 h-10 md:w-16 md:h-16 bg-black/80 backdrop-blur-md rounded-full border border-gold/30 flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                        <Leaf className="text-gold w-5 h-5 md:w-8 md:h-8" />
                    </div>
                </div>
            </motion.a>

        </section>
    );
}
