"use client";

import * as React from "react";
import { ChevronsUpDown, Sun, Moon } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  const { theme, setTheme } = useTheme();
  const { state } = useSidebar();
  const [activeTeam, setActiveTeam] = React.useState(teams[0]);
  const isCollapsed = state === "collapsed";

  if (!activeTeam) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="flex items-center gap-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2"
            >
              <div className="flex items-center gap-2 overflow-hidden flex-1">
                {/* Mostrar SOLO el ícono cuando está colapsado */}
                {isCollapsed ? (
                  <div className="flex items-center justify-center size-8 rounded-lg overflow-hidden">
                    <Image
                      src="/decygo-ico.png"
                      alt="Decygo Icon"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                ) : (
                  /* Mostrar logo completo cuando NO está colapsado */
                  <div className="flex items-center gap-2">
                    <Image
                      src="/decygo-logo.png"
                      alt="Decygo Logo"
                      width={90}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>

              {/* Flecha y botón de tema solo si no está colapsado */}
              {!isCollapsed && (
                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={(e) => {
                      e.stopPropagation(); // Evita que abra el DropdownMenu al clickear el botón
                      setTheme(theme === "light" ? "dark" : "light");
                    }}
                  >
                    {theme === "light" ? (
                      <Sun className="w-5 h-5 text-yellow-500" />
                    ) : (
                      <Moon className="w-5 h-5 text-slate-300" />
                    )}
                  </Button>
                </div>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>

        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
