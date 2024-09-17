import { useState } from "react";
import customAPI from "@/services/api";
import ServiceTable from "@/components/fragments/ServiceTable";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const { data } = await customAPI.get("/services");
  const services = data.data;
  return { services };
};

const ServiceView = () => {
  const { services } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    estimate: "",
  });

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call to add a new service
      await customAPI.post("/services", formData);
      toggleModal(); // Close modal after submission
      // Optionally, you could refresh the services list here
    } catch (error) {
      console.error("Failed to add service:", error);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Data Layanan</h1>
        <Button variant="default" className="ml-auto" onClick={toggleModal}>
          Tambah Layanan
        </Button>
      </div>
      <section className="grid gap-4">
        <ServiceTable services={services} />
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Tambah Layanan</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium">
                  Nama
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Deskripsi
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="cost" className="block text-sm font-medium">
                  Biaya
                </label>
                <input
                  type="number"
                  id="cost"
                  name="cost"
                  value={formData.cost}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="estimate" className="block text-sm font-medium">
                  Estimasi (menit)
                </label>
                <input
                  type="number"
                  id="estimate"
                  name="estimate"
                  value={formData.estimate}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="ghost" onClick={toggleModal}>
                  Batal
                </Button>
                <Button type="submit" variant="default">
                  Simpan
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default ServiceView;
