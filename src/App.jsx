import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@/components/theme-provider";

// Page Component
import HomeView from "./page/HomeView";
import OrderView from "./page/OrderView";
import ServiceView from "./page/ServiceView";
import LoginView from "./page/auth/LoginView";
import RegisterView from "./page/auth/RegisterView";
import PublicLayout from "./layouts/PublicLayout";
import CustomerView from "./page/CustomerView";
import ErrorView from "./page/ErrorView";

// Loader
import { loader as loaderService } from "./page/ServiceView";
import { loader as loaderOrder } from "./page/OrderView";
import { loader as loaderCustomer } from "./page/CustomerView";
import { loader as loaderHome } from "./page/HomeView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: loaderHome,
      },
      {
        path: "orders",
        element: <OrderView />,
        loader: loaderOrder,
      },
      {
        path: "services",
        element: <ServiceView />,
        loader: loaderService,
      },
      {
        path: "customers",
        element: <CustomerView />,
        loader: loaderCustomer,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
  },
  {
    path: "/register",
    element: <RegisterView />,
  },
  {
    path: "*",
    element: <ErrorView />,
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
