"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button, Input } from "@/components/common";
import { loginSchema, LoginFormData } from "@/utils/validation";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

const getErrorMessage = (error: unknown, fallback: string) => {
  return error instanceof Error ? error.message : fallback;
};

export const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setServerError(null);
      const response = await authService.login(data);
      setAuth(response);
      router.push("/dashboard");
    } catch (error: unknown) {
      setServerError(getErrorMessage(error, "Invalid email or password"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen w-full bg-white lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
             
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Sign in to your workspace
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Manage projects, tasks, and team progress from one focused dashboard.
            </p>
          </div>

          {serverError && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div>{serverError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5  bg-white p-5 sm:p-6">
            <Input
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex min-h-10 cursor-pointer select-none items-center gap-3 font-medium text-slate-700">
                <input
                  type="checkbox"
                  className="h-5 w-5 cursor-pointer rounded border-slate-300 accent-blue-600"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/auth/forgot-password"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg text-base"
              variant="primary"
              size="md"
            >
              Sign In
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Do not have an account?
            <Link
              href="/auth/register"
              className="ml-2 font-bold text-blue-600 hover:text-blue-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <Image
          src="/login.jpg"
          alt="Project workspace"
          fill
          priority
          sizes="55vw"
          className="object-cover"
        />
        <div className="absolute inset-0 " />
        <div className="relative z-10 flex h-full items-end p-12 xl:p-16">
          
        </div>
      </section>
    </div>
  );
};
