# ⚡ Abhicode Frontend

A high-performance, developer-first coding practice and problem-solving web platform built for **Abhicode**. Designed with rich aesthetics, instant search/filtering, full Markdown statement rendering with syntax highlighting, and an AMOLED pure black dark theme.

[![Production App](https://img.shields.io/badge/Production%20App-Live%20on%20Vercel-success?style=for-the-badge&logo=vercel)](https://abhicode-frontend.vercel.app)
[![API Service](https://img.shields.io/badge/API%20Backend-problem--service.vercel.app-blue?style=for-the-badge&logo=vercel)](https://problem-service.vercel.app)

Frontend client for [`Abhicode-problem-service`](https://github.com/Abhi-lab645/Abhicode-problem-service).

---

## 🌐 Production Deployments

- **Live Web Application:** [https://abhicode-frontend.vercel.app](https://abhicode-frontend.vercel.app)
- **Live Backend API:** [https://problem-service.vercel.app](https://problem-service.vercel.app)

---

## 📌 Features

### 🌟 1. AMOLED Pure Black Dark Theme & Dynamic Theming
- **True Pitch Black (`#000000`)**: Engineered for OLED/AMOLED displays with zero grayish cast.
- **Deep Obsidian Surfaces**: Interactive containers (`#0A0A0C`), specimen inputs (`#050507`), and raised cards (`#121318`) with crisp hairline borders (`#1E222D`).
- **High-Contrast Glow Accents**: Electric orange branding (`#FF5A1F`), cyan/blue topic pills, and neon difficulty meters (Emerald Easy, Amber Medium, Rose Hard).
- **Light Theme**: Clean, high-legibility modern workspace aesthetic.
- **Theme Persistence**: Automatic synchronization with system preference and manual toggle persisted in `localStorage`.

### 📚 2. Problem Set Catalog & Discovery
- **Hero & Search Banner**: Welcoming hero section with problem search, category filters, and quick problem creation.
- **Instant Search**: Search problems in real-time by title or public problem identifier (`ABH-0001`).
- **Filter Pills**: One-click difficulty filtering (`All`, `Easy`, `Medium`, `Hard`) and topic tags.
- **Topic Tags**: Direct visual tagging for DSA concepts (e.g., *Array*, *Hash Map*, *Dynamic Programming*, *Two Pointers*).

### 📖 3. Problem Detail View
- **Rich Markdown Statements**: Full GitHub-Flavored Markdown (GFM) support with tables, math lists, and blockquotes.
- **Syntax Highlighting**: Code fences highlighted with Prism.js (JavaScript, TypeScript, Python, C++, Java, Bash).
- **Test Case Specimens**: Formatted specimen boxes with separated inputs and expected outputs.
- **Metadata Rail**: Sticky desktop rail and collapsible mobile drawer displaying public ID (`ABH-0001`), database identifier, test case count, difficulty tier, and topic pills.
- **Editorial Notes**: Collapsible solution discussions and complexity notes.

### ✍️ 4. Authoring & Editing Studio
- **Dual-Pane Live Preview**: Split-screen Markdown editor with real-time rendered specimen preview.
- **Interactive Topic Tagging**: Comma-separated input plus one-click suggestion chips.
- **Dynamic Specimen Manager**: Add, edit, or delete test case input/output specimens with inline validation.
- **Client & Server Validation**: Prevents invalid difficulty tiers or incomplete specimens before committing to the API.

### 🛠️ 5. Problem Administration Console
- Dedicated management dashboard for direct problem-service administration.
- Full CRUD operations with instant deletion confirmation modals.

---

## 🛠️ Technology Stack

| Layer | Library / Tool | Description |
| :--- | :--- | :--- |
| **Framework** | [React 19](https://react.dev/) | Modern UI component model |
| **Build Tool** | [Vite 8](https://vite.dev/) | Fast build tool and dev server |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict static typing across models and APIs |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first responsive design system |
| **Server State** | [TanStack React Query v5](https://tanstack.com/query) | Caching, deduplication, and background synchronization |
| **Routing** | [React Router v7](https://reactrouter.com/) | Client-side routing and deep-linking |
| **Markdown** | [react-markdown](https://github.com/remarkjs/react-markdown) + [remark-gfm](https://github.com/remarkjs/remark-gfm) | Safe, extensible GitHub-Flavored Markdown |
| **Syntax Highlighting** | [PrismJS](https://prismjs.com/) | Polyglot code syntax formatting |
| **Primitives** | [Radix UI](https://www.radix-ui.com/) | Accessible unstyled dialogs and modals |
| **Icons** | [Lucide React](https://lucide.dev/) | Consistent, clean icon set |
| **Deployment** | [Vercel](https://vercel.com/) | Global edge hosting with SPA rewrites |

---

## 📁 Directory Structure

```
abhicode-frontend/
├── index.html                        # Application HTML entry point
├── package.json                      # Frontend dependencies & scripts
├── tsconfig.json                     # TypeScript compiler configuration
├── vite.config.ts                    # Vite build & plugin configuration
├── tailwind.config.js                # Tailwind theme tokens & color definitions
├── postcss.config.js                 # PostCSS setup
├── vercel.json                       # Vercel SPA routing rewrite rules
├── .env.example                      # Template for environment variables
├── .env.production                   # Production environment configuration
├── public/                           # Static assets, logos, and illustrations
└── src/
    ├── main.tsx                      # Mount point with QueryClientProvider & router
    ├── App.tsx                       # Root router configuration
    ├── index.css                     # Global tokens, OLED dark theme, and Markdown CSS
    ├── api/
    │   ├── client.ts                 # Fetch wrapper with auto URL normalization & error handling
    │   └── problems.ts               # Typed API services for all problem endpoints
    ├── components/
    │   ├── layout/
    │   │   ├── Header.tsx            # Sticky navigation bar with theme toggle
    │   │   ├── Footer.tsx            # Platform footer
    │   │   └── Layout.tsx            # Main responsive layout wrapper
    │   ├── problem/
    │   │   ├── ProblemRow.tsx        # Problem table row component
    │   │   ├── ProblemFilters.tsx    # Search input and difficulty/topic filters
    │   │   ├── ProblemForm.tsx       # Create/Edit problem form with live split preview
    │   │   └── DeleteConfirmDialog.tsx # Safe deletion modal
    │   └── ui/
    │       ├── Button.tsx            # Primary, secondary, ghost, danger button variants
    │       ├── Input.tsx             # Accessible text input component
    │       ├── Dialog.tsx            # Radix UI modal wrapper
    │       ├── DifficultyMeter.tsx   # Easy / Medium / Hard colored badges
    │       ├── MarkdownRenderer.tsx  # GFM parser + Prism code highlighter
    │       └── Skeleton.tsx          # Pulse placeholder skeletons
    ├── hooks/
    │   ├── useProblems.ts            # TanStack Query hooks for CRUD operations
    │   └── useTheme.ts               # Light/Dark mode state and DOM attribute synchronization
    ├── pages/
    │   ├── ProblemListPage.tsx       # Browse all problems with hero & filters
    │   ├── ProblemDetailPage.tsx     # Problem statement, test cases, and metadata rail
    │   ├── ProblemCreatePage.tsx     # Problem creation page
    │   ├── ProblemEditPage.tsx       # Problem editing page
    │   ├── ManagePage.tsx            # Management Console
    │   └── NotFoundPage.tsx          # 404 error page
    └── types/
        └── problem.ts                # TypeScript interfaces (Problem, TestCase, CreateProblemInput)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20 or higher
- **npm** or **yarn** / **pnpm**
- **Abhicode Problem Service**: Backend running locally on `http://localhost:3001` or deployed on `https://problem-service.vercel.app`

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/Abhi-lab645/Abhicode-frontend.git
cd Abhicode-frontend

# Install dependencies
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Local Development:
VITE_API_BASE_URL=http://localhost:3001

# Or connect directly to Production:
# VITE_API_BASE_URL=https://problem-service.vercel.app
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 4. Build for Production

```bash
npm run build
```

To preview the production bundle locally:
```bash
npm run preview
```

---

## 🔗 Backend Microservice Integration

This frontend communicates with the **Abhicode Problem Service** REST API:

- `GET /api/v1/problems` — Fetch all problems (supports `?search=` and `?difficulty=`)
- `GET /api/v1/problems/:id` — Dual-lookup problem by public ID (`ABH-0001`) or MongoDB ObjectId
- `POST /api/v1/problems` — Create problem with auto-assigned sequential `problemId`
- `PUT /api/v1/problems/:id` — Update problem details and topics
- `DELETE /api/v1/problems/:id` — Remove problem from catalog

---

## 📄 License

ISC © [Abhinav Kumar](https://github.com/Abhi-lab645)
