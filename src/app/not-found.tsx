import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="select-none text-7xl font-bold text-muted-foreground/20">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Page not found</h1>
      <p className="mt-2 max-w-sm text-muted-foreground">
        That page doesn&apos;t exist. Let&apos;s get you back to today.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Today</Link>
      </Button>
    </div>
  );
}
