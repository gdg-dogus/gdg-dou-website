// js/data/teamData.js

// 1) TEAMS DESCRIPTION & MEMBERS
export const teams = {

    "Organizer": {
        key: "organizer",
        description:
            "GDG on Campus Doğuş'un genel organizasyonundan ve topluluk vizyonunun yürütülmesinden sorumludur.",
        captain: "Arda Tezbaşaran",
        members: [
            "Arda Tezbaşaran"
        ]
    },

    "Assistant Organizer": {
        key: "assistant_organizer",
        description:
            "Organizasyon süreçlerinde koordinasyona destek olur, ekipler arası iletişimi güçlendirir.",
        captain: "Serra Özbey",
        members: [
            "Serra Özbey"
        ]
    },

    "Organization & Sponsorship Team": {
        key: "org",
        description:
            "Bu takım, etkinliklerin organizasyonunu, sponsorluk görüşmelerini ve genel koordinasyonu yürütür. Şirketlerle iletişim kurar, etkinlik planlamasını destekler ve topluluk büyümesine katkı sağlar.",
        captain: "Eylül Azra Karlıdağ & Tuğçe Yıldız",
        members: [
            "Eylül Azra Karlıdağ",
            "Tuğçe Yıldız"
        ]
    },

    "Mobile Development Team": {
        key: "mobile",
        description:
            "Topluluğun mobil projelerini geliştirir; Flutter / Android gibi teknolojilerle atölyeler ve projeler yürütür.",
        captain: "Batuhan Yavuz",
        members: [
            "Batuhan Yavuz"
        ]
    },

    "Web Development Team": {
        key: "web",
        description:
            "Kulübün web projelerini ve web sitesini geliştirir, frontend/backend teknolojileri üzerine çalışır.",
        captain: "Dora Dikmen",
        members: [
            "Dora Dikmen",
            "Murat Ateş",
            "Fatiha Sarmusakcı",
            "Ömer Can Ünlü",
            "Dilan Özmen",
            "Berat Aydın"
        ]
    },

    "Game Development Team": {
        key: "game",
        description:
            "Oyun geliştirme projeleri ve atölyeleri düzenler, Unity ve Unreal Engine gibi platformlarda çalışmalar yapar.",
        captain: "Yunus Turna",
        members: [
            "Yunus Turna"
        ]
    },

    "Social Media & Design Team": {
        key: "social",
        description:
            "Sosyal medya içeriklerini, görsel tasarımları ve marka iletişimini yönetir. Etkinlik afişleri, postlar ve video içeriklerinden sorumludur.",
        captain: "Kerem Kalyoncu",
        members: [
            "Kerem Kalyoncu"
        ]
    }
};


// 2) CORE TEAM CARD DATA
export const teamMembers = [
    // --- Organizer / Assistant ---

    {
        name: "Arda Tezbaşaran",
        role: "Organizer",
        teamKey: "organizer",
        image: "images/logo.png",
        bio: "GDG on Campus Doğuş’un genel organizasyonundan ve topluluk vizyonunun yürütülmesinden sorumludur.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Organizer"].description
    },
    {
        name: "Serra Özbey",
        role: "Assistant Organizer",
        teamKey: "assistant_organizer",
        image: "images/logo.png",
        bio: "Organizasyon süreçlerinde koordinasyona destek olur, ekipler arası iletişimi güçlendirir.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Assistant Organizer"].description
    },

    // --- Social Media & Design ---

    {
        name: "Kerem Kalyoncu",
        role: "Social Media & Design Team Lead",
        teamKey: "social",
        image: "images/logo.png",
        bio: "Topluluğun sosyal medya içeriklerini ve görsel kimliğini yönetir.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Social Media & Design Team"].description
    },

    // --- Organization & Sponsorship ---

    {
        name: "Eylül Azra Karlıdağ",
        role: "Organization & Sponsorship Team Lead",
        teamKey: "org",
        image: "images/logo.png",
        bio: "Şirketlerle iletişim kurar, etkinliklerin sahada sorunsuz ilerlemesini sağlar.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Organization & Sponsorship Team"].description
    },
    {
        name: "Tuğçe Yıldız",
        role: "Organization & Sponsorship Team Lead",
        teamKey: "org",
        image: "images/logo.png",
        bio: "Organizasyon sürecinde ekip koordinasyonunu ve görev dağılımını destekler.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Organization & Sponsorship Team"].description
    },

    // --- Game Development ---

    {
        name: "Yunus Turna",
        role: "Game Development Team Lead",
        teamKey: "game",
        image: "images/logo.png",
        bio: "Oyun geliştirme etkinlikleri ve atölyelerinin koordinasyonundan sorumludur.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Game Development Team"].description
    },

    // --- Mobile Development ---

    {
        name: "Batuhan Yavuz",
        role: "Mobile Development Team Lead",
        teamKey: "mobile",
        image: "images/logo.png",
        bio: "Topluluğun mobil geliştirme projelerine liderlik eder, atölye ve eğitimler organize eder.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Mobile Development Team"].description
    },

    // --- Web Development ---

    {
        name: "Dora Dikmen",
        role: "Web Development Team Lead",
        teamKey: "web",
        image: "images/logo.png",
        bio: "Kulübün web projelerini ve web sitesini geliştirmekten sorumludur.",
        social: {
            linkedin: "https://www.linkedin.com/in/dora-dikmen-2944a72ba/",
            instagram: "https://www.instagram.com/",
            github: "https://github.com/doradikmen"
        },
        teamAbout: teams["Web Development Team"].description
    },
    {
        name: "Murat Ateş",
        role: "Web Development Team",
        teamKey: "web",
        image: "images/logo.png",
        bio: "Web geliştirme süreçlerinde teknik liderlik sağlar.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Web Development Team"].description
    },
    {
        name: "Fatiha Sarmusakcı",
        role: "Web Development Team",
        teamKey: "web",
        image: "images/logo.png",
        bio: "Kulübün web projelerinde geliştirici olarak görev alır.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Web Development Team"].description
    },
    {
        name: "Ömer Can Ünlü",
        role: "Web Development Team",
        teamKey: "web",
        image: "images/logo.png",
        bio: "Kulübün web projelerinde geliştirici olarak görev alır.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Web Development Team"].description
    },
    {
        name: "Dilan Özmen",
        role: "Web Development Team",
        teamKey: "web",
        image: "images/logo.png",
        bio: "Kulübün web projelerinde geliştirici olarak görev alır.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Web Development Team"].description
    },
    {
        name: "Berat Aydın",
        role: "Web Development Team",
        teamKey: "web",
        image: "images/logo.png",
        bio: "Kulübün web projelerinde geliştirici olarak görev alır.",
        social: {
            linkedin: "#",
            instagram: "#",
            github: "#"
        },
        teamAbout: teams["Web Development Team"].description
    }
];
