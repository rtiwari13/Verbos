import React from "react";
import AuthPopup from "./AuthPopup";

function Navbar() {
  return (
    <div className="bg-[var(--background)] text-[var(--text-nav)] flex items-center justify-between px-10 py-8">
      <div className="text-xl font-bold">
        <a className="text-[var(--primary)] hover:text-[var(--ring)] transition-colors duration-200">Verbos</a>
      </div>

      <div className=" flex items-center justify-centre gap-10 ">
        <a href="/docs" className="hover:text-[var(--primary)] transition-colors duration-200">Docs</a>
        <a href="/notes" className="hover:text-[var(--primary)] transition-colors duration-200">Notes</a>
        <a href="/todo" className="hover:text-[var(--primary)] transition-colors duration-200">Todos</a>
        <a href="" className="hover:text-[var(--primary)] transition-colors duration-200">Features</a>
        <a href="" className="hover:text-[var(--primary)] transition-colors duration-200">Services</a>
        <a href="" className="hover:text-[var(--primary)] transition-colors duration-200">Login</a>
      </div>

      <div className="">
        {/* <a href="" className="bg-gradient-to-br from-red-0 to-orange-300 rounded-2xl  shadow-xl p-3">Sign up</a> */}
        <AuthPopup/>
      </div>
    </div>
  );
}


export default Navbar;
