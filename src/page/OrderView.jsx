import OrderTable from "@/components/fragments/OrderTable";

const OrderView = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Antrian</h1>
      </div>

      <section className="grid gap-4">
        <OrderTable />
      </section>
    </main>
  );
};

export default OrderView;
