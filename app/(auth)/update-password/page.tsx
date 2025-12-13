"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/InputField';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function UpdatePassword() {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  
  const router = useRouter();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setMessage("Password updated successfully! Redirecting...");
      
      setTimeout(() => {
        router.push("/tasks");
      }, 2000);

    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-accent-white py-10 px-4 md:px-6">
      <div className="w-full max-w-xl">
        <div className="text-center my-8">
          <h1 className="font-aclonica text-2xl md:text-4xl font-bold text-black mb-2">
            Reset Your Password
          </h1>
          <p className="text-gray-600 font-montserrat">
            Enter your new password below.
          </p>
        </div>

        <div className="rounded-lg bg-accent-white">
          {error && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-lg border border-green-200">
              {message}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-6 md:space-y-8">
            <InputField
              id="new-password"
              name="password"
              type="password"
              label="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <InputField
              id="confirm-password"
              name="confirmPassword"
              type="password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full text-base py-5 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
              >
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}