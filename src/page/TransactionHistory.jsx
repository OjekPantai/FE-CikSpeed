import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { toast } from "sonner";
import { priceFormat, truncateMessage } from "@/lib/utils";
import Loading from "@/components/elements/Loading";
import customAPI from "@/services/api";
import DeleteOrderModal from "@/components/fragments/orders/DeleteOrderModal";
import AddOrderModal from "@/components/fragments/orders/AddOrderModal";
import OrderDetailModal from "@/components/fragments/orders/OrderDetailModal";

const TransactionHistory = () => {
  const [orders, setOrders] = useState([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await customAPI.get("/orders");
      const filteredOrders = data.data.rows
        .filter((order) => ["archived"].includes(order.status))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Mengurutkan dari terbaru ke terlama
      setOrders(filteredOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleDeleteClick = (order) => {
    setSelectedOrder(order);
    setDeleteModalOpen(true);
  };

  const handleDetailClick = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setLoading(true);
    try {
      await customAPI.delete(`/orders/${selectedOrder.id}`);
      await getOrders();
      setDeleteModalOpen(false);
      toast.success("Order deleted successfully");
    } catch (error) {
      toast.error(`Error deleting order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = async (newOrder) => {
    setLoading(true);
    try {
      await customAPI.post("/orders", newOrder);
      await getOrders();
      setAddModalOpen(false);
      navigate("/orders");
      toast.success("Order added successfully");
    } catch (error) {
      toast.error(`Error adding order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold md:text-2xl">
            Riwayat Transaksi
          </h1>
        </div>
      </section>
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between">
              <div className="text-lg font-semibold md:text-2xl">
                Riwayat Transaksi
              </div>
            </CardTitle>
            <CardDescription>
              Manage your orders and view their details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center">
                <Loading />
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center text-gray-500">
                Tidak ada data transaksi yang tersedia.
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="  hidden sm:table-cell">
                      Motorcycle Type
                    </TableHead>
                    <TableHead className="hidden  sm:table-cell">
                      Phone
                    </TableHead>
                    <TableHead className="hidden  sm:table-cell">
                      Services
                    </TableHead>
                    <TableHead className="hidden  sm:table-cell">
                      Estimate
                    </TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Tanggal</TableHead>

                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-semibold capitalize">
                        {truncateMessage(order.User?.username || "", 3)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {truncateMessage(order.motorcycle_type || "", 3)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {order.User?.phoneNumber || "-"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground">
                        {order.Services.map((service) => (
                          <div key={service.id}>{service.name}</div>
                        ))}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-muted-foreground ">
                        {order.total_estimate} Menit
                      </TableCell>
                      <TableCell className="sm:table-cell ">
                        {priceFormat(order.total_cost)}
                      </TableCell>
                      <TableCell className="sm:table-cell text-muted-foreground ">
                        {new Date(order.createdAt).toLocaleDateString("id-ID", {
                          timeZone: "Asia/Jakarta",
                          hour: "numeric",
                          minute: "numeric",
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </TableCell>

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
                            <DropdownMenuItem
                              onClick={() => handleDetailClick(order)}
                              className="text-blue-600 cursor-pointer"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Detail
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDeleteClick(order)}
                              className="text-red-600 cursor-pointer"
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </section>

      <DeleteOrderModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        order={selectedOrder}
        isLoading={loading}
        isTransaction={true}
      />
      <AddOrderModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddOrder}
        isLoading={loading}
      />
      <OrderDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        order={selectedOrder}
        isLoading={loading}
      />
    </main>
  );
};

export default TransactionHistory;
