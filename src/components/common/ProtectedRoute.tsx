"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { hydrated, isAuthenticated, setHydrated } = useAuthStore();

  useEffect(() => {
    setHydrated();
  }, []);

  useEffect(() => {
    if (hydrated && !isAuthenticated) {
      router.replace("/auth/login");
    }
  }, [hydrated, isAuthenticated, router]);

  if (!hydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
};