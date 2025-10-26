"use client";

import * as React from "react";
import { Moon, Sun, MonitorCheck } from "lucide-react";
import { Theme } from "@/types/theme";
import { updateTheme } from "@/redux/features/theme/themeSlice";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAppDispatch, useAppSelector } from "@/redux/storeHooks";

export function ModeToggle() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.ColorTheme);
  const setTheme = (theme: Theme) => {
    dispatch(updateTheme({ newTheme: theme }));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {theme === "System" ? (
            <MonitorCheck className="absolute h-[1.2rem] w-[1.2rem]  transition-all scale-100 rotate-0" />
          ) : theme === "Dark" ? (
            <Moon className="absolute h-[1.2rem] w-[1.2rem]  transition-all scale-100 rotate-0" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all " />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme({ ColorTheme: "Light" })}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme({ ColorTheme: "Dark" })}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme({ ColorTheme: "System" })}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
