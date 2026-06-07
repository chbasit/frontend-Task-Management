'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ArrowLeft, MailCheck } from 'lucide-react';
import { Button, Input } from '@/components/common';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/utils/validation';
import { authService } from '@/services/authService';

const getErrorMessage = (error: unknown, fallback: string) => {
  return error instanceof Error ? error.message : fallback;
};

export const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);
      setServerError(null);
      setSuccessMessage(null);
      await authService.resetPassword(data.email);
      setSuccessMessage('Demo reset link created. A real email requires a backend email provider.');
      reset();
    } catch (error: unknown) {
      setServerError(getErrorMessage(error, 'Failed to create reset request. Please try again.'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white items-center justify-center  px-5 py-10">
      <div className="w-full max-w-md">
        <Link
          href="/auth/login"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-600"
        >
          <ArrowLeft size={17} />
          Back to login
        </Link>

        <div className="rounded-xl  bg-white p-6 ">
          <div className="mb-7">
            <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <MailCheck size={22} />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Reset password
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter the email connected to your account. In this frontend demo we verify the email and show a reset confirmation.
            </p>
          </div>

          {serverError && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {serverError}
            </div>
          )}

          {successMessage && (
            <div className="mb-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm font-medium text-emerald-700">
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full"
            >
              Continue
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
