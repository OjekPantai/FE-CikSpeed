import FormAuth from "@/components/fragments/auth/FormAuth";
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
      return redirect("/");
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
