"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    if (params.toString() === searchParams.toString()) {
      return;
    }

    push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, 300);

  useEffect(() => {
    function restoreSearchFromURL() {
      handleSearch.cancel();

      const params = new URLSearchParams(window.location.search);

      if (inputRef.current) {
        inputRef.current.value = params.get("query") ?? "";
      }
    }

    window.addEventListener("popstate", restoreSearchFromURL);

    return () => {
      window.removeEventListener("popstate", restoreSearchFromURL);
      handleSearch.cancel();
    };
  }, [handleSearch]);

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[color:var(--color-muted)]"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </svg>

      <input
        ref={inputRef}
        type="search"
        placeholder="Search by speaker, leader, or meeting type..."
        defaultValue={searchParams.get("query") ?? ""}
        onChange={(event) => handleSearch(event.target.value)}
        aria-label="Search meetings"
        style={{
          minHeight: "56px",
          padding: "12px 18px 12px 48px",
          borderRadius: "8px",
          border:
            "1.5px solid color-mix(in srgb, var(--color-primary) 55%, var(--color-surface))",
          backgroundColor: "var(--color-surface)",
          color: "var(--color-text)",
        }}
        className="
          block w-full
          text-base
          shadow-sm
          transition-shadow
          placeholder:text-[color:var(--color-muted)]
          hover:shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-[color:var(--color-primary)]
        "
      />
    </div>
  );
}