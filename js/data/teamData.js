// js/data/teamData.js

// 1) TEAMS DESCRIPTION & MEMBERS
/*
How to add a new team:
1. Add a new entry inside teams first. The object key is the Turkish team name.
2. key must be unique; team members use this same key in teamKey.
3. description appears in the team popup/modal.
4. captain appears as the badge in the popup/modal.
5. members is the full member name list for the popup/modal.
6. Turkish text stays in the normal fields. English text goes inside i18n.en.

Template:
"Yeni Ekip Adi": {
    key: "new_team",
    description: "Ekibin ne yaptigini anlatan kisa aciklama.",
    captain: "Kaptan Adi",
    members: [
        "Kaptan Adi",
        "Uye Adi"
    ],
    i18n: {
        en: {
            label: "New Team Name",
            description: "Short English description of what this team does."
        }
    }
}
*/
export const teams = {

    "Organizatör": {
        key: "organizer",
        description:
            "GDG on Campus DOU'nun genel organizasyonundan ve topluluk vizyonunun yürütülmesinden sorumludur.",
        captain: "Arda Tezbaşaran & Serra Özbey",
        members: [
            "Arda Tezbaşaran",
            "Serra Özbey"
        ],
        i18n: {
            en: {
                label: "Organizer",
                description: "Responsible for the overall organization of GDG on Campus DOU and the execution of the community vision."
            }
        }
    },

    "Asistan Organizatör": {
        key: "assistant_organizer",
        description:
            "Organizasyon süreçlerinde koordinasyona destek olur, ekipler arası iletişimi güçlendirir.",
        captain: "Serra Özbey",
        members: [
            "Serra Özbey"
        ],
        i18n: {
            en: {
                label: "Assistant Organizer",
                description: "Supports coordination in organization processes and strengthens communication between teams."
            }
        }
    },

    "Organizasyon & Sponsorluk Ekibi": {
        key: "org",
        description:
            "Bu takım, etkinliklerin organizasyonunu, sponsorluk görüşmelerini ve genel koordinasyonu yürütür. Şirketlerle iletişim kurar, etkinlik planlamasını destekler ve topluluk büyümesine katkı sağlar.",
        captain: "Eylül Azra Karlıdağ & Tuğçe Yıldız",
        members: [
            "Eylül Azra Karlıdağ",
            "Tuğçe Yıldız",
            "Bünyamin Kartal",
            "Halide Sultan Gedikli"
        ],
        i18n: {
            en: {
                label: "Organization & Sponsorship Team",
                description: "This team handles event organization, sponsorship discussions, and general coordination. It communicates with companies, supports event planning, and contributes to community growth."
            }
        }
    },

    "Mobil Geliştirme Ekibi": {
        key: "mobile",
        description:
            "Topluluğun mobil projelerini geliştirir; Flutter / Android gibi teknolojilerle atölyeler ve projeler yürütür.",
        captain: "Ayşe Nur Kendirci",
        members: [
            "Ayşe Nur Kendirci",
            "Bilge Nur Kılıç",
            "Ayse Sarıkaya",
            "Ceren Var",
            "Yağmur Erol"
        ],
        i18n: {
            en: {
                label: "Mobile Development Team",
                description: "Develops the community's mobile projects and runs workshops and projects with technologies such as Flutter and Android."
            }
        }
    },

    "Web Geliştirme Ekibi": {
        key: "web",
        description:
            "Kulübün web projelerini ve web sitesini geliştirir, frontend/backend teknolojileri üzerine çalışır.",
        captain: "Dora Dikmen",
        members: [
            "Dora Dikmen",
            "Berat Aydın",
            "Murat Ateş",
            "Fatiha Sarmusakcı",
            "Ömer Can Ünlü",
            "Dilan Özmen"
        ],
        i18n: {
            en: {
                label: "Web Development Team",
                description: "Develops the club's web projects and website, and works on frontend/backend technologies."
            }
        }
    },
    "Oyun Geliştirme Ekibi": {
        key: "game",
        description:
            "Oyun geliştirme projeleri ve atölyeleri düzenler, Unity ve Unreal Engine gibi platformlarda çalışmalar yapar.",
        captain: "Ahmet Yunus Turna",
        members: [
            "Ahmet Yunus Turna",
            "Gökmen Kaya",
            "Ömer Yarar",
            "Ege Kılıç"
        ],
        i18n: {
            en: {
                label: "Game Development Team",
                description: "Organizes game development projects and workshops, and works on platforms such as Unity and Unreal Engine."
            }
        }
    },

    "Sosyal Medya & Tasarım Ekibi": {
        key: "social",
        description:
            "Sosyal medya içeriklerini, görsel tasarımları ve marka iletişimini yönetir. Etkinlik afişleri, postlar ve video içeriklerinden sorumludur.",
        captain: "Kerem Kalyoncu",
        members: [
            "Kerem Kalyoncu",
            "Yusuf Arda Ersoy",
            "Egemen Epli"
        ],
        i18n: {
            en: {
                label: "Social Media & Design Team",
                description: "Manages social media content, visual designs, and brand communication. Responsible for event posters, posts, and video content."
            }
        }
    }
};


// 2) CORE TEAM CARD DATA
/*
How to add a person to the Teams page:
1. Add the person to teamMembers.
2. teamKey must match one of the keys from the teams object above.
3. Cards are shown for organizers, assistants, and roles containing "kaptan".
4. The popup/modal groups people by teamKey and also uses the members list from teams.
5. Put real profile URLs in social, or keep "#" to disable that icon.
6. Turkish text stays in role/bio. English text goes inside i18n.en.

Template:
{
    name: "Yeni Uye",
    role: "Web Gelistirme Takim Kaptani",
    teamKey: "web",
    image: "assets/logo.png",
    bio: "Kartta gorunecek kisa kisi aciklamasi.",
    social: {
        linkedin: "https://www.linkedin.com/in/example/",
        instagram: "#",
        gmail: "mailto:example@gmail.com"
    },
    teamAbout: teams["Web Geliştirme Ekibi"].description,
    i18n: {
        en: {
            role: "Web Development Team Captain",
            bio: "Short English person description shown on the card."
        }
    }
}
*/
export const teamMembers = [
    // --- Organizer / Assistant ---

    {
        name: "Arda Tezbaşaran",
        role: "Organizatör",
        teamKey: "organizer",
        image: "assets/logo.png",
        bio: "GDG on Campus DOU'nun genel organizasyonundan ve topluluk vizyonunun yürütülmesinden sorumludur.",
        social: {
            linkedin: "https://www.linkedin.com/in/ardatezbasaran/",
            instagram: "https://www.instagram.com/ardatezbasaran/",
            gmail: "mailto:ardatezba@gmail.com"
        },
        teamAbout: teams["Organizatör"].description,
        i18n: {
            en: {
                role: "Organizer",
                bio: "Responsible for the overall organization of GDG on Campus DOU and the execution of the community vision."
            }
        }
    },
    {
        name: "Serra Özbey",
        role: "Asistan Organizatör",
        teamKey: "organizer",
        image: "assets/logo.png",
        bio: "Organizasyon süreçlerinde koordinasyona destek olur, ekipler arası iletişimi güçlendirir.",
        social: {
            linkedin: "https://www.linkedin.com/in/serra-%C3%B6zbey-178742258/",
            instagram: "https://www.instagram.com/serraozbeys/",
            gmail: "mailto:serraozbey04@gmail.com"
        },
        teamAbout: teams["Organizatör"].description,
        i18n: {
            en: {
                role: "Assistant Organizer",
                bio: "Supports coordination in organization processes and strengthens communication between teams."
            }
        }
    },

    // --- Social Media & Design ---

    {
        name: "Kerem Kalyoncu",
        role: "Sosyal Medya & Tasarım Takım Kaptanı",
        teamKey: "social",
        image: "assets/logo.png",
        bio: "Topluluğun sosyal medya içeriklerini ve görsel kimliğini yönetir.",
        social: {
            linkedin: "https://www.linkedin.com/in/kerem-kalyoncu/",
            instagram: "https://www.instagram.com/krm_kalyoncu/",
            gmail: "mailto:keremkalyoncu.dev@gmail.com"
        },
        teamAbout: teams["Sosyal Medya & Tasarım Ekibi"].description,
        i18n: {
            en: {
                role: "Social Media & Design Team Captain",
                bio: "Manages the community's social media content and visual identity."
            }
        }
    },
    {
        name: "Yusuf Arda Ersoy",
        role: "Sosyal Medya & Tasarım Ekibi",
        teamKey: "social",
        image: "assets/logo.png",
        bio: "Topluluğun sosyal medya içeriklerine ve görsel iletişimine destek olur.",
        social: {
            linkedin: "#",
            instagram: "#",
            gmail: "#"
        },
        teamAbout: teams["Sosyal Medya & Tasarım Ekibi"].description,
        i18n: {
            en: {
                role: "Social Media & Design Team",
                bio: "Supports the community's social media content and visual communication."
            }
        }
    },
    {
        name: "Egemen Epli",
        role: "Sosyal Medya & Tasarım Ekibi",
        teamKey: "social",
        image: "assets/logo.png",
        bio: "Sosyal medya çalışmalarında içerik ve tasarım üretimine katkı sağlar.",
        social: {
            linkedin: "#",
            instagram: "#",
            gmail: "#"
        },
        teamAbout: teams["Sosyal Medya & Tasarım Ekibi"].description,
        i18n: {
            en: {
                role: "Social Media & Design Team",
                bio: "Contributes to content and design production in social media work."
            }
        }
    },

    // --- Organization & Sponsorship ---

    {
        name: "Eylül Azra Karlıdağ",
        role: "Organizasyon & Sponsorluk Takım Kaptanı",
        teamKey: "org",
        image: "assets/logo.png",
        bio: "Şirketlerle iletişim kurar, etkinliklerin sahada sorunsuz ilerlemesini sağlar.",
        social: {
            linkedin: "https://www.linkedin.com/in/eyl%C3%BCl-azra-karl%C4%B1da%C4%9F-05685525b/",
            instagram: "https://www.instagram.com/_eylulazra_/",
            gmail: "mailto:eylul.azraa0@gmail.com"
        },
        teamAbout: teams["Organizasyon & Sponsorluk Ekibi"].description,
        i18n: {
            en: {
                role: "Organization & Sponsorship Team Captain",
                bio: "Communicates with companies and helps events run smoothly on site."
            }
        }
    },
    {
        name: "Tuğçe Yıldız",
        role: "Organizasyon & Sponsorluk Takım Kaptanı",
        teamKey: "org",
        image: "assets/logo.png",
        bio: "Organizasyon sürecinde ekip koordinasyonunu ve görev dağılımını destekler.",
        social: {
            linkedin: "https://www.linkedin.com/in/tu%C4%9F%C3%A7e-y%C4%B1ld%C4%B1z-a1801b359/",
            instagram: "https://www.instagram.com/tugceyyil/",
            gmail: "mailto:tugceyld002@gmail.com"
        },
        teamAbout: teams["Organizasyon & Sponsorluk Ekibi"].description,
        i18n: {
            en: {
                role: "Organization & Sponsorship Team Captain",
                bio: "Supports team coordination and task distribution during the organization process."
            }
        }
    },

    // --- Game Development ---

    {
        name: "Ahmet Yunus Turna",
        role: "Oyun Geliştirme Takım Kaptanı",
        teamKey: "game",
        image: "assets/logo.png",
        bio: "Oyun geliştirme etkinlikleri ve atölyelerinin koordinasyonundan sorumludur.",
        social: {
            linkedin: "https://www.linkedin.com/in/ahmetyunusturna/",
            instagram: "https://www.instagram.com/yunusturna/",
            gmail: "mailto:ahmetyunusturna@gmail.com"
        },
        teamAbout: teams["Oyun Geliştirme Ekibi"].description,
        i18n: {
            en: {
                role: "Game Development Team Captain",
                bio: "Responsible for coordinating game development events and workshops."
            }
        }
    },

    // --- Mobile Development ---

    {
        name: "Ayşe Nur Kendirci",
        role: "Mobil Geliştirme Takım Kaptanı",
        teamKey: "mobile",
        image: "assets/logo.png",
        bio: "Topluluğun mobil geliştirme projelerine liderlik eder, atölye ve eğitimler organize eder.",
        social: {
            linkedin: "https://www.linkedin.com/in/aysenurkendirci/",
            instagram: "https://www.instagram.com/aysenurkndrc/",
            gmail: "mailto:aysenurkendirciss@gmail.com"
        },
        teamAbout: teams["Mobil Geliştirme Ekibi"].description,
        i18n: {
            en: {
                role: "Mobile Development Team Captain",
                bio: "Leads the community's mobile development projects and organizes workshops and trainings."
            }
        }
    },

    // --- Web Development ---

    {
        name: "Dora Dikmen",
        role: "Web Geliştirme Takım Kaptanı",
        teamKey: "web",
        image: "assets/logo.png",
        bio: "Kulübün web projelerini ve web sitesini geliştirmekten sorumludur.",
        social: {
            linkedin: "https://www.linkedin.com/in/dora-dikmen-2944a72ba/",
            instagram: "https://www.instagram.com/doradikmen/",
            gmail: "mailto:doradikmen@gmail.com"
        },
        teamAbout: teams["Web Geliştirme Ekibi"].description,
        i18n: {
            en: {
                role: "Web Development Team Captain",
                bio: "Responsible for developing the club's web projects and website."
            }
        }
    },
    {
        name: "Berat Aydın",
        role: "Web Geliştirme Takım Kaptan Yardımcısı",
        teamKey: "web",
        image: "assets/logo.png",
        bio: "Kulübün web projelerinde geliştirici olarak görev alır.",
        social: {
            linkedin: "#",
            instagram: "#",
            gmail: "#"
        },
        teamAbout: teams["Web Geliştirme Ekibi"].description,
        i18n: {
            en: {
                role: "Web Development Co-Team Captain",
                bio: "Serves as a developer in the club's web projects."
            }
        }
    },
    {
        name: "Murat Ateş",
        role: "Web Geliştirme Ekibi",
        teamKey: "web",
        image: "assets/logo.png",
        bio: "Web geliştirme süreçlerinde teknik liderlik sağlar.",
        social: {
            linkedin: "#",
            instagram: "#",
            gmail: "#"
        },
        teamAbout: teams["Web Geliştirme Ekibi"].description,
        i18n: {
            en: {
                role: "Web Development Team",
                bio: "Provides technical leadership in web development processes."
            }
        }
    },
    {
        name: "Fatiha Sarmusakcı",
        role: "Web Geliştirme Ekibi",
        teamKey: "web",
        image: "assets/logo.png",
        bio: "Kulübün web projelerinde geliştirici olarak görev alır.",
        social: {
            linkedin: "#",
            instagram: "#",
            gmail: "#"
        },
        teamAbout: teams["Web Geliştirme Ekibi"].description,
        i18n: {
            en: {
                role: "Web Development Team",
                bio: "Serves as a developer in the club's web projects."
            }
        }
    },
    {
        name: "Ömer Can Ünlü",
        role: "Web Geliştirme Ekibi",
        teamKey: "web",
        image: "assets/logo.png",
        bio: "Kulübün web projelerinde geliştirici olarak görev alır.",
        social: {
            linkedin: "#",
            instagram: "#",
            gmail: "#"
        },
        teamAbout: teams["Web Geliştirme Ekibi"].description,
        i18n: {
            en: {
                role: "Web Development Team",
                bio: "Serves as a developer in the club's web projects."
            }
        }
    },
    {
        name: "Dilan Özmen",
        role: "Web Geliştirme Ekibi",
        teamKey: "web",
        image: "assets/logo.png",
        bio: "Kulübün web projelerinde geliştirici olarak görev alır.",
        social: {
            linkedin: "#",
            instagram: "#",
            gmail: "#"
        },
        teamAbout: teams["Web Geliştirme Ekibi"].description,
        i18n: {
            en: {
                role: "Web Development Team",
                bio: "Serves as a developer in the club's web projects."
            }
        }
    },
];
