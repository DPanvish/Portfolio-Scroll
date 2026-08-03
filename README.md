# System Architect — Premium Interactive Portfolio

A hyper-interactive, 3D developer portfolio built for the modern web. Designed with an ultra-premium "dark OLED" aesthetic, featuring GSAP-powered physics, 3D CSS transforms, and magnetic cursor interactions.

This repository (`portfolio-ui`) serves exclusively as the **frontend presentation layer**. It dynamically fetches your projects, experience, and bio from a shared headless database.

---

## 🏗️ System Architecture

This portfolio operates on a modern dual-repository architecture, decoupling the client presentation layer from the content management system:

1. **`portfolio-ui` (This Repo)**: The highly optimized, Next.js App Router frontend. It handles all visual animations (GSAP), smooth scrolling (Lenis), and client interactions. It connects directly to the database in read-only mode to render your content, and handles Contact Form POST requests (delivering emails via Resend).
2. **`portfolio-cms` (Admin Repo)**: The dedicated backend dashboard. You **must clone and run the CMS repository separately** to edit, add, or delete your Projects, Experience, Education, and About details. The CMS provides a secure GUI that writes to the shared MongoDB cluster.

By splitting the architecture, the UI remains blazingly fast and perfectly secure, while the CMS can be locked down and deployed privately.

---

## ⚡ Tech Stack

*   **Framework**: Next.js (App Router)
*   **Styling**: Tailwind CSS (with custom `preserve-3d` utilities)
*   **Animation Engine**: GSAP (ScrollTrigger, quickTo)
*   **Scroll Engine**: Lenis (Smooth scroll with synced GSAP ticker & ResizeObserver)
*   **Database**: MongoDB (Mongoose)
*   **Email Delivery**: Resend
*   **Typography**: Space Grotesk & Archivo

---

## 🚀 Getting Started

Follow these instructions to spin up the UI locally. 

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/portfolio-ui.git
cd portfolio-ui
```

### 2. Environment Variables
Create a `.env.local` file in the root directory. You will need to connect this UI to the same MongoDB cluster as your `portfolio-cms`.

```env
# Shared Database (Must match your portfolio-cms MongoDB URI)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio

# Contact Form Delivery (Resend API)
RESEND_API_KEY=re_your_resend_api_key
ADMIN_EMAIL=your.email@example.com
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📝 Managing Your Content (`portfolio-cms`)

If you see empty sections or need to update your data, you must spin up the CMS.

1. Clone your `portfolio-cms` repository.
2. Connect it to the exact same `MONGODB_URI` used in this UI repo.
3. Use the CMS dashboard to populate your data (Projects, Experience, Education).
4. Refresh this UI—the changes will instantly reflect via the Next.js API routes.

*Note: The system architecture no longer requires or filters by portfolio type. All active data fetched by this UI is globally synced from the CMS.*

---

## 📂 Folder Structure

```text
portfolio-ui/
├── app/                    # Next.js App Router root
│   ├── api/                # API Routes (Contact form, Data fetching)
│   ├── globals.css         # Tailwind styling and custom 3D utilities
│   ├── icon.svg            # Scalable vector favicon
│   ├── layout.tsx          # Global fonts, providers, and smooth scroll wrapper
│   └── page.tsx            # Main entry point assembling all sections
├── components/             # Reusable UI Components
│   ├── About.tsx           # About section with Interactive Lens
│   ├── Contact.tsx         # Secure contact form UI
│   ├── CustomCursor.tsx    # Global magnetic cursor logic
│   ├── Education.tsx       # 3D academic timeline
│   ├── Experience.tsx      # Sticky professional timeline
│   ├── Hero.tsx            # Immersive 3D interactive hero
│   ├── InteractiveLens.tsx # GSAP-driven cursor-tracking geometric figure
│   ├── Magnetic.tsx        # High-order component for elastic button snapping
│   ├── Projects.tsx        # Horizontal scroll pinned showcase
│   └── SmoothScroll.tsx    # Lenis scroll engine with ResizeObserver
├── lib/                    # Utilities and configs
│   ├── api.ts              # Frontend fetching logic (connects to CMS)
│   └── mongodb.ts          # Database connection utility
├── models/                 # Mongoose Schemas
│   └── Message.ts          # Contact form message schema
├── public/                 # Static assets
│   └── logo.svg            # Premium vector logo
├── .env.local              # Local environment variables (not tracked)
└── README.md               # Project documentation
```

---

## 🎨 Key Features

*   **Interactive 3D Lens**: A custom GSAP `quickTo` cursor-tracking eye in the About section.
*   **Magnetic Cursor Snap**: The custom cursor features difference-blending and elastic magnetic snapping to all interactive elements.
*   **Horizontal Cinematic Scroll**: The Projects section features a pinned horizontal scroll sequence with split-panel 3D glassmorphism cards.
*   **Liquid OLED Aesthetic**: Pure `#000000` backgrounds, neon blue accents, and deep SVG filters for a premium "System Architect" vibe.

## License
MIT License
