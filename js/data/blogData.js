// Blog yazıları verisi - GDG DOU Blog sayfası için
// Yapısal olarak offersData.js'e benzer şekilde kurgulandı

export const blogData = [
    {
        id: 'google-io-2025',
        title: 'Google I/O 2025: Yapay Zeka ve Android\'in Geleceği',
        author: 'Ahmet Yılmaz',
        date: '2025-01-15',
        category: 'Etkinlikler',
        tags: ['Google I/O', 'Android', 'AI'],
        coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        excerpt: 'Google I/O 2025\'te tanıtılan en önemli yenilikleri ve yapay zeka odaklı güncellemeleri sizler için derledik. Android 16, Gemini 2.0 ve daha fazlası...',
        content: `
            <p>Google'ın yıllık geliştirici konferansı Google I/O 2025, teknoloji dünyasında büyük bir heyecan yarattı. Bu yılki etkinlikte yapay zeka ve Android ekosistemindeki yenilikler ön plandaydı.</p>
            
            <h3>Android 16'nın Yeni Özellikleri</h3>
            <p>Android 16 ile birlikte gelen en önemli özelliklerden biri, geliştirilmiş gizlilik kontrolleri. Kullanıcılar artık hangi uygulamaların hangi verilere eriştiğini daha detaylı görebilecek ve kontrol edebilecek.</p>
            
            <h3>Gemini 2.0: Daha Güçlü AI</h3>
            <p>Google'ın yapay zeka modeli Gemini'nin ikinci versiyonu tanıtıldı. Gemini 2.0, önceki versiyona kıyasla %40 daha hızlı ve daha doğru sonuçlar üretiyor.</p>
            
            <h3>Flutter 4.0</h3>
            <p>Cross-platform uygulama geliştirme framework'ü Flutter'ın 4.0 versiyonu da I/O'da duyuruldu. Performans iyileştirmeleri ve yeni widget'lar geliştiricilerin işini kolaylaştıracak.</p>
            
            <p>Etkinlikten çıkan en önemli mesaj: Google, yapay zeka odaklı bir geleceğe hazırlanıyor ve geliştiricilere bu yolculukta güçlü araçlar sunuyor.</p>
        `,
        readTime: '5 dk'
    },
    {
        id: 'flutter-vs-react-native',
        title: 'Flutter vs React Native: 2025\'te Hangisini Seçmeli?',
        author: 'Ayşe Demir',
        date: '2025-01-10',
        category: 'Geliştirme',
        tags: ['Flutter', 'React Native', 'Mobile'],
        coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
        excerpt: 'Mobil uygulama geliştirmede iki popüler cross-platform framework\'ü derinlemesine karşılaştırıyoruz. Performans, öğrenme eğrisi ve topluluk desteği...',
        content: `
            <p>Mobil uygulama geliştirmeye başlarken en büyük kararlardan biri hangi framework'ü kullanacağınız. Bu yazıda Flutter ve React Native'i 2025 perspektifinden karşılaştırıyoruz.</p>
            
            <h3>Performans</h3>
            <p>Flutter, Dart dilini kullanarak doğrudan native koda derlenir. Bu sayede genellikle React Native'den daha yüksek performans sunar. React Native ise JavaScript bridge kullandığı için bazı durumlarda performans kaybı yaşanabilir.</p>
            
            <h3>Öğrenme Eğrisi</h3>
            <p>Eğer JavaScript biliyorsanız, React Native daha kolay gelecektir. Flutter için Dart öğrenmeniz gerekir, ancak Dart modern ve temiz bir dildir.</p>
            
            <h3>UI/UX</h3>
            <p>Flutter, Material Design ve Cupertino widget'larıyla zengin bir UI kütüphanesi sunar. React Native ise native component'ler kullanır, bu da daha "native" bir his verir.</p>
            
            <h3>Topluluk ve Ekosistem</h3>
            <p>React Native daha eski ve daha büyük bir topluluğa sahip. Ancak Flutter son yıllarda hızla büyüyor ve Google'ın resmi desteği var.</p>
            
            <h3>Sonuç</h3>
            <p>Her iki framework de mükemmel seçenekler. Flutter performans ve tutarlı UI arıyorsanız, React Native ise JavaScript ekosisteminden yararlanmak istiyorsanız daha uygun.</p>
        `,
        readTime: '7 dk'
    },
    {
        id: 'ai-ogrenci-araclari',
        title: 'Öğrenciler için En İyi 5 Yapay Zeka Aracı',
        author: 'Mehmet Kaya',
        date: '2025-01-05',
        category: 'Yapay Zeka',
        tags: ['AI', 'Productivity', 'Öğrenci'],
        coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
        excerpt: 'Ders çalışırken, ödev yaparken ve projeler geliştirirken size yardımcı olacak yapay zeka araçlarını keşfedin. Ücretsiz ve öğrenci dostu!',
        content: `
            <p>Yapay zeka artık günlük hayatımızın bir parçası. Öğrenciler olarak bu teknolojiden maksimum verim almak için doğru araçları bilmemiz gerekiyor.</p>
            
            <h3>1. ChatGPT (OpenAI)</h3>
            <p>Araştırma, konsept açıklamaları ve beyin fırtınası için mükemmel. Ancak direkt kopyala-yapıştır yapmamalı, öğrenme aracı olarak kullanmalısınız.</p>
            
            <h3>2. GitHub Copilot</h3>
            <p>Kod yazarken AI asistanı. GitHub Student Pack ile öğrencilere ücretsiz! Python'dan JavaScript'e kadar birçok dilde yardımcı oluyor.</p>
            
            <h3>3. Notion AI</h3>
            <p>Ders notlarınızı düzenlemek, özet çıkarmak ve to-do listelerinizi yönetmek için harika bir araç.</p>
            
            <h3>4. Grammarly</h3>
            <p>İngilizce ödevleriniz için vazgeçilmez. Dilbilgisi, yazım ve ton kontrolü yapıyor.</p>
            
            <h3>5. Wolfram Alpha</h3>
            <p>Matematik, fizik ve mühendislik problemlerini çözerken adım adım çözüm sunan AI destekli hesap makinesi.</p>
            
            <h3>Dikkat Edilmesi Gerekenler</h3>
            <p>AI araçları yardımcı olmalı, sizin yerinize düşünmemeli. Akademik dürüstlük kurallarına her zaman uyun.</p>
        `,
        readTime: '6 dk'
    },
    {
        id: 'git-github-baslangic',
        title: 'Git ve GitHub\'a Başlangıç: Öğrenciler için Tam Rehber',
        author: 'Zeynep Aksoy',
        date: '2024-12-28',
        category: 'Geliştirme',
        tags: ['Git', 'GitHub', 'Version Control'],
        coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800',
        excerpt: 'Version control nedir? Git nasıl kullanılır? GitHub\'da proje nasıl paylaşılır? Tüm sorularınızın cevabı bu kapsamlı rehberde!',
        content: `
            <p>Her yazılımcının bilmesi gereken en temel araçlardan biri Git ve GitHub. Bu rehberde sıfırdan başlayarak profesyonel seviyeye kadar her şeyi öğreneceksiniz.</p>
            
            <h3>Git Nedir?</h3>
            <p>Git, kodunuzun tarihçesini tutan bir version control sistemi. Projenizde yaptığınız her değişikliği kaydeder ve isterseniz geriye dönebilirsiniz.</p>
            
            <h3>Temel Git Komutları</h3>
            <ul>
                <li><code>git init</code>: Yeni bir repository başlatır</li>
                <li><code>git add .</code>: Değişiklikleri stage'e ekler</li>
                <li><code>git commit -m "mesaj"</code>: Değişiklikleri kaydeder</li>
                <li><code>git push</code>: Değişiklikleri GitHub'a gönderir</li>
                <li><code>git pull</code>: GitHub'dan değişiklikleri çeker</li>
            </ul>
            
            <h3>GitHub'da İlk Repo Oluşturma</h3>
            <p>1. GitHub'da yeni repository oluşturun<br>
            2. Terminal'de projenizin klasörüne gidin<br>
            3. Git komutlarıyla kodunuzu yükleyin</p>
            
            <h3>Branch'ler ve Merge</h3>
            <p>Branch'ler, ana kodunuzu bozmadan yeni özellikler geliştirmenizi sağlar. Geliştirme bitince merge ederek ana branch'e eklersiniz.</p>
            
            <h3>Pull Request Nedir?</h3>
            <p>Açık kaynak projelere katkıda bulunurken kullanılan bir yöntem. Değişikliklerinizi proje sahiplerine önerirsiniz.</p>
            
            <p>Git'i öğrenmek başta zor gelebilir ama pratik yaptıkça alışacaksınız. GitHub Student Pack ile özel özellikler de kazanabilirsiniz!</p>
        `,
        readTime: '8 dk'
    },
    {
        id: 'web-gelistirme-2025',
        title: 'Web Geliştirmede 2025 Trendleri',
        author: 'Can Yılmaz',
        date: '2024-12-20',
        category: 'Web',
        tags: ['Web Development', 'Trends', 'Frontend'],
        coverImage: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
        excerpt: '2025 yılında web geliştirme dünyasında hangi teknolojiler ve yaklaşımlar ön plana çıkacak? AI, WebAssembly, serverless ve daha fazlası...',
        content: `
            <p>Web geliştirme sürekli evrim geçiren bir alan. 2025'te hangi teknolojilerin ve yaklaşımların öne çıkacağına bakalım.</p>
            
            <h3>1. AI-Powered Development</h3>
            <p>GitHub Copilot, ChatGPT gibi araçlar kod yazma şeklimizi değiştiriyor. 2025'te AI asistanları her geliştiricinin temel araçları arasında olacak.</p>
            
            <h3>2. Server Components (React 19+)</h3>
            <p>React'ın Server Components özelliği, performansı artırırken bundle size'ı küçültüyor. Next.js 15 ile birlikte mainstream olacak.</p>
            
            <h3>3. WebAssembly (WASM)</h3>
            <p>Tarayıcıda native performans. Özellikle oyun, video düzenleme ve veri işleme uygulamalarında yaygınlaşacak.</p>
            
            <h3>4. Micro-Frontend Architecture</h3>
            <p>Büyük projeleri küçük, bağımsız parçalara bölmek. Farklı takımlar farklı teknolojilerle çalışabiliyor.</p>
            
            <h3>5. Edge Computing</h3>
            <p>Serverless fonksiyonların kullanıcıya en yakın sunucularda çalışması. Cloudflare Workers, Vercel Edge gibi platformlar popülerleşiyor.</p>
            
            <h3>6. Web Accessibility (a11y)</h3>
            <p>Erişilebilirlik artık opsiyonel değil. Her web sitesi ve uygulamanın standartlara uygun olması bekleniyor.</p>
            
            <h3>Sonuç</h3>
            <p>Bu trendleri takip etmek önemli ama temelleri iyi öğrenmek daha önemli. HTML, CSS ve JavaScript'i sağlam bilirseniz, yeni teknolojileri öğrenmek kolay olur.</p>
        `,
        readTime: '6 dk'
    },
    {
        id: 'cloud-computing-giris',
        title: 'Cloud Computing\'e Giriş: Başlangıç Seviyesi Rehber',
        author: 'Elif Yıldız',
        date: '2024-12-15',
        category: 'Cloud',
        tags: ['Cloud', 'AWS', 'Azure', 'GCP'],
        coverImage: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800',
        excerpt: 'Bulut bilişim nedir? AWS, Azure ve Google Cloud Platform arasındaki farklar neler? Öğrenciler için ücretsiz kaynaklar...',
        content: `
            <p>Cloud computing, modern yazılım geliştirmenin temel taşlarından biri. Bu yazıda bulut bilişime sıfırdan başlangıç yapacağız.</p>
            
            <h3>Cloud Computing Nedir?</h3>
            <p>Kendi sunucularınızı kurmak yerine, internet üzerinden sunucu, depolama ve veritabanı hizmetleri kullanmak. Daha hızlı, daha ucuz ve daha ölçeklenebilir.</p>
            
            <h3>Büyük 3 Cloud Sağlayıcı</h3>
            
            <h4>Amazon Web Services (AWS)</h4>
            <p>En büyük ve en eski cloud sağlayıcı. En fazla hizmeti sunan platform. AWS Educate programı ile öğrencilere ücretsiz krediler.</p>
            
            <h4>Microsoft Azure</h4>
            <p>Özellikle kurumsal şirketler için popüler. Azure for Students ile 100$ ücretsiz kredi.</p>
            
            <h4>Google Cloud Platform (GCP)</h4>
            <p>AI ve machine learning araçlarında güçlü. Google Cloud Education programı mevcut.</p>
            
            <h3>Temel Cloud Servisleri</h3>
            <ul>
                <li><strong>Compute:</strong> Virtual sunucular (EC2, VM, Compute Engine)</li>
                <li><strong>Storage:</strong> Dosya depolama (S3, Blob Storage, Cloud Storage)</li>
                <li><strong>Database:</strong> Yönetilen veritabanları (RDS, SQL Database, Cloud SQL)</li>
                <li><strong>Serverless:</strong> Lambda, Azure Functions, Cloud Functions</li>
            </ul>
            
            <h3>Öğrenciler için İpuçları</h3>
            <p>1. Ücretsiz tier'ları kullanarak başlayın<br>
            2. Küçük projelerle pratik yapın<br>
            3. Sertifikasyonlar için hazırlanın (AWS, Azure, GCP)<br>
            4. Fatura limitlerini ayarlayın (beklenmedik ücretlerden kaçının!)</p>
        `,
        readTime: '7 dk'
    }
];
