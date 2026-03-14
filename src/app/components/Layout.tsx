import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pb-20">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
