import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const DetailServiceModal = ({ open, onClose, service }) => {
  if (!service) {
    return null; // Return early if service is null
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="w-[90vw] max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg bold">Service Detail</DialogTitle>
            <DialogDescription>Details for #{service.id}</DialogDescription>
          </DialogHeader>
          <Separator className="my-4" />
          <div className="grid gap-4 text-sm ">
            {[
              { label: "Name", value: service.name },
              { label: "Description", value: service.description },
              { label: "Cost", value: service.cost },
              { label: "Estimate", value: service.estimate },
            ].map(({ label, value }, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-x-6 items-center"
              >
                <span className="font-sm text-muted-foreground">{label}</span>
                <span className="font-sm capitalize font-semibold">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailServiceModal;
