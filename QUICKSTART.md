# 🚀 Quick Start Guide - CI/CD Pipeline

This guide will help you get the CI/CD pipeline up and running quickly.

## Prerequisites

- Node.js 20.x or higher
- Docker and Docker Compose
- Git
- GitHub account
- Docker Hub account

## 1. Initial Setup (5 minutes)

### Clone and Install

```bash
# Navigate to the project
cd FakeNeptun

# Run the setup script
./setup-cicd.sh
```

This script will:
- Install all dependencies
- Run linting and tests
- Build both applications
- Create Docker images

## 2. GitHub Setup (10 minutes)

### A. Create Required Accounts

1. **SonarCloud**: https://sonarcloud.io/
   - Sign in with GitHub
   - Import the FakeNeptun repository
   - Copy the project token

2. **Codecov**: https://codecov.io/
   - Sign in with GitHub
   - Add the FakeNeptun repository
   - Copy the upload token

3. **Docker Hub**: https://hub.docker.com/
   - Create account or sign in
   - Create access token (Settings → Security → New Access Token)

### B. Configure GitHub Secrets

Go to: `GitHub Repository → Settings → Secrets and variables → Actions`

Add the following secrets:

**Secrets:**

| Secret Name | Description | Where to Get It |
|------------|-------------|-----------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username | Docker Hub account |
| `DOCKERHUB_TOKEN` | Docker Hub access token | Docker Hub → Settings → Security |
| `CODECOV_TOKEN` | Codecov upload token | Codecov → Repository Settings |
| `SONAR_TOKEN` | SonarCloud token | SonarCloud → Account → Security |
| `SLACK_WEBHOOK` | Slack webhook URL (optional) | Slack → Apps → Incoming Webhooks |

**Variables** (go to Variables tab):

| Variable Name | Description |
|--------------|-------------|
| `BACKEND_URL` | Production backend URL (optional, for monitoring) |
| `FRONTEND_URL` | Production frontend URL (optional, for monitoring) |

### C. Update Configuration Files

1. **SonarCloud Configuration** (`sonar-project.properties`):
   ```properties
   sonar.projectKey=YOUR_GITHUB_USERNAME_FakeNeptun
   sonar.organization=YOUR_GITHUB_USERNAME
   ```

2. **README Badges** (update username in URLs):
   Replace `erosbalint3` with your GitHub username in `README.md`

## 3. Verify Setup (2 minutes)

### Test Locally

```bash
# Backend
cd backend
npm run lint
npm run type-check
npm run test

# Frontend
cd ../frontend/fakeNeptun
npm run lint
npm run type-check
npm run test:ci
```

### Push to GitHub

```bash
git add .
git commit -m "feat: Add complete CI/CD pipeline"
git push origin main
```

## 4. Monitor Pipeline (5 minutes)

1. **Go to GitHub Actions tab**
   - Watch the CI/CD Pipeline workflow run
   - All jobs should turn green ✅

2. **Check Integrations**
   - SonarCloud: View code quality dashboard
   - Codecov: Check coverage reports
   - Docker Hub: Verify images are pushed

## 5. Verification Checklist

- [ ] All dependencies installed
- [ ] Local tests pass
- [ ] GitHub Actions workflow runs successfully
- [ ] Docker images built and pushed
- [ ] SonarCloud analysis completes
- [ ] Codecov receives coverage reports
- [ ] Badges display correctly in README

## Common Issues & Solutions

### Issue: GitHub Actions fails with "npm ci" error

**Solution**: Ensure `package-lock.json` exists in both backend and frontend directories:
```bash
cd backend && npm install
cd ../frontend/fakeNeptun && npm install
```

### Issue: Docker build fails

**Solution**: Check Dockerfile paths and ensure all required files exist:
```bash
docker build -t test-backend ./backend
docker build -t test-frontend ./frontend/fakeNeptun
```

### Issue: SonarCloud authentication fails

**Solution**: 
1. Verify SONAR_TOKEN is correct
2. Check organization and project key in `sonar-project.properties`
3. Ensure repository is imported in SonarCloud

### Issue: Codecov upload fails

**Solution**:
1. Verify CODECOV_TOKEN is set correctly
2. Check coverage files are generated in correct location
3. Ensure `codecov.yml` configuration is correct

## Pipeline Stages Overview

```
┌─────────────────┐
│  Code Quality   │ ← ESLint, Prettier, TypeScript
└────────┬────────┘
         ↓
┌─────────────────┐
│  Build & Test   │ ← Jest, Karma, Coverage
└────────┬────────┘
         ↓
┌─────────────────┐
│ SonarCloud Scan │ ← Code analysis
└────────┬────────┘
         ↓
┌─────────────────┐
│ Docker Build    │ ← Container images
└────────┬────────┘
         ↓
┌─────────────────┐
│    Deploy       │ ← Production deployment
└────────┬────────┘
         ↓
┌─────────────────┐
│    Monitor      │ ← Health checks, alerts
└─────────────────┘
```

## Next Steps

Once the pipeline is running:

1. **Set up monitoring**:
   - Configure Slack notifications
   - Set up health check URLs
   - Enable security scanning

2. **Customize deployment**:
   - Configure your deployment target
   - Set up staging environment
   - Add environment-specific configs

3. **Review documentation**:
   - Read `CI-CD-README.md` for detailed info
   - Check pipeline logs for insights
   - Monitor SonarCloud and Codecov dashboards

## Need Help?

- 📖 Full documentation: [CI-CD-README.md](./CI-CD-README.md)
- 🐛 Found an issue? Create a bug report using the issue template
- 💡 Have a suggestion? Create a feature request

## Success! 🎉

Your CI/CD pipeline is now ready! Every push will:
- ✅ Check code quality
- ✅ Run tests
- ✅ Build applications
- ✅ Scan for vulnerabilities
- ✅ Create Docker images
- ✅ Deploy automatically (on main branch)
- ✅ Monitor health and performance
