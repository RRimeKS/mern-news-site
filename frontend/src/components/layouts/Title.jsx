import React from "react";

const Title = ({ title, slug }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-[#39608B] rounded-full h-8 w-8"></div>
      <a href={`/haber/${slug}`} className="text-2xl lg:text-4xl font-bold font-noto uppercase hover:underline ">
        {title}
      </a>
    </div>
  );
};

export default Title;
