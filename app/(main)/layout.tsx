import { Suspense } from "react";
import Sidebar, { SidebarSkeleton } from "./_components/sidebar/Sidebar";
import Container from "./_components/Container";
import Navbar from "./_components/navbar/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>

        <Container>
          {children}
        </Container>
      </div>
    </>
  )
}
