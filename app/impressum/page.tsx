import { SectionHeader } from "@/components/features/SectionHeader";
import { Footer } from "@/components/layout/Footer";
import { Phone, Mail } from "lucide-react";

export default function ImpressumPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black font-sans">
            <div className="pt-32 pb-20 px-4 md:px-6 container mx-auto">
                <SectionHeader
                    title="Impressum"
                    subtitle="Rechtliche Hinweise"
                    description="Angaben gemäß § 5 DDG"
                />

                <div className="mt-12 space-y-8 text-gray-300">

                    {/* Betreiber */}
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">Angaben zum Betreiber</h3>
                        <p className="mb-2"><strong className="text-white">Betreiber:</strong> Delicious Indian Kitchen</p>
                        <p className="mb-2"><strong className="text-white">Vertreten durch:</strong> Inhaber</p>
                        <p className="mb-2"><strong className="text-white">Anschrift:</strong> Am Hulsberg 139, 28205 Bremen</p>
                    </div>

                    {/* Kontakt */}
                    {/* Kontakt */}
                    <div className="pl-2">
                        <h3 className="text-xl font-bold text-gold mb-6">Kontakt</h3>
                        <div className="space-y-6">
                            <a href="tel:017647067735" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                                <div className="p-3 border border-white/10 rounded-full group-hover:border-gold group-hover:text-gold transition-colors">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <span className="text-lg">0 176 470 677 35</span>
                            </a>
                            <a href="mailto:deliciousindiankitchen.bremen@gmail.com" className="flex items-center gap-4 text-white/70 hover:text-white transition-colors group">
                                <div className="p-3 border border-white/10 rounded-full group-hover:border-gold group-hover:text-gold transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <span className="text-lg break-all">deliciousindiankitchen.bremen@gmail.com</span>
                            </a>
                        </div>
                    </div>



                    {/* Aufsichtsbehörde */}
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">Aufsichtsbehörde</h3>
                        <p>Stadtamt Bremen, Gewerbeangelegenheiten</p>
                    </div>

                    {/* Streitbeilegung */}
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">Streitbeilegung</h3>
                        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                    </div>

                    {/* Bildnachweise */}
                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">Bildnachweise</h3>
                        <p>Die auf dieser Webseite verwendeten Bilder sind Eigentum von Delicious Indian Kitchen oder wurden lizenziert.</p>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
