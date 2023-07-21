import { Footer, Navbar } from "@/components";
import { HeroSection } from "@/modules";

export default function Home() {
  return (
    <main className="flex h-full flex-col">
      <Navbar className="sticky top-0 z-10 shadow-lg" />

      <HeroSection className="h-[calc(100vh-73px)]" />
      <Footer className="mt-auto" />
    </main>
  );
}
