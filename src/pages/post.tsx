import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiComment, BiLike } from "react-icons/bi";
import { RiShareForwardLine } from "react-icons/ri";

const Image = () => {
  const [imageData, setImageData] = useState<any>();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    async function getAllImages() {
      try {
        const res = await fetch("/api/image/getImages", {
          method: "GET",
        });
        const imageData = await res.json();
        if (res.status === 200) {
          setImageData(imageData?.data);
          console.log("imageData", imageData);
        } else {
          throw new Error(imageData.error);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAllImages();

    //   async function getUserData() {
    //     try {
    //       const res = await fetch("/api/user/getUserById", {
    //         method: "GET",
    //       });
    //       const userData = await res.json();
    //       if (res.status === 200) {
    //         setUserData(userData?.data);
    //         console.log("userData", userData);
    //       } else {
    //         throw new Error(userData.error);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }
    //   getUserData();
    //
  }, []);
  console.log("image ::", imageData, "user", userData);
  return (
    <>
      <div className="flex flex-col bg-lightBlue border border-boxBorder w-1/2 mx-auto p-10 gap-10 mt-10">
        {imageData?.map((item: any) => {
          // eslint-disable-next-line react/jsx-key
          return <UserRow data={item} />;
        })}
      </div>
    </>
  );
};

export default Image;

const UserRow = ({ data }: any) => {
  console.log("data", data);

  const router = useRouter();

  let text = data.category;
  let category = text.toLowerCase();
  return (
    <div
      className={`flex flex-col gap-6 p-4 cursor-pointer rounded-md h-auto border bg-white border-boxBorder`}
      // onClick={() => router.push(`user/${data?.id}`)}
    >
      <div className="flex flex-row gap-2  items-center  text-base">
        <div className="h-12 w-12 rounded-full border-1 bg-boxBorder">
          <img src={data.url} className="h-12 w-12 rounded-full" />
        </div>
        <div className="flex flex-col">
          <span>
            {data.userId} Uploaded her{" "}
            <span className="capitalize"> {category}</span> pic
          </span>
          <span className="capitalize text-gray-400">Sep 2,2022</span>
        </div>
      </div>
      <div className="capitalize">{data.title}</div>
      <div className="h-80 bg-red-400 w-full">
        <img src={data.url} alt="" className="w-full h-full" />
      </div>
      <div className="h-10 w-full border-y border-boxBorder capitalize text-gray-400 flex justify-around items-center">
        <span className="flex items-center gap-1">
          <BiLike />
          like
        </span>
        <span className="flex items-center gap-1">
          <BiComment />
          comment
        </span>
        <span className="flex items-center gap-1">
          <RiShareForwardLine />
          share
        </span>
      </div>
    </div>
  );
};
