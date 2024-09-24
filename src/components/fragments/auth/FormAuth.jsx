/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, Link } from "react-router-dom";

const FormAuth = ({ isRegister }) => {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Form method="POST" className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">
              {isRegister ? "Register" : "Login"}
            </CardTitle>
            <CardDescription>
              {isRegister
                ? "Enter your details to create your account"
                : "Enter your username and password to login to your account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-y-4">
              <div className="grid gap-y-2">
                {isRegister && (
                  <>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      required
                    />
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      name="address"
                      placeholder="Enter your address"
                      required
                    />
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      required
                    />
                  </>
                )}
                {!isRegister && (
                  <>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      required
                    />
                  </>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required
                />
                {isRegister && (
                  <>
                    <div className="flex items-center">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                    </div>
                    <Input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      required
                    />
                  </>
                )}
              </div>
              <Button type="submit" className="w-full">
                {isRegister ? "Register" : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              {isRegister
                ? "Already have an account? "
                : "Do not have an account? "}
              <Link
                to={isRegister ? "/login" : "/register"}
                className="underline text-teal-500 hover:text-teal-700"
              >
                {isRegister ? "Login now" : "Register now"}
              </Link>
            </div>
          </CardContent>
        </Card>
      </Form>
    </div>
  );
};

export default FormAuth;
