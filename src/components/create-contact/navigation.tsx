export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-2 justify-end w-full border-t p-4">{children}</div>
  );
}
