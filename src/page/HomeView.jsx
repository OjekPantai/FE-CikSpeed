import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomeView = () => {
  const [hasOrdered, setHasOrdered] = useState(false);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
      </div>
      <Card className="sm:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle>Your Orders</CardTitle>
          <CardDescription className="text-balance max-w-lg leading-relaxed">
            Introducing Our Dynamic Orders Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          {/* Conditional rendering untuk button */}
          {!hasOrdered && (
            <Button onClick={() => setHasOrdered(true)}>
              Create New Order
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  );
};

export default HomeView;
