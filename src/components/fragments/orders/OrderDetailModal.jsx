/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { priceFormat } from "@/lib/utils";

const OrderDetailModal = ({ open, onClose, order }) => {
  if (!order) return null;

  // Ensure order.Services exists before rendering
  const services = order.Services || [];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Order Details
          </DialogTitle>
          <DialogDescription>Details for order #{order.id}</DialogDescription>
        </DialogHeader>
        <Separator className="my-4" />
        <div className="grid gap-4">
          {[
            { label: "Name", value: order.User.username },
            { label: "Motorcycle Type", value: order.motorcycle_type },
            { label: "Phone", value: order.User.phoneNumber },
            { label: "Complaint", value: order.complaint_message },
            { label: "Status", value: order.status },
            { label: "Address", value: order.address || "No address provided" }, // Optional field, adjust as needed
          ].map(({ label, value }, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">{label}</span>
              <span className="font-medium capitalize">{value}</span>
            </div>
          ))}

          <Separator className="my-4" />

          <div>
            <h3 className="text-md font-semibold">Services Detail</h3>
            <div className="grid gap-2 mt-4">
              {services.length > 0 ? (
                services.map((service, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium capitalize">
                        {service.name}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Estimated Time: {service.estimate} minutes
                      </p>
                    </div>
                    <span className="font-medium">
                      {priceFormat(service.cost)}
                    </span>
                  </div>
                ))
              ) : (
                <p>No services available for this order.</p>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="font-medium text-lg">Total Price</span>
            <span className="font-medium text-lg">
              {priceFormat(order.total_cost)}
            </span>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span className="font-medium text-lg">Total Estimated Time</span>
            <span className="font-medium text-lg">
              {order.total_estimate} minutes
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
