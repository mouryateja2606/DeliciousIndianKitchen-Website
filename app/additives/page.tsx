import { SectionHeader } from "@/components/features/SectionHeader";
import { Footer } from "@/components/layout/Footer";

export default function AdditivesPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black font-sans">
            <div className="pt-32 pb-20 px-4 md:px-6 container mx-auto">
                <SectionHeader
                    title="Zusatzstoffe & Allergene"
                    subtitle="Additives & Allergens"
                    description="Informationen zu Inhaltsstoffen und Allergenen in unseren Speisen"
                />

                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                            {/* Additives */}
                            <div>
                                <h3 className="text-xl font-bold text-gold mb-6 border-b border-white/10 pb-4">
                                    Zusatzstoffe (Additives)
                                </h3>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[1]</span>
                                        <span>mit Farbstoff (with dye)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[2]</span>
                                        <span>mit Konservierungsstoff (with preservative)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[3]</span>
                                        <span>mit Antioxidationsmittel (with antioxidant)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[4]</span>
                                        <span>mit Geschmacksverstärker (with flavor enhancer)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[5]</span>
                                        <span>geschwefelt (sulphurated)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[6]</span>
                                        <span>geschwärzt (blackened)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Allergens */}
                            <div>
                                <h3 className="text-xl font-bold text-gold mb-6 border-b border-white/10 pb-4">
                                    Allergene (Allergens)
                                </h3>
                                <ul className="space-y-4 text-gray-300">
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[A]</span>
                                        <span>Glutenhaltiges Getreide (Gluten-containing grains)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[B]</span>
                                        <span>Krebstiere (Crustaceans)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[C]</span>
                                        <span>Eier (Eggs)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[D]</span>
                                        <span>Fisch (Fish)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[E]</span>
                                        <span>Erdnüsse (Peanuts)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[F]</span>
                                        <span>Sojabohnen (Soybeans)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[G]</span>
                                        <span>Milch / Laktose (Milk / Lactose)</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="font-mono text-gold font-bold min-w-[30px]">[H]</span>
                                        <span>Schalenfrüchte (Nuts)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
                            <p>
                                Bei Fragen zu Allergenen und Zusatzstoffen wenden Sie sich bitte an unser Servicepersonal.
                                <br />
                                <span className="italic opacity-70">If you have any questions about allergens and additives, please ask our service staff.</span>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
}
