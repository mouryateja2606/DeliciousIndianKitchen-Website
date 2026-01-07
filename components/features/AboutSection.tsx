"use client";

import { FloatingElement } from "./FloatingElement";
import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export function AboutSection() {
    const { language } = useLanguage();
    const { sections } = translations[language];

    return (
        <section id="about" className="relative py-24 text-white overflow-hidden">

            <div className="container mx-auto px-6 relative z-20">
                {/* Header - Now clearly above the image content */}
                <div className="mb-8 md:mb-20">
                    <SectionHeader
                        alignment="left"
                        subtitle={sections.about.subtitle}
                        title={sections.about.title}
                    />
                </div>

                {/* Content Wrapper with Background Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">

                    {/* Background Image scoped to this block */}
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-black/40 z-10" />
                        <div className="absolute inset-0 z-0">
                            {/* Using Next.js Image for reliable mobile rendering */}
                            <img
                                src="/assets/about_bg_spice.png"
                                alt="Background"
                                className="w-full h-full object-cover opacity-90"
                            />
                        </div>
                    </div>

                    {/* Inner Grid */}
                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-20 px-6 pt-24 pb-20 md:p-16">
                        <div className="space-y-6">
                            <div className="text-base md:text-lg text-white/80 leading-relaxed font-light space-y-4">
                                {sections.about.paragraphs?.map((paragraph: string, index: number) => (
                                    <p key={index} dangerouslySetInnerHTML={{
                                        __html: paragraph.replace('Delicious Indian Kitchen', '<strong class="text-white">Delicious Indian Kitchen</strong>')
                                    }} />
                                ))}
                            </div>

                            {/* CTA Button */}
                            <div className="pt-4">
                                <a
                                    href="https://delicious-indian-kitchen.sumupstore.com/produkte"
                                    target="_blank"
                                    className="inline-flex items-center gap-3 bg-gold text-black px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-lg shadow-gold/20"
                                >
                                    {sections.about.cta_button}
                                </a>
                            </div>
                        </div>

                        <div className="relative min-h-[400px] h-auto flex items-center justify-center py-12 md:py-0">
                            {/* The Blessing Card */}
                            <FloatingElement duration={5} yOffset={15} className="z-10 bg-black/60 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-2xl max-w-md text-center shadow-2xl relative overflow-hidden group mx-4 md:mx-0">

                                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <h3 className="text-gold font-bold text-xl uppercase mb-6 tracking-widest border-b border-white/10 pb-4 inline-block">{sections.about.blessing_title}</h3>
                                <p className="text-white font-serif italic text-2xl mb-6 leading-relaxed">
                                    {sections.about.blessing_quote}
                                </p>
                                <div className="text-white/70 text-sm uppercase tracking-wide bg-white/5 py-2 rounded-lg">
                                    {sections.about.blessing_note}
                                </div>
                            </FloatingElement>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
