import Button from "components/FormComponents/Button";
import { useRouter } from "next/router";
import React from "react";

const Index = ({ Children }: any) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-row w-full justify-center items-center mt-10 gap-20 fixed">
        <Button
          label="Add User"
          buttonType="secondary"
          onClick={() => router.push("/admin/addUser")}
        />
        <Button
          label="Add Image"
          buttonType="secondary"
          onClick={() => router.push("/admin/addImage")}
        />
      </div>
      <div className="w-full mx-10 h-full mt-20">{Children}</div>
    </div>
  );
};

export default Index;
