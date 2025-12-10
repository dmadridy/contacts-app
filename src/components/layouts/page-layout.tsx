import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <div className="flex flex-col gap-2">
      <section>
        <Outlet />
      </section>
    </div>
  );
}
