"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut, Info } from "lucide-react";
import Image from "next/image";

interface MenuCarouselProps {
    images: string[];
}

export function MenuCarousel({ images }: MenuCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomScale, setZoomScale] = useState(1);
    const [showInstructions, setShowInstructions] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    // Track screen size for responsive offset calculations
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize(); // Init
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Disable body scroll when zoomed
    useEffect(() => {
        if (isZoomed) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isZoomed]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const openZoom = () => {
        setIsZoomed(true);
        setZoomScale(1);
        setShowInstructions(true);
        // Hide instructions after 3 seconds
        setTimeout(() => setShowInstructions(false), 3000);
    };

    const closeZoom = () => {
        setIsZoomed(false);
    };

    const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.25, 0.5));

    // Touch handlers for mobile swipe
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(0);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        const distance = touchStart - touchEnd;

        // Swipe left (positive distance) = next slide
        if (distance > 50) {
            nextSlide();
        }
        // Swipe right (negative distance) = previous slide
        else if (distance < -50) {
            prevSlide();
        }

        // Reset
        setTouchStart(0);
        setTouchEnd(0);
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto px-4 py-12">
            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-[100] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black border border-gold text-gold hover:bg-gold hover:text-black transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                aria-label="Previous Item"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-[100] w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black border border-gold text-gold hover:bg-gold hover:text-black transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                aria-label="Next Item"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Viewport */}
            <div
                className="overflow-hidden py-8 touch-pan-y"
                style={{ touchAction: 'pan-y' }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <motion.div
                    className="flex items-center gap-4 md:gap-16"
                    animate={{
                        x: isMobile
                            ? `calc(50% - ${currentIndex * (85 + 5)}vw - 42.5vw)` // Mobile: 85vw width + 5vw gap. Offset by half width (42.5vw)
                            : `calc(50% - ${currentIndex * (400 + 64)}px - 200px)` // Desktop: 400px item + 64px gap
                    }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                >
                    {images.map((src, index) => (
                        <div key={index} className="relative flex flex-col items-center gap-4">
                            <motion.div
                                className="relative flex-shrink-0 w-[85vw] md:w-[400px] h-[55vh] md:h-[600px] rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl cursor-pointer group"
                                animate={{
                                    scale: index === currentIndex ? 1.0 : 0.9, // Less shrink on mobile
                                    opacity: index === currentIndex ? 1 : 0.4,
                                    zIndex: index === currentIndex ? 10 : 0,
                                }}
                                transition={{ duration: 0.4 }}
                                onClick={() => index === currentIndex && openZoom()}
                            >
                                <Image
                                    src={src}
                                    alt={`Menu Page ${index + 1}`}
                                    fill
                                    className="object-contain"
                                    priority={index === 0}
                                />

                                {/* Zoom Hint Overlay */}
                                {index === currentIndex && (
                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Maximize2 className="text-white w-12 h-12 drop-shadow-lg" />
                                    </div>
                                )}
                            </motion.div>

                            {/* Page Number */}
                            <motion.div
                                animate={{ opacity: index === currentIndex ? 1 : 0 }}
                                className="text-gold font-serif text-lg md:text-xl tracking-widest font-bold drop-shadow-lg"
                            >
                                Page {index + 1} / {images.length}
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-3 mt-8">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`transition - all duration - 300 rounded - full ${idx === currentIndex ? "w-8 h-2 bg-gold" : "w-2 h-2 bg-white/30"}`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isZoomed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) closeZoom();
                        }}
                    >
                        {/* Instructions Toast */}
                        <AnimatePresence>
                            {showInstructions && (
                                <motion.div
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    className="absolute top-20 left-1/2 -translate-x-1/2 bg-black/80 border border-gold/30 px-6 py-2 rounded-full text-gold text-sm z-50 flex items-center gap-2 pointer-events-none"
                                >
                                    <Info size={16} />
                                    <span>Pinch or click + to zoom</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Close Button */}
                        <button
                            onClick={closeZoom}
                            className="absolute top-4 right-4 md:top-8 md:right-8 bg-white/10 p-3 rounded-full text-white hover:bg-red-500/80 transition-colors z-50"
                        >
                            <X size={32} />
                        </button>


                        {/* Zoom Controls & Close */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-50">
                            {/* Zoom Group */}
                            <div className="flex gap-4 bg-black/80 border border-white/20 p-2 rounded-full">
                                <button onClick={handleZoomOut} className="p-3 hover:bg-white/10 rounded-full text-white transition-colors">
                                    <ZoomOut size={24} />
                                </button>
                                <span className="flex items-center text-white font-mono min-w-[3ch] justify-center">{Math.round(zoomScale * 100)}%</span>
                                <button onClick={handleZoomIn} className="p-3 hover:bg-white/10 rounded-full text-white transition-colors">
                                    <ZoomIn size={24} />
                                </button>
                            </div>

                            {/* Explicit Close Button */}
                            <button
                                onClick={closeZoom}
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm shadow-xl transition-colors flex items-center gap-2"
                            >
                                <X size={20} />
                                Close
                            </button>
                        </div>

                        {/* Image Container */}
                        {/* Image Container - New Structure for Proper Scrolling */}
                        {/* 1. Scrollable Container - Added flex to support m-auto centering */}
                        <div className="w-full h-full overflow-auto flex">
                            {/* 2. Sizing Wrapper - m-auto handles centering safely. Removed fixed flex center which clipped left content. */}
                            <div className="relative m-auto p-8 md:p-16">
                                {/* 3. The Image Wrapper - Controls actual size */}
                                <motion.div
                                    animate={{
                                        width: isZoomed ? `${90 * zoomScale}vw` : "90vw",
                                        height: isZoomed ? `${85 * zoomScale}vh` : "85vh",
                                    }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                    className="relative flex-shrink-0"
                                >
                                    <Image
                                        src={images[currentIndex]}
                                        alt="Zoomed Menu"
                                        fill
                                        className="object-contain"
                                        quality={100}
                                        priority
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
