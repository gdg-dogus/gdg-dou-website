// Data for student offers in the offers page


/*
How to add a new student offer:
1. Copy the template below and paste it as a new object inside offersData.
2. Keep id unique. Use lowercase letters, numbers, and dashes if needed.
3. categoryKey controls filtering. Use one of: developer_tools, productivity, design, cloud, lifestyle.
4. shortDescription appears on the offer card.
5. fullDescription and claimGuide appear inside the offer popup/modal.
6. logo can be a local asset path or a full image URL. darkLogo is optional.
7. Turkish text stays in the normal fields. English text goes inside i18n.en.

Template:
{
    id: 'example-offer',
    name: 'Example Student Tool',
    logo: 'assets/offers/example-logo.png',
    darkLogo: 'assets/offers/example-logo-dark.png',
    shortDescription: 'Kartta gorunecek kisa teklif aciklamasi.',
    fullDescription: 'Popup icinde gorunecek daha detayli teklif aciklamasi.',
    claimGuide: [
        '<a href="https://example.com" target="_blank">example.com</a> adresine gidin.',
        'Ogrenci hesabi olusturun.',
        'Ogrenci durumunuzu dogrulayin.'
    ],
    link: 'https://example.com',
    category: 'Gelistirici Araclari',
    categoryKey: 'developer_tools',
    tags: ['Ucretsiz', 'Arac'],
    i18n: {
        en: {
            shortDescription: 'Short English offer description shown on the card.',
            fullDescription: 'Longer English offer description shown inside the popup.',
            claimGuide: [
                'Go to <a href="https://example.com" target="_blank">example.com</a>.',
                'Create a student account.',
                'Verify your student status.'
            ],
            category: 'Developer Tools',
            tags: ['Free', 'Tool']
        }
    }
}
*/
export const offersData = [
    {
        id: 'github',
        name: 'GitHub Student Pack',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
        darkLogo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Github_logo_svg.svg',
        shortDescription: 'Gelişirici öğrenciler için onlarca developer aracına GitHub Student Pack ile ücretsiz erişin.',
        fullDescription: 'Github Student Developer Pack öğrenci developerlar için en iyi araçları bedavaya sunmaktadır. Github Copilot Pro, JetBrains IDE\'leri , Namecheap Domain\'leri, DigitalOcean kredileri ve daha fazlasını bedavaya içermektedir.',
        claimGuide: [
            '<a href="https://education.github.com/pack" target="_blank">education.github.com/pack</a> adresine gidin.',
            '"Sign up for Student Developer Pack" seçeneğine tıklayın.',
            'Üniversite e-posta adresiniz veya öğrenci kimliğiniz ile öğrenci statünüzü doğrulayın.'
        ],
        link: 'https://education.github.com/pack',
        category: 'Geliştirici Araçları',
        categoryKey: 'developer_tools',
        tags: ['Mutlaka Edinilmeli', 'Bulut', 'Alan Adı'],
        i18n: {
            en: {
                shortDescription: 'Access dozens of developer tools for free with the GitHub Student Pack.',
                fullDescription: 'The GitHub Student Developer Pack offers the best tools for student developers for free. It includes GitHub Copilot Pro, JetBrains IDEs, Namecheap domains, DigitalOcean credits, and much more.',
                claimGuide: [
                    'Go to <a href="https://education.github.com/pack" target="_blank">education.github.com/pack</a>.',
                    'Click "Sign up for Student Developer Pack".',
                    'Verify your student status with your university email address or student ID.'
                ],
                category: 'Developer Tools',
                tags: ['Must Have', 'Cloud', 'Domain']
            }
        }
    },
    {
        id: 'jetbrains',
        name: 'JetBrains Educational Pack',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/JetBrains_logo.jpg',
        shortDescription: 'JetBrains profesyonel masaüstü IDE\'leri öğrencilere ve akademisyenlere bedava.',
        fullDescription: 'Tüm JetBrains IDE\'lerine IntelliJ IDEA Ultimate, PyCharm Professional, WebStorm ve daha fazlası da dahil ücretsiz erişim sağlayın. Java, Python, JavaScript ve diğer dillerde kodlama için birebir.',
        claimGuide: [
            '<a href="https://www.jetbrains.com/community/education/#students" target="_blank">jetbrains.com/student</a> adresine gidin.',
            '"Request Now" seçeneğine tıklayın.',
            '.edu e-posta adresinizle formu doldurun.'
        ],
        link: 'https://www.jetbrains.com/community/education/#students',
        category: 'Geliştirici Araçları',
        categoryKey: 'developer_tools',
        tags: ['IDE', 'Verimlilik'],
        i18n: {
            en: {
                shortDescription: 'JetBrains professional desktop IDEs are free for students and academics.',
                fullDescription: 'Get free access to all JetBrains IDEs, including IntelliJ IDEA Ultimate, PyCharm Professional, WebStorm, and more. A perfect fit for coding in Java, Python, JavaScript, and other languages.',
                claimGuide: [
                    'Go to <a href="https://www.jetbrains.com/community/education/#students" target="_blank">jetbrains.com/student</a>.',
                    'Click "Request Now".',
                    'Fill out the form with your .edu email address.'
                ],
                category: 'Developer Tools',
                tags: ['IDE', 'Productivity']
            }
        }
    },
    {
        id: 'notion',
        name: 'Notion for Education',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
        shortDescription: 'Notlarınız, projeleriniz ve diğer tüm işleriniz için Notion Plus planı öğrencilere bedava.',
        fullDescription: 'Notion düşüncelerinizi toplamak, ders notlarınızı almak ve planlama yapmak için kullanıcılarına ortak bir alan sağlar. Notion Plus planı ise tüm özellikleri ile beraber öğrencilere ücretsiz sunulmaktadır.',
        claimGuide: [
            'Notion\'a okul e-postanızla kaydolun veya hesabınızın e-postasını değiştirin.',
            '"Settings & Members" > "Upgrade" bölümüne gidin.',
            '"Students & Educators" kısmına inin ve "Get free education plan" seçeneğine tıklayın.',
            'Notion Plus planının tüm özelliklerinden yararlanın.'
        ],
        link: 'https://www.notion.so/product/notion-for-education',
        category: 'Verimlilik',
        categoryKey: 'productivity',
        tags: ['Notlar', 'Yönetim'],
        i18n: {
            en: {
                shortDescription: 'The Notion Plus plan is free for students for notes, projects, and everything else you manage.',
                fullDescription: 'Notion gives users a shared space to collect thoughts, take class notes, and plan work. The Notion Plus plan is offered free to students with all its features.',
                claimGuide: [
                    'Sign up for Notion with your school email or change your account email.',
                    'Go to "Settings & Members" > "Upgrade".',
                    'Scroll to "Students & Educators" and click "Get free education plan".',
                    'Enjoy all features of the Notion Plus plan.'
                ],
                category: 'Productivity',
                tags: ['Notes', 'Management']
            }
        }
    },
    {
        id: 'figma',
        name: 'Figma for Education',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
        shortDescription: 'İşbirliği için arayüz tasarım aracı. Profesyonel plan öğrenciler için ücretsiz .',
        fullDescription: 'Figma, tasarım sürecindeki herkesi birbirine bağlayarak ekiplerin daha iyi ürünleri daha hızlı sunmasını sağlar. Öğrenciler ve eğitimciler, sınırsız dosya ve proje içeren Profesyonel planı ücretsiz edinebilir.',
        claimGuide: [
            'Bir Figma hesabı oluşturun.',
            '<a href="https://www.figma.com/education/" target="_blank">figma.com/education</a> adresine gidin.',
            '"Get verified" seçeneğine tıklayın ve öğrenci statünüzü doğrulamak için adımları izleyin.'
        ],
        link: 'https://www.figma.com/education/',
        category: 'Tasarım',
        categoryKey: 'design',
        tags: ['UI/UX', 'İşbirliği'],
        i18n: {
            en: {
                shortDescription: 'A collaborative interface design tool. The professional plan is free for students.',
                fullDescription: 'Figma connects everyone in the design process so teams can deliver better products faster. Students and educators can get the Professional plan with unlimited files and projects for free.',
                claimGuide: [
                    'Create a Figma account.',
                    'Go to <a href="https://www.figma.com/education/" target="_blank">figma.com/education</a>.',
                    'Click "Get verified" and follow the steps to verify your student status.'
                ],
                category: 'Design',
                tags: ['UI/UX', 'Collaboration']
            }
        }
    },
    {
        id: 'azure',
        name: 'Azure for Students',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg',
        shortDescription: 'Öğrenciler için ücretsiz Azure kredileri ve geliştirici araçlarıyla projelerinizi bulutta geliştirin.',
        fullDescription: 'Azure hizmetlerinde kullanmak üzere 100 $ kredi kazanın, ayrıca VS Code, SQL Server ve daha fazlası gibi popüler geliştirici araçlarına ücretsiz erişim sağlayın. Kredi kartı gerekmez.',
        claimGuide: [
            '<a href="https://azure.microsoft.com/en-us/free/students/" target="_blank">azure.microsoft.com/students</a> adresine gidin.',
            '"Start Free" seçeneğine tıklayın.',
            'Okul e-postanızla giriş yapın.'
        ],
        link: 'https://azure.microsoft.com/en-us/free/students/',
        category: 'Bulut',
        categoryKey: 'cloud',
        tags: ['Bulut', 'Yapay Zeka'],
        i18n: {
            en: {
                shortDescription: 'Build your projects in the cloud with free Azure credits and developer tools for students.',
                fullDescription: 'Get $100 in credit to use on Azure services, plus free access to popular developer tools such as VS Code, SQL Server, and more. No credit card required.',
                claimGuide: [
                    'Go to <a href="https://azure.microsoft.com/en-us/free/students/" target="_blank">azure.microsoft.com/students</a>.',
                    'Click "Start Free".',
                    'Sign in with your school email.'
                ],
                category: 'Cloud',
                tags: ['Cloud', 'Artificial Intelligence']
            }
        }
    },
    {
        id: 'spotify',
        name: 'Spotify Premium Student',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        shortDescription: 'Her anınızda müzik yanınızda. Öğrencilere özel Spotify Premium\'da %50 indirim.',
        fullDescription: 'Reklamsız müziğin, çevrimdışı dinlemenin ve sınırsız atlama hakkının keyfini çıkarın. Öğrenciler, normal Premium abonelik fiyatı üzerinden %50 indirim kazanır.',
        claimGuide: [
            '<a href="https://www.spotify.com/us/student/" target="_blank">spotify.com/student</a> adresine gidin.',
            '"Get Started" seçeneğine tıklayın.',
            'SheerID üzerinden öğrenci kaydınızı doğrulayın.'
        ],
        link: 'https://www.spotify.com/us/student/',
        category: 'Yaşam Tarzı',
        categoryKey: 'lifestyle',
        tags: ['Müzik', 'Eğlence'],
        i18n: {
            en: {
                shortDescription: 'Music by your side at every moment. Students get 50% off Spotify Premium.',
                fullDescription: 'Enjoy ad-free music, offline listening, and unlimited skips. Students receive a 50% discount on the regular Premium subscription price.',
                claimGuide: [
                    'Go to <a href="https://www.spotify.com/us/student/" target="_blank">spotify.com/student</a>.',
                    'Click "Get Started".',
                    'Verify your student enrollment through SheerID.'
                ],
                category: 'Lifestyle',
                tags: ['Music', 'Entertainment']
            }
        }
    }
];
