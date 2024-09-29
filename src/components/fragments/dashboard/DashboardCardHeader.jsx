/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const DashboardCardHeader = ({ orders }) => {
  const orderData = orders.filter((order) => order.status === "archived");

  const totalRevenue = orderData.reduce(
    (sum, order) => sum + order.total_cost,
    0
  );

  const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <>
      <div>
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardDescription>Jumlah transaksi</CardDescription>
            <CardTitle className="text-2xl lg:text-4xl">
              {orderData.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground"></div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardDescription>Total Pendapatan</CardDescription>
            <CardTitle className="text-2xl lg:text-4xl">
              {formatToRupiah(totalRevenue)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground"></div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardCardHeader;
