import Input from "components/FormComponents/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Button from "components/FormComponents/Button";

const UserForm = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setMessage(" ");
      setError(" ");
    }, 3000);
  }, [message, error]);

  async function addUser(data: any) {
    try {
      const result = await fetch("/api/user/addUser", {
        body: JSON.stringify(data),
        headers: {
          "content-type": "application/json",
        },
        method: "POST",
      });
      const addedData = await result.json();
      if (result.status === 201) {
        setMessage("successfully submitted !");
      } else {
        throw new Error(addedData.error);
      }
    } catch (err: any) {
      setError(err.message);
      console.log(err.message);
    }
  }
  const initialValues = {
    name: "",
    address: "",
    email: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    address: Yup.string().required(),
    email: Yup.string().required(),
    phone: Yup.string().required(),
  });
  const handleSubmit = async (values: any, formik: any) => {
    console.log("values", values);
    try {
      await addUser({
        name: values.name,
        address: values.address,
        email: values.email,
        phone: values.phone,
      });
      formik.resetForm();
    } catch (err: any) {
      console.log("Error from Form:", err.message);
    }
  };
  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => {
          return (
            <Form className="w-1/3 flex flex-col gap-6 my-20 mx-auto">
              <span className="text-primary flex justify-center items-center capitalize">
                {message}
              </span>
              <span className="text-red-400 flex justify-center items-center capitalize">
                {error}
              </span>
              <div className="grid grid-cols-1 justify-between gap-8">
                <Input name="name" label="name" placeholder="enter name" />
                <Input name="email" label="email" placeholder="enter email" />
                <Input name="phone" label="phone" placeholder="enter phone" />
                <Input
                  name="address"
                  label="address"
                  placeholder="enter address"
                />
              </div>
              <Button
                label="Submit"
                type="submit"
                width="w-full"
                buttonType="primary"
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UserForm;
