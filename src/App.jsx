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
import { loader as loaderCustomer } from "./page/CustomerView";
import { loader as loaderHome } from "./page/HomeView";
import ProtectedRoute from "./components/ProtectedRoute";

import { action as LoginAction } from "./page/auth/LoginView";
import { action as RegisterAction } from "./page/auth/RegisterView";

import { store } from "./stores/store";
import TransactionHistory from "./page/TransactionHistory";
import ForbiddenView from "./page/ForbiddenView";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PublicLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeView />,
        loader: loaderHome,
      },
      {
        path: "orders",
        element: <OrderView />,
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
      {
        path: "transactions",
        element: <TransactionHistory />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginView />,
    action: LoginAction(store),
  },
  {
    path: "/register",
    element: <RegisterView />,
    action: RegisterAction(store),
  },
  {
    path: "*",
    element: <ErrorView />,
  },
  {
    path: "/not-authorized",
    element: <ForbiddenView />,
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
