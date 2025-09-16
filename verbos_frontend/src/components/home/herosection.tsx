import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className=" min-h-[80vh] flex w-full ">
      {/* left text div */}
      <div className="w-4/12  h-auto text-foreground text-2xl flex items-start gap-10 flex-col justify-center px-16 ">
        <h1 className="font-extrabold text-4xl  ">
          Unify Your Work, Simplify Your Life.
        </h1>
        <p className=" ">
          Everything you need to capture ideas, manage projects, and document
          your work in one intuitive space.
        </p>
        <Button className="">Get Started</Button>
      </div>

      {/* right image div */}
      <div className=" p-16 w-7/12 flex items-center justify-center ">
        <img
          className="h-full w-full"
          src="https://media.discordapp.net/attachments/1217367646291628063/1416823238524403762/image.png?ex=68c83ef7&is=68c6ed77&hm=aea4e2e4a2f750868aad1ffa7122b15e4c836b726a375de0a174eb0213fce3a0&=&format=webp&quality=lossless&width=688&height=384"
          alt="hero-image"
        />
      </div>
    </section>
  );
}
