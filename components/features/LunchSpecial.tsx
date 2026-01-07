"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";

// Mock Data for Lunch
const LUNCH_ITEMS = [
    {
        id: "1",
        name: "Butter Chicken Bowl",
        description: "Served with Basmati rice, Naan & Salad",
        price: 12.50,
        tags: ["Popular"]
    },
    {
        id: "2",
        name: "Paneer Tikka Masala Bowl",
        description: "Served with Basmati rice, Naan & Salad",
        price: 11.90,
        tags: ["Veg"]
    },
    {
        id: "3",
        name: "South Indian Thali",
        description: "3 Curries, Rice, Sambar, Rasam, Sweet & Papad",
        price: 13.50,
        tags: ["Authentic"]
    }
];

export function LunchSpecial() {
    // Simple logic to check if it's lunch time (12-15)
    // This runs on client, effectively.
    const [status, setStatus] = useState("closed");

    useEffect(() => {
        const hour = new Date().getHours();
        const isOpen = hour >= 12 && hour < 15;
        setStatus(isOpen ? "open" : (hour < 12 ? "soon" : "closed"));
    }, []);

    return (
        <section id="lunch-special" className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/40 z-0" /> {/* Overlay for readability */}
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <motion.span
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-gold text-xs tracking-[0.2em] font-bold uppercase"
                            >
                                12:00 - 15:00 Daily
                            </motion.span>
                            {status === "open" && (
                                <span className="inline-block px-3 py-0.5 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold border border-green-500/30 animate-pulse">
                                    LIVE NOW
                                </span>
                            )}
                        </div>

                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">
                            Business Lunch
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Clock size={16} className="text-gold" />
                        <span>Order before 14:30 for fast service</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {LUNCH_ITEMS.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-white/5 border border-white/5 p-8 rounded-xl hover:bg-white/10 hover:border-gold/30 transition-all duration-300 relative overflow-hidden"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    {item.tags.map(tag => (
                                        <span key={tag} className="text-[10px] uppercase tracking-wider font-bold text-gold bg-gold/10 px-2 py-1 rounded">
                                            {tag}
                                        </span>
                                    ))}
                                    <span className="font-serif text-xl font-bold text-white">€{item.price.toFixed(2)}</span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors">{item.name}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
