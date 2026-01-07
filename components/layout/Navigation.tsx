"use client";
import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Phone } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const closeReservation = () => setIsReservationOpen(false);
  const { language, setLanguage, t } = useLanguage();
  const { nav } = translations[language];

  const handleLanguageToggle = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  const navItems = [
    { name: nav.home, href: "/" },
    { name: nav.menu, href: "/#menu" },
    { name: nav.about, href: "/#about" },
    { name: nav.contact, href: "/#location" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-[9999] bg-black shadow-2xl border-b border-white/10"
      >
        {/* Pattern Overlay - SVG for clean 'lite' lines with low frequency */}
        <div className="absolute inset-0 z-0 opacity-30 bg-[url('/assets/header_pattern_utensils.svg')] bg-repeat bg-[length:200px_200px] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/80 backdrop-blur-sm z-0" />

        <div className="container mx-auto px-3 md:px-6 flex items-center justify-between h-24 relative z-10">

          {/* Logo - STRICT WIDTH CONTROL. A Link to Home must work. */}
          <Link href="/" className="relative z-50 flex-shrink-0 h-full flex items-center w-32 md:w-80 mr-1 md:mr-2 cursor-pointer pointer-events-auto">
            <div className="relative w-full h-full py-0 overflow-hidden">
              <Image
                src="/assets/logo_final_v3.png"
                alt="Delicious Indian Kitchen"
                fill
                className="object-contain object-left origin-left scale-[1.35]"
                priority
              />
            </div>
          </Link>

          {/* Mobile Actions (Visible on small screens) - FIXED and VISIBLE */}
          <div className="flex md:hidden items-center justify-end gap-1.5 ml-auto flex-shrink-0 z-50">

            {/* Reserve Button - ACTIVE */}
            <div className="relative">
              <button
                onClick={() => setIsReservationOpen(true)}
                className="px-2 py-1.5 rounded-full border border-gold/50 text-gold font-bold text-[8px] uppercase tracking-wider whitespace-nowrap bg-black/50 backdrop-blur-sm hover:bg-gold hover:text-black transition-colors"
              >
                {nav.reserve_table}
              </button>
            </div>

            {/* Order Button */}
            <Link
              href="https://delicious-indian-kitchen.sumupstore.com/produkte"
              target="_blank"
              className="px-2 py-1.5 rounded-full bg-gold text-black font-bold text-[8px] uppercase tracking-wider shadow-md whitespace-nowrap"
            >
              {nav.order_online}
            </Link>

            {/* Language Toggle (Mobile) - Moved after buttons */}
            <button
              onClick={handleLanguageToggle}
              className="ml-0.5 px-1.5 py-1 rounded border border-white/10 bg-white/5 text-[9px] font-bold text-white uppercase tracking-wider notranslate"
            >
              {language === 'en' ? 'DE' : 'EN'}
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-white/80 hover:text-gold transition-colors ml-1 z-50"
              aria-label="Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Nav - Funky Utensil Theme */}
          <div className="hidden md:flex items-center gap-4 ml-auto">
            {/* Home */}
            <Link
              href="/"
              className="relative group overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold/50 transition-all duration-300 px-6 h-10 flex items-center justify-center min-w-[80px]"
            >
              <span className="text-sm font-medium tracking-wider text-white group-hover:text-gold whitespace-nowrap">
                {nav.home}
              </span>
            </Link>

            {/* Menu + Nutritional Symbol Combined */}
            <Link
              href="/#menu"
              className="relative group overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold/50 transition-all duration-300 px-6 h-10 flex items-center justify-center min-w-[80px] gap-2"
            >
              <Leaf size={14} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium tracking-wider text-white group-hover:text-gold whitespace-nowrap">
                {nav.menu}
              </span>
            </Link>

            {/* Other Links */}
            <Link
              href="/#about"
              className="relative group overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold/50 transition-all duration-300 px-6 h-10 flex items-center justify-center min-w-[80px]"
            >
              <span className="text-sm font-medium tracking-wider text-white group-hover:text-gold whitespace-nowrap">
                {nav.about}
              </span>
            </Link>
            <Link
              href="/#location"
              className="relative group overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-gold/50 transition-all duration-300 px-6 h-10 flex items-center justify-center min-w-[80px]"
            >
              <span className="text-sm font-medium tracking-wider text-white group-hover:text-gold whitespace-nowrap">
                {nav.contact}
              </span>
            </Link>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3 ml-2">
              {/* Reserve Table */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsReservationOpen(true)}
                  className="relative px-5 py-2 rounded-full border border-gold text-gold font-medium text-sm tracking-wide hover:bg-gold hover:text-black transition-all duration-300"
                >
                  <span className="relative z-10">{nav.reserve_table}</span>
                </button>
              </div>

              {/* Order Online - Pulsing/Creative */}
              <Link
                href="https://delicious-indian-kitchen.sumupstore.com/produkte"
                target="_blank"
                className="relative px-6 py-2 rounded-full bg-gradient-to-r from-gold via-yellow-400 to-gold text-black font-bold text-sm tracking-wide shadow-lg hover:shadow-gold/20 hover:scale-105 transition-all duration-300"
              >
                {nav.order_online}
              </Link>
            </div>

            {/* Language Toggle Desktop */}
            <button
              onClick={handleLanguageToggle}
              className="ml-4 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-gold/10 hover:border-gold/50 text-white font-medium text-sm transition-all notranslate"
            >
              <span className={language === 'en' ? 'text-gold' : 'text-white/50'}>EN</span>
              <span className="mx-2 text-white/30">|</span>
              <span className={language === 'de' ? 'text-gold' : 'text-white/50'}>DE</span>
            </button>

            {/* Google Rating Circular Badge (Desktop) - Moved to end */}
            <Link
              href="#reviews"
              className="ml-4 flex flex-col items-center justify-center w-11 h-11 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold/30 transition-all group shadow-lg"
            >
              <div className="bg-white rounded-full w-4 h-4 flex items-center justify-center mb-0.5">
                <Image src="/assets/google-icon.png" alt="G" width={10} height={10} className="object-contain" />
              </div>
              <span className="text-white font-bold text-[9px] leading-none group-hover:text-gold transition-colors">5.0 ★</span>
            </Link>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 right-4 z-[100] w-56 bg-[#101113]/95 backdrop-blur-xl border border-gold/20 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex flex-col p-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 text-sm font-bold uppercase tracking-widest transition-colors rounded-xl text-center flex items-center justify-center gap-2 ${item.name === nav.menu ? 'text-gold bg-white/5' : 'text-white/90 hover:bg-white/5 hover:text-gold'}`}
                >
                  {item.name === nav.menu && <Leaf size={14} />}
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reservation Modal */}
      <AnimatePresence>
        {isReservationOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeReservation}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-gold/30 p-8 rounded-2xl max-w-md w-full text-center relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeReservation}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
                type="button"
              >
                <X size={24} />
              </button>

              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center border border-gold/30">
                  <Phone className="w-8 h-8 text-gold" />
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                {language === 'en' ? 'Reserve a Table' : 'Tisch Reservieren'}
              </h3>

              <div className="space-y-6 mt-6">
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-widest mb-2">
                    {language === 'en' ? 'Call us directly' : 'Rufen Sie uns an'}
                  </p>
                  <a href="tel:017647067735" className="text-2xl md:text-3xl font-bold text-gold hover:text-white transition-colors">
                    0 176 470 677 35
                  </a>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-gray-400 text-sm italic">
                    {language === 'en'
                      ? "Online reservation feature is coming soon!"
                      : "Online-Reservierung ist bald verfügbar!"}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={closeReservation}
                  className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors w-full"
                  type="button"
                >
                  {language === 'en' ? 'Close' : 'Schließen'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
