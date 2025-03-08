"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";
import Logo from "@/lib/assets/Logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";

const workflows = ["Primary Workflow", "Another Workflow", "A Third Workflow"];

export function NavHeader() {
  const { isMobile } = useSidebar();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative hover:cursor-pointer"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={Logo.src} alt="CF" className="m-auto" />
                  <AvatarFallback className="rounded-lg">CF</AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute left-0 top-0 z-10"></div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Primary Workflow</span>
                <span className="truncate text-xs">v1.1.0</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workflows
            </DropdownMenuLabel>
            {workflows.map((workflow, index) => (
              <DropdownMenuItem
                key={index}
                className={cn(
                  "gap-2 p-2",
                  index === 0 ? "bg-primary/20 cursor-pointer" : ""
                )}
                disabled={index !== 0}
              >
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-sm border",
                    index === 0 ? "bg-primary text-primary-foreground" : ""
                  )}
                >
                  {workflow.slice(0, 1).toUpperCase()}
                </div>
                {workflow}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Create workflow
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
