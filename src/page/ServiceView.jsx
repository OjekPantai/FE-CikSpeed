import { useState } from "react";
import customAPI from "@/services/api";
import ServiceTable from "@/components/fragments/services/ServiceTable";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import AddServiceModal from "@/components/fragments/services/AddServiceModal";
import { toast } from "sonner";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const { data } = await customAPI.get("/services");
  const services = data.data;
  return { services };
};

const ServiceView = () => {
  const { services } = useLoaderData();
  const [addServices, setAddServices] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const handleAddService = async (newService) => {
    try {
      const { data } = await customAPI.post("/services", newService);
      setAddServices([...addServices, data.data]);
      setAddModalOpen(false);
      toast.success("Service added successfully");
    } catch (error) {
      toast.error(`Error adding service: ${error.message}`);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Data Layanan</h1>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            className="h-8 gap-1"
            onClick={() => setAddModalOpen(true)}
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Tambah Layanan
            </span>
          </Button>
        </div>
      </div>
      <section className="grid gap-4">
        <ServiceTable services={services} />
      </section>
      <AddServiceModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddService}
      />
    </main>
  );
};

export default ServiceView;
