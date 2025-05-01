import React from "react";

function Navbar() {
  return (
    <div className="bg-[var(--background)] text-[var(--text-nav)]  flex items-center justify-between px-10 py-8 ">
      <div className="text-xl font-bold">
        <a>Verbos</a>
      </div>

      <div className=" flex items-center justify-centre gap-10 ">
        <a>Docs</a>
        <a>Notes</a>
        <a href="">Todos</a>
        <a href="">Features</a>
        <a href="">Services</a>
        <a href="">Login</a>
      </div>

      <div className="">
        <a href="" className="bg-gradient-to-br from-red-0 to-orange-300 rounded-2xl  shadow-xl p-3">Sign up</a>
      </div>
    </div>
  );
}


export default Navbar;
