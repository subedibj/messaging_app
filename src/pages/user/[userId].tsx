import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UserDetails = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    async function getUserById() {
      try {
        const res = await fetch("/api/user/getUserById", {
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
    // @ts-ignore
    getUserById(userId);
  }, []);

  console.log("data", userData);
  return (
    <>
      <div className="flex flex-col w-1/2 mx-auto mt-10">{userId}</div>
      {userData?.map((item: any) => {
        return item;
      })}
    </>
  );
};

export default UserDetails;
