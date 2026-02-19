// src/components/Layout/PageLayout.tsx
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = "flex-col" }: PageLayoutProps) => {
  return <div className={`flex-1 flex ${className}`}>{children}</div>;
};
