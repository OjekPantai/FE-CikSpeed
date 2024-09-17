import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import OrderTable from "@/components/fragments/OrderTable";

const HomeView = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>

      <section className="grid grid-cols- md:grid-cols-2 gap-4">
        <div>
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardDescription>Jumlah pelanggan minggu ini</CardDescription>
              <CardTitle className="text-4xl">29</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +80% dari minggu kemarin
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card className="w-full">
            <CardHeader className="pb-2">
              <CardDescription>Pendapatan minggu ini</CardDescription>
              <CardTitle className="text-4xl">Rp. 783.000</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs text-muted-foreground">
                +40% dari minggu kemarin
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="grid  gap-4">
        <OrderTable />
      </section>
    </main>
  );
};

export default HomeView;
