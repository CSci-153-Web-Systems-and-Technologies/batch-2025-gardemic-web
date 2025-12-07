"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { InputField } from '@/components/InputField';
import { CreateAccountFormProps } from '@/types';
import { useRouter } from 'next/navigation';

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
  const [isLoading] = React.useState(false);




  const handleGoogleSignUp = () => {
    alert("Google sign up clicked!");
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
                // onClick={handleSignUp}
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

          <Button 
            type="button" 
            variant="outline"
            onClick={handleGoogleSignUp}
            className="w-full py-5 bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 rounded-md flex items-center justify-center gap-2"
          >
            <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
              <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
            Continue with Google
          </Button>

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