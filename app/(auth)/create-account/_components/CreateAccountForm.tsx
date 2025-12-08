"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/InputField';
import { CreateAccountFormProps } from '@/types';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

import GoogleButton from '@/components/GoogleSignInButton';


export const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ className, ...props }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState<{
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const validateForm = () => {
    const newErrors: typeof errors = {};
    
    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setErrors({});

    try {
      const supabase = createClient();
      
      // Simulated Supabase signup - replace with actual implementation
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/main-page`,
          data: {
            username: username,
          }
        },
      });
      
      if (error) throw error;
      
      // Success - redirect to success page
      alert(`Account created successfully for ${email}! Please check your email to verify your account.`);
      router.push("/sign-up-success");
      
    } catch (error: unknown) {
      // Handle Supabase errors
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      
      // Set appropriate field errors based on error message
      if (errorMessage.toLowerCase().includes("email")) {
        setErrors({ email: errorMessage });
      } else if (errorMessage.toLowerCase().includes("password")) {
        setErrors({ password: errorMessage });
      } else {
        setErrors({ email: errorMessage });
      }
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-accent-white p-4 ${className || ''}`} 
      {...props}
    >
      <div className="w-full max-w-xl px-4">
        <div className="text-center my-8">
          <h1 className="font-aclonica text-4xl font-bold text-black mb-2">
            Create your Gardemic Account
          </h1>
        </div>

        <div className="rounded-lg bg-accent-white">
          <div className="space-y-8">
            <InputField
              id="username"
              name="username"
              type="text"
              label="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) setErrors({ ...errors, username: undefined });
              }}
              required
              error={errors.username}
            />

            <InputField
              id="email"
              name="email"
              type="email"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              required
              error={errors.email}
            />
            
            <InputField
              id="password"
              name="password"
              type="password"
              label="Create Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
              required
              error={errors.password}
            />

            <InputField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
              }}
              required
              error={errors.confirmPassword}
            />

            <div className="pt-2">
              <Button
                onClick={handleSignUp}
                disabled={isLoading}
                className="w-full text-base py-5 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>

            <div className="text-center text-xs text-gray-600 pt-1">
              By creating an account, you agree to Gardemic`s{" "}
              <a href="#" className="underline hover:text-gray-800">Privacy Policy</a>
              {" "}&{" "}
              <a href="#" className="underline hover:text-gray-800">Terms of Use</a>
            </div>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-800/20"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-accent-white px-2 text-gray-600 text-sm font-normal">Or</span>
            </div>
          </div>

          <GoogleButton />

          <div className="mt-6 text-center text-sm">
            <span className="text-black">Have an account? </span>
            <a 
              href="/login" 
              className="font-semibold text-sage-800 hover:underline"
            >
              Sign In here
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};