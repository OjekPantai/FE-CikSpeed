/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Helper function to get the start and end of the current and previous week
const getStartAndEndOfWeek = (offset = 0) => {
  const now = new Date();
  const start = new Date(
    now.setDate(now.getDate() - now.getDay() - offset * 7)
  ); // Start of the week (Sunday)
  const end = new Date(
    now.setDate(now.getDate() - now.getDay() - offset * 7 + 6)
  ); // End of the week (Saturday)
  return { start, end };
};

const DashboardCardHeader = ({ orders }) => {
  // Get start and end dates of the current week
  const { start: startOfCurrentWeek, end: endOfCurrentWeek } =
    getStartAndEndOfWeek();
  // Get start and end dates of the previous week
  const { start: startOfLastWeek, end: endOfLastWeek } =
    getStartAndEndOfWeek(1);

  // Filter orders for the current and last week
  const weeklyOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfCurrentWeek && orderDate <= endOfCurrentWeek;
  });

  const lastWeekOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    return orderDate >= startOfLastWeek && orderDate <= endOfLastWeek;
  });

  // Calculate total income for the current and last week
  const totalIncomeThisWeek = weeklyOrders.reduce(
    (total, order) => total + order.total_cost,
    0
  );
  const totalIncomeLastWeek = lastWeekOrders.reduce(
    (total, order) => total + order.total_cost,
    0
  );

  // Calculate the percentage change from last week to this week
  const percentageChange = totalIncomeLastWeek
    ? ((totalIncomeThisWeek - totalIncomeLastWeek) / totalIncomeLastWeek) * 100
    : 0;

  return (
    <>
      <div>
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardDescription>Jumlah order minggu ini</CardDescription>
            <CardTitle className="text-2xl lg:text-4xl">
              {weeklyOrders.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +{percentageChange.toFixed(0)}% dari minggu kemarin
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="w-full">
          <CardHeader className="pb-2">
            <CardDescription>Pendapatan minggu ini</CardDescription>
            <CardTitle className="text-2xl lg:text-4xl">
              Rp {totalIncomeThisWeek.toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +{percentageChange.toFixed(0)}% dari minggu kemarin
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default DashboardCardHeader;
