/* eslint-disable react/prop-types */
import Loading from "@/components/elements/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const DeleteOrderModal = ({
  open,
  onClose,
  onConfirm,
  order,
  isLoading,
  isTransaction,
}) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-[425px] md:max-w-xl rounded-lg grid gap-6">
      <DialogHeader className="grid gap-4">
        <DialogTitle>Delete Order</DialogTitle>
        {isTransaction ? (
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold text-teal-600 capitalize">
              {order?.User?.username}
            </span>{" "}
            from transaction history?
          </DialogDescription>
        ) : (
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-bold text-teal-600 capitalize">
              {order?.User?.username}
            </span>{" "}
            from order?
          </DialogDescription>
        )}
      </DialogHeader>
      <DialogFooter>
        <div className="grid grid-cols-2 md:grid gap-4">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {isLoading ? (
              <div>
                <Loading />
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteOrderModal;
