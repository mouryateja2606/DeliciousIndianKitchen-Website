"use client";

import { SectionHeader } from "@/components/features/SectionHeader";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";

export default function AdditivesPage() {
    const { language } = useLanguage();

    const t = {
        de: {
            title: "Zusatzstoffe & Allergene",
            subtitle: "Informationen zu Inhaltsstoffen",
            description: "Detaillierte Übersicht über Zusatzstoffe und Allergene in unseren Speisen.",
            additivesTitle: "Zusatzstoffe",
            allergensTitle: "Allergene",
            additives: [
                { id: "1", text: "mit Farbstoff" },
                { id: "2", text: "mit Konservierungsstoff" },
                { id: "3", text: "mit Antioxidationsmittel" },
                { id: "4", text: "mit Geschmacksverstärker" },
                { id: "5", text: "geschwefelt" },
                { id: "6", text: "geschwärzt" },
                { id: "7", text: "gewachst" },
                { id: "8", text: "mit Phosphat" },
                { id: "9", text: "mit Süßungsmittel" },
                { id: "10", text: "enthält eine Phenylalaninquelle" },
            ],
            allergens: [
                { id: "A", text: "Glutenhaltiges Getreide" },
                { id: "B", text: "Krebstiere" },
                { id: "C", text: "Eier" },
                { id: "D", text: "Fisch" },
                { id: "E", text: "Erdnüsse" },
                { id: "F", text: "Sojabohnen" },
                { id: "G", text: "Milch / Laktose" },
                { id: "H", text: "Schalenfrüchte (Nüsse)" },
                { id: "I", text: "Sellerie" },
                { id: "J", text: "Senf" },
                { id: "K", text: "Sesamsamen" },
                { id: "L", text: "Schwefeldioxid & Sulfite" },
                { id: "M", text: "Lupinen" },
                { id: "N", text: "Weichtiere" },
            ],
            footerNote: "Bei Fragen zu Allergenen und Zusatzstoffen wenden Sie sich bitte an unser Servicepersonal.",
        },
        en: {
            title: "Additives & Allergens",
            subtitle: "Information about Ingredients",
            description: "Detailed overview of additives and allergens in our dishes.",
            additivesTitle: "Additives",
            allergensTitle: "Allergens",
            additives: [
                { id: "1", text: "with dye" },
                { id: "2", text: "with preservative" },
                { id: "3", text: "with antioxidant" },
                { id: "4", text: "with flavor enhancer" },
                { id: "5", text: "sulphurated" },
                { id: "6", text: "blackened" },
                { id: "7", text: "waxed" },
                { id: "8", text: "with phosphate" },
                { id: "9", text: "with sweetener" },
                { id: "10", text: "contains a source of phenylalanine" },
            ],
            allergens: [
                { id: "A", text: "Gluten-containing grains" },
                { id: "B", text: "Crustaceans" },
                { id: "C", text: "Eggs" },
                { id: "D", text: "Fish" },
                { id: "E", text: "Peanuts" },
                { id: "F", text: "Soybeans" },
                { id: "G", text: "Milk / Lactose" },
                { id: "H", text: "Nuts" },
                { id: "I", text: "Celery" },
                { id: "J", text: "Mustard" },
                { id: "K", text: "Sesame seeds" },
                { id: "L", text: "Sulphur dioxide & sulphites" },
                { id: "M", text: "Lupin" },
                { id: "N", text: "Molluscs" },
            ],
            footerNote: "If you have any questions about allergens and additives, please ask our service staff.",
        }
    };

    const content = language === 'de' ? t.de : t.en;

    return (
        <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black font-sans">
            <div className="pt-32 pb-20 px-4 md:px-6 container mx-auto">
                <SectionHeader
                    title={content.title}
                    subtitle={content.subtitle}
                    description={content.description}
                />

                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                            {/* Additives */}
                            <div>
                                <h3 className="text-xl font-bold text-gold mb-6 border-b border-white/10 pb-4">
                                    {content.additivesTitle}
                                </h3>
                                <ul className="space-y-4 text-gray-300">
                                    {content.additives.map((item) => (
                                        <li key={item.id} className="flex gap-4">
                                            <span className="font-mono text-gold font-bold min-w-[30px]">[{item.id}]</span>
                                            <span>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Allergens */}
                            <div>
                                <h3 className="text-xl font-bold text-gold mb-6 border-b border-white/10 pb-4">
                                    {content.allergensTitle}
                                </h3>
                                <ul className="space-y-4 text-gray-300">
                                    {content.allergens.map((item) => (
                                        <li key={item.id} className="flex gap-4">
                                            <span className="font-mono text-gold font-bold min-w-[30px]">[{item.id}]</span>
                                            <span>{item.text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                            <p>
                                {content.footerNote}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
