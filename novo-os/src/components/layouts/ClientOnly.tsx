"use client";

// Imports
// ========================================================
import React, { useEffect, useState } from "react";

// Page
// ========================================================
export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  // State / Props
  const [hasMounted, setHasMounted] = useState(false);

  // Hooks
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Render
  if (!hasMounted) return null;

  return <div>{children}</div>;
}
