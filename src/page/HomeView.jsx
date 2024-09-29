import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import customAPI from "@/services/api";
import DashboardCardHeader from "@/components/fragments/dashboard/DashboardCardHeader";
import LatestTransaction from "@/components/fragments/dashboard/LatestTransaction";
import NewCustomerList from "@/components/fragments/dashboard/NewCustomerList";

// Loader function to fetch initial data before component renders
export const loader = async ({ request }) => {
  const { data: ordersData } = await customAPI.get("/orders");
  const { data: usersData } = await customAPI.get("/users");
  const orders = ordersData.data.rows;
  const users = usersData.data;
  return { orders, users };
};

const HomeView = () => {
  const { orders: initialOrders, users: initialUsers } = useLoaderData(); // Load initial data from loader
  const [orders, setOrders] = useState(initialOrders);
  const [users, setUsers] = useState(initialUsers);

  // Fetch updated data when component mounts
  useEffect(() => {
    const fetchOrdersAndUsers = async () => {
      try {
        // Fetch orders data
        const { data: ordersData } = await customAPI.get("/orders");
        setOrders(ordersData.data.rows); // Ensure you're using the correct path to data

        // Fetch users data
        const { data: usersData } = await customAPI.get("/users");
        setUsers(usersData.data); // Ensure correct data is being set
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    // Call the function to fetch data
    fetchOrdersAndUsers();
  }, []); // Run only once when the component is mounted

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-x-4 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <section className="grid grid-cols-2 md:grid-cols-2 gap-y-4 gap-x-4">
        <DashboardCardHeader orders={orders} />
      </section>
      <section className="grid lg:grid-cols-2 lg:gap-x-4 gap-y-4">
        <NewCustomerList users={users} />
        <LatestTransaction orders={orders} />
      </section>
    </main>
  );
};

export default HomeView;
