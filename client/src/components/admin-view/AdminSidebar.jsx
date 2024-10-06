import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminSidebarMenuItems } from "@/config";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItems({setOpen}) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((item) => (
        <div
          key={item.id}
          className={`flex cursor-pointer text-xl items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground ${
            location.pathname.includes(item.path) ? "bg-muted text-black" : ""
          }`}
          onClick={() => {
            navigate(item.path);
            setOpen ? setOpen(false) : null;
          }}
        >
          {item.icons}
          <span className="text-[18px]">{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

const AdminSidebar = ({open, setOpen}) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="h-full flex flex-col">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center mt-5 mb-5 gap-2">
                <ChartNoAxesCombined size={30} />
                <p className="text-2xl font-extrabold">Admin Panel</p>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-backgroun p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
