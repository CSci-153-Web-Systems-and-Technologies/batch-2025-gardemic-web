"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-accent-white py-10 px-4 md:px-6 font-montserrat">
      <div className="w-full max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="font-aclonica text-3xl md:text-5xl font-bold text-black mb-4">
            Terms of Service
          </h1>
          <p className="text-gray-600 text-lg">
            Last Updated: December 13, 2025
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-10 border border-gray-200 shadow-sm space-y-8 text-gray-700">
          
          <section>
            <p className="leading-relaxed">
              By accessing or using <strong>Gardemic</strong>, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              1. Description of Service
            </h2>
            <p>
              Gardemic is a garden management system designed to help users track plant growth, automate task schedules, and maintain a digital journal of their garden.
            </p>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              2. User Accounts
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You are responsible for maintaining the security of your account credentials (Google Login).</li>
              <li>You agree to provide accurate information when creating your profile.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              3. User Content
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You retain ownership of all content you submit to Gardemic, including journal entries, plant logs, and photos.</li>
              <li>By using the service, you grant Gardemic a license to store and display this content solely for the purpose of providing the service to you.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              4. Disclaimer of Warranties
            </h2>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r">
              <p className="text-orange-900 font-medium">
                Gardemic is a companion tool.
              </p>
              <p className="text-orange-800 text-sm mt-1">
                While we strive to provide accurate plant care requirements (light, water, temperature) and scientific identification guides, <strong>we do not guarantee the survival or health of your plants.</strong> Environmental factors vary, and our data should be used as a guide, not a guarantee.
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              5. Prohibited Conduct
            </h2>
            <p className="mb-2">You agree not to misuse the service, including but not limited to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Attempting to disrupt the service's backend or security.</li>
              <li>Uploading malicious content or data.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-aclonica text-xl md:text-2xl text-black mb-4">
              6. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at <a href="mailto:gardemic.dev@gmail.com" className="text-green-700 underline font-medium">gardemic.dev@gmail.com</a>.
            </p>
          </section>
        </div>

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