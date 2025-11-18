# Ingyenes Telepítés - Render.com

Ez az útmutató bemutatja, hogyan telepítheted a FakeNeptun alkalmazást **ingyen** a Render.com platformra.

## 🎯 Miért Render.com?

- ✅ **Teljesen ingyenes** - backend, frontend és MongoDB
- ✅ **Automatikus HTTPS** - SSL certificate ingyen
- ✅ **Automatikus deploy** - GitHub integráció
- ✅ **Docker támogatás** - használja a meglévő Docker image-eket
- ✅ **Ingyenes MongoDB** - 256MB tárhely
- ✅ **Nincs alvó mód** - a free tier szolgáltatások automatikusan leállnak inaktivitás után, de gyorsan újraindulnak

## 📋 Előfeltételek

1. GitHub fiók (már megvan)
2. [Render.com](https://render.com) fiók - ingyenes regisztráció
3. Forkolva/birtokolva ez a repository

## 🚀 Telepítési Lépések

### 1. Render Fiók Létrehozása

1. Menj a [render.com](https://render.com)
2. Regisztrálj GitHub fiókkal
3. Engedélyezd a Render hozzáférést a repository-dhoz

### 2. MongoDB Létrehozása

1. Render Dashboard → **New +** → **MongoDB**
2. Állítsd be:
   - **Name**: `fakeneptun-mongodb`
   - **Database**: `fakeNeptun`
   - **User**: `progr`
   - **Plan**: **Free** (256 MB)
   - **Region**: Frankfurt (EU)
3. Klikk **Create Database**
4. Mentsd el a **Connection String**-et (Internal Connection String)

### 3. Backend Szolgáltatás Létrehozása

1. Render Dashboard → **New +** → **Web Service**
2. Csatlakoztasd a GitHub repository-t
3. Állítsd be:
   - **Name**: `fakeneptun-backend`
   - **Region**: Frankfurt
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: **Docker**
   - **Dockerfile Path**: `backend/Dockerfile` (vagy csak `Dockerfile` ha root directory-ban van)
   - **Plan**: **Free**
   - **Health Check Path**: `/health`
   
4. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3000
   MONGO_URI=<a MongoDB Internal Connection String-et másold ide>
   ```

5. Klikk **Create Web Service**

### 4. Frontend Szolgáltatás Létrehozása

1. Render Dashboard → **New +** → **Web Service**
2. Csatlakoztasd ugyanazt a GitHub repository-t
3. Állítsd be:
   - **Name**: `fakeneptun-frontend`
   - **Region**: Frankfurt
   - **Branch**: `main`
   - **Root Directory**: `frontend/fakeNeptun`
   - **Environment**: **Docker**
   - **Dockerfile Path**: `frontend/fakeNeptun/Dockerfile` (vagy csak `Dockerfile`)
   - **Plan**: **Free**

4. **Environment Variables** (ha szükséges):
   ```
   NODE_ENV=production
   ```

5. **FONTOS**: Frontend Angular környezet beállítása
   - Az Angular build időben kell tudnia a backend URL-t
   - Frissítsd az `environment.prod.ts` fájlt a backend URL-lel
   - Vagy használj környezeti változót a Docker build során

6. Klikk **Create Web Service**

### 5. GitHub Actions Beállítása

A telepítés automatizálásához add hozzá ezeket a **Secrets**-hez a GitHub repository-ban:

1. GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

2. Add hozzá:
   ```
   RENDER_BACKEND_DEPLOY_HOOK=<Backend Deploy Hook URL>
   RENDER_FRONTEND_DEPLOY_HOOK=<Frontend Deploy Hook URL>
   ```

3. Deploy Hook URL megszerzése minden szolgáltatásnál:
   - Render Dashboard → klikk a szolgáltatásra
   - **Settings** → **Deploy Hook**
   - Másold ki az URL-t

4. Add hozzá a **Variables**-hez:
   ```
   BACKEND_URL=https://fakeneptun-backend.onrender.com
   FRONTEND_URL=https://fakeneptun-frontend.onrender.com
   ```

### 6. Frontend API URL Beállítása

Frissítsd az Angular frontend konfigurációt, hogy a Render backend-et használja:

**frontend/fakeNeptun/src/environments/environment.prod.ts**:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://fakeneptun-backend.onrender.com/api'
};
```

Majd commit és push:
```bash
git add .
git commit -m "Update production API URL for Render deployment"
git push origin main
```

## ✅ Ellenőrzés

1. **Backend Health Check**:
   ```bash
   curl https://fakeneptun-backend.onrender.com/health
   ```

2. **Frontend**:
   - Nyisd meg böngészőben: `https://fakeneptun-frontend.onrender.com`

3. **MongoDB Connection**:
   - Ellenőrizd a backend logokat a Render Dashboard-on

## 🔄 Automatikus Deployment

Most már minden push a `main` branch-re automatikusan:
1. Build-eli a kódot
2. Futtatja a teszteket
3. Készít Docker image-eket
4. Triggerel Render deployment-et (ha be van állítva a Deploy Hook)
5. Ellenőrzi a deployment sikerességét

## 💡 Tippek

### Ingyenes Tier Limitációk

- **Free szolgáltatások leállnak** 15 perc inaktivitás után
- **Hideg start**: Az első kérés ~30-60 másodpercig tarthat
- **750 óra/hónap** futási idő szolgáltatásonként
- **100 GB/hónap** bandwidth
- **MongoDB 256 MB** storage

### Optimalizáció

1. **Keep-Alive Szolgáltatás**:
   - Használj külső szolgáltatást (pl. UptimeRobot) 10 percenként pingelésre
   - Ez megelőzi az automatikus leállást

2. **Build Idő Csökkentése**:
   - Használd a Docker cache-t (már be van állítva)
   - Multi-stage build-ek (már implementálva)

3. **Monitoring**:
   - Render Dashboard mutatja a metrikákat
   - Prometheus/Grafana sajnos nem futtatható ingyenesen

## 🆘 Hibaelhárítás

### Build Fails

1. Ellenőrizd a Render logokat
2. Teszteld lokálisan Docker-rel:
   ```bash
   docker build -t test-backend ./backend
   docker build -t test-frontend ./frontend/fakeNeptun
   ```

### 502 Bad Gateway

- A szolgáltatás valószínűleg még indul (hideg start)
- Várj 30-60 másodpercet és próbáld újra

### CORS Errors

Ellenőrizd, hogy a backend CORS konfiguráció tartalmazza a frontend URL-t:

**backend/src/index.ts**:
```typescript
app.use(cors({
  origin: [
    'https://fakeneptun-frontend.onrender.com',
    'http://localhost:4200'
  ],
  credentials: true
}));
```

### MongoDB Connection Failed

- Ellenőrizd, hogy a `MONGO_URI` environment variable helyesen van beállítva
- Használd az **Internal Connection String**-et a Render MongoDB-ből
- Format: `mongodb://user:password@host:port/database`

## 🌐 Alternatív Ingyenes Platformok

Ha a Render nem működik:

1. **Railway.app** - $5 credit/hónap ingyen
2. **Fly.io** - 3 VM ingyen
3. **Vercel** (csak frontend/serverless) - frontend + serverless API
4. **Netlify** (csak frontend) + **MongoDB Atlas** (512MB ingyen)
5. **Heroku** - korlátozottabb ingyenes tier

## 📚 További Információk

- [Render Documentation](https://render.com/docs)
- [Render Docker Deployment](https://render.com/docs/deploy-docker)
- [MongoDB on Render](https://render.com/docs/databases)
- [GitHub Actions + Render](https://render.com/docs/deploy-hooks)

---

**Sikeres deployment után az alkalmazás elérhető lesz publikus URL-eken! 🎉**
