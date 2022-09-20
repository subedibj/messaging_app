import { ImageCategory } from "@prisma/client";
import Input from "components/FormComponents/Input";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import Button from "components/FormComponents/Button";
import Select from "components/FormComponents/Select";

const UserImageForm = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    setTimeout(() => {
      setMessage(" ");
      setError(" ");
    }, 3000);
  }, [message, error]);

  useEffect(() => {
    async function getAllBranches() {
      try {
        const res = await fetch("/api/user/getUsers", {
          method: "GET",
        });
        const userData = await res.json();
        if (res.status === 200) {
          setUserData(userData?.data);
          console.log("userData", userData);
        } else {
          throw new Error(userData.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAllBranches();
  }, []);

  console.log("getUsers", userData);

  const categoryOptions = Object.values(ImageCategory).map((item) => {
    const lowerCaseLabel = item.replace(/_/g, " ").toLowerCase();
    const label =
      lowerCaseLabel.charAt(0).toUpperCase() + lowerCaseLabel.slice(1);
    return {
      label: label,
      value: item,
    };
  });

  const userOptions = userData?.map((item: any) => {
    return {
      label: item.name,
      value: item.id,
    };
  });

  async function addImage(data: any) {
    console.log("data ::", data);
    try {
      const result = await fetch("/api/image/addImage", {
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
      console.log(err);
    }
  }
  const initialValues = {
    url: "",
    title: "",
    category: "",
    userId: "",
  };
  const validationSchema = Yup.object({
    url: Yup.string().required(),
    title: Yup.string().required(),
    category: Yup.object().required(),
    userId: Yup.object().required(),
  });
  const handleSubmit = async (values: any, formik: any) => {
    try {
      await addImage({
        url: values.url,
        title: values.title,
        category: values.category.value,
        userId: values.userId.value,
      });

      console.log("onsubmit", values);
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
          console.log("formik error:", formik.errors);
          console.log("values:", formik.values);
          return (
            <Form className="w-1/3 flex flex-col gap-6 my-20 mx-auto">
              <span className="text-primary flex justify-center items-center capitalize">
                {message}
              </span>
              <span className="text-red-400 flex justify-center items-center capitalize">
                {error}
              </span>
              <div className="grid grid-cols-1 justify-between gap-8">
                <Input name="title" label="title" placeholder="enter title" />
                <Input name="url" label="url" placeholder="enter url" />
                <Select
                  name="category"
                  label="category"
                  placeholder="select category"
                  formik={formik}
                  options={categoryOptions}
                />
                <Select
                  name="userId"
                  label="user"
                  placeholder="select user"
                  formik={formik}
                  options={userOptions}
                />
              </div>
              <Button
                label="Submit"
                type="submit"
                width="w-full"
                buttontype="primary"
              />
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default UserImageForm;
