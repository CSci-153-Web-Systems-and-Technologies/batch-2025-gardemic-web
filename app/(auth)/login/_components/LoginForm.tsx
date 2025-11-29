"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { InputField } from '@/components/InputField';
import { LoginFormProps } from '@/types';

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
      router.push("/");
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

  const handleGoogleLogin = () => {
    alert("Google login clicked!");
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

        <Button 
          type="button" 
          variant="outline"
          onClick={handleGoogleLogin}
          className="w-full py-5 bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 rounded-md flex items-center justify-center gap-2"
        >
          <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
          </svg>
          Continue with Google
        </Button>

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