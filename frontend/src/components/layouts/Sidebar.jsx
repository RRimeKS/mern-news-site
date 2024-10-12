import React, { useEffect, useState } from "react";
import { useLazyLogoutQuery } from "../../redux/api/authApi";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("");
  const sidebarMenuItems = [
    {
      name: "Adminler",
      url: "/admin/kullanicilar",
      icon: "ri-shield-user-line",
    },
    {
      name: "Yetkili Ekle",
      url: "/admin/kullanici-ekle",
      icon: "ri-user-add-line",
    },
    {
      name: "Haberler",
      url: "/admin/haberler",
      icon: "ri-news-line",
    },
    {
      name: "Haber Ekle",
      url: "/admin/haber-ekle",
      icon: "ri-file-add-line",
    },
    {
      name: "Kategoriler",
      url: "/admin/kategoriler",
      icon: "ri-menu-search-line",
    },
    {
      name: "Kategori Ekle",
      url: "/admin/kategori-ekle",
      icon: "ri-add-circle-line",
    }    
  ];
  const [logout] = useLazyLogoutQuery();
  const navigate = useNavigate();
  const logoutHandler = () => {
    logout();
    navigate("/");
  }
  useEffect(() => {
    setActive(window.location.pathname);
  }, []);
  return (
    <div className="border rounded shadow-lg flex flex-col gap-5">
      {sidebarMenuItems?.map((item, key) => (
        <div
          className={`flex items-center text-lg gap-2 py-1 px-3 ${
            active === item.url && "text-white bg-[#39608B] font-semibold"
          }`}
          key={key}
        >
          <span>
            <i class={`${item.icon} text-4xl`}></i>
          </span>
          <a href={`${item.url}`}>
            <p>{item.name}</p>
          </a>
        </div>
      ))}
      <div className={`flex items-center text-lg gap-2 py-1 px-3 `}>
        <span>
          <i class={`ri-arrow-left-line text-4xl`}></i>
        </span>
        <a className="cursor-pointer" onClick={logoutHandler}>Çıkış</a>
      </div>
    </div>
  );
};

export default Sidebar;
