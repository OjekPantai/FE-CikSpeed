import ServiceTable from "@/components/fragments/ServiceTable";
import { Button } from "@/components/ui/button";

const ServiceView = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Data Layanan</h1>
        <Button variant="default" className="ml-auto">
          Tambah Layanan
        </Button>
      </div>
      <ServiceTable />
    </main>
  );
};

export default ServiceView;
