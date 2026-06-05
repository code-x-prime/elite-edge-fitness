import { SessionProvider } from "@/components/admin/SessionProvider";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-[#F8F8F8]">
        <AdminSidebar />
        {/* Desktop: offset for fixed sidebar. Mobile: offset for fixed top bar */}
        <main className="lg:ml-60 pt-14 lg:pt-0 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </SessionProvider>
  );
}
