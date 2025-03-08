import { Avatar } from "@/components/ui/avatar";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChevronRight } from "lucide-react";

type version = {
  name: string;
  date: string;
  tags: string[];
};
const versions: version[] = [
  {
    name: "v1.1.0",
    date: new Date().toUTCString(),
    tags: ["prod", "email"],
  },
  {
    name: "v2.0.0",
    date: new Date().toUTCString(),
    tags: ["prod", "email"],
  },
];
export default function ContentDashboard() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Releases</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {versions.map((version, index) => (
            <SidebarMenuItem key={index} className="h-10">
              <SidebarMenuButton
                size="lg"
                className={cn(
                  "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative hover:cursor-pointer h-full",
                  index === 0 ? "bg-primary/20" : ""
                )}
              >
                <Avatar className="h-8 w-8 rounded-lg bg-primary/80 text-primary-foreground">
                  <AvatarFallback className="rounded-lg mx-auto my-auto">
                    {version.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="flex justify-between">
                    <div className="truncate text-sm">{version.name}</div>
                    <div className="flex gap-1 text-[10px] items-center">
                      {version.tags.map((tag, index) => (
                        <div
                          key={index}
                          className="bg-red-400/60 py-1 px-2 rounded-full text-primary-foreground"
                        >
                          {tag}
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="truncate text-[10px] font-bold">
                    {new Date(version.date).toLocaleDateString()}
                  </span>
                </div>
                <ChevronRight className="ml-auto size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
