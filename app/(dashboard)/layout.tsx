import Header from "@/components/header";

type DashboardProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardProps) {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">{children}</main>
    </>
  );
}
