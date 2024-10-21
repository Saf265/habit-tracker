import Sidebar from "@/components/part/Sidebar";
import Topbar from "@/components/part/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex size-full flex-row">
      <Sidebar />
      <div className="flex size-full flex-col">
        <Topbar />
        <div className="size-full p-2">{children}</div>
      </div>
    </div>
  );
}
