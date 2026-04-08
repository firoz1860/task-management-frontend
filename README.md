# TaskFlow — Web Frontend

<img width="1919" height="861" alt="image" src="https://github.com/user-attachments/assets/77d91e90-0a77-4498-85c4-9fa0f01b614f" />

<img width="1919" height="874" alt="image" src="https://github.com/user-attachments/assets/7adef1f4-c84e-4ac1-9145-677a51c4915c" />

<img width="1918" height="866" alt="image" src="https://github.com/user-attachments/assets/fc0c8458-44f7-4709-ba71-a0bfa7cc9c79" />

<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/1da71704-f1bf-4822-8f03-e8cd4640b343" />

<img width="1540" height="850" alt="image" src="https://github.com/user-attachments/assets/a7b657d4-892f-408a-a410-73c730933de0" />

Next.js 14 frontend for the TaskFlow Task Management System.

task-management-system/
├── backend/                          # Node.js + TypeScript + Prisma
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   ├── src/
│   │   ├── config/
│   │   │   ├── env.ts
│   │   │   └── cors.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   ├── error.middleware.ts
│   │   │   └── validate.middleware.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   │   ├── auth.controller.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.routes.ts
│   │   │   │   └── auth.dto.ts
│   │   │   └── tasks/
│   │   │       ├── tasks.controller.ts
│   │   │       ├── tasks.service.ts
│   │   │       ├── tasks.routes.ts
│   │   │       └── tasks.dto.ts
│   │   ├── utils/
│   │   │   ├── jwt.ts
│   │   │   ├── hash.ts
│   │   │   └── response.ts
│   │   ├── types/
│   │   │   └── express.d.ts
│   │   └── app.ts
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── frontend/                         # Next.js 14 + TypeScript + Tailwind
    ├── app/
    │   ├── (auth)/
    │   │   ├── login/
    │   │   │   └── page.tsx
    │   │   └── register/
    │   │       └── page.tsx
    │   ├── (dashboard)/
    │   │   └── tasks/
    │   │       ├── page.tsx
    │   │       └── [id]/
    │   │           └── page.tsx
    │   ├── api/
    │   │   └── refresh/
    │   │       └── route.ts
    │   ├── layout.tsx
    │   ├── globals.css
    │   └── page.tsx
    ├── components/
    │   ├── ui/
    │   │   ├── Button.tsx
    │   │   ├── Input.tsx
    │   │   ├── Modal.tsx
    │   │   ├── Toast.tsx
    │   │   └── Badge.tsx
    │   ├── tasks/
    │   │   ├── TaskCard.tsx
    │   │   ├── TaskForm.tsx
    │   │   ├── TaskFilters.tsx
    │   │   └── TaskList.tsx
    │   └── layout/
    │       ├── Navbar.tsx
    │       └── Sidebar.tsx
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useTasks.ts
    │   └── useToast.ts
    ├── lib/
    │   ├── api.ts                    # Axios instance with interceptors
    │   ├── auth.ts                   # Token helpers
    │   └── utils.ts
    ├── types/
    │   └── index.ts
    ├── context/
    │   ├── AuthContext.tsx
    │   └── ToastContext.tsx
    ├── .env.local
    ├── .env.example
    ├── .gitignore
    ├── next.config.ts
    ├── tailwind.config.ts
    ├── package.json
    └── README.md

## Tech Stack

- **Next.js 14** (App Router) — React framework
- **TypeScript** (strict) — Type safety
- **Tailwind CSS** — Custom dark design system
- **TanStack Query v5** — Server state, caching, mutations
- **React Hook Form** + **Zod** — Form validation
- **Axios** — HTTP client with interceptors
- **Sonner** — Toast notifications
- **Lucide React** — Icon system

## Getting Started

```bash
# 1. Install dependencies
cd frontend && npm install

# 2. Copy env file
cp .env.example .env.local

# 3. Set your API URL (backend must be running)
# NEXT_PUBLIC_API_URL=http://localhost:5000/api

# 4. Start dev server
npm run dev
```

App runs at `http://localhost:3000`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |

## Features

- 🔐 **Authentication** — Register, login, JWT auto-refresh
- ✅ **Task CRUD** — Create, read, update, delete tasks
- 🔄 **Optimistic Updates** — Instant UI feedback on toggle
- 🔍 **Filters & Search** — Debounced search, status/priority filters
- 📄 **Pagination** — Server-side pagination with smart page controls
- 📊 **Dashboard Stats** — Total, pending, in-progress, completed counts
- 📈 **Progress Bar** — Visual completion percentage
- 🔔 **Toast Notifications** — Success/error feedback
- 📱 **Fully Responsive** — Mobile-first, works on all screen sizes
- 🎨 **PWA Ready** — Installable, theme color, manifest
- 🌑 **Dark Mode** — Deep slate + warm amber design system

## Project Structure

```
app/              Next.js App Router pages
  (auth)/         Login & register pages
  (dashboard)/    Protected task pages with auth guard
components/
  ui/             Button, Input, Modal, Badge, Skeleton
  tasks/          TaskCard, TaskForm, TaskFilters
  layout/         Navbar with mobile hamburger menu
hooks/            useTasks (CRUD), useAuth, useDebounce
lib/
  api.ts          Axios instance with refresh token interceptor
  auth.ts         localStorage token helpers
  utils.ts        cn(), getInitials(), formatDate()
context/
  AuthContext.tsx User state + login/register/logout
types/            TypeScript interfaces
```

## Auth Flow

1. Login → tokens stored in `localStorage`
2. Every request: Axios adds `Authorization: Bearer <token>`
3. On 401: Axios interceptor tries token refresh
4. If refresh fails: clear tokens → redirect to `/login`
5. Multiple concurrent 401s are queued, only one refresh fires

## Design Decisions

| Decision | Why |
|----------|-----|
| TanStack Query | Handles caching, background refetch, mutations cleanly |
| Axios interceptors | Token refresh logic without polluting components |
| Optimistic updates | Toggle task feels instant — reverts on error |
| Mobile-first CSS | `xs:`, `sm:`, `lg:` breakpoints with `overflow-x: hidden` |
| `text-base sm:text-sm` on inputs | Prevents iOS Safari zoom on focus |

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Build production bundle |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript compiler check |
