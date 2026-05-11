/*
How to add a new event:
1. Copy the template below and paste it as a new object inside the events array.
2. Keep id and slug unique. The slug is a URL-friendly name for the event.
3. Use date as YYYY-MM-DD and time as HH:MM.
4. category must be one of: summit, workshop, trip, tech_talk, info_session, design.
5. The event card and event popup/modal are both generated from this same object.
6. Turkish text stays in the normal fields. English text goes inside i18n.en.
7. Optional application fields:
   - applicationUrl: Google Forms or any external application link for this event only.
   - applicationLabel: custom button text, if "Kayit Ol" / "Register Now" is not specific enough.
   - applicationsOpen: set false to close applications before the event date.

Template:
{
    id: "10",
    slug: "example-event-2026",
    title: "Ornek Etkinlik Basligi",
    shortTitle: "Ornek Etkinlik",
    date: "2026-05-20",
    time: "13:00",
    endTime: "15:00",
    location: "Dogus Universitesi, B2-02",
    description: "Etkinlik kartinda ve popup aciklamasinda gorunecek kisa aciklama.",
    category: "workshop",
    speakers: [
        "Konusmaci Adi"
    ],
    image: "assets/events/example-event.webp",
    applicationUrl: "https://forms.gle/example",
    applicationLabel: "Basvuru Formu",
    applicationsOpen: true,
    i18n: {
        en: {
            title: "Example Event Title",
            shortTitle: "Example Event",
            location: "Dogus University, B2-02",
            description: "Short English description shown on the card and popup.",
            applicationLabel: "Application Form"
        }
    }
}
*/
/*
How to override a fetched GDG Community API event:
1. Open the fetched event on the website. The URL will look like events.html?eventId=gdg-123456.
2. For apiEventOverrides, use the number after "gdg-". In this example, the override key is "123456".
3. Add only the fields you want to replace under that API ID below.
4. Use fallbackSlug when the same event also exists in the local fallback list, so it is not shown twice when the API loads.
5. Use locationSuffix for room/classroom values such as "Z-25"; it will be appended to the fetched API address.
6. Missing fields keep using the API data. This lets you override one picture, description, form link, etc. without copying the whole event.
7. English override text goes inside i18n.en, the same as local events.

Example:
export const apiEventOverrides = {
    "123456": {
        fallbackSlug: "example-event-2026",
        image: "assets/events/custom-event-image.webp",
        description: "API yerine sitede gosterilecek ozel aciklama.",
        locationSuffix: "B2-02",
        applicationUrl: "https://forms.gle/example",
        i18n: {
            en: {
                description: "Custom English description shown instead of the API text."
            }
        }
    }
};
*/
export const apiEventOverrides = {
    "96190": {
        fallbackSlug: "ai-leaders-summit-2025",
        title: "AI Leaders Summit",
        shortTitle: "AI Leaders Summit",
        description:
            "Yapay zekayı yalnızca bir araç değil, bir dönüşüm gücü olarak gören liderlerin buluştuğu zirve. Yapay zekanın geleceğini yazan liderlerle aynı sahnede buluşma fırsatı.",
        shortDescription:
            "Yapay zekayı yalnızca bir araç değil, bir dönüşüm gücü olarak gören liderlerin buluştuğu zirve.",
        category: "summit",
        speakers: [
            "Deger Ayata, PhD",
            "Rojdan Ozan Kozan",
            "Melik Vatan"
        ],
        image: "assets/events/ai-leaders-summit-2025.webp",
        locationSuffix: "B2-02",
        i18n: {
            en: {
                description:
                    "A summit where leaders who see artificial intelligence not only as a tool, but as a force of transformation, come together. An opportunity to share the same stage with leaders shaping the future of AI.",
                shortDescription:
                    "A summit where leaders who see artificial intelligence as a force of transformation come together.",
                location: "Dogus University, 265 Nato Yolu Caddesi, Umraniye, B2-02"
            }
        }
    },
    "105544": {
        fallbackSlug: "info-session-2025-fall",
        title: "GDG on Campus DOU Info Session",
        shortTitle: "Info Session",
        description:
            "Dönemin ilk etkinliğiyle kulübümüzü tanıttığımız, yeni üyelerle tanıştığımız ve birlikte akran öğrenmesi yaptığımız tanışma oturumu.",
        shortDescription:
            "Kulübümüzü tanıttığımız, yeni üyelerle tanıştığımız ve birlikte akran öğrenmesi yaptığımız tanışma oturumu.",
        category: "info_session",
        image: "assets/events/info-session-2025-fall.webp",
        locationSuffix: "Z-25",
        i18n: {
            en: {
                title: "GDG on Campus DOU Info Session",
                shortTitle: "Info Session",
                description:
                    "An introductory session where we introduced our club with the first event of the semester, met new members, and learned from each other.",
                shortDescription:
                    "An introductory session where we introduced our club, met new members, and learned from each other.",
                location: "Dogus University, 265 Nato Yolu Caddesi, Umraniye, Z-25"
            }
        }
    },
    "108427": {
        fallbackSlug: "gdg-techverse-2025",
        title: "GDG TechVerse 2025: Büyük Ölçekli Sistemler ve Mobil Teknolojiler",
        shortTitle: "GDG TechVerse 2025",
        description:
            "Hepsiburada Yazılım Geliştirme Birim Başkanı Ufuk Serdoğan ve Akbank Mobil Geliştirme Mimarı Muhittin Kuluöztürk ile büyük ölçekli sistem mimarileri, yüksek trafik yönetimi ve mobil teknolojilerdeki en güncel trendleri konuştuğumuz oturum.",
        shortDescription:
            "Hepsiburada ve Akbank teknoloji liderleriyle büyük ölçekli sistemler, yüksek trafik yönetimi ve mobil teknolojiler üzerine bir oturum.",
        category: "tech_talk",
        speakers: [
            "Ufuk Serdoğan (Hepsiburada Yazılım Geliştirme Birim Başkanı)",
            "Muhittin Kuluöztürk (Akbank Mobil Geliştirme Mimarı)"
        ],
        image: "assets/events/gdg-techverse-2025.webp",
        locationSuffix: "B2-02",
        i18n: {
            en: {
                title: "GDG TechVerse 2025: Large-Scale Systems and Mobile Technologies",
                shortTitle: "GDG TechVerse 2025",
                description:
                    "A session with Hepsiburada Head of Software Development Ufuk Serdogan and Akbank Mobile Development Architect Muhittin Kuluozturk where we discussed large-scale system architectures, high-traffic management, and the latest trends in mobile technologies.",
                shortDescription:
                    "A session on large-scale systems, high-traffic management, and mobile technologies with technology leaders from Hepsiburada and Akbank.",
                speakers: [
                    "Ufuk Serdogan (Hepsiburada Head of Software Development)",
                    "Muhittin Kuluozturk (Akbank Mobile Development Architect)"
                ],
                location: "Dogus University, 265 Nato Yolu Caddesi, Umraniye, B2-02"
            }
        }
    },
    "110502": {
        fallbackSlug: "bit-to-byte-2025",
        title: "Bit To Byte: Oyun Geliştirme",
        shortTitle: "Oyun Geliştirme",
        description:
            "Bit To Byte ile kendi oyununu tasarla! GDG on Campus DOU olarak, Unity 6 ile efsanevi Flappy Bird mekaniklerini sıfırdan kodluyoruz. Teoriyi bırakıp pratiğe geçme zamanı!",
        shortDescription:
            "Unity 6 ile Flappy Bird mekaniklerini sıfırdan kodladığımız uygulamalı oyun geliştirme etkinliği.",
        category: "workshop",
        image: "assets/events/bit-to-byte-2025.webp",
        locationSuffix: "Z-25",
        i18n: {
            en: {
                title: "Bit To Byte: Game Development",
                shortTitle: "Game Development",
                description:
                    "Design your own game with Bit To Byte! As GDG on Campus DOU, we are coding the legendary Flappy Bird mechanics from scratch with Unity 6. It is time to move from theory to practice!",
                shortDescription:
                    "A hands-on game development event where we code Flappy Bird mechanics from scratch with Unity 6.",
                location: "Dogus University, 265 Nato Yolu Caddesi, Umraniye, Z-25"
            }
        }
    },
    "117328": {
        fallbackSlug: "microsoft-teknik-gezi-2026",
        title: "Microsoft Ofisi: Teknik Gezi",
        shortTitle: "Teknik Gezi",
        description:
            "Üniversite eğitimini, küresel teknoloji endüstrisinin gerçek dinamikleriyle harmanlıyoruz! GDG on Campus DOU ekibi olarak, yazılım ekosisteminin öncülerinden Microsoft'un Türkiye ofisine resmi bir teknik gezi düzenliyoruz.",
        shortDescription:
            "GDG on Campus DOU ekibiyle Microsoft Türkiye ofisine düzenlediğimiz teknik gezi.",
        category: "trip",
        image: "assets/events/microsoft-teknik-gezi-2026.webp",
        i18n: {
            en: {
                title: "Microsoft Office: Technical Trip",
                shortTitle: "Technical Trip",
                description:
                    "We are blending university education with the real dynamics of the global technology industry. As the GDG on Campus DOU team, we are organizing an official technical trip to Microsoft Turkiye, one of the pioneers of the software ecosystem.",
                shortDescription:
                    "A technical trip to Microsoft Turkiye with the GDG on Campus DOU team."
            }
        }
    },
    "117914": {
        fallbackSlug: "women-coding-the-future-2026",
        title: "Women Coding The Future",
        shortTitle: "Women Coding",
        description:
            "8 Mart Dünya Kadınlar Günü'nün anlamını teknoloji dünyasıyla buluşturduğumuz 'Women Coding the Future' etkinliğimizde, sektörün tecrübeli isimlerinden Ayşenur Eroğlu'nu ağırlıyoruz.",
        shortDescription:
            "Women Coding the Future etkinliğinde sektörün tecrübeli isimlerinden Ayşenur Eroğlu'nu ağırlıyoruz.",
        category: "tech_talk",
        speakers: [
            "Ayşenur Eroğlu (Mühendislik Yöneticisi Bölüm Başkanı)"
        ],
        image: "assets/events/women-coding-the-future-2026.webp",
        locationSuffix: "B2-03",
        i18n: {
            en: {
                description:
                    "At our 'Women Coding the Future' event, where we brought the meaning of International Women's Day on March 8 together with the technology world, we are hosting Aysenur Eroglu, one of the experienced names in the industry.",
                shortDescription:
                    "At Women Coding the Future, we are hosting Aysenur Eroglu, one of the experienced names in the industry.",
                speakers: [
                    "Aysenur Eroglu (Engineering Manager Chapter Lead)"
                ],
                location: "Dogus University, 265 Nato Yolu Caddesi, Umraniye, B2-03"
            }
        }
    }
};

export const events = [
    {
        id: "1",
        slug: "ai-leaders-summit-2025",
        title: "AI Leaders Summit",
        shortTitle: "AI Leaders Summit",
        date: "2025-05-28",
        time: "13:00",
        endTime: "16:00",
        location: "Doğuş Üniversitesi, B2-02",
        description:
            "Yapay zekayı yalnızca bir araç değil, bir dönüşüm gücü olarak gören liderlerin buluştuğu zirve. Yapay zekanın geleceğini yazan liderlerle aynı sahnede buluşma fırsatı.",
        category: "summit",
        speakers: [
            "Deger Ayata, PhD",
            "Rojdan Ozan Kozan",
            "Melik Vatan"
        ],
        image: "assets/events/ai-leaders-summit-2025.webp",
        i18n: {
            en: {
                location: "Dogus University, B2-02",
                description:
                    "A summit where leaders who see artificial intelligence not only as a tool, but as a force of transformation, come together. An opportunity to share the same stage with leaders shaping the future of AI."
            }
        }
    },
    {
        id: "2",
        slug: "info-session-2025-fall",
        title: "GDG on Campus DOU Info Session",
        shortTitle: "Info Session",
        date: "2025-10-17",
        time: "13:00",
        endTime: "14:00",
        location: "Doğuş Üniversitesi, Z-25 ",
        description:
            "Dönemin ilk etkinliğiyle kulübümüzü tanıttığımız, yeni üyelerle tanıştığımız ve birlikte akran öğrenmesi yaptığımız tanışma oturumu.",
        category: "info_session",
        image: "assets/events/info-session-2025-fall.webp",
        i18n: {
            en: {
                location: "Dogus University, Z-25 ",
                description:
                    "An introductory session where we introduced our club with the first event of the semester, met new members, and learned from each other."
            }
        }
    },
    {
        id: "3",
        slug: "gdg-techverse-2025",
        title: "GDG TechVerse 2025: Büyük Ölçekli Sistemler ve Mobil Teknolojiler",
        shortTitle: "GDG TechVerse 2025",
        date: "2025-11-18",
        time: "13:00",
        endTime: "15:00",
        location: "Doğuş Üniversitesi, B2-02",
        description:
            "Hepsiburada Yazılım Geliştirme Birim Başkanı Ufuk Serdoğan ve Akbank Mobil Geliştirme Mimarı Muhittin Kuluöztürk ile büyük ölçekli sistem mimarileri, yüksek trafik yönetimi ve mobil teknolojilerdeki en güncel trendleri konuştuğumuz oturum.",
        category: "tech_talk",
        speakers: [
            "Ufuk Serdoğan (Hepsiburada Yazılım Geliştirme Birim Başkanı)",
            "Muhittin Kuluöztürk (Akbank Mobil Geliştirme Mimarı)"
        ],
        image: "assets/events/gdg-techverse-2025.webp",
        i18n: {
            en: {
                title: "GDG TechVerse 2025: Large-Scale Systems and Mobile Technologies",
                location: "Dogus University, B2-02",
                description:
                    "A session with Hepsiburada Head of Software Development Ufuk Serdogan and Akbank Mobile Development Architect Muhittin Kuluozturk where we discussed large-scale system architectures, high-traffic management, and the latest trends in mobile technologies.",
                speakers: [
                    "Ufuk Serdogan (Hepsiburada Head of Software Development)",
                    "Muhittin Kuluozturk (Akbank Mobile Development Architect)"
                ]
            }
        }
    },
    {
        id: "7",
        slug: "bit-to-byte-2025",
        title: "Bit To Byte: Oyun Geliştirme",
        shortTitle: "Oyun Geliştirme",
        date: "2025-12-16",
        time: "13:00",
        endTime: "15:00",
        location: "Doğuş Üniversitesi, Z-25",
        description:
            "Bit To Byte ile kendi oyununu tasarla! GDG on Campus DOU olarak, Unity 6 ile efsanevi Flappy Bird mekaniklerini sıfırdan kodluyoruz. Teoriyi bırakıp pratiğe geçme zamanı!",
        category: "workshop",
        image: "assets/events/bit-to-byte-2025.webp",
        i18n: {
            en: {
                title: "Bit To Byte: Game Development",
                shortTitle: "Game Development",
                location: "Dogus University, Z-25",
                description:
                    "Design your own game with Bit To Byte! As GDG on Campus DOU, we are coding the legendary Flappy Bird mechanics from scratch with Unity 6. It is time to move from theory to practice!"
            }
        }
    },
    {
        id: "8",
        slug: "microsoft-teknik-gezi-2026",
        title: "Microsoft Ofisi: Teknik Gezi",
        shortTitle: "Teknik Gezi",
        date: "2026-03-04",
        time: "10:00",
        endTime: "12:00",
        location: "Microsoft Türkiye Ofisi",
        description:
            "Üniversite eğitimini, küresel teknoloji endüstrisinin gerçek dinamikleriyle harmanlıyoruz! GDG on Campus DOU ekibi olarak, yazılım ekosisteminin öncülerinden Microsoft'un Türkiye ofisine resmi bir teknik gezi düzenliyoruz.",
        category: "trip",
        image: "assets/events/microsoft-teknik-gezi-2026.webp",
        i18n: {
            en: {
                title: "Microsoft Office: Technical Trip",
                shortTitle: "Technical Trip",
                location: "Microsoft Turkiye Office",
                description:
                    "We are blending university education with the real dynamics of the global technology industry. As the GDG on Campus DOU team, we are organizing an official technical trip to Microsoft Turkiye, one of the pioneers of the software ecosystem."
            }
        }
    },
    {
        id: "9",
        slug: "women-coding-the-future-2026",
        title: "Women Coding The Future",
        shortTitle: "Women Coding",
        date: "2026-03-10",
        time: "13:00",
        endTime: "15:00",
        location: "Doğuş Üniversitesi Dudullu Kampüsü, B2-03",
        description:
            "8 Mart Dünya Kadınlar Günü'nün anlamını teknoloji dünyasıyla buluşturduğumuz 'Women Coding the Future' etkinliğimizde, sektörün tecrübeli isimlerinden Ayşenur Eroğlu'nu ağırlıyoruz.",
        category: "tech_talk",
        speakers: [
            "Ayşenur Eroğlu (Mühendislik Yöneticisi Bölüm Başkanı)"
        ],
        image: "assets/events/women-coding-the-future-2026.webp",
        i18n: {
            en: {
                location: "Dogus University Dudullu Campus, B2-03",
                description:
                    "At our 'Women Coding the Future' event, where we brought the meaning of International Women's Day on March 8 together with the technology world, we are hosting Aysenur Eroglu, one of the experienced names in the industry.",
                speakers: [
                    "Aysenur Eroglu (Engineering Manager Chapter Lead)"
                ]
            }
        }
    }
];
