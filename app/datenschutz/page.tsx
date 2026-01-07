import { SectionHeader } from "@/components/features/SectionHeader";
import { Footer } from "@/components/layout/Footer";

export default function DatenschutzPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black font-sans">
            <div className="pt-32 pb-20 px-4 md:px-6 container mx-auto">
                <SectionHeader
                    title="Datenschutzerklärung"
                    subtitle="Privacy Policy"
                    description="Informationen zum Datenschutz gemäß DSGVO"
                />

                <div className="mt-12 space-y-8 text-gray-300 text-sm md:text-base leading-relaxed">

                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">1. Datenschutz auf einen Blick</h3>
                        <h4 className="font-bold text-white mt-4 mb-2">Allgemeine Hinweise</h4>
                        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">2. Hosting und Server Log Files</h3>
                        <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Browsertyp und Browserversion</li>
                            <li>Verwendetes Betriebssystem</li>
                            <li>Referrer URL</li>
                            <li>Hostname des zugreifenden Rechners</li>
                            <li>Uhrzeit der Serveranfrage</li>
                            <li>IP-Adresse</li>
                        </ul>
                        <p className="mt-4">Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.</p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h3>
                        <h4 className="font-bold text-white mt-4 mb-2">Datenschutz</h4>
                        <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>

                        <h4 className="font-bold text-white mt-4 mb-2">Hinweis zur verantwortlichen Stelle</h4>
                        <p className="mb-2">Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                        <p>Delicious Indian Kitchen</p>
                        <p>Am Hulsberg 139, 28205 Bremen</p>
                        <p>E-Mail: deliciousindiankitchen.bremen@gmail.com</p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">4. Plugins und Tools</h3>

                        <h4 className="font-bold text-white mt-4 mb-2">Google Web Fonts (Lokal)</h4>
                        <p>Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.</p>

                        <h4 className="font-bold text-white mt-4 mb-2">Google Maps</h4>
                        <p>Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited ("Google"), Gordon House, Barrow Street, Dublin 4, Irland.</p>
                        <p className="mt-2">Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.</p>
                        <p className="mt-2">Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.</p>
                    </div>

                    <div className="p-6 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-gold mb-4">5. Cookies</h3>
                        <p>Diese Webseite verwendet keine technisch nicht notwendigen Cookies (wie z.B. Tracking- oder Werbe-Cookies). Es werden lediglich technisch notwendige Session-Cookies eingesetzt, die für den Betrieb der Website erforderlich sind.</p>
                    </div>

                </div>
            </div>
            <Footer />
        </main>
    );
}
