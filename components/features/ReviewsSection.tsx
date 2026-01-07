"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Star, User } from "lucide-react";
import Image from "next/image";

export function ReviewsSection() {
    const { language } = useLanguage();
    const { sections } = translations[language];

    // Mock reviews array - mapping purely for structure, content comes from translations
    const reviews = [
        { id: 1, key: "review1" },
        { id: 2, key: "review2" },
        { id: 3, key: "review3" },
        { id: 4, key: "review4" },
    ];


    // Helper to extract initials
    const getInitials = (name: string) => {
        if (!name) return "??";
        const parts = name.trim().split(/\s+/);
        if (parts.length === 0) return "";
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    return (
        <section id="reviews" className="relative py-20 overflow-hidden">
            <div className="container mx-auto px-6 relative z-20">

                {/* Header */}
                <div className="mb-16 flex flex-col items-center text-center">
                    <SectionHeader
                        alignment="center"
                        subtitle={sections.reviews.subtitle}
                        title={sections.reviews.title}
                    />

                    {/* Google Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="mt-6 flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/10"
                    >
                        <div className="mr-3 bg-white w-8 h-8 rounded-full flex items-center justify-center p-1.5">
                            <Image
                                src="/assets/google-icon.png"
                                alt="Google"
                                width={24}
                                height={24}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col items-start">
                            <span className="text-white font-bold text-sm tracking-wide">{sections.reviews.google_rating}</span>
                            <div className="flex space-x-0.5">
                                {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={12} className="fill-gold text-gold" />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Reviews Grid (Carousel-ish) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => {
                        const reviewData = sections.reviews[review.key as keyof typeof sections.reviews] as { name: string; text: string };
                        const initials = getInitials(reviewData.name);

                        return (
                            <motion.div
                                key={review.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 p-4 md:p-6 rounded-2xl hover:bg-white/10 transition-colors group h-full flex flex-col"
                            >
                                {/* Stars */}
                                <div className="flex space-x-1 mb-2 md:mb-4">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={16} className="fill-gold text-gold" />
                                    ))}
                                </div>

                                {/* Text */}
                                <p className="text-white/80 text-xs md:text-sm leading-relaxed mb-4 md:mb-6 italic min-h-[60px] md:min-h-[80px]">
                                    "{reviewData.text}"
                                </p>

                                {/* User Info */}
                                <div className="flex items-center mt-auto border-t border-white/5 pt-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/5 flex items-center justify-center text-gold font-bold text-sm border border-gold/20 mr-3">
                                        {initials}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{reviewData.name}</h4>
                                        <span className="text-white/40 text-xs">Google Review</span>
                                    </div>
                                    {/* Google G Icon (Small) */}
                                    <div className="ml-auto opacity-20 group-hover:opacity-100 transition-opacity">
                                        <span className="text-lg font-bold text-white">G</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
