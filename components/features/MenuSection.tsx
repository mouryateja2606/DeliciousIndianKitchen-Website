"use client";

import { useState, useEffect } from "react";
import { MenuItemCard } from "./MenuItemCard";
import { MenuCarousel } from "./MenuCarousel";
import { NutritionalGuide } from "./NutritionalGuide";
import { MenuItem } from "@/lib/types";
import { client } from "@/lib/sanity";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useSumupMenu } from "@/hooks/useSumupMenu";
import { BookOpen, Leaf, Download } from "lucide-react";

// Mock Data
const CATEGORIES = ["All", "Starters", "Biryani", "Dosa", "Curries", "Snacks", "Drinks"];

const MENU_ITEMS: MenuItem[] = [
    {
        id: "1",
        title: "Hyderabadi Chicken Biryani",
        description: "Basmati rice cooked with marinated chicken, saffron, and aromatic spices.",
        price: 14.90,
        category: "Biryani",
        image: "/assets/hero-dish.png",
        attributes: { isSpicy: true },
    },
    {
        id: "2",
        title: "Masala Dosa",
        description: "Crispy rice crepe filled with spiced potato masala, served with chutney and sambar.",
        price: 9.50,
        category: "Dosa",
        image: "/assets/hero-dish.png", // specific images would be better
        attributes: { isVeg: true },
    },
    {
        id: "3",
        title: "Paneer Butter Masala",
        description: "Cottage cheese cubes in a rich, creamy tomato gravy.",
        price: 12.50,
        category: "Curries",
        image: "/assets/hero-dish.png",
        attributes: { isVeg: true, containsMilk: true },
        allergenCodes: ["G", "1"], // Milk, Dye
    },
    {
        id: "4",
        title: "Mango Lassi",
        description: "Refreshing yogurt-based drink with sweet mango pulp.",
        price: 4.50,
        category: "Drinks",
        image: "/assets/hero-dish.png",
        attributes: { isVeg: true, containsMilk: true, isKidFriendly: true },
    },
    {
        id: "5",
        title: "Chicken 65",
        description: "Spicy, deep-fried chicken bites with curry leaves and chilies.",
        price: 8.90,
        category: "Starters",
        image: "/assets/hero-dish.png",
        attributes: { isSpicy: true },
    },
    {
        id: "6",
        title: "Paneer Special",
        description: "Chef's special paneer dish served in a rich, creamy sauce.",
        price: 14.00,
        category: "Curries",
        image: "/assets/paneer_3d_black.png",
        attributes: { isVeg: true },
    }
];

// Menu Card Images
const MENU_CARDS = [
    "/assets/menu_cards/menu_2.jpg",
    "/assets/menu_cards/menu_3.jpg",
    "/assets/menu_cards/menu_4.jpg",
    "/assets/menu_cards/menu_5.jpg",
    "/assets/menu_cards/menu_6.jpg",
    "/assets/menu_cards/menu_7.jpg",
];

export function MenuSection() {
    const { language } = useLanguage();
    const { sections } = translations[language];

    // State to hold menu cards
    const [menuCards, setMenuCards] = useState<string[]>(MENU_CARDS);
    const [activeTab, setActiveTab] = useState<'menu' | 'nutrition'>('menu');

    // Fetch from Sanity on mount
    useEffect(() => {
        const fetchCards = async () => {
            try {
                const query = `*[_type == "menuCard"] | order(order asc) {
                    "imageUrl": image.asset->url
                }`;
                const data = await client.fetch(query);

                if (data && data.length > 0) {
                    const urls = data.map((item: any) => item.imageUrl);
                    setMenuCards(urls);
                }
            } catch (error) {
                console.error("Failed to fetch menu cards:", error);
            }
        };

        fetchCards();
    }, []);

    // SumUp integration
    const { items: sumupItems, loading: sumupLoading } = useSumupMenu();
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        try {
            // Dynamic import with fallback for different module formats
            const jsPDFModule = await import("jspdf");
            // @ts-ignore
            const jsPDF = jsPDFModule.default || jsPDFModule.jsPDF;

            if (!jsPDF) {
                throw new Error("Could not load PDF generator module");
            }

            const doc = new jsPDF();
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();

            for (let i = 0; i < menuCards.length; i++) {
                if (i > 0) doc.addPage();

                try {
                    // 1. Fetch the image as a blob
                    const response = await fetch(menuCards[i] + "?t=" + new Date().getTime());
                    if (!response.ok) throw new Error(`Failed to fetch image ${i + 1}`);
                    const blob = await response.blob();

                    // 2. Convert to Base64
                    const base64Data = await new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => resolve(reader.result);
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });

                    // Detect format
                    const isPng = menuCards[i].toLowerCase().endsWith('.png');
                    const format = isPng ? 'PNG' : 'JPEG';

                    // Add to PDF - fit to page
                    // @ts-ignore
                    doc.addImage(base64Data, format, 0, 0, width, height);

                    // Add Page Numbering
                    doc.setFontSize(12);
                    doc.setTextColor(255, 255, 255);
                    doc.setFillColor(0, 0, 0);
                    doc.rect(width - 40, height - 15, 30, 8, "F"); // Background box
                    doc.text(`${i + 1} / ${menuCards.length}`, width - 25, height - 10, { align: "center" });

                } catch (imgError) {
                    console.error(`Error processing image ${i}:`, imgError);
                    // Continue to next image even if one fails, but log it
                    doc.text(`Error loading page ${i + 1}`, 10, 10);
                }
            }

            doc.save("Delicious_Indian_Kitchen_Menu.pdf");
        } catch (error: any) {
            console.error("PDF Generation failed:", error);
            alert(`PDF Error: ${error.message || "Unknown error"}`);
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <section id="menu" className="pt-32 md:pt-24 pb-32 relative z-50">
            <div className="absolute inset-0 bg-black/40 z-0" /> {/* Lighter overlay for better header visibility */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Header - Explicitly styled for visibility */}
                <div className="mb-12 md:mb-20 relative z-[60]">
                    <SectionHeader
                        subtitle={sections.menu.subtitle}
                        title={sections.menu.title}
                        description={sections.menu.description}
                    />
                </div>

                {/* Controls Container - Responsive Stack */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12 relative z-[60]">

                    {/* View Toggle */}
                    <div className="bg-white/5 backdrop-blur-md p-1 rounded-full border border-white/10 flex items-center shadow-lg">
                        <button
                            onClick={() => setActiveTab('menu')}
                            className={`px-6 py-3 md:py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === 'menu' ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-white/60 hover:text-white'}`}
                        >
                            <BookOpen size={16} />
                            {language === 'de' ? 'Speisekarte' : 'Menu'}
                        </button>
                        <button
                            onClick={() => setActiveTab('nutrition')}
                            className={`px-6 py-3 md:py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${activeTab === 'nutrition' ? 'bg-gold text-black shadow-lg shadow-gold/20' : 'text-white/60 hover:text-white'}`}
                        >
                            <Leaf size={16} />
                            {language === 'de' ? 'Nährwerte' : 'Nutritional'}
                        </button>
                    </div>

                    {/* Download PDF Button - Elegant, Compact Style */}
                    <button
                        onClick={handleDownloadPDF}
                        disabled={isGeneratingPDF}
                        className={`group relative overflow-hidden bg-transparent hover:bg-gold text-gold hover:text-black border border-gold/50 px-8 py-3 md:py-2.5 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] ${isGeneratingPDF ? 'opacity-50 cursor-wait' : ''}`}
                    >
                        {isGeneratingPDF ? (
                            <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Download size={16} />
                        )}
                        <span>{isGeneratingPDF ? (language === 'de' ? 'Generiere...' : 'Generating...') : (language === 'de' ? 'Menü als PDF herunterladen' : 'Download Menu as PDF')}</span>
                    </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[600px]">
                    {activeTab === 'menu' ? (
                        /* Menu Cards Carousel */
                        <MenuCarousel images={menuCards} />
                    ) : (
                        /* Nutritional Values & All Items Guide */
                        <NutritionalGuide items={sumupItems} />
                    )}

                </div>
            </div>
        </section>
    );
}
