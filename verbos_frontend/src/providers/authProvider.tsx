"use client";
import { useEffect, useRef } from "react";
import axios from "@/lib/axiosInstance";
import { User } from "@/types/user";
import { useAppDispatch } from "@/redux/storeHooks";
import { login,logout } from "@/redux/features/auth/authSlice";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();
  const isMounted = useRef(true);

  async function fetchProfile() {
    try {
      const response = await axios.get("user/profile");
      if (response?.data?.success === true) {
        const user: User = {
          userId: response.data.user.user_id || null,
          firstName: response.data.user.first_name || null,
          lastName: response.data.user.last_name || null,
          username: response.data.user.username || null,
          email: response.data.user.email || null,
          createdAt: response.data.user.created_at || null,
          updatedAt: response.data.user.updated_at || null,
        };
        if (isMounted.current) {
          dispatch(login({ user, authToken: response.data.auth_token }));
        }
      } else {
        console.error(
          "fetchProfile error",
          response?.data?.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function clearAuthData() {
    dispatch(logout());
  }

  useEffect(() => {
    fetchProfile();
    return () => {
      isMounted.current = false;
    };
  }, []);



  return <>{children}</>;
}
