export interface NewsArticle {
  slug: string;
  category: string;
  subcategory?: string;
  title: string;
  excerpt: string;
  author: string;
  publishLabel: string;
  readTime: string;
  heroImage: string;
}

export const newsArticles: NewsArticle[] = [
  {
    slug: "abd-secim-sonuclari-yeni-donem",
    category: "ABD",
    subcategory: "Siyaset",
    title: "ABD Seçim Sonuçları: Yeni Dönemde Amerika-Türkiye İlişkilerini Ne Bekliyor?",
    excerpt:
      "Washington'daki yeni yönetimin Ankara ile diplomatik trafiği; savunma, ekonomi ve bölgesel güvenlik başlıklarında yeni bir dönemi başlatabilir.",
    author: "Ahmet Yılmaz",
    publishLabel: "12 dakika önce",
    readTime: "6 dk okuma",
    heroImage:
      "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "beyaz-saray-gocmenlik-paketi",
    category: "Siyaset",
    title: "Beyaz Saray'dan Yeni Göçmenlik Paketi Açıklaması",
    excerpt: "Yeni taslak, çalışma izinleri ve aile birleşimi süreçlerinde hızlandırılmış bir takvim vadediyor.",
    author: "Zeynep Arslan",
    publishLabel: "2 saat önce",
    readTime: "4 dk okuma",
    heroImage:
      "https://images.unsplash.com/photo-1617581629397-a72507c3de9e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "fed-faiz-sinyali-enflasyon-sonrasi",
    category: "Ekonomi",
    title: "Enflasyon Verileri Sonrası Fed'den Kritik Faiz Sinyali",
    excerpt: "Piyasalar, enflasyondaki sınırlı gerilemeye rağmen Fed'in temkinli duruşunu koruyacağını fiyatlıyor.",
    author: "Mert Demir",
    publishLabel: "5 saat önce",
    readTime: "5 dk okuma",
    heroImage:
      "https://images.unsplash.com/photo-1642543348745-1f56d7cd5f95?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "turk-girisimi-10-milyon-yatirim",
    category: "Teknoloji",
    title: "Silikon Vadisi'nde Yeni Türk Girişimi 10 Milyon Dolar Yatırım Aldı",
    excerpt: "Yapay zekâ tabanlı çözüm geliştiren girişim, yeni turla birlikte ABD pazarında büyümeyi hedefliyor.",
    author: "Ece Korkmaz",
    publishLabel: "8 saat önce",
    readTime: "4 dk okuma",
    heroImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "h1b-basvurulari-basladi",
    category: "Göçmenlik",
    title: "H-1B Vize Başvuruları Başladı",
    excerpt: "2026 dönemi için başvurularda yeni dijital doğrulama adımları devreye alındı.",
    author: "Editör",
    publishLabel: "güncel",
    readTime: "3 dk okuma",
    heroImage:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "green-card-cekilis-sonuclari",
    category: "Göçmenlik",
    title: "Green Card Çekiliş Sonuçları",
    excerpt: "Sonuç ekranı erişime açıldı; başvuru sahipleri doğrulama numaralarıyla durumlarını kontrol edebilir.",
    author: "Editör",
    publishLabel: "mayıs 2024",
    readTime: "3 dk okuma",
    heroImage:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80",
  },
  {
    slug: "f1-ogrenci-vizesi-yeni-kurallar",
    category: "Göçmenlik",
    title: "F-1 Öğrenci Vizesi Yeni Kurallar",
    excerpt: "Dil yeterlilik ve finansal belge kriterlerinde güncellenen maddeler başvuru stratejilerini etkiliyor.",
    author: "Editör",
    publishLabel: "rehber",
    readTime: "4 dk okuma",
    heroImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80",
  },
];

export const newsBySlug = new Map(newsArticles.map((article) => [article.slug, article]));
