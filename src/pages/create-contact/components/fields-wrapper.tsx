export default function FieldsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4 flex-1 p-4 flex flex-col justify-center mx-auto max-w-lg w-full">
      {children}
    </div>
  );
}
