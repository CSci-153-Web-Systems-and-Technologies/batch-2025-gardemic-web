import NavBar from "@/components/NavBar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex-1 w-full flex flex-col items-center justify-between gap-20 sm:items-start">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-20 ">
          <NavBar />
        </nav>
      </main>
    </div>
  );
}
