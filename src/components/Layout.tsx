// src/components/Layout.tsx
import { ReactNode } from "react";
import Topbar from "./Topbar";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

export default function Layout({ title, children }: LayoutProps) {
  return (
    <div className="app-container">
      <Topbar />

      <main className="content">
        <h1 className="page-title">{title}</h1>
        {children}
      </main>
    </div>
  );
}
