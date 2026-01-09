import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, FileText } from 'lucide-react';
import { LANDING_DATA } from '../constants';

export const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 pt-24 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-12">
                    <a href="/" className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors mb-6 group">
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        Vissza a főoldalra
                    </a>
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-slate-800 mb-4">
                        Adatkezelési Tájékoztató
                    </h1>
                    <p className="text-slate-500 text-lg">
                        Hatályos: 2024. január 1-től visszavonásig
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {/* 1. Controller */}
                    <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-teal-600" size={28} />
                            <h2 className="text-2xl font-bold text-slate-800">1. Adatkezelő</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Név:</strong> ECHO Plasztikai Sebészet</li>
                                <li><strong>Cím:</strong> {LANDING_DATA.contact_details.address}</li>
                                <li><strong>Vezető orvos:</strong> Dr. Péter Zoltán</li>
                                <li><strong>Telefon:</strong> {LANDING_DATA.contact_details.phone_number}</li>
                                <li><strong>E-mail:</strong> {LANDING_DATA.contact_details.email_address}</li>
                                <li><strong>ÁNTSZ engedélyszám:</strong> 060060274</li>
                            </ul>
                        </div>
                    </section>

                    {/* 2. Processors */}
                    <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Lock className="text-teal-600" size={28} />
                            <h2 className="text-2xl font-bold text-slate-800">2. Adatfeldolgozók és technikai háttér</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>
                                A szolgáltatásaink nyújtásához, különös tekintettel az időpontfoglalási rendszer működtetésére, megbízható technikai partnerekkel dolgozunk együtt.
                            </p>
                            <div className="bg-teal-50 p-4 rounded-xl border border-teal-100 mt-4">
                                <h3 className="text-teal-700 font-bold mb-2">Időpontfoglalási rendszer (DBSflow)</h3>
                                <p className="text-sm text-slate-600">
                                    A weboldalon történő időpontfoglalások technikai hátterét és az adatok tárolását a <strong>DBSflow</strong> rendszer biztosítja. A foglalás során megadott adatok (név, email cím, telefonszám) a DBSflow biztonságos szerverein kerülnek tárolásra. A szolgáltató vállalja, hogy a felhasználók adatait bizalmasan kezeli, azokat harmadik félnek nem adja tovább, és kizárólag a foglalás teljesítése érdekében használja fel.
                                </p>
                            </div>
                            <p className="text-sm text-slate-500 mt-2">
                                A rendszer üzemeltetője minden szükséges technikai és szervezési intézkedést megtesz az adatok biztonsága érdekében.
                            </p>
                        </div>
                    </section>

                    {/* 3. Data Collection */}
                    <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <FileText className="text-teal-600" size={28} />
                            <h2 className="text-2xl font-bold text-slate-800">3. Kezelt adatok köre és célja</h2>
                        </div>
                        <div className="space-y-6 text-slate-600 leading-relaxed">
                            <div>
                                <h3 className="text-slate-800 font-bold mb-2">Konzultáció foglalás</h3>
                                <div className="bg-teal-50 border border-teal-100 rounded-lg p-4 mb-4">
                                    <p className="text-sm text-teal-700 font-semibold mb-2">FONTOS TÁJÉKOZTATÁS:</p>
                                    <p className="text-sm text-slate-600 mb-2">
                                        Konzultációra való jelentkezéshez az online időpontfoglaló rendszer használata szükséges.
                                    </p>
                                </div>
                                <p className="mb-2">A sikeres foglaláshoz az alábbi adatok megadása <span className="text-teal-600 font-bold">kötelező</span>:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li><strong>Név</strong> (azonosítás)</li>
                                    <li><strong>Email cím</strong> (kapcsolattartás, visszaigazolás küldése)</li>
                                    <li><strong>Telefonszám</strong> (egyeztetés, váratlan változás esetén értesítés)</li>
                                </ul>
                                <p className="mt-4 text-sm italic">
                                    <strong>Jogalap:</strong> Az Ön önkéntes hozzájárulása, illetve a szerződés teljesítése.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-slate-800 font-bold mb-2">Egészségügyi adatok</h3>
                                <p>
                                    A plasztikai sebészeti beavatkozások előtt egészségügyi adatokat is kezelünk (kórtörténet, allergiák, gyógyszerek). Ezeket az adatokat az egészségügyi törvény előírásainak megfelelően, fokozott védelemmel kezeljük és tároljuk.
                                </p>
                            </div>

                            <div>
                                <h3 className="text-slate-800 font-bold mb-2">Kapcsolatfelvétel</h3>
                                <p>
                                    Amennyiben emailben vagy telefonon keres meg minket, az ott megadott adatait kizárólag a válaszadás és ügyintézés céljából kezeljük.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 4. Rights */}
                    <section className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Eye className="text-teal-600" size={28} />
                            <h2 className="text-2xl font-bold text-slate-800">4. Az Ön jogai</h2>
                        </div>
                        <div className="space-y-4 text-slate-600 leading-relaxed">
                            <p>Ön bármikor jogosult:</p>
                            <ul className="list-disc pl-6 space-y-2">
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

                    {/* Footer Note */}
                    <div className="text-center text-slate-500 text-sm mt-12 pb-8">
                        <p>
                            Ez a weboldal nem használ profilalkotást vagy automatizált döntéshozatalt. Cookie-kat (sütiket) csak a működéshez elengedhetetlen mértékben alkalmazunk.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
