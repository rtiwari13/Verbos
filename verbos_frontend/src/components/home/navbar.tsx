import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import logo from "@/assets/home_page_images/logo.png";
import ProfileCard from "./profilecard";

export default function Navbar() {
  const isLoggedIn = true;

  return (
    <nav className=" bg-background w-full sticky top-0 z-50 ">
      <div className="  flex  justify-between gap-8 max-w-7xl  mx-auto w-full h-16 ">
        {/* left - logo + Name */}
        <a href="/" className="flex items-center ">
          <img
            className="h-[45px] w-[45px] hover:cursor-pointer "
            src={logo.src}
            alt="logo"
          />

          <h2 className="font-semibold text-[21px] hover:cursor-pointer">
            Verbos
          </h2>
        </a>

        {/* right list */}
        <div className=" flex gap-8  h-full items-center  ">
          <ul className="flex gap-4">
            <li className="  font-semibold hover:text-primary hover:cursor-pointer">
              Why Verbos?
            </li>
            <li className="font-semibold hover:text-primary hover:cursor-pointer">
              Products
            </li>

            {/* use case + features */}
            <li className="font-semibold hover:text-primary hover:cursor-pointer">
              Explore
            </li>

            <a href="">
              <li className="font-semibold hover:text-primary hover:cursor-pointer">
                Profile
              </li>
            </a>
          </ul>

          <Github className="hover:text-primary hover:cursor-pointer" />
          <Switch className=" hover:cursor-pointer" />

          {isLoggedIn ? (
            <ProfileCard />
          ) : (
            <Button className=" text-foreground hover:cursor-pointer rounded-lg">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
