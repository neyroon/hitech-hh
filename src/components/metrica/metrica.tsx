"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    ym(105326975, "hit", url);
  }, [pathname, searchParams]);

  return null;
}
