import { Button } from "@/components/ui/button";

export default function DocNavbar() {
  return (
    <nav className="mx-w-[1024px] ">
      <div className="bg-background  text-foreground px-16 py-3 flex items-center justify-between ">
        <div className=" text-2xl text-foreground font-bold"> Verbos </div>
        <div className="flex items-center gap-16 text-md   ">
          <ul className=" flex items-center gap-6">
            <li>
              <a href=""> Create New Document</a>
            </li>
            <li>
              <a href=""> Recent Docs</a>
            </li> 
            <li>
              <a href="">View Templates </a>
            </li>
            <li>
              <a href="">Features </a>
            </li>
          </ul>
          <Button className="bg-primary text-foreground">  Sign Up</Button>
        </div>
      </div>
    </nav>
  );
}