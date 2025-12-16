export default function FieldsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col gap-4">
      {children}
    </div>
  );
}
