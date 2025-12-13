"use client";

import { Button } from "./ui/button";
import { createClient } from "@/utils/supabase/client";

interface GoogleButtonProps {
  nextRoute?: string; 
  text?: string;    
}

export default function GoogleButton({ 
  nextRoute = "/tasks", 
  text = "Continue with Google" 
}: GoogleButtonProps) {
  
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    
    const redirectTo = `${window.location.origin}/auth/callback?next=${nextRoute}`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectTo,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Google Login Error:", error);
    }
  };

  return (
    <Button 
      type="button" 
      variant="outline"
      onClick={handleGoogleLogin}
      className="w-full py-5 bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 rounded-md flex items-center justify-center gap-2"
    >
      <svg className="h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
      </svg>
      {text}
    </Button>
  );
}