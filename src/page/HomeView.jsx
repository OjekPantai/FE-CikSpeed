import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import OrderTable from "@/components/fragments/orders/OrderTable";
import customAPI from "@/services/api";
import NewCustomerList from "@/components/fragments/users/NewCustomerList";
import DashboardCardHeader from "@/components/fragments/dashboard/DashboardCardHeader";

// Loader to fetch initial data
// eslint-disable-next-line no-unused-vars
export const loader = async ({ request }) => {
  const { data: ordersData } = await customAPI.get("/orders");
  const { data: usersData } = await customAPI.get("/users");

  const orders = ordersData.data.rows;
  const users = usersData.data;
  return { orders, users };
};

const HomeView = () => {
  const { orders: initialOrders, users: initialUsers } = useLoaderData();
  const [orders, setOrders] = useState(initialOrders);
  const [users, setUsers] = useState(initialUsers);

  // Polling data setiap 10 detik untuk orders dan users
  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      try {
        // Fetch orders
        const { data: ordersData } = await customAPI.get("/orders");
        setOrders(ordersData.data.rows); // Update orders dengan data terbaru

        // Fetch users
        const { data: usersData } = await customAPI.get("/users");
        setUsers(usersData.data); // Update users dengan data terbaru
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    // Polling setiap 10 detik
    const intervalId = setInterval(fetchOrdersAndUsers, 10000);

    // Cleanup interval saat komponen di-unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-x-4 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <section className="grid grid-cols-2 md:grid-cols-2 gap-y-4 gap-x-4">
        <DashboardCardHeader orders={orders} />
      </section>
      <section className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-4">
        <OrderTable
          orders={orders}
          limit={5}
          isView={false}
          className="max-w-6xl"
        />
        <NewCustomerList users={users} />
      </section>
    </main>
  );
};

export default HomeView;
