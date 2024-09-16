import { Home, ListChecks, Package, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "./ui/badge";

const Nav = () => {
  const location = useLocation(); // Get the current path

  return (
    <nav className="grid items-start px-2 text-md font-medium lg:px-4">
      <Link
        to="/"
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/" ? "text-primary" : "text-muted-foreground"
        }`}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        to="/orders"
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/orders"
            ? "text-primary"
            : "text-muted-foreground"
        }`}
      >
        <ListChecks className="h-4 w-4" />
        Antrian
        <Badge className="ml-auto flex h-6 w-6 items-center justify-center rounded-full">
          6
        </Badge>
      </Link>
      <Link
        to="/services"
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/services"
            ? "text-primary"
            : "text-muted-foreground"
        }`}
      >
        <Package className="h-4 w-4" />
        Layanan Servis
      </Link>
      <Link
        to="/customers"
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/customers"
            ? "text-primary"
            : "text-muted-foreground"
        }`}
      >
        <Users className="h-4 w-4" />
        Data Pelanggan
      </Link>
    </nav>
  );
};

export default Nav;
