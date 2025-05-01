import React from "react";

function HeroSection() {
  return (
   

<section className="px-4 py-8 md:py-16">
<div className="flex flex-col md:flex-row gap-8 items-center justify-between max-w-7xl mx-auto ">
    {/* Visual Box */}
  <div className=" relative  w-full md:w-1/2  rounded-2xl shadow-xl min-h-[652px] p-8 flex items-center justify-center">
  <img
    src="./public/images/girl_image.png" 
    alt="Girl Image"
    className=" absolute top-0   h-full  scale-105 hover:scale-100 transition-transform duration-500"
  />

   
  </div>
  {/* Text Content */}
  <div className="md:w-1/2 space-y-6 md:space-y-8 px-4 md:px-0">
    <h1 className="text-amber-50 text-4xl md:text-5xl font-bold leading-tight">
      <span className="block">Every Detail</span>
      <span className="block mt-2 md:mt-4">in Its Place.</span>
    </h1>
    <p className="text-amber-50 text-lg md:text-xl leading-relaxed max-w-2xl">
      Verbos is an all-in-one workspace platform that combines note-taking, 
      todos, and knowledge management into a single space.
    </p>
    <button className="text-amber-50 bg-gradient-to-br from-red-0 to-orange-300 rounded-2xl shadow-xl p-3 ">Get Started For Free</button>
  </div>

  
</div>
</section>

  );
}

export default HeroSection;
