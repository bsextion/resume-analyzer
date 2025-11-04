# Resume Analyzer

Analyze resumes against roles and present scores, summaries, and insights in a modern React app.

## Table of Contents
- [About](#about)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How To Build and Run locally](#how-to-build-and-run-locally)
- [Available Scripts](#available-scripts)
- [Docker](#docker)
- [Entry Points](#entry-points)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## About
This project is a full‑stack React application built on React Router v7 with server‑side rendering (SSR) by default. It provides an interface to upload and analyze resumes.

## Tech Stack
- Language: TypeScript
- Runtime: Node.js (tested with Node 20)
- Framework: React 19 + React Router 7 (SSR enabled)
- Dev Server/Bundler: Vite 7
- Styling: Tailwind CSS 4
- State Management: Zustand
- File Uploads: react-dropzone
- PDF parsing/viewing: pdfjs-dist
- Package manager: npm (lockfile: `package-lock.json`)
- Other: Puter.js

## Getting Started
### Prerequisites
- Node.js 20.x recommended (matches Docker base image)
- npm 10+

### Installation
Install dependencies:
```bash
npm install
```

### Development (HMR)
Start the dev server (Vite + React Router):
```bash
npm run dev
```
The app will be available at http://localhost:5173

## How To Build and Run locally
### Build
Create a production build:
```bash
npm run build
```
This generates the `build/` directory with `client/` (static assets) and `server/` (SSR server bundle).

### Run the production server
Serve the built SSR app locally:
```bash
npm run start
```
By default it serves the compiled server at `./build/server/index.js` using `@react-router/serve`.

### Type checking
```bash
npm run typecheck
```
Runs React Router type generation and `tsc`.

## Available Scripts
Defined in `package.json`:
- `npm run dev` → Start development server with HMR
- `npm run build` → Build client and server bundles via React Router build
- `npm run start` → Serve the built server bundle with `react-router-serve`
- `npm run typecheck` → Generate router types and run TypeScript

## Docker
Build and run using the provided multi‑stage `Dockerfile`:
```bash
# Build image
docker build -t resume-analyzer .

# Run the container (adjust port as needed)
docker run --rm -p 3000:3000 resume-analyzer
```
Notes:
- The image uses Node 20 on Alpine.
- `npm ci` is used for reproducible installs; dev dependencies are omitted in the runtime image.
- The container runs `npm run start` and serves the SSR build.

## Configuration
- SSR can be toggled in `react-router.config.ts` (`ssr: true | false`).
- Tailwind CSS is preconfigured via `@tailwindcss/vite` plugin and `app/app.css`.
- Vite plugins: `tailwindcss()`, `reactRouter()`, and `tsconfigPaths()` are enabled in `vite.config.ts`.

## Troubleshooting
- After adding new routes/components, if types are missing, run `npm run typecheck`.
- If `npm run start` fails, ensure you built first (`npm run build`).
- Node version mismatches can cause install/build issues; prefer Node 20.x.

---
Built with ❤️ using React Router, Vite, and TypeScript.
