import React from "react";

const Footer = () => {
  const footerItem = [
    {
      name: "facebook",
      url: "https://www.facebook.com/tuglar/",
      class: "ri-facebook-line text-white text-2xl",
    },
    {
      name: "x",
      url: "https://x.com/turanocaklarii",
      class: "ri-twitter-x-line text-white text-xl",
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/turanocaklarii/",
      class: "ri-instagram-line text-white text-2xl",
    },
    {
      name: "x",
      url: "https://www.youtube.com/",
      class: "ri-youtube-line text-white text-2xl",
    },
  ];
  return (
    <div className="bg-black">
      <div className="flex justify-center items-center flex-col py-20 gap-5">
        <div className="text-white text-4xl">
          <a href="/">
            <img src="/logo.png" alt="logo" className="" />
          </a>
        </div>

        {/* <div className="text-white font-bold flex gap-4 ">
          <a href="">İletişim</a>
          <a href="">İletişim</a>
          <a href="">İletişim</a>
          <a href="">İletişim</a>
        </div> */}

        <div className="flex gap-5">
          {footerItem?.map((item) => (
            <a href={item?.url} target="_blank">
              <div className="bg-[#475152] rounded-full w-10 h-10 flex items-center justify-center">
                <i className={item?.class}></i>
              </div>
            </a>
          ))}
        </div>

        <div className="text-[#919596] text-center">
          <p>Copyright © 2024. Turan Ocakları</p>
          <p>
            Bağlantı yoluyla gidilen dış sitelerin içeriğinden sorumlu
            değildir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
