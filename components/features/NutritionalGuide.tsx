"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuItem } from "@/hooks/useSumupMenu";
import { MenuItemCard } from "./MenuItemCard";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

interface NutritionalGuideProps {
    items: MenuItem[];
}

const ITEMS_PER_PAGE = 12;

// Auto-categorization helper
// Helper - Strict mapping based on user screenshots
const getCategory = (item: MenuItem): string => {
    const name = item.title.toLowerCase();

    // 1. Biryanis
    if (name.includes("biryani") || name.includes("briyani")) return "Biryanis";

    // 2. Bread
    if (name.includes("chapatti") || name.includes("parota") || name.includes("parotha") || name.includes("naan") || name.includes("roti")) return "Bread";

    // 2.1 Batter
    if (name.includes("batter")) return "Batter";

    // 3. Rice Bowls
    if (name.includes("rice bowl")) return "Rice Bowls";

    // 4. Idly & Tiffin
    if (name.includes("idly") || name.includes("paniyaram") ||
        (name.includes("sambar") && name.includes("idly")) ||
        (name.includes("sambar") && name.includes("vada"))) return "Idly & Tiffin";

    // 5. Egg Specialties
    if (name.includes("omelet") || name.includes("kalaki")) return "Egg Specialties";

    // 6. Dosa & Uttapam
    if (name.includes("dosa") || name.includes("uttapam") || name.includes("roast")) return "Dosa & Uttapam";

    // 7. Snacks
    if (name.includes("samosa") || name.includes("puff") || name.includes("chai") ||
        name.includes("pazhampori") || name.includes("vada")) return "Snacks";

    // 8. Desserts
    if (name.includes("jamun") || name.includes("lassi") || name.includes("milk") || name.includes("halwa")) return "Desserts";

    // 9. Beverages
    if (name.includes("cola") || name.includes("water") || name.includes("becks") || name.includes("sprite") ||
        name.includes("bull") || name.includes("juice") || name.includes("apfelschorle") || name.includes("tea") ||
        name.includes("mix") || name.includes("fritz") || name.includes("energy") || name.includes("saft")) return "Beverages";

    // 10. Curries (Catch-all for main dishes)
    if (name.includes("curry") || name.includes("masala") || name.includes("handi") || name.includes("korma") ||
        name.includes("chicken") || name.includes("paneer") || name.includes("parota") || name.includes("chapatti") || name.includes("rogon")) {
        // Exclude items that got caught here but belong elsewhere
        if (name.includes("tikka masala")) return "Curries";
        return "Curries";
    }

    return "Starters & Others"; // Fallback
};

const CATEGORIES = [
    "All",
    "Biryanis",
    "Curries",
    "Bread",
    "Dosa & Uttapam",
    "Idly & Tiffin",
    "Rice Bowls",
    "Snacks",
    "Egg Specialties",
    "Desserts",
    "Beverages",
    "Batter"
];

import { useLanguage } from "@/context/LanguageContext";

// ... (other imports)

export function NutritionalGuide({ items }: NutritionalGuideProps) {
    const { language } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(0);

    const CATEGORIES_DE = {
        "All": "Alle",
        "Biryanis": "Biryanis",
        "Curries": "Currys",
        "Bread": "Brot",
        "Dosa & Uttapam": "Dosa & Uttapam",
        "Idly & Tiffin": "Idly & Tiffin",
        "Rice Bowls": "Reisschalen",
        "Snacks": "Snacks",
        "Egg Specialties": "Eierspezialitäten",
        "Desserts": "Desserts",
        "Beverages": "Getränke",
        "Batter": "Teig"
    };

    // 1. Filter Items
    const filteredItems = useMemo(() => {
        if (activeCategory === "All") return items;
        return items.filter(item => getCategory(item) === activeCategory);
    }, [items, activeCategory]);

    // 2. Pagination Logic
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const paginatedItems = filteredItems.slice(
        currentPage * ITEMS_PER_PAGE,
        (currentPage + 1) * ITEMS_PER_PAGE
    );

    // Reset page when category changes
    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCurrentPage(0);
    };

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    };

    return (
        <div className="w-full space-y-8 animate-in fade-in duration-700">

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${activeCategory === cat
                            ? "bg-gold text-black border-gold shadow-lg shadow-gold/20 scale-105"
                            : "bg-white/5 text-white/60 border-white/10 hover:border-gold/50 hover:text-white"
                            }`}
                    >
                        {language === 'de' ? CATEGORIES_DE[cat as keyof typeof CATEGORIES_DE] : cat}
                    </button>
                ))}
            </div>

            {/* Instruction Text */}
            <div className="text-center animate-pulse">
                <p className="inline-flex items-center gap-2 text-gold/80 text-sm font-medium bg-black/40 px-4 py-2 rounded-full border border-gold/20">
                    {language === 'de' ? (
                        <>Wählen Sie <span className="text-white font-bold">ein beliebiges Gericht</span> um Nährwerte zu sehen</>
                    ) : (
                        <>Select <span className="text-white font-bold">any item</span> to view Nutritional Info</>
                    )}
                </p>
            </div>

            {/* Grid Content */}
            <div className="min-h-[600px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${currentPage}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {paginatedItems.map((item) => (
                            <MenuItemCard
                                key={item.id}
                                item={{
                                    id: item.id,
                                    title: item.title,
                                    description: item.description || "",
                                    price: item.priceAmount, // Pass the number value
                                    category: getCategory(item),
                                    image: item.img, // Map img (hook) to image (component)
                                    nutritionalInfo: item.nutritionalInfo
                                }}
                            />
                        ))}

                        {paginatedItems.length === 0 && (
                            <div className="col-span-full flex flex-col items-center justify-center py-20 text-white/40">
                                <Search size={48} className="mb-4 opacity-50" />
                                <p>No items found in this category.</p>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-6 mt-12 pt-8 border-t border-white/10">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className={`p-3 rounded-full border transition-all ${currentPage === 0
                            ? "border-white/10 text-white/20 cursor-not-allowed"
                            : "border-gold text-gold hover:bg-gold hover:text-black shadow-lg shadow-gold/10"
                            }`}
                        aria-label="Previous Page"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <span className="text-white/60 font-mono text-sm">
                        Page <span className="text-gold font-bold">{currentPage + 1}</span> of {totalPages}
                    </span>

                    <button
                        onClick={handleNext}
                        disabled={currentPage >= totalPages - 1}
                        className={`p-3 rounded-full border transition-all ${currentPage >= totalPages - 1
                            ? "border-white/10 text-white/20 cursor-not-allowed"
                            : "border-gold text-gold hover:bg-gold hover:text-black shadow-lg shadow-gold/10"
                            }`}
                        aria-label="Next Page"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            )}
        </div>
    );
}
