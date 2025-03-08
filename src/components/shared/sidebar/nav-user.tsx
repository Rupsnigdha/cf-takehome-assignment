"use client";

import {
  Bell,
  BellDot,
  ChevronsUpDown,
  LogOut,
  Package,
  Play,
  Settings,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useUserStore } from "@/stores/userStore";
import { useNotificationsStore } from "@/stores/notificationsStore";
import { cn } from "@/lib/utils";
import React from "react";

export function NavUser() {
  const { user } = useUserStore();
  const { notifications, markAllAsRead } = useNotificationsStore();
  const { isMobile } = useSidebar();
  const [hasBeenOpened, setHasBeenOpened] = React.useState(false);
  return (
    <>
      <SidebarMenu>
        <SidebarGroupContent>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative hover:cursor-pointer"
            >
              <div className="h-8 w-8">
                <Play />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                Run
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative hover:cursor-pointer"
            >
              <div className="h-8 w-8">
                <Package />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                Deploy
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarGroupContent>

        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative hover:cursor-pointer"
              >
                <div className="absolute left-0 top-0 z-10">
                  {notifications.some((n) => !n.isRead) && (
                    <div className="text-primary-foreground bg-primary rounded-full px-2 py-1 text-[10px] font-bold">
                      {notifications.filter((n) => !n.isRead).length}
                    </div>
                  )}
                </div>
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name
                      .split(" ")
                      .slice(0, 2)
                      .map((name) => name[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={12}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm relative">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user.name
                        .split(" ")
                        .slice(0, 2)
                        .map((name) => name[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.name}</span>
                    <span className="truncate text-xs">{user.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <DropdownMenu
                    onOpenChange={(open) => {
                      if (open) {
                        setHasBeenOpened(true);
                      } else if (hasBeenOpened) {
                        markAllAsRead();
                      }
                    }}
                  >
                    <DropdownMenuTrigger asChild className="p-0">
                      <SidebarMenuButton className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {notifications.some((n) => !n.isRead) ? (
                            <BellDot className="text-primary" />
                          ) : (
                            <Bell />
                          )}
                          Notifications
                        </div>
                        {notifications.some((n) => !n.isRead) && (
                          <div className="text-primary-foreground bg-primary rounded-full px-2 py-1 text-xs font-bold">
                            {notifications.filter((n) => !n.isRead).length}
                          </div>
                        )}
                      </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg p-0"
                      side={isMobile ? "bottom" : "right"}
                      align="end"
                      sideOffset={16}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {notifications.length === 0 ? (
                        <DropdownMenuItem disabled>
                          No notifications
                        </DropdownMenuItem>
                      ) : (
                        <>
                          {[...notifications]
                            .sort((a, b) => b.createdAt - a.createdAt)
                            .map((notification, index, array) => (
                              <>
                                <div
                                  key={notification.id}
                                  className={cn(
                                    "flex flex-col items-start gap-1 relative px-4 py-2",
                                    !notification.isRead && "bg-primary/10"
                                  )}
                                >
                                  {!notification.isRead ? (
                                    <div className="absolute h-2 w-2 rounded-full bg-primary right-2 top-2"></div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="font-medium">
                                    {notification.heading}
                                  </div>
                                  <div className="text-xs opacity-70">
                                    {notification.body}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {new Date(
                                      notification.createdAt
                                    ).toLocaleDateString()}
                                    ,{" "}
                                    {new Date(
                                      notification.createdAt
                                    ).toLocaleTimeString()}
                                  </div>
                                </div>
                                {index !== array.length - 1 && (
                                  <DropdownMenuSeparator className="m-0 bg-primary/20" />
                                )}
                              </>
                            ))}
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-not-allowed" disabled>
                  <Settings /> Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive-foreground hover:bg-destructive-foreground/10"
                disabled
              >
                <LogOut className="text-destructive-foreground" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </>
  );
}
