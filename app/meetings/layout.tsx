import { Suspense } from "react";
import type { ReactNode } from "react";
import NavLinks from "../../components/NavLinks";

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout({ children }: MeetingsLayoutProps) {
  return (
    <section>
      <Suspense
        fallback={
          <div className="h-10 w-full max-w-sm animate-pulse rounded bg-slate-200" />
        }
      >
        <NavLinks />
      </Suspense>

      <div className="mt-6">{children}</div>
    </section>
  );
}
