# Gardemic - Garden Management System

**Gardemic** is a gardening companion that makes plant care easy. It tracks growth, automates task schedules, and keeps a digital journal of your garden—removing the guesswork so you can focus on helping your plants thrive.

## 🚀 Tech Stack

* **Frontend:** Next.js 16.0.7, React (Latest), TypeScript
* **Styling:** Tailwind CSS, shadcn/ui
* **Backend:** Supabase (PostgreSQL, Auth)
* **Authentication:** Supabase Auth (Google OAuth)
* **Deployment:** Vercel

## ✨ Features

* **🌿 Extensive Plant List**
  Browse through various plant species with detailed care requirements (light, water, temperature), growing conditions, and scientific identification guides.

* **📅 Task Scheduling and Reminders**
  Never miss watering or fertilizing again. The system uses a dedicated task tracking engine to manage descriptions, start/end dates, and completion status.

* **📝 Plant Care Journal and Logs**
  Track your plants' growth, health changes, and care activities with detailed logs and photo documentation over time.

* **📱 Mobile Accessibility**
  Access your plant care information anywhere with Gardemic's responsive mobile interface, perfect for caring for plants on the go.

## 📖 Usage Guide

1. **Sign Up & Login**
   Get started instantly by logging in with your Google account.

2. **Create a Garden**
   Establish your virtual growing space. Navigate to the gardens tab to create a new garden.

3. **Add Plants**
   Populate your garden by selecting plants from the extensive plant database. Once added, you can view specific care requirements tailored to that plant.

4. **Schedule Tasks**
   Ensure your plants thrive by assigning maintenance tasks. Set up reminders for watering, fertilizing, or pruning directly on specific plants within your garden.

5. **Journal Your Progress**
   Keep a living history of your garden. Create journal entries to document growth milestones, note health changes, or store personal observations over time.


## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```text
gardemic/
├── app/
│   ├── (auth)/             # Public routes (Login, Register)
│   ├── (authenticated)/    # Protected routes (Dashboard, Garden, Tasks)
│   └── layout.tsx          # Main application layout
├── components/
│   ├── ui/                 # Reusable UI components (shadcn/ui)
│   └── ...                 # Feature-specific components
├── lib/                    # Helper functions and business logic
├── public/                 # Static assets (images, icons)
├── types/                  # TypeScript type definitions
└── utils/                  # Utilities (e.g., Supabase client config)