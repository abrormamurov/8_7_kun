import React from "react";
import { FormInput } from "../components";
import { Form, useActionData } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { useEffect } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  return { email, password };
};
function Login() {
  const userData = useActionData();
  const { loginUser, isPanding } = useLogin();

  useEffect(() => {
    if (userData) {
      loginUser(userData.email, userData.password);
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block h-full bg-amber-100 bg-[url('https://picsum.photos/1400/1800')] bg-center bg-cover  "></div>
      <div className="h-full grid place-items-center bg-slate-300 lg:bg-none bg-[url('https://picsum.photos/1400/1800')] bg-center bg-cover ">
        <div className="card bg-base-100 w-96 shadow-xl p-8 ">
          <Form method="post" className="flex flex-col items-center gap-5">
            <h1 className="text-3xl font-semibold">Login</h1>
            <FormInput type="email" label="email" name="email" />
            <FormInput type="password" label="password" name="password" />
            <div className="w-full">
              {!isPanding && (
                <button className="btn btn-primary btn-block">Login</button>
              )}{" "}
              {isPanding && (
                <button disabled className="btn btn-primary btn-block">
                  ...Loading...
                </button>
              )}{" "}
            </div>
          </Form>
          <div className="w-full mt-5">
            <button className="btn btn-secondary btn-block">Google</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
