import { themeConfig } from "@/themes";

export function Footer() {
  const storeName = themeConfig.meta.name;
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
