import Navbar from "./_components/navbar/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div>
        {children}
      </div>
    </>
  )
}
