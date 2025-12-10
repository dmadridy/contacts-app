import Footer from "./footer";
import Header from "./header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col p-4">
        {children}
      </main>
      <Footer />
    </div>
  );
}
