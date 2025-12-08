"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { InputField } from '@/components/InputField';
import { LoginFormProps } from '@/types';
import GoogleButton from '@/components/GoogleSignInButton';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export const LoginForm: React.FC<LoginFormProps> = ({ className, ...props }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // Update this route to redirect to an authenticated route. The user already has an active session.
      router.push("/tasks");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(e);
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-accent-white p-4 ${className || ''}`} 
      {...props}
    >
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <h1 className="font-aclonica text-5xl font-bold text-black mb-2">Welcome Back!</h1>
          <p className="text-black text-xl font-montserrat font-medium">Sign in to continue to your account</p>
        </div>

        {/* {error && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {error}
          </div>
        )} */}

        <div className="space-y-4">
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
          />
          
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label 
                htmlFor="remember" 
                className="text-sm font-normal cursor-pointer"
              >
                Remember me
              </Label>
            </div>
            <a 
              href="#" 
              className="text-sm font-semibold text-sage-800 hover:underline"
            >
              Forgot password?
            </a>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full text-base py-5 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-800/20"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#F4F7E6] px-2 text-gray-600 text-sm font-normal">Or</span>
          </div>
        </div>

        <GoogleButton />

        <div className="mt-8 text-center text-sm">
          <span className="text-black">Don`t have an account? </span>
          <a 
            href="#" 
            className="font-semibold text-sage-800 hover:underline"
          >
            Create one here
          </a>
        </div>
      </div>
    </div>
  );
};