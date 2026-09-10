import Link from "next/link";

import { cn } from "@/shared-libs/utils";
import { PAGES } from "@/shared/constants/page.constant";

import styles from "./layout.module.scss";

export default function AuthLayout({ children }: LayoutProps<"/auth">) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-border bg-background">
        <div className="mx-auto flex h-full w-full max-w-[1024px] items-center justify-between px-4">
          <span className="text-sm font-semibold tracking-tight text-foreground">
            PLACEHOLDER
          </span>
          <Link
            href={PAGES.HOME.pathname}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex min-h-screen items-center justify-center px-4 pt-[calc(3.5rem+2rem)] pb-8">
        <div
          className={cn(
            "max-h-[calc(100vh-7.5rem)] w-full max-w-[1024px] overflow-y-auto",
            styles.scrollArea,
          )}
        >
          {children}
        </div>
      </main>
    </>
  );
}
