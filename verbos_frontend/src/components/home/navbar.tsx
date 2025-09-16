import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="mx-w-[1024px]">
      <div className="bg-background text-foreground px-16 py-8 flex items-center justify-between ">
        <div className=" text-2xl text-foreground font-bold"> Verbos </div>
        <div className="flex items-center gap-16 text-xl font-semibold">
          <ul className=" flex items-center gap-6">
            <li>
              <a href="/document"> Document</a>
            </li>
            <li>
              <a href=""> Notebook</a>
            </li>
            <li>
              <a href=""> Task Manager</a>
            </li>
          </ul>
          <Button className="bg-primary text-foreground"> Sign Up </Button>
        </div>
      </div>
    </nav>
  );
}
