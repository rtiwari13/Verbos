"use client";
import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import axios from "@/lib/axiosInstance";
import { User } from "@/types/user";
import { useAppSelector, useAppDispatch } from "@/redux/storeHooks";
import { login } from "@/redux/features/auth/authSlice";

export default function SignUp() {
  
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  if (user) {
    window.location.href = "/";
  }

  function handleFormDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((values) => ({ ...values, [name]: value }));

  }

  async function loginAfterSignup () {
      try {
      const response = await axios.post("auth/login", {
        username: formData.username,
        password: formData.password,
      });

      if (response?.data?.success === true) {
        const user: User = {
          userId: response.data.user_data.user_id || null,
          firstName: response.data.user_data.first_name || null,
          lastName: response.data.user_data.last_name || null,
          usrename: response.data.user_data.username || null,
          email: response.data.user_data.email || null,
          createdAt: response.data.user_data.created_at || null,
          updatedAt: response.data.user_data.updated_at || null,
        };

        dispatch(login({ user, authToken: response.data.auth_token }));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await axios.post("auth/register", {
        first_name: "",
        last_name: "",
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      if (response.data.success === true) {
        loginAfterSignup()
      }

    } catch (error) {

    }
  }

  // error handling
  // form data validation
  // after successful submission request to auth/login and store credentials in redux store

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="signUpForm"
            className="flex flex-col gap-6 "
            onSubmit={handleSubmit}
          >
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleFormDataChange}
                type="text"
                placeholder="johndoe123"
                autoComplete="username"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormDataChange}
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                value={formData.password}
                onChange={handleFormDataChange}
                type="password"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleFormDataChange}
                type="password"
                autoComplete="new-password"
                required
              />
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full text-foreground"
            form="signUpForm"
          >
            Create Account
          </Button>

          <a href="./login">
            <Button variant="link" className="px-0">
              Already have an account? Login
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}
