import { useState } from "react";
import customAPI from "@/services/api";
import ServiceTable from "@/components/fragments/ServiceTable";
import { Button } from "@/components/ui/button";
import { useLoaderData } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// eslint-disable-next-line react-refresh/only-export-components
export const loader = async () => {
  const { data } = await customAPI.get("/services");
  const services = data.data.rows;
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
    } catch (error) {
      console.error("Failed to add service:", error);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Data Layanan</h1>
        <div className="ml-auto flex gap-2">
          <div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="text" placeholder="Search..." />
              <Button variant="ghost" type="submit">
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <Button variant="default" onClick={toggleModal}>
            Tambah Layanan
          </Button>
        </div>
      </div>
      <section className="grid gap-4">
        <ServiceTable services={services} />
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <Card className="w-full max-w-md p-2 rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle>Tambah Layanan</CardTitle>
              <CardDescription>
                Isi form untuk menambahkan layanan baru.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-full items-center gap-4">
                  {/* Nama Layanan */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Nama</Label>
                    <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Masukkan nama layanan"
                      required
                    />
                  </div>

                  {/* Deskripsi */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Deskripsi layanan"
                      required
                    />
                  </div>

                  {/* Biaya */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="cost">Biaya</Label>
                    <Input
                      type="number"
                      id="cost"
                      name="cost"
                      value={formData.cost}
                      onChange={handleChange}
                      placeholder="Masukkan biaya layanan"
                      required
                    />
                  </div>

                  {/* Estimasi Waktu */}
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="estimate">Estimasi (menit)</Label>
                    <Input
                      type="number"
                      id="estimate"
                      name="estimate"
                      value={formData.estimate}
                      onChange={handleChange}
                      placeholder="Estimasi waktu layanan (dalam menit)"
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <Button variant="outline" onClick={toggleModal}>
                Batal
              </Button>
              <Button type="submit" onClick={handleSubmit}>
                Simpan
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </main>
  );
};

export default ServiceView;
