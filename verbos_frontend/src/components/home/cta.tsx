import { Button } from "../ui/button";

export default function CTASection() {
  return (
    <div className="mt-8 min-h-[60vh] bg-card w-full flex flex-col justify-center items-center gap-4 py-18 ">
      <h1 className="font-bold text-4xl">
        Stay in the Productive loop with Verbos
      </h1>
      <h3 className="text-lg">
        From ideas to execution—your workspace keeps it all connected
      </h3>
      <a href="/auth/signup">
        <Button className="flex items-center text-foreground mt-8 rounded-full text-md  px-6 h-auto">
        <span>Start for Free</span>
      </Button>
      </a>
      
    </div>
  );
}
