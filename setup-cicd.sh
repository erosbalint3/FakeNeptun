#!/bin/bash

set -e

echo "FakeNeptun CI/CD Setup"
echo "========================="
echo ""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo -e "${RED}Error: Please run this script from the FakeNeptun directory${NC}"
    exit 1
fi

echo "Installing Backend Dependencies..."
cd backend
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"
echo ""

echo "Installing Frontend Dependencies..."
cd ../frontend/fakeNeptun
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
echo ""

cd ../..

echo "Running Code Quality Checks..."
echo ""

echo "Backend Linting..."
cd backend
npm run lint || echo -e "${YELLOW}⚠ Backend linting found issues${NC}"
echo ""

echo "Frontend Linting..."
cd ../frontend/fakeNeptun
npm run lint || echo -e "${YELLOW}⚠ Frontend linting found issues${NC}"
echo ""

cd ../..

echo "Running Tests..."
echo ""

echo "Backend Tests..."
cd backend
npm run test || echo -e "${YELLOW}⚠ Backend tests failed${NC}"
echo ""

echo "Frontend Tests..."
cd ../frontend/fakeNeptun
npm run test:ci || echo -e "${YELLOW}⚠ Frontend tests failed${NC}"
echo ""

cd ../..

echo "Building Applications..."
echo ""

echo "Building Backend..."
cd backend
npm run build
echo -e "${GREEN}✓ Backend built successfully${NC}"
echo ""

echo "Building Frontend..."
cd ../frontend/fakeNeptun
npm run build
echo -e "${GREEN}✓ Frontend built successfully${NC}"
echo ""

cd ../..

echo "Docker Setup..."
echo ""

if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠ Docker is not installed. Please install Docker to build images.${NC}"
else
    echo "Building Docker images..."
    docker build -t fakeneptun-backend:local ./backend
    docker build -t fakeneptun-frontend:local ./frontend/fakeNeptun
    echo -e "${GREEN}✓ Docker images built successfully${NC}"
fi

echo ""
echo "Setup Complete!"
echo ""
echo "Next Steps:"
echo "1. Configure GitHub Secrets (see CI-CD-README.md)"
echo "2. Set up SonarCloud integration"
echo "3. Set up Codecov integration"
echo "4. Configure Slack webhooks for notifications"
echo "5. Push to GitHub to trigger the CI/CD pipeline"
echo ""
echo "For detailed documentation, see: CI-CD-README.md"
echo ""
