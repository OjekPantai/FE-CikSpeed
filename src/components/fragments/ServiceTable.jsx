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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ServiceTableList from "../elements/ServiceTableList";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination"; // Import your pagination component

const ServiceTable = ({ services }) => {
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 5; // Number of services per page

  // Calculate the displayed services
  const indexOfLastService = currentPage * servicesPerPage;
  const indexOfFirstService = indexOfLastService - servicesPerPage;
  const currentServices = services.slice(
    indexOfFirstService,
    indexOfLastService
  );

  // Calculate total pages
  const totalPages = Math.ceil(services.length / servicesPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              <TableHead>Deskripsi</TableHead>
              <TableHead>Biaya</TableHead>
              <TableHead className="hidden md:table-cell">
                Estimasi (Menit)
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentServices.map((service) => (
              <ServiceTableList service={service} key={service.id} />
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
            {/* Previous Button */}
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => {
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                disabled={currentPage === 1} // Disable button if on the first page
              />
            </PaginationItem>

            {/* Page Numbers */}
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

            {/* Next Button */}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => {
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                disabled={currentPage === totalPages} // Disable button if on the last page
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardFooter>
    </Card>
  );
};

ServiceTable.propTypes = {
  services: PropTypes.array.isRequired,
};

export default ServiceTable;
