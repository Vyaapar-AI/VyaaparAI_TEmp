export function Footer() {
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-8">
        <p className="text-center text-sm text-secondary-foreground">
          &copy; {new Date().getFullYear()} Bakery. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
