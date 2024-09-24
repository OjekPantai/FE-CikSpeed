import { useState } from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import DetailServiceModal from "./DetailServiceModal";
import EditServiceModal from "./EditServiceModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import customAPI from "@/services/api";
import { toast } from "sonner";

const ServiceTable = ({ services }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmModalOpen, setDeleteConfirmModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 10; // Jumlah layanan per halaman

  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  const totalPages = Math.ceil(services.length / servicesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailClick = (service) => {
    setSelectedService(service);
    setDetailModalOpen(true);
  };
  const handleEditClick = (service) => {
    setSelectedService(service);
    setEditModalOpen(true);
  };
  const handleDeleteClick = (service) => {
    setSelectedService(service);
    setDeleteConfirmModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await customAPI.delete(`/services/${selectedService.id}`);
      setDeleteConfirmModalOpen(false);
      toast.success(`Service ${selectedService.name} deleted successfully`);
    } catch (error) {
      toast.error(`Failed to delete service: ${error.message}`);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedService = Object.fromEntries(formData);

    try {
      await customAPI.put(`/services/${selectedService._id}`, updatedService);
      setEditModalOpen(false);
      toast.success("Service updated successfully");
    } catch (error) {
      toast.error(`Error updating service: ${error.message}`);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Layanan</CardTitle>
        <CardDescription>Kelola Data Layanan</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama Layanan</TableHead>
              <TableHead className="hidden lg:table-cell">Deskripsi</TableHead>
              <TableHead className="hidden md:table-cell">
                Estimasi (Menit)
              </TableHead>
              <TableHead>Biaya</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs md:text-base">
            {currentServices.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium capitalize">
                  {service.name}
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {service.description}
                </TableCell>
                <TableCell className="hidden md:table-cell text-start">
                  ± {service.estimate} menit
                </TableCell>
                <TableCell>Rp {service.cost.toLocaleString()}</TableCell>
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
                      <DropdownMenuItem
                        onClick={() => handleDetailClick(service)}
                        className="text-indigo-600 cursor-pointer"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Detail
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditClick(service)}
                        className="text-blue-600 cursor-pointer"
                      >
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(service)}
                        className="text-red-600 cursor-pointer"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <CardFooter>
        <div className="flex justify-between text-xs text-muted-foreground">
          {`${currentServices.length} of ${services.length} Services`}
        </div>

        <Pagination className="justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1} // Nonaktifkan tombol jika di halaman pertama
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => {
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>

      <DetailServiceModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        service={selectedService}
      />
      <EditServiceModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        service={selectedService}
        onSubmit={handleEditSubmit}
      />

      <DeleteConfirmModal
        open={deleteConfirmModalOpen}
        onClose={() => setDeleteConfirmModalOpen(false)}
        service={selectedService}
        onConfirm={handleDeleteConfirm}
      />
    </Card>
  );
};

// Validasi PropTypes
ServiceTable.propTypes = {
  services: PropTypes.array.isRequired,
};

export default ServiceTable;
