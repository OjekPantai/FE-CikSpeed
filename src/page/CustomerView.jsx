import CustomerTable from "@/components/fragments/customers/CustomerTable";
import customAPI from "@/services/api";
import { useLoaderData } from "react-router-dom";
export const loader = async ({ request }) => {
  const { data } = await customAPI.get("/users");

  const users = data.data;
  return { users };
};
const CustomerView = () => {
  const { users } = useLoaderData();
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Data Pelanggan</h1>
      </div>
      <section className="grid gap-4">
        <CustomerTable users={users} />
      </section>
    </main>
  );
};

export default CustomerView;
