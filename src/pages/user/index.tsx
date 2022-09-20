import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Home: NextPage = () => {
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    async function getAllUsers() {
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
    getAllUsers();
  }, []);

  return (
    <>
      <div className="flex flex-col w-1/2 mx-auto mt-10">
        <div className="flex flex-row gap-10 p-4 bg-primary text-white capitalize">
          <div className="w-52">name</div>
          <div className="w-52">email</div>
          <div className="w-52">phone</div>
          <div className="w-52">address</div>
        </div>
        {userData?.map((item: any) => {
          // eslint-disable-next-line react/jsx-key
          return <UserRow data={item} />;
        })}
      </div>
    </>
  );
};

export default Home;

const UserRow = ({ data }: any) => {
  const router = useRouter();
  let color;
  if (data.id % 2 === 0) {
    color = "bg-green-100";
  } else {
    color = "bg-yellow-100";
  }
  console.log(color);
  return (
    <div
      className={`flex ${color} flex-row gap-10 p-4 cursor-pointer`}
      onClick={() => router.push(`user/${data?.id}`)}
    >
      <div className="w-52">{data.name}</div>
      <div className="w-52">{data.email}</div>
      <div className="w-52">{data.phone}</div>
      <div className="w-52">{data.address}</div>
    </div>
  );
};
