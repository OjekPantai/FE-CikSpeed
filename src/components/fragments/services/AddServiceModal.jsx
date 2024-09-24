/* eslint-disable react/prop-types */
import { Form } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

const AddServiceModal = ({ open, onClose, onSubmit }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newService = Object.fromEntries(formData);

    onSubmit(newService);
    event.target.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
        <DialogHeader>
          <DialogTitle>Tambah Layanan Baru</DialogTitle>
          <DialogDescription>Masukkan detail data layanan</DialogDescription>
        </DialogHeader>
        <Form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Nama Layanan</Label>
            <Input id="name" name="name" type="text" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="estimate">Estimasi (dalam menit)</Label>
            <Input id="estimate" name="estimate" type="number" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cost">Biaya Servis</Label>
            <Input id="cost" name="cost" type="number" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea
              id="description"
              name="description"
              type="text"
              required
            />
          </div>
          <DialogFooter>
            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Service</Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceModal;
