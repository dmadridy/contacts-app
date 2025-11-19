import Header from "./header";
import Footer from "./footer";
import { Toaster } from "@/components/ui/sonner";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Header />
      <main className="flex-1 flex flex-col container mx-auto p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
