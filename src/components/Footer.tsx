export function Footer() {
  const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Bakery';
  return (
    <footer className="border-t bg-secondary">
      <div className="container py-8">
        <p className="text-center text-sm text-secondary-foreground">
          &copy; {new Date().getFullYear()} {storeName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
