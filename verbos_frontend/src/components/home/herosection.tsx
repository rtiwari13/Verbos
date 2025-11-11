import { Button } from "@/components/ui/button";
import hero_image from "@/assets/home_page_images/hero_image.png";


export default function HeroSection() {
  return (
    <section className="  min-h-[90vh] w-full  flex flex-col lg:flex-row items-center justify-center ">
      {/* left text div */}
      <div className="   flex flex-col items-center justify-center text-foreground text-2xl   ">
        <div className=" ">
          <h1 className="   text-[56px]   text-chart-5 font-[650] ">
            Personal &
          </h1>
          <h1 className=" text-[40px]  font-bold">Powerful Workspace</h1>
          <p className=" ">
            Verbos brings together notes, tasks, and documents - helping you stay organized
            and productive everyday. 
            
          </p>
          <div className="flex gap-4 pt-8 ">
            <a href="auth/signup">
              <Button className=" min-w-[120px] items-center text-foreground rounded-full text-sm p-3 pl-4 h-auto hover:cursor-pointer">
                <span>Sign Up</span>
              </Button>
            </a>
            <a href="auth/login">
              <Button
                variant="outline"
                className=" min-w-[120px] items-center text-foreground  rounded-full text-sm p-3 pl-4 h-auto hover:cursor-pointer"
              >
                <span>Log in</span>
              </Button>
            </a>

          

          </div>
        </div>
      </div>

      {/* right image div */}
      <div className=" p-16 flex items-center justify-center ">
      
        <img
          src={hero_image.src}
          alt=""
        />
      </div>
    </section>
  );
}
