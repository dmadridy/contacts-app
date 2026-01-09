import { Outlet } from "react-router-dom";

import Footer from "./footer";
import Header from "./header";

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex flex-1 flex-col p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
