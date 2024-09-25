/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Form } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const EditServiceModal = ({ open, onClose, service, onSubmit }) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
      <DialogHeader>
        <DialogTitle>Edit Service</DialogTitle>
        <DialogDescription>Edit the details of the service</DialogDescription>
      </DialogHeader>
      <Form className="grid gap-4" onSubmit={onSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="name">Nama Service</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={service?.name || ""}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Deskripsi</Label>
          <Input
            id="description"
            name="description"
            type="text"
            defaultValue={service?.description || ""}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="estimate">Estimasi</Label>
          <Input
            id="estimate"
            name="estimate"
            type="number"
            defaultValue={service?.estimate || ""}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="cost">Biaya Servis</Label>
          <Input
            id="cost"
            name="cost"
            type="number"
            defaultValue={service?.cost || ""}
            required
          />
        </div>
        <DialogFooter>
          <Button
            className="hidden md:block"
            type="button"
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  </Dialog>
);

export default EditServiceModal;
