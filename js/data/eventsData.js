export const events = [
    {
        id: "1",
        slug: "ai-leaders-summit-2025",
        title: "AI Leaders Summit",
        shortTitle: "AI Leaders Summit",
        date: "2025-05-28",
        time: "13:00",
        location: "Doğuş Üniversitesi, B2-02",
        description:
            "Yapay zekayı yalnızca bir araç değil, bir dönüşüm gücü olarak gören liderlerin buluştuğu zirve. Yapay zekanın geleceğini yazan liderlerle aynı sahnede buluşma fırsatı.",
        details: [
            "Yapay zekanın iş dünyasındaki dönüşüm gücü",
            "Geleceğe yönelik yapay zeka vizyonları ve stratejileri",
            "İlham verici kariyer hikayeleri ve networking fırsatları"
        ],
        category: "summit",
        spots: 200,
        registered: 180,
        speakers: [
            "Deger Ayata, PhD",
            "Rojdan Ozan Kozan",
            "Melik Vatan"
        ],
        sponsors: ["ENZYM Cosmetics", "Miuul", "Webmasto", "Porty Tech"],
        organizer: "GDG On Campus Doğuş",
        image: "assets/events/ai-leaders-summit-2025.jpeg",
        tags: ["ai", "machine_learning", "future", "career", "networking"]
    },
    {
        id: "2",
        slug: "info-session-2025-fall",
        title: "GDG on Campus Doğuş Info Session",
        shortTitle: "Info Session",
        date: "2025-10-17",
        time: "13:00",
        location: "Doğuş Üniversitesi, Z-25 ",
        description:
            "Dönemin ilk etkinliğiyle kulübümüzü tanıttığımız, yeni üyelerle tanıştığımız ve birlikte akran öğrenmesi yaptığımız tanışma oturumu.",
        details: [
            "GDG on Campus Doğuş’un vizyonu ve faaliyet alanları",
            "Ekip yapısı ve katılım yolları",
            "Akran öğrenmesi ve topluluk kültürü"
        ],
        category: "info_session",
        spots: 80,
        registered: 65,
        organizer: "GDG On Campus Doğuş",
        image: "assets/events/info-session-2025-fall.jpeg",
        tags: ["intro", "community", "networking", "new_members"]
    },
    {
        id: "3",
        slug: "gdg-techverse-2025",
        title: "GDG TechVerse 2025: Büyük Ölçekli Sistemler ve Mobil Teknolojiler",
        shortTitle: "GDG TechVerse 2025",
        date: "2025-11-18",
        time: "13:00",
        location: "Doğuş Üniversitesi, B2-02",
        description:
            "Hepsiburada Yazılım Geliştirme Birim Başkanı Ufuk Serdoğan ve Akbank Mobil Geliştirme Mimarı Muhittin Kuluöztürk ile büyük ölçekli sistem mimarileri, yüksek trafik yönetimi ve mobil teknolojilerdeki en güncel trendleri konuştuğumuz oturum.",
        details: [
            "Büyük e-ticaret ve finans sistemlerinin teknik zorlukları",
            "Milyonlarca kullanıcıya hizmet veren uygulamaların geliştirme süreçleri",
            "Sektörde fark yaratmak için gereken yetkinlikler ve kariyer öngörüleri"
        ],
        category: "tech_talk",
        spots: 150,
        registered: 120,
        speakers: [
            "Ufuk Serdoğan (Hepsiburada Yazılım Geliştirme Birim Başkanı)",
            "Muhittin Kuluöztürk (Akbank Mobil Geliştirme Mimarı)"
        ],
        organizer: "GDG On Campus Doğuş",
        image: "assets/events/gdg-techverse-2025.jpeg",
        tags: ["web", "backend", "mobil", "scale", "career"]
    },

    // --- PLACEHOLDER EVENTS ---

    {
        id: "4",
        slug: "frontend-bootcamp-2026",
        title: "Frontend 101: HTML, CSS ve JavaScript Bootcamp",
        shortTitle: "Frontend 101 Bootcamp",
        date: "2026-03-10",
        time: "10:00",
        location: "Doğuş Üniversitesi, Lab-1 (TBD)",
        description:
            "Frontend geliştirmeye giriş yapmak isteyenler için yoğunlaştırılmış bir gün: HTML yapısı, modern CSS stilleri ve temel JavaScript mantığı.",
        details: [
            "HTML ile temel sayfa iskeleti oluşturma",
            "Modern CSS ile responsive tasarım",
            "JavaScript ile etkileşimli komponentler"
        ],
        category: "workshop",
        spots: 40,
        registered: 0, // placeholder
        organizer: "GDG On Campus Doğuş - Web Development Team",
        //image: "assets/events/frontend-bootcamp-placeholder.jpg",
        image: "assets/events/info-session-2025-fall.jpeg",
        tags: ["frontend", "html", "css", "javascript", "beginner"]
    },
    {
        id: "5",
        slug: "cloud-study-jam-2026",
        title: "Cloud Study Jam: Google Cloud Fundamentals",
        shortTitle: "Cloud Study Jam",
        date: "2026-04-05",
        time: "12:00",
        location: "Doğuş Üniversitesi, B Blok (TBD)",
        description:
            "Google Cloud Platform temellerini elden geçirip birlikte lab’ler yapacağımız uygulamalı bir study jam.",
        details: [
            "Bulut bilişim temel kavramları",
            "Google Cloud üzerinde temel servisler",
            "Hands-on lab ile pratik deneyim"
        ],
        category: "study_jam",
        spots: 60,
        registered: 0, // placeholder
        organizer: "GDG On Campus Doğuş",
        //image: "assets/events/cloud-study-jam-placeholder.jpg",
        image: "assets/events/info-session-2025-fall.jpeg",
        tags: ["cloud", "gcp", "devops", "infrastructure"]
    },
    {
        id: "6",
        slug: "design-sprint-2026",
        title: "Design Sprint: Fikirden Prototipe",
        shortTitle: "Design Sprint",
        date: "2026-05-02",
        time: "11:00",
        location: "Doğuş Üniversitesi, Tasarım Atölyesi (TBD)",
        description:
            "Ürün fikrini bir gün içinde kullanıcı odaklı prototipe dönüştürmek için hızlı ilerleyen bir design sprint.",
        details: [
            "Problemi tanımlama ve kullanıcıyı anlama",
            "Çözüm fikirleri üretme ve önceliklendirme",
            "Hızlı prototipleme ve geri bildirim toplama"
        ],
        category: "design",
        spots: 35,
        registered: 0, // placeholder
        organizer: "GDG On Campus Doğuş - Social Media & Design Team",
        //image: "assets/events/design-sprint-placeholder.jpg",
        image: "assets/events/info-session-2025-fall.jpeg",
        tags: ["uiux", "design", "prototype", "product"]
    }
];