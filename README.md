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
