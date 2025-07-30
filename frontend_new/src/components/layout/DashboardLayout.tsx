//DashboardLayout.tsx// 
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { ReactNode } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link
import { ArrowLeft } from "lucide-react"; // ✅ Import the icon

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />

        <main className="flex-1 flex flex-col">
          {/* Header with trigger and back link */}
          <header className="h-16 flex items-center justify-between border-b bg-card px-6 shadow-sm">
            <div className="flex items-center">
              <SidebarTrigger className="text-foreground hover:bg-accent" />
              <div className="ml-4">
                <h1 className="text-xl font-semibold text-foreground">HydroSmart</h1>
                <p className="text-sm text-muted-foreground">Real-time water monitoring and analytics</p>
              </div>
            </div>

            {/* ✅ Back to Home Link */}
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-primary flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Home
            </Link>
          </header>

          {/* Main content area */}
          <div className="flex-1 p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}