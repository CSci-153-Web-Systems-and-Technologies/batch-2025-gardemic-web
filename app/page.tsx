import NavBar from "@/components/NavBar";
import DecisionScreen from "@/components/DecisionScreen";
import Features from "@/components/Features";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-2 bg-linear-to-b from-primary-green to-accent-green text-accent-white">
      <main className="flex-1 w-full flex flex-col items-center gap-20 sm:items-start">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 bg-primary-green h-20">
          <NavBar />
        </nav>

        <DecisionScreen />

        <span className="mt-20"></span>

        <Features />

      </main>
    </div>
  );
}
