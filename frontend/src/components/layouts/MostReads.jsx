import React from "react";
import { useGetPopularNewsQuery } from "../../redux/api/newsApi";

const MostReads = () => {
  const { data: news } = useGetPopularNewsQuery();
  return (
    <>
      <h2 className="mb-5 text-xl font-bold">En Çok Okunanlar</h2>
      <div className="grid  gap-5 max-lg:mb-10">
        {news?.news?.map((item) => (
          <a href={`/haber/${item?.category?.slug}/${item?.slug}`}>
            <div className="flex gap-2 items-center hover:text-[#39608B] w-full">
            <i class="ri-circle-fill text-xl text-[#39608B]"></i>
            <p className="font-semibold">{item?.title}</p>
          </div>
          </a>
        ))}
      </div>
    </>
  );
};

export default MostReads;
