export default function FieldsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center space-y-4 p-4">
      {children}
    </div>
  );
}
