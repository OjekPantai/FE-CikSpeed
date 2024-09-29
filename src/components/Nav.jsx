import { ArrowRightLeft, Home, ListChecks, Package, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ closeSheet }) => {
  const location = useLocation();

  return (
    <nav className="grid items-start gap-2 px-2 text-md font-medium lg:px-4">
      <Link
        to="/"
        onClick={closeSheet}
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/"
            ? "text-primary bg-primary/10 rounded-md"
            : "text-muted-foreground"
        }`}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        to="/orders"
        onClick={closeSheet}
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/orders"
            ? "text-primary bg-primary/10 rounded-md"
            : "text-muted-foreground"
        }`}
      >
        <ListChecks className="h-4 w-4" />
        Antrian
      </Link>
      <Link
        to="/services"
        onClick={closeSheet}
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/services"
            ? "text-primary bg-primary/10 rounded-md"
            : "text-muted-foreground"
        }`}
      >
        <Package className="h-4 w-4" />
        Layanan Servis
      </Link>
      <Link
        to="/transactions"
        onClick={closeSheet}
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/transactions"
            ? "text-primary bg-primary/10 rounded-md"
            : "text-muted-foreground"
        }`}
      >
        <ArrowRightLeft className="h-4 w-4" />
        Riwayat Transaksi
      </Link>
      <Link
        to="/customers"
        onClick={closeSheet}
        className={`flex items-center gap-3 px-3 py-2 transition-all hover:text-primary ${
          location.pathname === "/customers"
            ? "text-primary bg-primary/10 rounded-md"
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
