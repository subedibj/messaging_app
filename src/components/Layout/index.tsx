import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BiMessageRoundedDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

const Layout = () => {
  const layoutData = [
    {
      id: 1,
      title: "posts",
      url: "/post",
      icon: <AiOutlineHome className="h-8 w-8" />,
    },
    {
      id: 2,
      title: "message",
      url: "/message",
      icon: <BiMessageRoundedDetail className="h-8 w-8" />,
    },
    {
      id: 3,
      title: "profile",
      url: "/profile",
      icon: <CgProfile className="h-8 w-8" />,
    },
  ];

  const router = useRouter();
  const isActiveTab = (route: String) => {
    const pathname = router.pathname;
    const parsedPathname = pathname.split("/")[1];
    const parsedRoute = route.split("/")[1];

    if (parsedPathname === parsedRoute) {
      return "border-b-2 border-primary group flex items-center px-2 py-2 cursor-pointer";
    } else {
      return "group flex items-center px-2 py-2 cursor-pointer";
    }
  };
  return (
    <>
      <div className="flex h-14 flex-row justify-center items-center gap-10 bg-gray-100">
        {layoutData.map((item) => {
          return (
            <div key={item.id}>
              <Link href={item.url}>
                <div title={item.title} className={isActiveTab(`${item.url}`)}>
                  <div className="capitalize">{item.title}</div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Layout;
