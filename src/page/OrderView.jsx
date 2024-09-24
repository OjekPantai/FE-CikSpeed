/* eslint-disable react-refresh/only-export-components */
import OrderTable from "@/components/fragments/orders/OrderTable";
import customAPI from "@/services/api";
import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/orders");

  const orders = data.data.rows;
  return { orders };
};

const OrderView = () => {
  const { orders } = useLoaderData();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Antrian</h1>
      </div>
      <section className="grid gap-4">
        <OrderTable orders={orders} limit={10} isView={true} />
      </section>
    </main>
  );
};

export default OrderView;
