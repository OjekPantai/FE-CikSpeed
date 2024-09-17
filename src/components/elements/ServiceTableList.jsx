import PropTypes from "prop-types";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../ui/button";

const ServiceTableList = ({ service }) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{service.name}</TableCell>
      <TableCell>{service.description}</TableCell>
      <TableCell>Rp {service.cost.toLocaleString()}</TableCell>
      <TableCell className="hidden md:table-cell text-start">
        ± {service.estimate} menit
      </TableCell>

      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

// Define PropTypes for validation
ServiceTableList.propTypes = {
  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    estimate: PropTypes.number.isRequired,
  }).isRequired,
};

export default ServiceTableList;
