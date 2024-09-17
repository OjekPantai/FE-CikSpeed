import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Modal Component
const AddServiceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    estimate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">Tambah Layanan</CardTitle>
          <CardDescription>
            Masukkan detail layanan yang ingin Anda tambahkan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nama Layanan</Label>
              <Input
                id="name"
                name="name"
                placeholder="Nama Layanan"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Input
                id="description"
                name="description"
                placeholder="Deskripsi Layanan"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cost">Biaya</Label>
              <Input
                id="cost"
                name="cost"
                type="number"
                placeholder="Biaya Layanan"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="estimate">Estimasi (menit)</Label>
              <Input
                id="estimate"
                name="estimate"
                type="number"
                placeholder="Estimasi waktu"
                value={formData.estimate}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Tambah Layanan
            </Button>
            <Button variant="outline" className="w-full" onClick={onClose}>
              Batal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddServiceModal;
