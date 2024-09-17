import { useEffect, useState } from "react";
import customAPI from "@/services/api";

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

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const getServices = async () => {
    try {
      const { data } = await customAPI.get("/services"); // add limit
      setServices(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

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
            {services.map((service) => (
              <ServiceTableList service={service} key={service.id} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServiceTable;
