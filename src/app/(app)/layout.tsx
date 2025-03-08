import { AppSidebar } from "@/components/shared/sidebar/app-sidebar";
import { Dialog } from "@/components/ui/dialog";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Dialog>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full relative p-4">{children}</main>
      </SidebarProvider>
    </Dialog>
  );
}
