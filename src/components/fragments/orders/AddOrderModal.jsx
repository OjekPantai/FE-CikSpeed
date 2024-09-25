/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
import {
  calculateTotalEstimatedTime,
  calculateTotalPrice,
  priceFormat,
} from "@/lib/utils";
import customAPI from "@/services/api";

const AddOrderModal = ({ open, onClose, onSubmit }) => {
  const [motorcycleType, setMotorcycleType] = useState("");
  const [complaintMessage, setComplaintMessage] = useState("");
  const [services, setServices] = useState([]);
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const { data } = await customAPI.get("/services");
        setServicesData(data.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newOrder = Object.fromEntries(formData);
    newOrder.services = services;
    onSubmit(newOrder);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] md:max-w-xl rounded-lg grid gap-6">
        <DialogHeader>
          <DialogTitle>Add New Order</DialogTitle>
          <DialogDescription>
            Enter the details of the new order
          </DialogDescription>
        </DialogHeader>
        <Form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="motorcycle_type">Motorcycle Type</Label>
            <Input
              id="motorcycle_type"
              name="motorcycle_type"
              type="text"
              value={motorcycleType}
              onChange={(event) => setMotorcycleType(event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="complaint_message">Complaint Message</Label>
            <Textarea
              id="complaint_message"
              name="complaint_message"
              type="text"
              value={complaintMessage}
              onChange={(event) => setComplaintMessage(event.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="services">Services</Label>

            {servicesData.map((service) => (
              <div key={service.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`service-${service.id}`}
                  name="services"
                  value={service.id}
                  checked={services.includes(service.id)}
                  onChange={(event) => {
                    const newServices = [...services];
                    if (event.target.checked) {
                      newServices.push(service.id);
                    } else {
                      newServices.splice(newServices.indexOf(service.id), 1);
                    }
                    setServices(newServices);
                  }}
                />
                <label htmlFor={`service-${service.id}`}>{service.name}</label>
                <span className="text-muted-foreground">
                  {service.estimate} Menit
                </span>
                <span className="text-muted-foreground">Rp {service.cost}</span>
              </div>
            ))}
          </div>
          <div className="grid mt-4 gap-2">
            <div className="flex justify-between">
              <span>Estimasi Waktu</span>
              <span>
                {calculateTotalEstimatedTime(services, servicesData)} Menit
              </span>
            </div>
            <div className="flex justify-between">
              <span>Total Harga</span>
              <span>
                {priceFormat(calculateTotalPrice(services, servicesData))}
              </span>
            </div>
          </div>

          <DialogFooter>
            <div className="grid grid-cols-2 gap-4">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Order</Button>
            </div>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrderModal;
