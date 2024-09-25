import FormAuth from "@/components/fragments/auth/FormAuth";
import { registerUser } from "@/features/userSlice";
import customAPI from "@/services/api";
import { redirect } from "react-router-dom";
import { toast } from "sonner";

export const action =
  (store) =>
  async ({ request }) => {
    const formInputData = await request.formData();
    const data = Object.fromEntries(formInputData);

    try {
      const response = await customAPI.post("/auth/register", data);
      store.dispatch(registerUser(response.data));
      toast.success("Login successful");
      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    }
  };

const RegisterView = () => {
  return (
    <div>
      <FormAuth isRegister={true} />
    </div>
  );
};

export default RegisterView;
