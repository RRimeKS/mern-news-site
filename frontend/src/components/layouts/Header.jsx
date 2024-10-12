import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetMeQuery } from "../../redux/api/userApi";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";
import Weather from "./Weather";
import Search from "./Search";

const Header = () => {
  const middleHeaderItem = [
    {
      name: "Gündem",
      url: "/haber/gundem",
    },
    {
      name: "Türkiye",
      url: "/haber/turkiye",
    },
    {
      name: "Dünya",
      url: "/haber/dunya",
    },
    {
      name: "Ekonomi",
      url: "/haber/ekonomi",
    },
    {
      name: "Spor",
      url: "/haber/spor",
    },
    {
      name: "Savunma",
      url: "/haber/savunma",
    },
  ];

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isLoading } = useGetMeQuery();

  const { data: categories } = useGetAllCategoriesQuery();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [searchData, setSearchData] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const subHandler = () => {
    const as = document.getElementById("subheader");
    if (as.classList.contains("top-[-10000%]")) {
      as.classList.remove("top-[-10000%]");
      as.classList.add("top-16");
      setShow(true);
    } else {
      as.classList.add("top-[-10000%]");
      as.classList.remove("top-16");
      setShow(false);
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (!showSearch) setShowSearch(true);
  };

  

  return (
    <div className="mb-[90px]">
      <header
        className="fixed w-full bg-[#39608B] z-50 top-0 left-0 lg:px-32"
        onMouseLeave={() => setShowSearch(false)}
      >
        <nav className="flex justify-between items-center h-16 px-5 py-1 text-white">
          <div className="flex max-md:gap-2 md:gap-10 items-center justify-center relative">
            <i
              className={`${
                !show ? "ri-menu-line" : "ri-close-large-line"
              } md:hidden cursor-pointer transition-shadow`}
              onClick={subHandler}
              style={{ fontSize: "24px" }}
            ></i>
            <a href="/">
              <img src="/logo.png" alt="logo" className="max-w-56" />
            </a>
            <div className="hidden md:block">
              <ul className="flex gap-2">
                {middleHeaderItem?.map((item, key) => (
                  <a href={item?.url} key={key}>
                    <li className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 hover:bg-white hover:rounded-se-lg hover:rounded-es-lg hover:text-[#39608B]">
                      {item?.name}
                    </li>
                  </a>
                ))}
                {user?.data?.role === "admin" && (
                  <a href={"/admin/haber-ekle"}>
                    <li className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 hover:bg-white hover:rounded-se-lg hover:rounded-es-lg hover:text-[#39608B]">
                      admin
                    </li>
                  </a>
                )}
              </ul>
            </div>
          </div>
          <div
            className={`absolute overflow-y-scroll bg-white text-black left-0 min-h-[80vh] max-h-screen top-[-10000%] w-full transition-all md:hidden`}
            id="subheader"
          >
            <ul className="nav-ul p-3 ">
              {user?.data?.role === "admin" && (
                <li className="border-b font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer hover:text-gray-500">
                  <a href={`/admin/haber-ekle`}>Admin</a>
                </li>
              )}
              {categories?.category?.map((category) => (
                <li className="border-b font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer hover:text-gray-500">
                  <a href={`/haber/${category?.slug}`}>{category?.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex">
            <div className={`${ showSearch && "pr-32" } max-sm:hidden md:hidden xl:block`}>
              <Weather />
            </div>
            <Search />
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
