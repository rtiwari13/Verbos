
export default function Footer() {
  return (
    <footer className=" bg-muted/40 w-full mt-24  ">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 md:flex-row">
        {/* Brand + Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold text-foreground">Verbos</h2>
          <h3 className="text-sm text-muted-foreground">
            © 2025 Verbos. All rights reserved.
          </h3>
        </div>

        {/* Footer Links */}
        <ul className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <li className="hover:text-foreground cursor-pointer transition-colors">
            About Verbos
          </li>
          <li className="hover:text-foreground cursor-pointer transition-colors">
            Verbos Products
          </li>
          <li className="hover:text-foreground cursor-pointer transition-colors">
            GitHub
          </li>
          <li className="hover:text-foreground cursor-pointer transition-colors">
            License
          </li>
        </ul>
      </div>
    </footer>
  );
}
