# Node.js CI/CD Application

A production-ready Node.js web application with complete CI/CD pipeline using GitHub Actions.

## Features

- Express.js REST API
- Automated testing with Jest
- Code quality with ESLint
- Docker containerization
- GitHub Actions CI/CD
- Security scanning
- Health check endpoints

## Quick Start

1. **Clone and install:**
   ```bash
   git clone <repository-url>
   cd nodejs-cicd-project
   npm install
   ```

2. **Environment setup:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Run locally:**
   ```bash
   npm run dev
   ```

4. **Run tests:**
   ```bash
   npm test
   npm run test:coverage
   ```

## API Endpoints

- `GET /health` - Health check
- `GET /api/users` - Get users
- `POST /api/users` - Create user

## Docker

```bash
docker build -t nodejs-cicd-app .
docker run -p 3000:3000 nodejs-cicd-app
```

## CI/CD Pipeline

The GitHub Actions workflow automatically:
- Runs tests on Node.js 18.x and 20.x
- Performs code linting
- Builds Docker image
- Runs security scans
- Deploys to staging (on main branch)

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server
- `npm test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run lint` - Run ESLint