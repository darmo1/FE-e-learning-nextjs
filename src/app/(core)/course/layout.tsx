export default function CourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grow text-white bg-neutral-950 before:content-[''] before:absolute before:inset-0 before:-z-10 before:w-full before:h-full before:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <main className="max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
