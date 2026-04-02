import type { Metadata, Viewport } from "next";
import { Outfit, Fira_Code } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TaskFlow — Manage Your Tasks",
    template: "%s | TaskFlow",
  },
  description:
    "A beautiful, modern task management system to keep your work organized and flowing.",
  keywords: ["task management", "productivity", "todo", "taskflow"],
  authors: [{ name: "TaskFlow" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><rect width='512' height='512' fill='%231e3a8a'/><path d='M 140 280 L 230 370 L 390 140' stroke='%23ffffff' stroke-width='60' fill='none' stroke-linecap='round' stroke-linejoin='round'/><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%23fff;stop-opacity:0.08' /><stop offset='100%' style='stop-color:%23000;stop-opacity:0.12' /></linearGradient></defs><rect width='512' height='512' fill='url(%23grad)'/></svg>",
        type: "image/svg+xml",
      },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020817" },
    { media: "(prefers-color-scheme: light)", color: "#1e3a8a" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${firaCode.variable} light`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme') || 'light';
                if (savedTheme === 'dark') {
                  document.documentElement.classList.remove('light');
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="antialiased font-sans bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <div className="min-h-screen bg-white dark:bg-slate-950">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
