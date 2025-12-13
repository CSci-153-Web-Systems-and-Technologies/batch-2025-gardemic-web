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

type FieldErrors = {
  email?: string;
  password?: string;
};

export const LoginForm: React.FC<LoginFormProps> = ({ className, ...props }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  
  const [globalError, setGlobalError] = React.useState<string | null>(null);
  const [globalSuccess, setGlobalSuccess] = React.useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: FieldErrors = {};
    let isValid = true;

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }

    // Password Validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setFieldErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const supabase = createClient();
    setIsLoading(true);
    setGlobalError(null);
    setGlobalSuccess(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      router.refresh();
      router.push("/tasks");
    } catch (error: unknown) {
      setGlobalError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.MouseEvent) => {
    e.preventDefault();
    setGlobalError(null);
    setGlobalSuccess(null);

    // We only need the email for this
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldErrors({ email: "Please enter your email first to reset password" });
      return;
    }

    setIsLoading(true);
    const supabase = createClient();

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/update-password`
      });

      if (error) throw error;

      setGlobalSuccess("Password reset link sent! Check your ");
    } catch (error: unknown) {
      setGlobalError(error instanceof Error ? error.message : "Failed to send reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-accent-white p-4 ${className || ''}`} 
      {...props}
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-aclonica text-3xl md:text-5xl font-bold text-black mb-2">
            Welcome Back!
          </h1>
          <p className="text-black text-lg md:text-xl font-montserrat font-medium">
            Sign in to continue to your account
          </p>
        </div>

        {globalError && (
          <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200">
            {globalError}
          </div>
        )}


        {globalSuccess && (
          <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-lg border border-green-200">
            {globalSuccess}<a href='https://mail.google.com' className='underline font-extrabold'>email.</a>
          </div>
        )}

        <div className="space-y-4">
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors({...fieldErrors, email: undefined});
            }}
            required
            placeholder="your@email.com"
            error={fieldErrors.email} 
          />
          
          <InputField
            id="password"
            name="password"
            type="password"
            label="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) setFieldErrors({...fieldErrors, password: undefined});
            }}
            required
            placeholder="••••••••"
            error={fieldErrors.password}
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
            
            <button 
              type="button"
              onClick={handleForgotPassword}
              className="text-sm font-semibold text-sage-800 hover:underline bg-transparent border-none cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          <div className="pt-2">
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full text-base py-5 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
            >
              {isLoading ? "Loading..." : "Sign In"}
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

        <GoogleButton nextRoute='/tasks'/>

        <div className="mt-8 text-center text-sm">
          <span className="text-black">Don`t have an account? </span>
          <a 
            href="/create-account" 
            className="font-semibold text-sage-800 hover:underline"
          >
            Create one here
          </a>
        </div>
      </div>
    </div>
  );
};