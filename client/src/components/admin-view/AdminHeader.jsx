import { AlignJustify, LogOut } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";
import { useToast } from "../hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login")
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button
        onClick={() => {
          setOpen(true);
        }}
        className="lg:hidden sm:block"
      >
        <AlignJustify />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 rounded-md px-4 py-2 text-sm font-medium shadow items-center"
        >
          <LogOut />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
