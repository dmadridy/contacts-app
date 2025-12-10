export default function Footer() {
  return (
    <footer className="border-t p-4">
      <nav className="container mx-auto">
        <p className="text-muted-foreground text-center text-sm">
          &copy; {new Date().getFullYear()} Contacts App. All rights reserved.
        </p>
      </nav>
    </footer>
  );
}
