# Mathew Rafael Bulawan Portfolio

Personal portfolio website built with Next.js, React, TypeScript, and Framer Motion. It showcases Mathew Rafael Bulawan's background, featured projects, technical skills, work experience, and contact details.

The site also includes **EDITH**, a floating portfolio assistant powered by Hugging Face Inference. EDITH answers questions about Mathew's resume, projects, skills, experience, and contact information, and can fall back to public Wikipedia summaries for general questions.

## Live Sections

- Home: short introduction and hero content
- About: education, skills, and experience
- Projects: featured builds with filters and live/source links
- Contact: email and social links
- EDITH chatbot: floating assistant in the bottom-right corner

## Featured Projects

### EIMCognito
Web-based gamified learning platform for teens studying Electrical Installation & Maintenance and solar (PV) systems.

- Role-based access for superadmin, teachers/admins, and students
- Mission and quiz management
- Leaderboards, coin rewards, and reward shop
- Approval-based redemptions and progress tracking

### Market Scoping & Survey System
Full-stack procurement platform for the Baliwag School Division Office.

- Vendor management and purchase request processing
- React frontend with Node.js/Express backend
- Role-based access control and JWT auth
- Email notifications, document workflows, and deployment-ready setup

### Fuel Injected Motorcycle Maintenance Device
IoT predictive maintenance platform for motorcycle engine health monitoring.

- OBD-II data ingestion and MQTT streaming
- Python ML anomaly detection models
- Flask REST API and InfluxDB time-series storage
- Real-time React dashboard and maintenance reporting

## Tech Stack

- Frontend: Next.js, React, TypeScript, Framer Motion
- Backend: Node.js, Express, Flask
- Database: PostgreSQL, MySQL, InfluxDB, Supabase
- ML / Data: Python, scikit-learn, pandas
- DevOps / Tools: Docker, Vercel, Render, AWS, Microsoft Azure, Git, GitHub, Postman, MQTT

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm, pnpm, yarn, or bun

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

## Environment Variables

Create a `.env.local` file in the project root for local secrets and demo settings.

```env
HF_TOKEN=your_hugging_face_token_here
HF_MODEL=meta-llama/Llama-3.1-8B-Instruct:novita
GEMINI_DEMO_QUESTIONS=5
```

- `HF_TOKEN` is required for EDITH
- `HF_MODEL` is optional if you want to change the model name
- `GEMINI_DEMO_QUESTIONS` sets the visible demo quota shown in the chat UI

## Project Structure

```text
src/app/
	api/chat/route.ts      # Hugging Face chat endpoint
	components/            # Portfolio sections and EDITH chatbot
	globals.css            # Global styles
	layout.tsx             # App shell
	page.tsx               # Main portfolio page
public/                  # Images, icons, and resume assets
```

## EDITH Behavior

- Answers Mathew-specific questions using the resume context in the app
- Uses a short fallback message when the free-tier quota is reached
- Can try a Wikipedia lookup for general knowledge questions before responding
- Shows a visible remaining-question counter in the chat header

## Deploying to GitHub

If you want to push this repo to GitHub, run these commands from the project root:

```bash
git status
git add .
git commit -m "Add portfolio README and EDITH chatbot"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If your repo already has a remote, skip the `git remote add origin ...` line.

## Notes

- The project already ignores `.env*` files, so your token stays out of GitHub.
- EDITH is a fan-inspired assistant name and is used only for this portfolio chatbot.
