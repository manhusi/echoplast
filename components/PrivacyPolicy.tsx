import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <a href="/" className="inline-flex items-center text-gold-400 hover:text-white transition-colors mb-6 group">
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Vissza a főoldalra
                    </a>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-4">
                        Adatkezelési Tájékoztató
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Hatályos: 2024. január 1-től visszavonásig
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {/* 1. Controller */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-gold-400" size={28} />
                            <h2 className="text-2xl font-bold text-white">1. Adatvédelem</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li><strong>Székhely:</strong> 4484 Ibrány Tisza utca 107</li>
                                <li><strong>Telephely:</strong> 4400 Nyíregyháza Szent István utca 2</li>
                                <li><strong>Üzemeltető:</strong> Kaszás Bence Attila E.V</li>
                                <li><strong>Fantázia név:</strong> Bence Masszázs szalon</li>
                            </ul>
                        </div>
                    </section>

                    {/* 2. Processors */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="text-gold-400" size={28} />
                            <h2 className="text-2xl font-bold text-white">2. Adatfeldolgozók és technikai háttér</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                A szolgáltatásaink nyújtásához, különös tekintettel az időpontfoglalási rendszer működtetésére, megbízható technikai partnerekkel dolgozunk együtt.
                            </p>
                            <div className="bg-black/40 p-4 rounded-xl border border-gray-800 mt-4">
                                <h3 className="text-gold-400 font-bold mb-2">Időpontfoglalási rendszer (DBSflow)</h3>
                                <p className="text-sm">
                                    A weboldalon történő időpontfoglalások technikai hátterét és az adatok tárolását a <strong>DBSflow</strong> rendszer biztosítja. A foglalás során megadott adatok (név, email cím, telefonszám) a DBSflow biztonságos szerverein kerülnek tárolásra. A szolgáltató vállalja, hogy a felhasználók adatait bizalmasan kezeli, azokat harmadik félnek nem adja tovább, és kizárólag a foglalás teljesítése érdekében használja fel.
                                </p>
                            </div>
                            <p className="text-sm text-gray-500 mt-2">
                                A rendszer üzemeltetője minden szükséges technikai és szervezési intézkedést megtesz az adatok biztonsága érdekében.
                            </p>
                        </div>
                    </section>

                    {/* 3. Data Collection */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="text-gold-400" size={28} />
                            <h2 className="text-2xl font-bold text-white">3. Kezelt adatok köre és célja</h2>
                        </div>
                        <div className="space-y-6 text-gray-300 leading-relaxed">
                            <div>
                                <h3 className="text-white font-bold mb-2">Időpontfoglalás és Kötelező Adatmegadás</h3>
                                <div className="bg-gold-400/10 border border-gold-400/20 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-gold-400 font-semibold mb-2">FONTOS TÁJÉKOZTATÁS:</p>
                                    <p className="text-sm text-gray-300 mb-2">
                                        Szolgáltatásaink igénybevételéhez ezentúl <strong>kizárólag az online időpontfoglaló rendszer</strong> használata szükséges, a korábbi (telefonon, üzenetben történő) foglalási módok megszűntek.
                                    </p>
                                </div>
                                <p className="mb-2">A sikeres foglaláshoz az alábbi adatok megadása <span className="text-gold-400 font-bold">kötelező</span>:</p>
                                <ul className="list-disc pl-6 space-y-1 text-gray-400">
                                    <li><strong>Név</strong> (azonosítás)</li>
                                    <li><strong>Email cím</strong> (kapcsolattartás, visszaigazolás küldése)</li>
                                    <li><strong>Telefonszám</strong> (egyeztetés, váratlan változás esetén értesítés)</li>
                                </ul>
                                <p className="mt-4 text-sm text-gray-400">
                                    Ezen adatok hiányában az időpontfoglalást nem tudjuk rögzíteni. Az online rendszer bevezetése a gyorsabb és hatékonyabb ügyintézést szolgálja, kiküszöbölve a telefonos elérhetőség korlátait.
                                </p>
                                <p className="mt-2 text-sm italic">
                                    <strong>Jogalap:</strong> Az Ön önkéntes hozzájárulása, illetve a szerződés teljesítése.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-white font-bold mb-2">Kapcsolatfelvétel</h3>
                                <p>
                                    Amennyiben emailben vagy telefonon keres meg minket, az ott megadott adatait kizárólag a válaszadás és ügyintézés céljából kezeljük.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 4. Rights */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Eye className="text-gold-400" size={28} />
                            <h2 className="text-2xl font-bold text-white">4. Az Ön jogai</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>Ön bármikor jogosult:</p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li>Tájékoztatást kérni személyes adatai kezeléséről (hozzáférési jog).</li>
                                <li>Kérni adatai helyesbítését, amennyiben azok pontatlanok.</li>
                                <li>Kérni adatai törlését vagy zárolását ("elfeledtetéshez való jog"), kivéve a kötelező adatkezelés eseteit.</li>
                                <li>Tiltakozni személyes adatai kezelése ellen.</li>
                            </ul>
                            <p className="mt-4">
                                Jogérvényesítési lehetőségeivel kapcsolatban kérjük, keressen minket elérhetőségeinken, vagy panasszal fordulhat a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH).
                            </p>
                        </div>
                    </section>

                    {/* 5. Cancellation Policy */}
                    <section className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="text-gold-400" size={28} />
                            <h2 className="text-2xl font-bold text-white">5. Lemondási feltételek és Házirend</h2>
                        </div>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                A zavartalan működés és a többi vendég érdekében az alábbi szabályok betartását kérjük:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-400">
                                <li><strong>Lemondás/Módosítás:</strong> A kezelés előtt 48 órával díjmentes. 24-48 órán belüli jelzés esetén felár fizetendő.</li>
                                <li><strong>Helyszíni lemondás / Meg nem jelenés:</strong> A kezelés teljes díja fizetendő.</li>
                                <li><strong>Következmény:</strong> Előzetes értesítés nélküli meg nem jelenés esetén a szolgáltató jogosult a további időpontok kiadását megtagadni.</li>
                                <li><strong>Ajándékutalvány:</strong> Meg nem jelenés esetén felhasználtnak minősül.</li>
                            </ul>
                            <div className="mt-4 p-4 bg-black/40 rounded-xl border border-gray-800">
                                <h3 className="text-gold-400 font-bold mb-2 text-sm">Bérletek érvényessége:</h3>
                                <ul className="grid grid-cols-2 gap-2 text-sm">
                                    <li>3 alkalom: 5 hónap</li>
                                    <li>5 alkalom: 6 hónap</li>
                                    <li>8 alkalom: 8 hónap</li>
                                    <li>10 alkalom: 12 hónap</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Footer Note */}
                    <div className="text-center text-gray-500 text-sm mt-12 pb-8">
                        <p>
                            Ez a weboldal nem használ profalkotást vagy automatizált döntéshozatalt. Cooki-kat (sütiket) csak a működéshez elengedhetetlen mértékben alkalmazunk.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
