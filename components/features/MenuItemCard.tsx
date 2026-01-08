"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/lib/types";
import { MoveRight, Info, X, Flame, Activity, Leaf, Wheat } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

interface MenuItemCardProps {
    item: MenuItem;
    index?: number;
}

export function MenuItemCard({ item, index }: MenuItemCardProps) {
    const [showInfo, setShowInfo] = useState(false);
    const { language } = useLanguage();

    // Lock body scroll when modal is open
    useEffect(() => {
        if (showInfo) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [showInfo]);
    const animationDelay = (index || 0) * 0.1;

    // DEBUG: Log attributes to console to verify data flow
    // console.log(`Item: ${item.title}, isVeg: ${item.attributes?.isVeg}, isVegan: ${item.attributes?.isVegan}`);

    // Translation helpers
    const t = {
        spicy: language === 'de' ? 'Scharf' : 'Spicy',
        kids: language === 'de' ? 'Kinder' : 'Kids',
        nutritionalInfo: language === 'de' ? 'Nährwerte' : 'Nutritional Info',
        calories: language === 'de' ? 'Kalorien' : 'Calories',
        protein: language === 'de' ? 'Eiweiß' : 'Protein',
        carbs: language === 'de' ? 'Kohlenhy.' : 'Carbs',
        fats: language === 'de' ? 'Fette' : 'Fats',
        fiber: language === 'de' ? 'Ballaststoffe' : 'Fiber',
        vitamins: language === 'de' ? 'Vitamine' : 'Vitamins',
        ingredients: language === 'de' ? 'Hauptzutaten' : 'Key Ingredients',
        benefits: language === 'de' ? 'Gesundheitliche Vorteile' : 'Health Benefits',
        richSource: language === 'de' ? 'Reiche Quelle' : 'Rich Source'
    };

    // Use nutritional description for the card if available (as it has DE version), otherwise fallback to API description
    const cardDescription = language === 'de'
        ? (item.nutritionalInfo?.descriptionDE || item.description)
        : (item.nutritionalInfo?.description || item.description);

    const description = language === 'de' ? (item.nutritionalInfo?.descriptionDE || item.nutritionalInfo?.description) : (item.nutritionalInfo?.description);
    const ingredients = language === 'de' ? (item.nutritionalInfo?.ingredientsDE || item.nutritionalInfo?.ingredients) : (item.nutritionalInfo?.ingredients);
    const dietaryLabel = language === 'de' ? (item.nutritionalInfo?.dietaryLabelDE || item.nutritionalInfo?.dietaryLabel) : (item.nutritionalInfo?.dietaryLabel);


    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: animationDelay }}
                whileHover={{ y: -10, scale: 1.02 }}

                onClick={() => item.nutritionalInfo && setShowInfo(true)}
                className="group relative bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 hover:border-gold/30 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full"
            >
                <div
                    className="relative h-48 w-full overflow-hidden shrink-0 bg-zinc-900/50 flex items-center justify-center"
                >
                    {item.image ? (
                        <>
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
                        </>
                    ) : (
                        // Placeholder for items without images
                        <div className="flex flex-col items-center justify-center text-white/10 group-hover:text-gold/20 transition-colors duration-500">
                            <Wheat size={48} strokeWidth={1} />
                        </div>
                    )}
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-start gap-2 max-w-[85%]">
                            {/* Veg/Non-Veg Indicator - Moved to Left */}
                            {(() => {
                                // FALLBACK LOGIC: If attributes are undefined, calculate locally based on title
                                const lowerTitle = item.title.toLowerCase();

                                // 1. Determine Vegan
                                const isVegan = item.attributes?.isVegan || lowerTitle.includes("vegan");

                                // 2. Determine Veg/Non-Veg
                                let isVeg = item.attributes?.isVeg;

                                if (isVeg === undefined) {
                                    if (lowerTitle.includes("chicken") || lowerTitle.includes("mutton") || lowerTitle.includes("fish") || lowerTitle.includes("prawn") || lowerTitle.includes("lamb") || lowerTitle.includes("beef")) {
                                        isVeg = false;
                                    } else if (lowerTitle.includes("veg") || lowerTitle.includes("paneer") || lowerTitle.includes("egg") || lowerTitle.includes("dosa") || lowerTitle.includes("idly") || lowerTitle.includes("samosa") || lowerTitle.includes("mushroom") || lowerTitle.includes("gobi") || lowerTitle.includes("uttapam") || lowerTitle.includes("chapatti") || lowerTitle.includes("parota") || lowerTitle.includes("roast") || lowerTitle.includes("vada") || lowerTitle.includes("chai") || lowerTitle.includes("lassi") || lowerTitle.includes("milk") || lowerTitle.includes("fritters") || lowerTitle.includes("puff") || lowerTitle.includes("jamun") || lowerTitle.includes("paniyaram") || lowerTitle.includes("appam") || lowerTitle.includes("kalaki") || lowerTitle.includes("omelet") || lowerTitle.includes("pazhampori")) {
                                        isVeg = true;
                                    }
                                }

                                if (item.category === 'drink') return null;
                                if (isVeg === undefined && !isVegan) return null; // Still unknown

                                return (
                                    <div className="shrink-0 mt-1.5 mr-1">
                                        {isVegan ? (
                                            <Leaf size={16} className="text-green-500 fill-green-500/20" />
                                        ) : (
                                            <div className={`w-4 h-4 border ${isVeg ? 'border-green-500' : 'border-red-500'} flex items-center justify-center bg-white/5 p-0.5 rounded-[2px]`}>
                                                <div className={`w-2 h-2 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })()}

                            <h3 className="text-xl font-bold text-white group-hover:text-gold transition-colors leading-tight">
                                {item.title}
                                {item.allergenCodes && (
                                    <span className="text-[10px] text-white/50 ml-2 font-normal align-top">
                                        [{item.allergenCodes.join(", ")}]
                                    </span>
                                )}
                            </h3>
                        </div>
                        <span className="text-xl font-bold text-gold whitespace-nowrap">
                            €{item.price.toFixed(2)}
                        </span>
                    </div>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2 mix-blend-plus-lighter">{cardDescription}</p>

                    <div className="mt-auto"> {/* Push attributes to bottom */}
                        {/* Attributes */}
                        <div className="flex gap-2 mb-4 flex-wrap">
                            {/* Removed text badge in favor of dot symbol */}

                            {item.attributes?.isSpicy && (
                                <span className="bg-red-500/10 text-red-500 text-[10px] uppercase font-bold px-2 py-1 rounded-full border border-red-500/20">{t.spicy}</span>
                            )}
                            {item.attributes?.isKidFriendly && (
                                <span className="bg-blue-500/10 text-blue-500 text-[10px] uppercase font-bold px-2 py-1 rounded-full border border-blue-500/20">{t.kids}</span>
                            )}
                            {item.nutritionalInfo && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowInfo(true);
                                    }}
                                    className="bg-gold/10 text-gold text-[10px] uppercase font-bold px-2 py-1 rounded-full border border-gold/20 flex items-center gap-1 hover:bg-gold hover:text-black transition-colors"
                                >
                                    <Leaf size={10} /> {t.nutritionalInfo}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Hover magnetic pull indicator */}
                    <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0 duration-300 pointer-events-none">
                        <MoveRight className="text-gold w-5 h-5" />
                    </div>
                </div>
            </motion.div >

            {/* Nutritional Info Modal */}
            <AnimatePresence>
                {
                    showInfo && item.nutritionalInfo && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[10000] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowInfo(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 20 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 20 }}
                                className="fixed inset-0 z-[10010] w-full h-full bg-zinc-900 flex flex-col md:relative md:w-full md:max-w-lg md:max-h-[85vh] md:rounded-2xl md:shadow-2xl md:inset-auto md:h-auto overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button - Fixed relative to container */}
                                <button
                                    onClick={() => setShowInfo(false)}
                                    className="absolute top-6 right-4 md:top-4 md:right-4 text-white hover:text-red-500 transition-colors z-50 p-2 bg-black/50 backdrop-blur-sm rounded-full border border-white/10"
                                >
                                    <X size={28} className="md:w-6 md:h-6" />
                                </button>

                                {/* Scrollable Content */}
                                <div className="flex-1 overflow-y-auto min-h-0 p-6 md:p-8 custom-scrollbar overscroll-contain pb-20 md:pb-8">
                                    {/* Header */}
                                    <div className="mb-4 pr-8">
                                        <h3 className="text-2xl md:text-3xl font-serif font-bold text-gold">{item.title}</h3>
                                        {dietaryLabel && (
                                            <p className="text-sm font-medium mt-1 text-white/80">{dietaryLabel}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-300 italic mb-6 leading-relaxed border-l-2 border-gold/30 pl-4">
                                        "{description}"
                                    </p>

                                    {/* Macros Row */}
                                    <div className="grid grid-cols-3 gap-2 mb-6">
                                        <MacroBox label={t.protein} value={item.nutritionalInfo.protein} color="text-blue-400" />
                                        <MacroBox label={t.carbs} value={item.nutritionalInfo.carbs} color="text-yellow-400" />
                                        <MacroBox label={t.fats} value={item.nutritionalInfo.fats} color="text-red-400" />
                                    </div>

                                    {/* Nutrient Highlights (Fiber & Vitamins) */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                            <h4 className="text-gold text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-2"><Wheat size={14} /> {t.fiber}</h4>
                                            <span className="text-2xl font-bold text-white">{item.nutritionalInfo.fiber || t.richSource}</span>
                                        </div>
                                        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                            <h4 className="text-gold text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-2"><Activity size={14} /> {t.vitamins}</h4>
                                            <div className="flex flex-wrap gap-1">
                                                {item.nutritionalInfo.vitamins?.map((vit, i) => (
                                                    <span key={i} className="text-xs text-white/80 bg-black/40 px-2 py-1 rounded-md">{vit}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ingredients */}
                                    {ingredients && (
                                        <div className="mb-6">
                                            <h4 className="text-gold text-xs uppercase font-bold tracking-widest mb-2 flex items-center gap-2">
                                                <Flame size={14} /> {t.ingredients}
                                            </h4>
                                            <p className="text-sm text-gray-400 leading-relaxed">
                                                {ingredients.join(", ")}
                                            </p>
                                        </div>
                                    )}

                                    {/* Benefits Tags */}
                                    <div className="space-y-3 pb-2">
                                        <h4 className="text-white font-bold uppercase text-xs tracking-wider flex items-center gap-2">
                                            <Leaf size={14} className="text-green-400" /> {t.benefits}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.nutritionalInfo.benefits.map((benefit, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-green-900/20 border border-green-500/20 rounded-full text-xs text-green-300 font-medium">
                                                    {benefit}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
}

function MacroBox({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="bg-black/40 rounded-lg p-3 text-center border border-white/5">
            <div className={`text-sm font-bold ${color}`}>{value}</div>
            <div className="text-[10px] text-white/40 uppercase tracking-widest">{label}</div>
        </div>
    );
}
