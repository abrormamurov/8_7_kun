import React, { useEffect } from "react";
import { FormInput } from "../components";
import { Form, useActionData } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("email");
  let password = formData.get("password");
  let photoURL = formData.get("photoURL");
  let displayName = formData.get("displayName");
  return { email, password, photoURL, displayName };
};
function Register() {
  const userData = useActionData();
  const { register, isPanding } = useRegister();

  useEffect(() => {
    if (userData) {
      register(
        userData.email,
        userData.password,
        userData.displayName,
        userData.photoURL
      );
    }
  }, [userData]);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      <div className="hidden lg:block h-full bg-amber-100 bg-[url('https://picsum.photos/1400/1800')] bg-center bg-cover  "></div>
      <div className="h-full grid place-items-center bg-slate-300 lg:bg-none bg-[url('https://picsum.photos/1000/1800')] bg-center bg-cover ">
        <div className="card bg-base-100 w-96 shadow-xl p-8 ">
          <Form method="post" className="flex flex-col items-center gap-5">
            <h1 className="text-3xl font-semibold">Register</h1>
            <FormInput type="text" label="displayName" name="displayName" />
            <FormInput type="url" label="photoURL" name="photoURL" />

            <FormInput type="email" label="email" name="email" />
            <FormInput type="password" label="password" name="password" />
            <div className="w-full">
              {!isPanding && (
                <button className="btn btn-primary btn-block">Register</button>
              )}{" "}
              {isPanding && (
                <button disabled className="btn btn-primary btn-block">
                  ...Loading...
                </button>
              )}{" "}
            </div>
          </Form>
          <div className="w-full mt-5 mb-5">
            <button className="btn btn-secondary btn-block">Google</button>
          </div>
          <h2 className="text-center font-medium ">
            Already have an account?{" "}
            <Link className="text-blue-700 font-bold	" to="/login">
              Login
            </Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Register;
