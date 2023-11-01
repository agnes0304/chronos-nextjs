export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="mt-[120px] md:w-8/12">{children}</main>;
}
