"use client";

import { useEffect, useRef } from "react";

export default function Header() {
  const dateRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const formattedDate = new Intl.DateTimeFormat("es-HN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

    if (dateRef.current) {
      dateRef.current.textContent = formattedDate;
    }
  }, []);

  return (
    <header className="w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 py-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#006184]">
              Sacrament Meeting Planner
            </p>

            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
              Barrio Comayagüela
            </h1>
          </div>

          <p
            ref={dateRef}
            className="min-h-5 text-sm capitalize text-slate-600"
          />
        </div>
      </div>
    </header>
  );
}
