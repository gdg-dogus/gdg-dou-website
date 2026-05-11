/*
How to update static bilingual text:
1. Static page labels, headings, placeholders, button text, and shared UI copy live here.
2. Keep the same key path in both tr and en. Example: common.nav.events must exist in both languages.
3. Turkish is the fallback language. Do not remove Turkish keys when adding English copy.
4. If a data file uses a labelKey, add that key under translations.tr and translations.en.
5. For regular content additions, prefer the comments in the relevant data file first:
   eventsData.js, blogData.js, offersData.js, teamData.js.

Tiny example:
tr: { example: { label: "Yeni Metin" } }
en: { example: { label: "New Text" } }
Then HTML can use: data-i18n="example.label"
*/
export const DEFAULT_LANGUAGE = "tr";
export const SUPPORTED_LANGUAGES = ["tr", "en"];

export const translations = {
    tr: {
        meta: {
            homeTitle: "GDG on Campus DOU",
            aboutTitle: "Hakkımızda - GDG on Campus DOU",
            aboutDescription: "GDG on Campus DOU topluluğu, ekipleri, etkinlikleri ve öğrencilere sunduğu deneyimler hakkında bilgi alın.",
            eventsTitle: "Events - GDG on Campus DOU",
            teamsTitle: "Ekip Sayfası - GDG on Campus DOU",
            blogTitle: "Blog - GDG on Campus DOU",
            blogDescription: "Teknoloji, yazılım geliştirme ve Google teknolojileri hakkında blog yazıları.",
            offersTitle: "Student Offers - GDG on Campus DOU",
            offersDescription: "Curated perks and free tools for students."
        },
        common: {
            nav: {
                events: "Etkinlikler",
                teams: "Takımlar",
                blog: "Blog",
                offers: "Öğrenci Teklifleri",
                join: "GDG'ye Katıl"
            },
            actions: {
                switchToEnglish: "Switch to English",
                switchToTurkish: "Türkçeye geç",
                toggleTheme: "Renk temasını değiştir",
                closeEventModal: "Close event modal",
                closeModal: "Close modal",
                close: "Close"
            },
            footer: {
                description: "Google teknolojilerine, yazılım geliştirmeye ve birlikte üretmeye ilgi duyan Doğuş Üniversitesi öğrencilerinin teknoloji topluluğu.",
                quickLinks: "Hızlı Bağlantılar",
                home: "Ana Sayfa",
                about: "Hakkımızda",
                contact: "Bize Ulaşın",
                socialPrompt: "Sosyal Medya Hesaplarımızı Takip edin",
                location: "Konum",
                mapTitle: "Doğuş Üniversitesi Dudullu Kampüsü haritası",
                address: "Dudullu Osb Mah. Nato Yolu Cad. 265/1, 34775 Ümraniye / İstanbul",
                brandCopyright: "© 2025 GDG on Campus DOU",
                programSuffix: ". Google Developer Groups programının bir parçasıdır.",
                bottom: "© 2025 GDG on Campus DOU. Google Developer Groups programının bir parçasıdır."
            }
        },
        buildersModal: {
            badge: "Orijinal Geliştiriciler",
            title: "2025-2026 GDG DOU Web Ekibi tarafından sevgiyle geliştirildi",
            subtitle: "Bu GDG on Campus DOU web sitesinin arkasındaki ilk web ekibi.",
            membersLabel: "Orijinal web sitesi geliştiricileri",
            socialProfile: "{name} {network} profili",
            socialUnavailable: "{name} {network} bağlantısı henüz eklenmedi",
            roles: {
                lead: "Web Development Team Lead",
                coCaptain: "Web Development Co-Team Captain",
                member: "Web Development Team Member"
            }
        },
        home: {
            heroSubtitle: "Geliştiriciler, tasarımcılar ve teknoloji meraklılarından oluşan topluluğumuza siz de katılın!",
            heroDescription: "Google teknolojilerini kullanarak öğrenin, üretin ve inove edin. ",
            joinButton: "GDG'ye Katıl",
            upcomingButton: "Yaklaşan Etkinlikler",
            statsEyebrow: "Sayılarımız",
            statsTitleHtml: "Topluluk <span class=\"text-gradient\">İstatistikleri</span>",
            whoTitle: "Biz Kimiz?",
            whoSubtitle: "GDG on Campus DOU; teknolojiye meraklı öğrencilerin bir araya gelip öğrendiği, paylaştığı ve birlikte ürettiği bir topluluktur.",
            featureLearningTitle: "Öğrenme & Paylaşım",
            featureLearningText: "Workshoplar, söyleşiler ve sunumlarla birlikte öğrenir; deneyimlerimizi paylaşarak birbirimize ilham veririz.",
            featureEventsTitle: "Etkinlikler & Konuklar",
            featureEventsText: "Konuşmalar ve networking etkinlikleriyle sektör profesyonelleriyle bir araya gelir, kariyer yolculuğumuzu güçlendiririz.",
            featureTeamsTitle: "Üretim Odaklı Takımlar",
            featureTeamsText: "Web, mobil ve oyun ekiplerimizle dönem boyunca projeler geliştirir; Workshoplar ve demo’larla üretim becerilerimizi geliştiririz.",
            upcomingTitle: "Gelecek Etkinlikler",
            upcomingSubtitle: "Heyecan verici gelecek etkinliklerimizi kaçırmayın",
            viewAllEventsMeta: "Tüm etkinliklerimizi görüntüle",
            viewAllEvents: "Tüm Etkinliklere Göz At",
            tracksTitle: "İlgili Olduğunuz Takımı Seçin",
            tracksSubtitle: "Çekirdek ekiplerimiz, dönem boyunca gerçek projeler üzerinde birlikte çalışır. İlgi alanını seç, ekibe katıl ve birlikte üret.",
            tracksFootnote: "Üretim odaklı, ekip çalışmasına dayalı ve sürdürülebilir proje geliştirme deneyimi.",
            blogTitle: "En Yeni Bloglarımız",
            blogSubtitle: "Topluluğumuzdan gelen haberler, eğitimler ve güncellemeler",
            viewAllBlogs: "Tüm Bloglara Göz At",
            newsletterTitle: "WhatsApp Kanalımıza Katılın",
            newsletterText: "Etkinlik duyuruları, kaynaklar ve topluluk haberleri için WhatsApp kanalımızda bizimle kalın.",
            newsletterLabel: "WhatsApp kanalına katıl",
            newsletterButton: "Kanala Katıl",
            newsletterSaved: "Katıldınız!",
            newsletterMeta: "Spam yok, gereksiz kalabalık yok; sadece GDG on Campus DOU gelişmeleri.",
            newsletterIllustration: "Workshop duyuruları • Teknik gezi detayları • Topluluk fırsatları",
            socialsTitle: "Sosyal Medya",
            socialsSubtitle: "Topluluğumuzla bağlantıda kalın ve yeniliklerden haberdar olun",
            floatingEyebrow: "Bizimle inşa etmeye hazır mısın?",
            floatingHeadline: "GDG on Campus DOU Ailesinin bir parçası ol",
            floatingButton: "Şimdi Katılın",
            emptyEvents: "Yaklaşan etkinliklerimizin son hazırlıklarını tamamlıyoruz. Yakında tekrar kontrol edin!",
            happeningNow: "Happening now!"
        },
        about: {
            eyebrow: "GDG on Campus DOU",
            titleHtml: "<span class=\"text-gradient\">Hakkımızda</span>",
            subtitle: "Doğuş Üniversitesi'nde Google teknolojilerine, yazılım geliştirmeye ve birlikte üretmeye ilgi duyan öğrencileri bir araya getiren teknoloji topluluğuyuz.",
            highlightsLabel: "Topluluk odakları",
            highlightTeams: "Öğrenci ekipleri",
            highlightProjects: "Proje üretimi",
            highlightEvents: "Teknoloji Etkinlikleri",
            introEyebrow: "Biz Kimiz?",
            introTitle: "Öğrenen, paylaşan ve birlikte geliştiren bir öğrenci topluluğu.",
            introText: "GDG on Campus DOU; workshoplar, teknoloji konuşmaları, çalışma grupları ve proje ekipleriyle öğrencilerin teknik becerilerini geliştirmesine destek olur. Amacımız, kampüs içinde sürdürülebilir bir öğrenme kültürü oluşturmak ve öğrencileri teknoloji ekosistemiyle buluşturmaktır.",
            cardLearningTitle: "Öğrenme & Paylaşım",
            cardLearningText: "Atölyeler, sunumlar ve akran öğrenmesiyle bilgiyi birlikte üretir ve paylaşırız.",
            cardCommunityTitle: "Topluluk & Networking",
            cardCommunityText: "Etkinliklerde öğrencileri, mezunları ve sektör profesyonellerini aynı ortamda buluştururuz.",
            cardProjectsTitle: "Proje Odaklı Ekipler",
            cardProjectsText: "Web, mobil, oyun, tasarım, organizasyon ve sponsorluk ekipleriyle dönem boyunca üretiriz.",
            statMembers: "Aktif Üye",
            statEvents: "Etkinlik",
            statProjects: "Yıl",
            statWorkshops: "Takım",
            workEyebrow: "Neler Yapıyoruz?",
            workTitle: "Etkinliklerden ekip çalışmalarına kadar üretim odaklı bir deneyim sunuyoruz.",
            workAi: "Yapay zeka, web, mobil, bulut ve kariyer odaklı etkinlikler düzenliyoruz.",
            workTeams: "Organizasyon, web, mobil, oyun, sosyal medya ve tasarım ekipleriyle çalışıyoruz.",
            workResources: "Öğrencilere özel kaynakları, fırsatları ve üretim deneyimlerini toplulukla paylaşıyoruz.",
            ctaTitle: "Topluluğun bir parçası olun.",
            ctaText: "Etkinlikleri takip edin, ekiplerle tanışın ve GDG on Campus DOU'da birlikte üretmeye başlayın.",
            ctaEvents: "Etkinlikleri Gör",
            ctaTeams: "Ekipleri Tanı"
        },
        eventsPage: {
            eyebrow: "Keşfet & Bağlan",
            titleHtml: "<span class=\"text-gradient\">Etkinliklerimiz</span>",
            subtitle: "Atölye çalışmalarımıza, teknoloji konuşmalarımıza, çalışma gruplarımıza ve daha fazlasına katılın. Toplulukla bağlantı kurun ve becerilerinizi geliştirin.",
            filters: {
                all: "Tüm Etkinlikler",
                summit: "Zirve",
                workshop: "Atölye",
                trip: "Gezi",
                techTalk: "Teknoloji Konuşması",
                infoSession: "Bilgilendirme Oturumu",
                upcoming: "Yaklaşan",
                past: "Geçmiş"
            },
            emptyTitle: "Etkinlik bulunamadı",
            emptyText: "Filtrelerinize uygun etkinlik bulunmuyor. Farklı bir kategori deneyin veya daha sonra tekrar kontrol edin.",
            loadMore: "Daha Fazla Etkinlik Göster",
            ctaTitle: "Hiçbir Etkinliği Kaçırma",
            ctaText: "Yaklaşan etkinliklerden haberdar olmak ve ilk kaydolan olmak için topluluğumuza katılın.",
            ctaButton: "Topluluğa Katıl",
            category: {
                summit: "Zirve",
                tech_talk: "Teknoloji Konuşması",
                workshop: "Atölye",
                trip: "Gezi",
                info_session: "Bilgilendirme Oturumu",
                design: "Tasarım"
            },
            spotsLeft: "{count} kişilik yer kaldı",
            full: "Dolu",
            register: "Kayıt Ol",
            completed: "Tamamlandı",
            tempImageTitle: "Geçici Etkinlik Resmi",
            tempImageText: "Etkinlik tanıtım resmi burada gösterilecek",
            descriptionTitle: "Etkinlik Açıklaması",
            speakersTitle: "Konuşmacılar",
            organizerTitle: "Organizatör",
            locationTitle: "Konum",
            mapTitle: "Etkinlik konumu haritası",
            learnTitle: "Neler Öğreneceksiniz",
            defaultLearn1: "İnteraktif {category} oturumu",
            defaultLearn2: "Uygulamalı öğrenme deneyimi",
            defaultLearn3: "Konuşmacıyla soru-cevap",
            defaultLearn4: "Networking fırsatları",
            timeTitle: "Etkinlik Zamanı",
            dayLabel: "Gün",
            startLabel: "Başlangıç",
            endLabel: "Bitiş",
            timeUnavailable: "Belirtilmedi",
            requirementsTitle: "Gereksinimler",
            defaultRequirements: "Önceden deneyim gerekmiyor - tüm seviyelere uygundur!",
            registrationTitle: "Kayıt Detayları",
            registered: "Kayıtlı",
            totalCapacity: "Toplam Kapasite",
            remaining: "Kalan Yer",
            registerNow: "Şimdi Kayıt Ol",
            waitlist: "Bekleme Listesine Katıl",
            applicationsClosed: "Başvurular Kapalı",
            eventCompleted: "Etkinlik Tamamlandı",
            registrationNoteUpcoming: "Kayıt ücretsizdir! Kayıt olduktan sonra onay e-postası alacaksınız.",
            registrationNoteClosed: "Bu etkinlik için başvurular şu anda kapalıdır.",
            registrationNotePast: "Bu etkinlik sona ermiştir."
        },
        teamsPage: {
            eyebrow: "Topluluğumuzu Güçlendiren Kadro",
            title: "Ekibimizle Tanışın",
            subtitle: "Organizasyon, geliştirme, tasarım ve iletişim ekibimiz bir araya gelerek GDG on Campus DOU deneyimini oluşturuyor.",
            socialLinks: "{name} sosyal bağlantıları",
            socialProfile: "{name} {network} profili",
            captainFallback: "Takım Kaptanı",
            modalSubtitle: "Takım Üyeleri ve Sorumlulukları",
            aboutTitle: "Takım Hakkında",
            memberRole: "Takım Üyesi"
        },
        blogPage: {
            eyebrow: "GDG on Campus DOU Blog",
            titleHtml: "<span class=\"text-gradient\">Teknoloji Dünyasından</span> Haberler ve Rehberler",
            subtitle: "Google teknolojileri, yazılım geliştirme, yapay zeka ve daha fazlası hakkında öğrenci topluluğumuz tarafından hazırlanan içerikler.",
            searchPlaceholder: "Blog yazılarında ara...",
            filters: {
                all: "Tümü",
                medium: "Medium",
                local: "Blog",
                events: "Etkinlikler",
                development: "Geliştirme",
                ai: "Yapay Zeka",
                web: "Web",
                cloud: "Cloud"
            },
            mediumCta: "Medium'da Tüm Yazıları Gör",
            modalCategory: "Kategori",
            modalTitle: "Blog Başlığı",
            modalAuthor: "Yazar",
            modalDate: "Tarih",
            modalReadTime: "Okuma süresi",
            share: "Paylaş:",
            shareX: "X'te paylaş",
            shareLinkedin: "LinkedIn'de paylaş",
            copyLink: "Linki kopyala",
            readOnMedium: "Medium'da Oku",
            loadingMedium: "Medium yazıları yükleniyor...",
            empty: "Bu kriterlere uygun blog yazısı bulunamadı.",
            readArticle: "Yazıyı Oku",
            untitled: "Başlıksız",
            minuteSuffix: "dk"
        },
        offersPage: {
            eyebrow: "Öğrencilere Özel Teklifler",
            titleHtml: "<span class=\"text-gradient\">Öğrenci Olmanın</span> Faydalarını Keşfedin",
            subtitle: "Öğrenci olarak ücretsiz edinebileceğiniz tekliflerden yararlanmanız için, size sunulan en iyi ücretsiz araç, yazılım ve kaynakları derlediğimiz bir koleksiyon.",
            searchPlaceholder: "Teklifleri Arayın...",
            filters: {
                all: "Tümü",
                developerTools: "Geliştirici Araçları",
                productivity: "Verimlilik",
                design: "Tasarım",
                cloud: "Bulut",
                lifestyle: "Yaşam Tarzı"
            },
            modalLogoAlt: "Brand Logo",
            modalTitle: "Offer Title",
            modalCategory: "Category",
            modalDescription: "Description goes here...",
            howToClaim: "Tekliften Nasıl Yararlanabilirim?",
            claimButton: "Bu Tekliften Yararlanın",
            empty: "Bu kriterlere uygun teklif bulunamadı.",
            viewOffer: "Teklifi Görüntüle"
        },
        data: {
            stats: {
                activeMembers: "Aktif Üye",
                eventsHeld: "Gerçekleşen Etkinlik",
                projectsBuilt: "Yıl",
                workshops: "Takım"
            },
            focusTracks: {
                webMobile: {
                    title: "Web & Mobil Geliştiriciliği",
                    description: "Modern web ve mobil uygulama geliştirme teknolojileri ile projeler oluşturun.",
                    level: "Her Seviye",
                    duration: "Dönem Boyu"
                },
                gameDev: {
                    title: "Oyun Geliştiriciliği",
                    description: "Unity ve diğer oyun motorları ile yaratıcı oyun projeleri geliştirin.",
                    level: "Her Seviye",
                    duration: "Dönem Boyu"
                },
                design: {
                    title: "Tasarım & Sosyal Medya",
                    description: "Dijital tasarım ve sosyal medya stratejileri ile topluluk etkileşimini artırın.",
                    level: "Her Seviye",
                    duration: "Dönem Boyu"
                }
            }
        }
    },
    en: {
        meta: {
            homeTitle: "GDG on Campus DOU",
            aboutTitle: "About - GDG on Campus DOU",
            aboutDescription: "Learn about the GDG on Campus DOU community, teams, events, and the experiences it offers students.",
            eventsTitle: "Events - GDG on Campus DOU",
            teamsTitle: "Team Page - GDG on Campus DOU",
            blogTitle: "Blog - GDG on Campus DOU",
            blogDescription: "Blog posts about technology, software development, and Google technologies.",
            offersTitle: "Student Offers - GDG on Campus DOU",
            offersDescription: "Curated perks and free tools for students."
        },
        common: {
            nav: {
                events: "Events",
                teams: "Teams",
                blog: "Blog",
                offers: "Student Offers",
                join: "Join GDG"
            },
            actions: {
                switchToEnglish: "Switch to English",
                switchToTurkish: "Switch to Turkish",
                toggleTheme: "Toggle color scheme",
                closeEventModal: "Close event modal",
                closeModal: "Close modal",
                close: "Close"
            },
            footer: {
                description: "The technology community of Dogus University students interested in Google technologies, software development, and building together.",
                quickLinks: "Quick Links",
                home: "Home",
                about: "About",
                contact: "Contact Us",
                socialPrompt: "Follow our social media accounts",
                location: "Location",
                mapTitle: "Dogus University Dudullu Campus map",
                address: "Dudullu Osb Mah. Nato Yolu Cad. 265/1, 34775 Umraniye / Istanbul",
                brandCopyright: "© 2025 GDG on Campus DOU",
                programSuffix: ". Part of the Google Developer Groups program.",
                bottom: "© 2025 GDG on Campus DOU. Part of the Google Developer Groups program."
            }
        },
        buildersModal: {
            badge: "Original Builders",
            title: "Built with love by the 2025-2026 GDG DOU Web Team",
            subtitle: "The first web team behind this GDG on Campus DOU website.",
            membersLabel: "Original website builders",
            socialProfile: "{name} {network} profile",
            socialUnavailable: "{name} {network} link has not been added yet",
            roles: {
                lead: "Web Development Team Lead",
                coCaptain: "Web Development Co-Team Captain",
                member: "Web Development Team Member"
            }
        },
        home: {
            heroSubtitle: "Join our community of developers, designers, and technology enthusiasts!",
            heroDescription: "Learn, build, and innovate with Google technologies. ",
            joinButton: "Join GDG",
            upcomingButton: "Upcoming Events",
            statsEyebrow: "Our Numbers",
            statsTitleHtml: "Community <span class=\"text-gradient\">Statistics</span>",
            whoTitle: "Who Are We?",
            whoSubtitle: "GDG on Campus DOU is a community where students interested in technology come together to learn, share, and build together.",
            featureLearningTitle: "Learning & Sharing",
            featureLearningText: "We learn together through workshops, talks, and presentations, and inspire each other by sharing our experiences.",
            featureEventsTitle: "Events & Guests",
            featureEventsText: "Through talks and networking events, we meet industry professionals and strengthen our career journeys.",
            featureTeamsTitle: "Build-Focused Teams",
            featureTeamsText: "With our web, mobile, and game teams, we develop projects throughout the semester and improve our production skills through workshops and demos.",
            upcomingTitle: "Upcoming Events",
            upcomingSubtitle: "Do not miss our exciting upcoming events",
            viewAllEventsMeta: "View all our events",
            viewAllEvents: "Browse All Events",
            tracksTitle: "Choose the Team You Are Interested In",
            tracksSubtitle: "Our core teams work together on real projects throughout the semester. Choose your interest area, join a team, and build together.",
            tracksFootnote: "A build-focused, team-based, and sustainable project development experience.",
            blogTitle: "Our Latest Blogs",
            blogSubtitle: "News, tutorials, and updates from our community",
            viewAllBlogs: "Browse All Blogs",
            newsletterTitle: "Join Our WhatsApp Channel",
            newsletterText: "Stay close to event announcements, resources, and community updates through our WhatsApp channel.",
            newsletterLabel: "Join the WhatsApp channel",
            newsletterButton: "Join Channel",
            newsletterSaved: "Joined!",
            newsletterMeta: "No spam, no noise. Only updates from GDG on Campus DOU.",
            newsletterIllustration: "Workshop announcements • Technical trip details • Community opportunities",
            socialsTitle: "Social Media",
            socialsSubtitle: "Stay connected with our community and be the first to know about updates",
            floatingEyebrow: "Ready to build with us?",
            floatingHeadline: "Become part of the GDG on Campus DOU family",
            floatingButton: "Join Now",
            emptyEvents: "We're finalizing our next round of events. Check back soon!",
            happeningNow: "Happening now!"
        },
        about: {
            eyebrow: "GDG on Campus DOU",
            titleHtml: "<span class=\"text-gradient\">About Us</span>",
            subtitle: "We are a technology community at Dogus University that brings together students interested in Google technologies, software development, and building together.",
            highlightsLabel: "Community focus areas",
            highlightTeams: "Student teams",
            highlightProjects: "Project building",
            highlightEvents: "Technology Events",
            introEyebrow: "Who Are We?",
            introTitle: "A student community that learns, shares, and develops together.",
            introText: "GDG on Campus DOU supports students in improving their technical skills through workshops, technology talks, study groups, and project teams. Our goal is to build a sustainable learning culture on campus and connect students with the technology ecosystem.",
            cardLearningTitle: "Learning & Sharing",
            cardLearningText: "We create and share knowledge together through workshops, presentations, and peer learning.",
            cardCommunityTitle: "Community & Networking",
            cardCommunityText: "We bring students, alumni, and industry professionals together in the same environment at events.",
            cardProjectsTitle: "Project-Focused Teams",
            cardProjectsText: "We build throughout the semester with web, mobile, game, design, organization, and sponsorship teams.",
            statMembers: "Active Members",
            statEvents: "Events",
            statProjects: "Years",
            statWorkshops: "Teams",
            workEyebrow: "What Do We Do?",
            workTitle: "We offer a build-focused experience from events to team projects.",
            workAi: "We organize events focused on artificial intelligence, web, mobile, cloud, and careers.",
            workTeams: "We work with organization, web, mobile, game, social media, and design teams.",
            workResources: "We share student-focused resources, opportunities, and building experiences with the community.",
            ctaTitle: "Become part of the community.",
            ctaText: "Follow events, meet the teams, and start building together at GDG on Campus DOU.",
            ctaEvents: "View Events",
            ctaTeams: "Meet the Teams"
        },
        eventsPage: {
            eyebrow: "Explore & Connect",
            titleHtml: "<span class=\"text-gradient\">Our Events</span>",
            subtitle: "Join our workshops, technology talks, study groups, and more. Connect with the community and improve your skills.",
            filters: {
                all: "All Events",
                summit: "Summit",
                workshop: "Workshop",
                trip: "Trip",
                techTalk: "Tech Talk",
                infoSession: "Info Session",
                upcoming: "Upcoming",
                past: "Past"
            },
            emptyTitle: "No events found",
            emptyText: "No events match your filters. Try another category or check back later.",
            loadMore: "Show More Events",
            ctaTitle: "Do Not Miss Any Event",
            ctaText: "Join our community to hear about upcoming events and be among the first to register.",
            ctaButton: "Join the Community",
            category: {
                summit: "Summit",
                tech_talk: "Tech Talk",
                workshop: "Workshop",
                trip: "Trip",
                info_session: "Info Session",
                design: "Design"
            },
            spotsLeft: "{count} spots left",
            full: "Full",
            register: "Register",
            completed: "Completed",
            tempImageTitle: "Temporary Event Image",
            tempImageText: "The event promotional image will be shown here",
            descriptionTitle: "Event Description",
            speakersTitle: "Speakers",
            organizerTitle: "Organizer",
            locationTitle: "Location",
            mapTitle: "Event location map",
            learnTitle: "What You Will Learn",
            defaultLearn1: "Interactive {category} session",
            defaultLearn2: "Hands-on learning experience",
            defaultLearn3: "Q&A with the speaker",
            defaultLearn4: "Networking opportunities",
            timeTitle: "Event Time",
            dayLabel: "Day",
            startLabel: "Starts",
            endLabel: "Ends",
            timeUnavailable: "Not specified",
            requirementsTitle: "Requirements",
            defaultRequirements: "No prior experience required - suitable for all levels!",
            registrationTitle: "Registration Details",
            registered: "Registered",
            totalCapacity: "Total Capacity",
            remaining: "Spots Left",
            registerNow: "Register Now",
            waitlist: "Join Waitlist",
            applicationsClosed: "Applications Closed",
            eventCompleted: "Event Completed",
            registrationNoteUpcoming: "Registration is free! You will receive a confirmation email after registering.",
            registrationNoteClosed: "Applications for this event are currently closed.",
            registrationNotePast: "This event has ended."
        },
        teamsPage: {
            eyebrow: "The Team Powering Our Community",
            title: "Meet Our Team",
            subtitle: "Our organization, development, design, and communications teams come together to create the GDG on Campus DOU experience.",
            socialLinks: "{name} social links",
            socialProfile: "{name} {network} profile",
            captainFallback: "Team Captain",
            modalSubtitle: "Team Members and Responsibilities",
            aboutTitle: "About the Team",
            memberRole: "Team Member"
        },
        blogPage: {
            eyebrow: "GDG on Campus DOU Blog",
            titleHtml: "<span class=\"text-gradient\">News and Guides</span> from the Tech World",
            subtitle: "Content prepared by our student community about Google technologies, software development, artificial intelligence, and more.",
            searchPlaceholder: "Search blog posts...",
            filters: {
                all: "All",
                medium: "Medium",
                local: "Blog",
                events: "Events",
                development: "Development",
                ai: "Artificial Intelligence",
                web: "Web",
                cloud: "Cloud"
            },
            mediumCta: "See All Posts on Medium",
            modalCategory: "Category",
            modalTitle: "Blog Title",
            modalAuthor: "Author",
            modalDate: "Date",
            modalReadTime: "Reading time",
            share: "Share:",
            shareX: "Share on X",
            shareLinkedin: "Share on LinkedIn",
            copyLink: "Copy link",
            readOnMedium: "Read on Medium",
            loadingMedium: "Loading Medium posts...",
            empty: "No blog posts match these criteria.",
            readArticle: "Read Article",
            untitled: "Untitled",
            minuteSuffix: "min"
        },
        offersPage: {
            eyebrow: "Student-Only Offers",
            titleHtml: "Discover the Benefits of <span class=\"text-gradient\">Being a Student</span>",
            subtitle: "A curated collection of the best free tools, software, and resources available to help you benefit from offers you can access as a student.",
            searchPlaceholder: "Search offers...",
            filters: {
                all: "All",
                developerTools: "Developer Tools",
                productivity: "Productivity",
                design: "Design",
                cloud: "Cloud",
                lifestyle: "Lifestyle"
            },
            modalLogoAlt: "Brand Logo",
            modalTitle: "Offer Title",
            modalCategory: "Category",
            modalDescription: "Description goes here...",
            howToClaim: "How Can I Claim This Offer?",
            claimButton: "Claim This Offer",
            empty: "No offers match these criteria.",
            viewOffer: "View Offer"
        },
        data: {
            stats: {
                activeMembers: "Active Members",
                eventsHeld: "Events Held",
                projectsBuilt: "Years",
                workshops: "Teams"
            },
            focusTracks: {
                webMobile: {
                    title: "Web & Mobile Development",
                    description: "Build projects with modern web and mobile application development technologies.",
                    level: "All Levels",
                    duration: "All Semester"
                },
                gameDev: {
                    title: "Game Development",
                    description: "Develop creative game projects with Unity and other game engines.",
                    level: "All Levels",
                    duration: "All Semester"
                },
                design: {
                    title: "Design & Social Media",
                    description: "Increase community engagement through digital design and social media strategies.",
                    level: "All Levels",
                    duration: "All Semester"
                }
            }
        }
    }
};

const getByPath = (source, key) =>
    key.split(".").reduce((value, part) => (value && value[part] !== undefined ? value[part] : undefined), source);

const interpolate = (value, params = {}) => {
    if (typeof value !== "string") return value;
    return value.replace(/\{(\w+)\}/g, (_, name) => (params[name] !== undefined ? params[name] : `{${name}}`));
};

export const normalizeLanguage = (lang) =>
    SUPPORTED_LANGUAGES.includes(lang) ? lang : DEFAULT_LANGUAGE;

export const getCurrentLanguage = () => {
    const stored = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;
    const htmlLang = typeof document !== "undefined" ? document.documentElement.getAttribute("data-lang") : null;
    return normalizeLanguage(stored || htmlLang || DEFAULT_LANGUAGE);
};

export const getLocale = (lang = getCurrentLanguage()) => (normalizeLanguage(lang) === "en" ? "en-US" : "tr-TR");

export const t = (key, params = {}, lang = getCurrentLanguage()) => {
    const normalized = normalizeLanguage(lang);
    const value = getByPath(translations[normalized], key) ?? getByPath(translations[DEFAULT_LANGUAGE], key);
    return interpolate(value ?? key, params);
};

export const getLocalizedField = (item, field, lang = getCurrentLanguage()) => {
    const normalized = normalizeLanguage(lang);
    return item?.i18n?.[normalized]?.[field] ?? item?.[field];
};

export const getLocalizedItem = (item, lang = getCurrentLanguage()) => ({
    ...item,
    ...(item?.i18n?.[normalizeLanguage(lang)] || {})
});

export const applyTranslations = (root = document, lang = getCurrentLanguage()) => {
    const normalized = normalizeLanguage(lang);
    const scope = root || document;

    scope.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = t(el.dataset.i18n, {}, normalized);
    });

    scope.querySelectorAll("[data-i18n-html]").forEach((el) => {
        el.innerHTML = t(el.dataset.i18nHtml, {}, normalized);
    });

    scope.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        el.setAttribute("placeholder", t(el.dataset.i18nPlaceholder, {}, normalized));
    });

    scope.querySelectorAll("[data-i18n-title]").forEach((el) => {
        el.setAttribute("title", t(el.dataset.i18nTitle, {}, normalized));
    });

    scope.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
        el.setAttribute("aria-label", t(el.dataset.i18nAriaLabel, {}, normalized));
    });

    scope.querySelectorAll("[data-i18n-alt]").forEach((el) => {
        el.setAttribute("alt", t(el.dataset.i18nAlt, {}, normalized));
    });

    scope.querySelectorAll("[data-i18n-content]").forEach((el) => {
        el.setAttribute("content", t(el.dataset.i18nContent, {}, normalized));
    });
};
