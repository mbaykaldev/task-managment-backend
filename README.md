# Task Management System - Backend

NestJS, TypeORM ve PostgreSQL ile geliştirilmiş görev yönetim sistemi backend API'si.

## 🚀 Kurulum

### Gereksinimler
- Node.js v18+
- PostgreSQL v16

### Adımlar

1. Paketleri yükle:
\`\`\`bash
npm install
\`\`\`

2. PostgreSQL'de database oluştur:
\`\`\`sql
CREATE DATABASE taskmanagement;
\`\`\`

3. .env dosyası oluştur:
\`\`\`env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=taskmanagement
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
PORT=3000
\`\`\`

4. Başlat:
\`\`\`bash
npm run start:dev
\`\`\`

Backend http://localhost:3000 adresinde çalışacak.

## 📚 API Endpoints

### Auth
- POST /api/auth/register - Kayıt
- POST /api/auth/login - Giriş

### Projects
- GET /api/projects - Projeleri listele
- POST /api/projects - Yeni proje
- DELETE /api/projects/:id - Proje sil

### Tasks
- GET /api/tasks - Görevleri listele
- POST /api/tasks - Yeni görev
- PUT /api/tasks/:id - Görev güncelle
- DELETE /api/tasks/:id - Görev sil

### Tags
- GET /api/tags - Etiketleri listele
- POST /api/tags - Yeni etiket
- DELETE /api/tags/:id - Etiket sil

## 🛠️ Teknolojiler

- NestJS
- TypeORM
- PostgreSQL
- JWT
- Bcrypt
