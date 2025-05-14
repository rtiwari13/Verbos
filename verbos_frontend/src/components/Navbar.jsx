import React from "react";
import AuthPopup from "./AuthPopup";

function Navbar() {
  return (
    <div className="bg-[var(--background)] text-[var(--text-nav)]  flex items-center justify-between px-10 py-8 ">
      <div className="text-xl font-bold">
        <a>Verbos</a>
      </div>

      <div className=" flex items-center justify-centre gap-10 ">
        <a href="/docs">Docs</a>
        <a href="/notes">Notes</a>
        <a href="/todo">Todos</a>
        <a href="">Features</a>
        <a href="">Services</a>
        <a href="">Login</a>
      </div>

      <div className="">
        {/* <a href="" className="bg-gradient-to-br from-red-0 to-orange-300 rounded-2xl  shadow-xl p-3">Sign up</a> */}
        <AuthPopup/>
      </div>
    </div>
  );
}


export default Navbar;
