"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { ChevronRight } from "lucide-react";
import { Button } from "../../ui/button";
import { NavUser } from "./nav-user";
import { cn } from "@/lib/utils";
import ContentDashboard from "./content-dashboard";
import { NavHeader } from "./nav-header";
import { usePathname } from "next/navigation";

export function AppSidebar() {
  const sidebar = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          sidebar.toggleSidebar();
        }}
        className={cn(
          "absolute top-1/2 right-0 translate-x-1/2 bg-background rounded-full border-2 border-sidebar-border cursor-pointer transition-transform duration-300",
          sidebar.open && "rotate-180"
        )}
      >
        <ChevronRight />
      </Button>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        {pathname.endsWith("dashboard") && <ContentDashboard />}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
