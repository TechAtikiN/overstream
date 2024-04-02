import Navbar from "./_components/navbar/Navbar";
import Sidebar from "./_components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex h-full pt-16">
        <Sidebar />
        {children}
      </div>
    </>
  )
}
