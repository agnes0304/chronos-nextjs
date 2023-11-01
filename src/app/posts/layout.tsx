export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mt-[120px]">{children}</main>;
}
