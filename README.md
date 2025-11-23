# FakeNeptun - Teljes körű CI/CD Implementáció

![CI/CD Pipeline](https://github.com/erosbalint3/FakeNeptun/workflows/CI/CD%20Pipeline/badge.svg)
![Monitoring](https://github.com/erosbalint3/FakeNeptun/workflows/Monitoring%20&%20Health%20Checks/badge.svg)
[![codecov](https://codecov.io/gh/erosbalint3/FakeNeptun/branch/main/graph/badge.svg)](https://codecov.io/gh/erosbalint3/FakeNeptun)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=erosbalint3_FakeNeptun&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=erosbalint3_FakeNeptun)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=erosbalint3_FakeNeptun&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=erosbalint3_FakeNeptun)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=erosbalint3_FakeNeptun&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=erosbalint3_FakeNeptun)

Egy modern hallgatói rendszer, amely egy **teljes CI/CD pipeline-t** mutat be automatizált kódminőség-ellenőrzéssel, teszteléssel, konténerizációval, telepítéssel és monitorozással.

## 🎯 Projekt Áttekintés

**Projektmunka Követelmények:**
- ✅ Code Quality
- ✅ Build & Test
- ✅ Release & Deploy
- ✅ Monitor & Feedback
- ✅ Eszközök: 11 használva (minimum 5, Git és Docker nem számít)
- ✅ README a projekthez

📖 **Teljes CI/CD pipeline dokumentációért lásd: [CI-CD-README.md](./CI-CD-README.md)**

## ✨ Technológiák

- **Frontend**: Angular `19.2.0` with NgRx State Management
- **Backend**: Express `4.21.2`, Node.js `20`, TypeScript `5.8.2`
- **Database**: MongoDB (dockerized)
- **Infrastructure**: Docker, Prometheus, Grafana
- **CI/CD**: GitHub Actions, SonarCloud, Codecov, Trivy, Lighthouse CI

---

## 📦 MongoDB Beállítás

A MongoDB példány a gyökérkönyvtárban található `docker-compose.yml` fájllal van konfigurálva.

Az alkalmazás felhasználói a users táblában találhatók. A tanárok és az adminisztrátor előre be vannak állítva.

### Kapcsolódási adatok

| Paraméter     | Érték        |
|---------------|--------------|
| Host         | `localhost`  |
| Port        | `27017`      |
| Username     | `progr`      |
| Password     | `progr`      |
| Database Name| `fakeNeptun` |

Csatlakozhat és böngészheti az adatbázist olyan eszközökkel, mint a **MongoDB Compass**.

---

## 🌍 Frontend

- **Host**: `localhost`  
- **Port**: `4200`

---

## 🔧 Backend

- **Host**: `localhost`  
- **Port**: `3000`

---

## 🚀 Gyors Kezdés

### Helyi Fejlesztés

1. **MongoDB Indítása**
   ```bash
   docker-compose up
   ```

2. **Backend Indítása**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Indítása**
   ```bash
   cd frontend/fakeNeptun
   npm install
   npm start
   ```

4. **Alkalmazás Elérése**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:3000

### Éles Telepítés (Docker)

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Felhő Telepítés (Render.com)

Az alkalmazás automatikusan telepítésre kerül Render.com-ra minden main branch push után.
Részletes telepítési útmutató: [RENDER-DEPLOYMENT.md](./RENDER-DEPLOYMENT.md)

**Szolgáltatások:**
- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001 (admin/admin)

---

## 📊 CI/CD Pipeline

A projekt teljes CI/CD pipeline-t implementál GitHub Actions segítségével, amely tartalmazza a kódminőség ellenőrzést, tesztelést, Docker image építést, automatikus telepítést és folyamatos monitorozást.

### 1. Kódminőség
**Eszközök:** ESLint, Prettier, TypeScript Compiler, SonarCloud

**Funkciók:**
- ✅ Automatikus linting minden push/PR-nál
- ✅ Kódformázás validáció
- ✅ TypeScript típusellenőrzés
- ✅ SonarCloud minőség elemzés
- ✅ Automatikus pull request kommentek

**Parancsok:**
```bash
npm run lint
npm run format:check
npm run build
```

### 2. Build & Tesztelés
**Eszközök:** Jest, Karma, Jasmine, Codecov

**Funkciók:**
- ✅ Backend egységtesztek (Jest)
- ✅ Frontend egységtesztek (Karma + Jasmine)
- ✅ Kódlefedettség riportolás
- ✅ Lefedettségi küszöbök érvényesítése

**Jelenlegi Lefedettség:**
- Backend: ✅ 20%+ összes metrika
- Frontend: ✅ 50% ágak, 51.49% függvények

**Parancsok:**
```bash
npm test
npm run test:coverage
```

### 3. Kiadás & Telepítés
**Eszközök:** Docker, Docker Compose, Docker Hub, Render.com

**Funkciók:**
- ✅ Többlépcsős Docker build-ek
- ✅ Automatikus image készítés és feltöltés
- ✅ Verzió címkézés (Git SHA + latest)
- ✅ Automatikus telepítés Render.com-ra
- ✅ Ingyenes hosting (backend, frontend, MongoDB)

**Docker Image-ek:**
- `erosbalint3/fakeneptun-backend:latest`
- `erosbalint3/fakeneptun-frontend:latest`

**Éles Alkalmazás:**
- Frontend: https://fakeneptun-frontend.onrender.com
- Backend: https://fakeneptun-backend.onrender.com

📖 **Telepítési útmutató: [RENDER-DEPLOYMENT.md](./RENDER-DEPLOYMENT.md)**

### 4. Monitorozás & Visszajelzés
**Eszközök:** Prometheus, Grafana, Trivy, Lighthouse CI, Slack

**Funkciók:**
- ✅ Prometheus metrika gyűjtés
- ✅ Grafana monitoring műszerfalak
- ✅ Biztonsági sebezhetőség vizsgálat (Docker image-ek)
- ✅ Teljesítmény monitorozás (Lighthouse CI)
- ✅ Automatikus health check-ek (4 óránként)
- ✅ Slack értesítések hibák esetén
- ✅ Nyilvános Lighthouse riportok

**Monitorozott Metrikák:**
- HTTP request duration & rate
- Active connections
- Database connection status
- CPU & memory usage
- Security vulnerabilities
- Frontend performance scores (SEO, Accessibility, Best Practices, Performance)

**Hozzáférés:**
- Metrics: http://localhost:3000/metrics (helyi)
- Prometheus: http://localhost:9090 (helyi)
- Grafana: http://localhost:3001 (helyi)
- Lighthouse Reports: Automatikusan generálva minden workflow futáskor

---

## 🛠️ Használt Eszközök (11 darab)

1. **ESLint** - Kód linting
2. **Prettier** - Kód formázás
3. **Jest** - Backend tesztelés
4. **Karma/Jasmine** - Frontend tesztelés
5. **SonarCloud** - Kódminőség
6. **Codecov** - Lefedettség követés
7. **Trivy** - Biztonsági vizsgálat
8. **Lighthouse CI** - Teljesítmény tesztelés
9. **Prometheus** - Metrika gyűjtés
10. **Grafana** - Monitoring műszerfalak
11. **Slack** - CI/CD értesítések

---

## 🧪 Tesztelés

### Backend
```bash
cd backend
npm test
npm run test:coverage
```

### Frontend
```bash
cd frontend/fakeNeptun
npm test
npm run test:coverage
```

---

## 🐳 Docker

### Image-ek Készítése
```bash
docker build -t fakeneptun-backend ./backend
docker build -t fakeneptun-frontend ./frontend/fakeNeptun
```

### Éles Stack Futtatása
```bash
docker-compose -f docker-compose.prod.yml up -d
docker-compose -f docker-compose.prod.yml logs -f
docker-compose -f docker-compose.prod.yml down
```

---

## 📁 Projekt Struktúra

```
FakeNeptun/
├── .github/workflows/       # CI/CD pipeline-ok
├── backend/                 # Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── models/
│   │   └── metrics.ts       # Prometheus metrikák
│   └── Dockerfile
├── frontend/fakeNeptun/     # Angular app
│   ├── src/app/
│   │   ├── components/
│   │   ├── services/
│   │   └── store/           # NgRx
│   └── Dockerfile
├── monitoring/              # Prometheus & Grafana
├── docker-compose.prod.yml
└── sonar-project.properties
```

---

## 🔧 Konfiguráció

### Szükséges GitHub Secrets
- `SONAR_TOKEN` - SonarCloud hitelesítés
- `CODECOV_TOKEN` - Codecov feltöltés
- `DOCKERHUB_USERNAME` - Docker Hub felhasználónév
- `DOCKERHUB_TOKEN` - Docker Hub hozzáférési token
- `RENDER_BACKEND_DEPLOY_HOOK` - Render backend deploy webhook
- `RENDER_FRONTEND_DEPLOY_HOOK` - Render frontend deploy webhook
- `SLACK_WEBHOOK_URL` - Slack értesítések (opcionális)

### GitHub Variables
- `BACKEND_URL` - Backend URL (pl. https://fakeneptun-backend.onrender.com)
- `FRONTEND_URL` - Frontend URL (pl. https://fakeneptun-frontend.onrender.com)