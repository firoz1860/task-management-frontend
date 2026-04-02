import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-slate-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
          Page not found
        </p>
        <Link href="/tasks">
          <Button>Back to Tasks</Button>
        </Link>
      </div>
    </div>
  );
}
