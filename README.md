# amerika365

Bu proje Next.js tabanlı bir web uygulamasıdır.

## Docker ile çalıştırma (MySQL + PhpMyAdmin + Prisma Studio)

Aşağıdaki yapı tek komutla 4 servisi ayağa kaldırır:
- `web`: Next.js uygulaması (`http://localhost:3000`)
- `mysql`: MySQL 8.4
- `phpmyadmin`: veritabanı yönetim paneli (`http://localhost:8080`)
- `prisma-studio`: Prisma Studio arayüzü (`http://localhost:5555`)

### 1) Ortam değişkenlerini hazırlayın

```bash
cp .env.example .env
```

### 2) Konteynerleri başlatın

```bash
docker compose up --build -d
```

### 3) Prisma migration çalıştırın

İlk kurulumda şema tablolarını oluşturmak için:

```bash
docker compose exec web npx prisma migrate dev --name init
```

### 4) Servislere erişin

- Uygulama: `http://localhost:3000`
- PhpMyAdmin: `http://localhost:8080`
  - Sunucu/Host: `mysql`
  - Kullanıcı: `root`
  - Şifre: `root`
- Prisma Studio: `http://localhost:5555`

## Lokal (Docker'sız) geliştirme

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` açın.

## Admin panel + Clerk login akışı

- Admin panel adresi: `http://localhost:3000/admin`
- Giriş sayfası: `http://localhost:3000/giris`

Bu projede Clerk, App Router ile `proxy.ts` + `ClerkProvider` yaklaşımıyla entegre edildi.

> Keyless mode desteklenir: Clerk publishable/secret key tanımlamadan da uygulama lokal ortamda çalışabilir.

Kurulum için (ağ/registry erişimi varsa):

```bash
npm install @clerk/nextjs
```

`/admin` sayfası sunucu tarafında `auth()` ile korunur; oturum yoksa kullanıcı Clerk giriş akışına yönlendirilir.
