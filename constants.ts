import { LandingData } from './types';

export const ECHOPLAST_SERVICES = [
  {
    service_name: "Mellnagyobbítás",
    description: "A mellek nagyobbítása szilikon implantátumok beültetésével. Kerek vagy anatómiás implantátumot helyeznek el a mirigy alá vagy a nagy mellizom alá.",
    full_description: "A mellnagyobbítás a 'hálás' műtétek közé tartozik, mert a mellek nagyobbak, szebbek lesznek, a páciensek ettől általában boldogabbak, elégedettek lesznek. Ha nem nagyfokú a megereszkedés, akkor a bimbóudvar körüli körkörös felvarrást lehet alkalmazni a mellnagyobbítással egyidejűleg.",
    citation: "https://www.echoplast.hu/mellnagyobbitas.html"
  },
  {
    service_name: "Zsírleszívás",
    description: "A bőr alatti zsírpárna csökkentése bizonyos testtájakon: tomportáj, combok, térd, has. Tartós eredmény pici hegekkel.",
    full_description: "A bőr alatti zsírszövetet fellazítják és egy részét eltávolítják. Az eredmény tartós, feltéve, ha a páciens nagyobb hízással nem 'rontja el'. Nagy előnye, hogy csak pici kb. 1 cm-es hegekkel jár. A csípőtáji zsírszívás végezhető helyi érzéstelenítésben is.",
    citation: "https://www.echoplast.hu/zsirleszivas.html"
  },
  {
    service_name: "Mellfelvarrás",
    description: "Terhességek, szoptatás vagy hízás-fogyás után a mellek megereszkedésének kezelése. Célja a lógás megszüntetése.",
    full_description: "Két fajta mellfelvarrás létezik: a hagyományos fordított T-szerű és a vertikális (csak hosszanti heggel járó). A vertikális inkább a mirigyállományt rendezi át, ezért az eredmény tartós.",
    citation: "https://www.echoplast.hu/mellfelvarras.html"
  },
  {
    service_name: "Szemhéjplasztika",
    description: "Alsó és felső szemhéjplasztika. A műtét után fiatalos tekintetet biztosít.",
    full_description: "Az alsó szemhéj lehet táskás vagy a bőre ráncos. A felső szemhéjplasztikánál a megnyúlt, lógó szemhéjbőrből kimetszünk egy babérlevél alakú darabot. Akinek szép áthajlási redő alakítható ki, a tekintete fiatalossá válik. A műtét után kb. 1 hétig duzzadtak a szemek.",
    citation: "https://www.echoplast.hu/szemhejplasztika.html"
  },
  {
    service_name: "Hasplasztika",
    description: "Feszes, lapos has elérése, ha a hasfali bőr túl laza, megnyúlt vagy a hasfal kitágult.",
    full_description: "A műtét során kimetszünk egy haránt babérlevél alakú bőrt a bőraljával együtt, és szükség esetén a hasfal megraffolását (megfeszítését) is elvégzik.",
    citation: "https://www.echoplast.hu/hasplasztika.html"
  },
  {
    service_name: "Orrplasztika",
    description: "Ha valaki nem elégedett az orra formájával. Kisebbítés, görbeség korrekciója, orrcsúcs formázása.",
    full_description: "Leggyakrabban kisebbíteni kell az orrot, az orr görbeségét adó többletet levésik. Az orrcsúcsot keskenyíteni, hegyesíteni szokták ha kell. Ha a sövény ferde, ezt meg lehet műteni a külső orrplasztikával egyidejűleg.",
    citation: "https://www.echoplast.hu/orrplasztika.html"
  },
  {
    service_name: "Fülplasztika",
    description: "Elálló fülek korrekciója. Nagyon 'hálás' műtét, szinte nincs nagyobb szövődmény.",
    full_description: "A fül belső kagylórészének porcából kivesznek egy részt, ami által a fül közelebb kerül a fejhez. Majdnem mindig helyi érzéstelenítésben végzik, az alsó korhatár kb. 10 év.",
    citation: "https://www.echoplast.hu/fulplasztika.html"
  },
  {
    service_name: "Mellkisebbítés",
    description: "A súlyos, nagy mellek kisebbé tétele és a lógás megszüntetése.",
    full_description: "Általában a mellek alsó részének az állományából távolítanak el valamennyit, utána a mellet a mellfelvarrás technikájával állítják helyre. A bimbó-bimbóudvar egységet a bőrön áthelyezik.",
    citation: "https://www.echoplast.hu/mellkisebbites.html"
  },
  {
    service_name: "Arcplasztika (Face-lift)",
    description: "Akkor végezhető, ha az arc vagy a nyak bőre laza, esetleg lóg. Fiatalosabb megjelenés érhető el.",
    full_description: "Alapelv, hogy elsősorban nem a bőrt kell megfeszíteni, hanem az alatta levő izmos-hártyás hálózatot. Helyi és általános érzéstelenítésben is végezhető, sokszor a toka zsírszívásával kiegészítve. A műtét után az arc kb. 2 hétig duzzadt.",
    citation: "https://www.echoplast.hu/arcplasztika.html"
  },
  {
    service_name: "Hajátültetés",
    description: "A férfias típusú kopaszodás kezelése. A tarkótájról vett hajszigetek átültetése.",
    full_description: "A tarkótájról vett hajas-fejbőr-csíkból 1-4 hajszálat tartalmazó szigeteket vágnak, ezeket az érintett területen ejtett pici metszésekbe bújtatják. Az esztétikai hatás a nem túl vékony hajszálú, sötétebb hajárnyalatú pácienseknél igazán jó.",
    citation: "https://www.echoplast.hu/hajatultetes.html"
  },
  {
    service_name: "Hónalji hyperhidrosis kezelés",
    description: "A hónalji túlzott izzadás tartós megoldása mirigyek helyi kimetszésével. Egyedül az ECHO végzi az országban.",
    full_description: "Az országban egyedül az ECHO Plasztikai Sebészet végzi a hónalji hyperhidrosisban (túlzott izzadásban) szenvedőknél a mirigyek helyi kimetszését.",
    citation: "https://www.echoplast.hu"
  },
  {
    service_name: "Anyajegyek és bőrdaganatok kimetszése",
    description: "Anyajegyek és bőrdaganatok sebészeti eltávolítása. Dr. Péter Zoltán szakterülete a cutan melanomák kezelése.",
    full_description: "Dr. Péter Zoltán szakterülete a cutan melanomák sebészi kezelése, non-melanoma bőrtumorok sebészete.",
    citation: "https://www.echoplast.hu"
  },
  {
    service_name: "Gynecomastia kezelés",
    description: "A férfi mellnagyobbodás sebészeti kezelése. Javítja az érintett férfiak életminőségét és önbizalmát.",
    full_description: "A megnagyobbodott férfi mell korrekciója műtéti úton, amely javítja az érintett férfiak életminőségét és önbizalmát.",
    citation: "https://www.echoplast.hu/galeria"
  }
];

export const DOCTOR_CREDENTIALS = {
  name: "Dr. Péter Zoltán",
  title: "Egyetemi Főorvos",
  specialty: "Plasztikai sebész",
  experience_since: 1998,
  education: [
    "1988 - Debreceni Orvostudományi Egyetem, summa cum laude",
    "1992 - Általános sebészet szakképesítés",
    "1998 - Plasztikai sebészet szakképesítés"
  ],
  international_training: [
    "1994 - Koppenhága, 3 hónap",
    "1996 - Dublin, 1 hónap",
    "1997 - Koppenhága, 2 hónap",
    "2004 - Koppenhága, 2 hónap",
    "2007 - Linköping, 2 hét"
  ],
  specializations: [
    "Cutan melanomák sebészi kezelése",
    "Non-melanoma bőrtumorok sebészete",
    "Égéstraumatológia",
    "Rekonstrukciós sebészet"
  ],
  publications: "Három klinikai témájú elsőszerzős közlemény tudományos folyóiratokban (Magyar Sebészet, Magyar Traumatológia, International Wound Journal, European Journal of Plastic Surgery)"
};

export const TRUST_ELEMENTS = [
  { icon: "Award", value: "25+ év tapasztalat", subtitle: "1998 óta végzünk esztétikai műtéteket" },
  { icon: "GraduationCap", value: "Egyetemi Főorvos", subtitle: "DE OEC Bőr- és Nemikórtani Klinika" },
  { icon: "Globe", value: "Nemzetközi képzés", subtitle: "Koppenhága, Dublin, Linköping" },
  { icon: "FileCheck", value: "ÁNTSZ engedélyezett", subtitle: "Engedélyszám: 060060274" }
];

export const LANDING_DATA: LandingData = {
  service_categories: [
    {
      category_name: "Mellműtétek",
      description: "Mellnagyobbítás, mellfelvarrás, mellkisebbítés - modern technikákkal, tartós eredménnyel."
    },
    {
      category_name: "Testformázás",
      description: "Zsírleszívás, hasplasztika - feszesebb, formásabb test elérhető közelségben."
    },
    {
      category_name: "Arcplasztika",
      description: "Szemhéjplasztika, arcplasztika, orrplasztika - fiatalos, harmonikus megjelenés."
    },
    {
      category_name: "Speciális beavatkozások",
      description: "Fülplasztika, hajátültetés, hyperhidrosis kezelés, bőrdaganatok eltávolítása."
    }
  ],
  treatment_benefits: [],
  unique_selling_propositions: [
    { value: "25+ év tapasztalat" },
    { value: "Egyetemi főorvos" },
    { value: "Nemzetközi képzés" },
    { value: "ÁNTSZ engedélyezett rendelő" },
    { value: "Személyre szabott konzultáció" },
    { value: "Modern technikák" }
  ],
  pricing_structures: [],
  contact_details: {
    phone_number: "06 20 976 3574",
    address: "Debrecen, Bay Zoltán u., 4032",
    email_address: "peterz@dote.hu",
    opening_hours: "Előzetes bejelentkezéssel"
  },
  trust_signals: []
};

export const FAQ_ITEMS = [
  {
    question: "Hogyan zajlik a konzultáció?",
    answer: "A konzultáció során Dr. Péter Zoltán alaposan megvizsgálja az Ön helyzetét, megbeszélik az elképzeléseit és a realisztikus lehetőségeket. Részletes tájékoztatást kap a beavatkozásról, a kockázatokról és a várható eredményről. A konzultáció díja 15.000 Ft, amely beleszámít a műtét árába."
  },
  {
    question: "Mennyire fájdalmas a beavatkozás?",
    answer: "A műtétek altatásban vagy helyi érzéstelenítésben történnek, így azok fájdalommentesek. A műtét után kezelhető fájdalom jelentkezhet, amelyet fájdalomcsillapítóval enyhítünk. A legtöbb páciens néhány nap után már nem szed fájdalomcsillapítót."
  },
  {
    question: "Mikor térhetek vissza a munkába?",
    answer: "Ez a beavatkozás típusától függ. Kisebb műtétek (szemhéjplasztika, fülplasztika) után 1-2 hét, nagyobb műtétek (hasplasztika, mellműtétek) után 2-4 hét a felépülési idő. A pontos időt a konzultáción beszéljük meg."
  },
  {
    question: "Milyen kockázatai vannak a műtétnek?",
    answer: "Minden sebészeti beavatkozásnak vannak kockázatai. A leggyakoribbak: vérzés, fertőzés, hegképződési zavarok. Dr. Péter Zoltán részletesen tájékoztatja Önt minden kockázatról a konzultáción, és mindent megtesz azok minimalizálásáért."
  },
  {
    question: "Mennyibe kerül egy plasztikai műtét?",
    answer: "Az árak a beavatkozás típusától és összetettségétől függnek. Pontos árajánlatot a konzultáción, az Ön egyéni igényeinek felmérése után tudunk adni. A konzultációra való jelentkezéskor szívesen adunk tájékoztató árintervallumot."
  }
];