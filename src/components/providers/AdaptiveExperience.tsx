"use client";

import { useEffect } from "react";

interface NetworkInformationLike extends EventTarget {
  effectiveType?: string;
  saveData?: boolean;
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformationLike;
}

export default function AdaptiveExperience() {
  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    const apply = () => {
      const constrained =
        connection?.saveData === true ||
        ["slow-2g", "2g"].includes(connection?.effectiveType ?? "");
      document.documentElement.toggleAttribute("data-low-bandwidth", constrained);
    };
    apply();
    connection?.addEventListener("change", apply);
    return () => connection?.removeEventListener("change", apply);
  }, []);

  return null;
}
