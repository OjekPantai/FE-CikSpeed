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
        <div className="grid gap-4 ">
          {/* Order General Details */}
          {[
            { label: "Name", value: order.name },
            { label: "Motorcycle Type", value: order.motorcycleType },
            { label: "Phone", value: order.phone },
            { label: "Complaint", value: order.complaintMessage },
            { label: "Address", value: order.address },
            { label: "Status", value: order.status },
          ].map(({ label, value }, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="font-medium text-muted-foreground">{label}</span>
              <span className="font-medium capitalize">{value}</span>
            </div>
          ))}

          <Separator className="my-4" />

          {/* Order Services Details */}
          <div>
            <h3 className="text-md font-semibold">Services Detail</h3>
            <div className="grid gap-2 mt-4">
              {order.services.length > 0 ? (
                order.services.map((service, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium capitalize">
                        {service.name}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        Estimated Time: {service.estimatedTime} minutes
                      </p>
                    </div>
                    <span className="font-medium">
                      {priceFormat(service.price)}
                    </span>
                  </div>
                ))
              ) : (
                <p>No services available for this order.</p>
              )}
            </div>
          </div>

          {/* Total Price */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <span className="font-medium text-lg">Total Price</span>
            <span className="font-medium text-lg">
              {priceFormat(
                order.services.reduce((acc, service) => acc + service.price, 0)
              )}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailModal;
