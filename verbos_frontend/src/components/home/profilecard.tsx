'use client'
import axios from "@/lib/axiosInstance";
import React, { useState, useRef, useEffect } from "react";
import { logout } from "@/redux/features/auth/authSlice";
import {  useAppDispatch } from "@/redux/storeHooks";

const ProfileCard = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  async function handleLogout () {
    try {
         
       const response = await axios.get("auth/logout")
        if (response.data.success === true) {
            dispatch(logout());
            window.location.href = "/auth/login"
        }
        
    } catch (error) {
        console.log(error)
    }

  }

  return (
    // Inline container so it fits in a navbar

    <div ref={containerRef} className="relative inline-block">
      <button
        aria-label="Open profile menu"
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-3 p-1 rounded-md cursor-pointer"
      >
        <img
          src="https://via.placeholder.com/40"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
        />
        
      </button>

      {open && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 py-3 z-50"
        >
          <div className="px-4 flex items-center gap-3">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-indigo-500"
            />
            <div>
              <div className="text-sm font-semibold text-gray-900">Anony</div>
              <div className="text-xs text-gray-500"> Kitty Catty</div>
            </div>
          </div>

          <div className="mt-3 px-2 space-y-1">
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              Your Profile
            </button>
            <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              Settings
            </button>
            <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
