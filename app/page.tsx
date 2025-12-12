import NavBar from "@/components/NavBar";
import DecisionScreen from "@/components/DecisionScreen";
import Features from "@/components/Features";
import AuthImage from "@/public/auth-bg-image.png"
import Image from "next/image";
import GardemicLogo from "@/public/gardemic-logo.svg";
import AuthButtons from "@/components/AuthButtons";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start py-2 text-accent-white bg-linear-to-b from-primary-green to-accent-green">

      <div className="absolute inset-0 z-0 flex sm:hidden">
        <Image
          src={AuthImage}
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>


      <main className="relative z-10 flex-1 w-full flex flex-col items-center gap-20 sm:items-start">
        <nav className="w-full hidden border-b border-b-foreground/10 bg-primary-green h-20 sm:flex">
          <NavBar />
        </nav>

        <div className="flex flex-col items-center justify-center grow w-full max-w-xl p-4 sm:hidden">
          <Image
            src={GardemicLogo}
            alt="Gardemic Logo"
            width={80}
            height={80}
            className="bg-white rounded-full mb-4"
          />
          <h1 className="text-4xl font-aclonica text-center mb-8">
            Gardemic
          </h1>
          <h2 className="text-3xl font-aclonica text-center mb-12">
            Grow a Garden<br />Grow a Future
          </h2>
          <AuthButtons />
        </div>

        <div className="hidden sm:block w-full">
          <DecisionScreen />
          <span className="mt-20"></span>
          <Features />
        </div>

      </main>
    </div>
  );
}