import { Footer, Navbar } from "@/components";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar className="sticky top-0 shadow-lg" />
      <Footer className="mt-auto" />
    </main>
  );
}
