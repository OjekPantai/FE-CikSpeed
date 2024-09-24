/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrderTable = ({ orders, limit, isView }) => {
  // Sort orders by createdAt from oldest to newest
  const sortedOrders = orders.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  // Limit to 5 orders
  const limitedOrders = sortedOrders.slice(0, limit);

  // Function to determine the badge color based on order status
  const getStatusVariant = (status) => {
    switch (status) {
      case "Menunggu Konfirmasi":
        return "secondary";
      case "Dalam Antrian":
        return "outline";
      case "Sedang Dikerjakan":
        return "success";
      default:
        return "secondary";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daftar antrian</CardTitle>
        <CardDescription>Kelola antrian</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-xs md:text-base">
              <TableHead>Nama</TableHead>
              <TableHead>Merk Motor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Layanan</TableHead>
              <TableHead className="hidden md:table-cell">Estimasi</TableHead>
              <TableHead>Total Biaya</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs md:text-base">
            {limitedOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium capitalize">
                  {order.User?.username || "Unknown"}{" "}
                </TableCell>
                <TableCell className="">{order.motorcycle_type}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(order.status)}>
                    {order.status}
                  </Badge>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {order.Services?.map((service) => (
                    <div key={service.id}>{service.name}</div>
                  )) || "No services"}
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  ± {order.total_estimate} menit
                </TableCell>
                <TableCell>Rp {order.total_cost.toLocaleString()}</TableCell>

                {isView && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      {isView && (
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{limitedOrders.length}</strong> of{" "}
            <strong>{sortedOrders.length}</strong> orders
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderTable;
