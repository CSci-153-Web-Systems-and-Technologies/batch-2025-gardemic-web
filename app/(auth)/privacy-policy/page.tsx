"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button'; 

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-accent-white py-10 px-4 md:px-6 font-montserrat">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-aclonica text-3xl md:text-5xl font-bold text-black mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-600 text-lg">
            Last Updated: December 13, 2025
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-10 border border-gray-200 shadow-sm space-y-8 text-gray-700">
          
          <section>
            <p className="leading-relaxed">
              Welcome to <strong>Gardemic</strong>. We value your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our web application.
            </p>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              1. Information We Collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-black">Account Information:</strong> When you sign up via Google OAuth, we collect your email address and name to create and authenticate your account.
              </li>
              <li>
                <strong className="text-black">User-Generated Content:</strong> We collect the data you explicitly enter into the app, including garden names, plant lists, task schedules, journal entries, and any uploaded photos.
              </li>
              <li>
                <strong className="text-black">Usage Data:</strong> We may collect technical logs regarding your device and interaction with the app to ensure mobile accessibility and system performance.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use your data solely to provide and improve the Gardemic service:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>To manage your account and authentication via Supabase Auth.</li>
              <li>To store and display your garden data, task schedules, and journal logs.</li>
              <li>To send you notifications or reminders for plant care tasks (watering, fertilizing, etc.).</li>
            </ul>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              3. Data Storage and Third Parties
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Database:</strong> Your data is securely stored using Supabase (PostgreSQL).</li>
              <li><strong>Hosting:</strong> Our services are deployed and hosted via Vercel.</li>
              <li><strong>Authentication:</strong> We use Google OAuth for secure login; we do not store your Google password.</li>
            </ul>
            <p className="mt-3 italic">We do not sell your personal data to advertisers or third parties.</p>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              4. Data Security
            </h2>
            <p>
              We implement standard security measures to protect your information. However, please be aware that no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              5. Your Rights
            </h2>
            <p>
              You have the right to access, update, or delete your account and associated journal/garden data at any time.
            </p>
          </section>
        </div>

        {/* Footer Action */}
        <div className="mt-8 text-center">
          <Link href="/">
            <Button variant="outline" className="border-gray-400 text-gray-700 hover:bg-gray-100">
              Return to Home
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}