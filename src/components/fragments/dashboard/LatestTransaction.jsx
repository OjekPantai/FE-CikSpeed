/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { priceFormat } from "@/lib/utils";
import { CircleCheckBig, Clock } from "lucide-react";

const LatestTransaction = ({ orders }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Order Terbaru</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p> - </p>
        </CardContent>
      </Card>
    );
  }

  // Sort orders by `updatedAt` from newest to oldest and limit to 5 items
  const sortedOrders = orders
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Terbaru</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {sortedOrders.map((order) => (
          <div key={order.id} className="flex items-center gap-4">
            <Avatar className="h-9 w-9 flex">
              <AvatarFallback className="capitalize font-bold">
                {order.User?.username?.[0] || "O"}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none capitalize">
                {order.User?.username || "Unknown User"}
              </p>
              <Badge
                variant={order.status === "archived" ? "success" : "pending"}
                className="text-xs font-bold"
              >
                {order.status === "archived" ? (
                  <div className="flex items-center gap-2">
                    <CircleCheckBig className="h-4 w-4" />
                    Success
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Pending
                  </div>
                )}
              </Badge>
            </div>
            <div className="ml-auto text-right">
              <p
                className={
                  order.status === "archived"
                    ? "text-green-600 dark:text-green-500 font-semibold"
                    : "text-orange-600  dark:text-orange-500 font-semibold"
                }
              >
                {priceFormat(order.total_cost)}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDate(order.updatedAt)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default LatestTransaction;
