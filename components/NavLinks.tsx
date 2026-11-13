"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "All Meetings", href: "/meetings" },
  { name: "Current Meeting", href: "/meetings/current" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Meetings navigation">
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const isCurrent =
            link.href === "/meetings"
              ? pathname === "/meetings"
              : pathname.startsWith(link.href);

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                className={`inline-flex items-center rounded-sm border px-4 py-2 text-sm font-semibold transition-colors ${
                  isCurrent
                    ? "border-[#006184] bg-[#006184] text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
