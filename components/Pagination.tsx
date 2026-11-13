"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));

    return `${pathname}?${params.toString()}`;
  }

  const linkClasses = `
    inline-flex items-center justify-center
    rounded-sm border border-[color:var(--color-muted)]/30
    bg-[var(--color-surface)] px-4 py-2
    text-sm font-semibold text-[color:var(--color-primary)]
    transition-colors
    hover:border-[color:var(--color-primary)]
    hover:bg-[var(--color-background)]
    focus-visible:outline-2
    focus-visible:outline-offset-2
    focus-visible:outline-[color:var(--color-primary)]
  `;

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-3"
    >
      {currentPage > 1 && (
        <Link
          href={createPageURL(currentPage - 1)}
          className={linkClasses}
        >
          Previous
        </Link>
      )}

      <span className="text-sm text-[color:var(--color-muted)]">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link
          href={createPageURL(currentPage + 1)}
          className={linkClasses}
        >
          Next
        </Link>
      )}
    </nav>
  );
}