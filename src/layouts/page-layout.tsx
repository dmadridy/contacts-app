export default function PageLayout({
  title,
  description,
  children,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <section className="p-4 flex-1 border">{children}</section>
    </div>
  );
}
