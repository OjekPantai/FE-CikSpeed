import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Page Component
import HomeView from "./page/HomeView";
import OrderView from "./page/OrderView";
import ServiceView from "./page/ServiceView";
import LoginView from "./page/auth/LoginView";
import RegisterView from "./page/auth/RegisterView";
import PublicLayout from "./layouts/PublicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "order",
        element: <OrderView />,
      },
      {
        path: "service",
        element: <ServiceView />,
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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
