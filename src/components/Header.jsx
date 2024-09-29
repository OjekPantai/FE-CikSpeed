import { Button } from "@/components/ui/button";
import { CircleUser, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Nav from "./Nav";
import { DarkModeToggle } from "./DarkModeToggle";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import customAPI from "@/services/api";
import { logoutUser } from "@/features/userSlice";
import { useState } from "react"; // Tambahkan import useState

export function Header() {
  const [isOpen, setIsOpen] = useState(false); // Tambahkan state untuk mengelola Sheet
  const user = useSelector((state) => state.userState.user?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await customAPI.post("/auth/logout");
    dispatch(logoutUser());
    navigate("/login");
  };

  // Fungsi untuk menutup SheetContent
  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
            onClick={() => setIsOpen(true)} // Buka Sheet saat tombol diklik
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <Nav closeSheet={closeSheet} /> {/* Pass closeSheet to Nav */}
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center justify-end gap-4">
        <DarkModeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <span className="text-sm font-medium capitalize">
                {user.username}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
