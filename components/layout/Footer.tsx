"use client";
import Link from "next/link";
import { Facebook, Instagram, Phone, MapPin } from "lucide-react";
import { SectionHeader } from "../features/SectionHeader";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export function Footer() {
    const { language } = useLanguage();
    const { sections } = translations[language];
    const { footer } = sections;

    return (
        <footer id="location" className="bg-black text-white pt-32 pb-10 w-full">
            <div className="container mx-auto px-6">

                {/* Header - Centered & Full Width */}
                <div className="mb-16">
                    <SectionHeader
                        alignment="center"
                        subtitle={sections.contact.subtitle}
                        title={sections.contact.title}
                    />
                </div>

                {/* Content Grid */}
                <div className="flex flex-col md:flex-row justify-between gap-12 mb-12">

                    {/* Contact Details */}
                    <div className="flex flex-col items-center md:items-start md:max-w-xs">
                        <h4 className="text-gold font-bold uppercase tracking-widest mb-6 md:block">{footer.location_title}</h4>
                        <div className="space-y-6 text-white/70">
                            <a href="tel:017647067735" className="flex items-center gap-4 hover:text-white transition-colors group">
                                <div className="p-3 border border-white/10 rounded-full group-hover:border-gold group-hover:text-gold transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="text-lg">0 176 470 677 35</span>
                            </a>
                            <a href="https://www.google.com/maps/search/?api=1&query=Am+Hulsberg+139,+28205+Bremen" target="_blank" className="flex items-center gap-4 hover:text-white transition-colors group">
                                <div className="p-3 border border-white/10 rounded-full group-hover:border-gold group-hover:text-gold transition-colors">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <span className="text-lg">Am Hulsberg 139, <br /> 28205 Bremen</span>
                            </a>
                        </div>
                    </div>

                    {/* Hours */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-gold font-bold uppercase tracking-widest mb-6">{footer.opening_title}</h4>
                        <ul className="space-y-3 text-white/70 w-full max-w-[220px] md:max-w-xs md:min-w-[200px]">
                            {footer.hours.map((item, index) => (
                                <li key={index} className="flex justify-between border-b border-white/10 pb-2 last:border-0 last:pb-0">
                                    <span>{item.day}</span>
                                    <span className="text-white font-medium ml-4">{item.time}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Service / Legal */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-gold font-bold uppercase tracking-widest mb-6">{footer.service_title}</h4>
                        <div className="flex flex-col gap-3 text-white/70">
                            <Link href="/impressum" className="hover:text-gold transition-colors">Impressum</Link>
                            <Link href="/datenschutz" className="hover:text-gold transition-colors">{footer.privacy_link}</Link>
                            <Link href="/additives" className="hover:text-gold transition-colors">{footer.additives_link}</Link>
                            {/* <Link href="/admin" className="hover:text-gold transition-colors text-white/40">
                                {footer.admin_login}
                            </Link> */}
                        </div>
                    </div>

                    {/* Socials */}
                    <div className="flex flex-col items-center md:items-start">
                        <h4 className="text-gold font-bold uppercase tracking-widest mb-6">{footer.social_title}</h4>
                        <div className="flex gap-4 mb-8">
                            <div className="relative">
                                <button className="p-3 border border-white/10 rounded-full text-white/30 cursor-not-allowed hover:bg-transparent opacity-70">
                                    <Instagram className="w-6 h-6" />
                                </button>
                                <div className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-gold text-black text-[7px] font-extrabold rounded-full border border-black shadow-lg z-10 rotate-12">
                                    Soon
                                </div>
                            </div>
                            <div className="relative">
                                <button className="p-3 border border-white/10 rounded-full text-white/30 cursor-not-allowed hover:bg-transparent opacity-70">
                                    <Facebook className="w-6 h-6" />
                                </button>
                                <div className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center bg-gold text-black text-[7px] font-extrabold rounded-full border border-black shadow-lg z-10 rotate-12">
                                    Soon
                                </div>
                            </div>
                            <Link href="https://wa.me/4917647067735" className="p-3 border border-white/20 rounded-full hover:bg-green-500 hover:text-white hover:border-green-500 transition-all transform hover:scale-110" aria-label="WhatsApp">
                                <Phone className="w-6 h-6" />
                            </Link>
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <p className="text-sm text-white/40 text-center md:text-left">
                                © {new Date().getFullYear()} Delicious Indian Kitchen.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col items-center">
                    <p className="text-[10px] text-white/20 text-center">
                        * All prices include statutory VAT (7% for food, 19% for drinks). Service not included.
                    </p>
                </div>
            </div>
        </footer>
    );
}
