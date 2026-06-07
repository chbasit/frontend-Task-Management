"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

import { Button, Input } from "@/components/common";
import { registerSchema, RegisterFormData } from "@/utils/validation";
import { authService } from "@/services/authService";

const getErrorMessage = (error: unknown, fallback: string) => {
  return error instanceof Error ? error.message : fallback;
};

export const RegisterForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

 const onSubmit = async (data: RegisterFormData) => {
  try {
    setIsLoading(true);
    setServerError(null);

    await authService.register(data);

    router.push("/auth/login");

  } catch (error: unknown) {

    setServerError(
      getErrorMessage(error, "Unable to create account")
    );

  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="grid min-h-screen w-full bg-white lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <section className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
           
            <h1 className="text-3xl font-bold tracking-tight text-black text-center">
              Create your account
            </h1>
             
          </div>

          {serverError && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <div>{serverError}</div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-5  sm:p-6">
            <Input
              label="Full Name"
              placeholder="John Doe"
              {...register("name")}
              error={errors.name?.message}
            />

            <Input
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              {...register("email")}
              error={errors.email?.message}
            />

            <Input
              label="Password"
              placeholder="Create a password"
              type="password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              {...register("confirmPassword")}
              error={errors.confirmPassword?.message}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg text-base"
              variant="primary"
              size="md"
            >
              Create Account
              <ArrowRight size={18} />
            </Button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-600">
            Already have an account?
            <Link
              href="/auth/login"
              className="ml-2 font-bold text-blue-600 hover:text-blue-700"
            >
              Sign in
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
       
      </section>
    </div>
  );
};
