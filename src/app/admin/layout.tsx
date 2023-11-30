import { LoginProvider } from "@/components/admin/LoginContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LoginProvider>
      <div className="mt-[66px]">{children}</div>
    </LoginProvider>
  );
}
