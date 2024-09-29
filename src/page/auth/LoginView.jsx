import FormAuth from "@/components/fragments/auth/FormAuth";
import { loginUser } from "@/features/userSlice";
import customAPI from "@/services/api";
import { redirect } from "react-router-dom";
import { toast } from "sonner";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customAPI.post("/auth/login", data);
      store.dispatch(loginUser(response.data));
      toast.success("Login successful");

      // Check user role
      if (
        response.data.data.user.role_id ===
        "72d37b8b-fa40-4d29-ab1e-8723b420ce2d"
      ) {
        return redirect("/"); // Redirect to admin page
      } else {
        return redirect("/not-authorized");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    }
  };

const LoginView = () => {
  return (
    <div>
      <FormAuth isRegister={false} />
    </div>
  );
};

export default LoginView;
