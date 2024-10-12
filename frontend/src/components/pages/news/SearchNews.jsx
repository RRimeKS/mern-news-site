import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGetAllNewsQuery } from "../../../redux/api/newsApi";
import MetaData from "../../layouts/MetaData";

const SearchNews = () => {
  const [searchParams] = useSearchParams();
  const aranan = searchParams.get("aranan") || "";

  const { data: news } = useGetAllNewsQuery({ aranan });

  const getTimeFunc = (time) => {
    const date = new Date(time);
    const options = {
      timeZone: "Europe/Istanbul", // Türkiye saat dilimi
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    return new Intl.DateTimeFormat("tr-TR", options).format(date);
  };
  return (
    <>
      <MetaData title={`Arama Sayfası`} />

      <div className="min-h-[80vh] font-noto">
        <div className="">
          <div className="flex max-sm:flex-col max-sm:gap-5 items-center gap-2 justify-between">
            <div className="flex gap-2 items-center">
              <i class="ri-circle-fill max-sm:text-xl text-3xl text-[#39608B]"></i>
              <h1 className="max-md:text-3xl text-5xl font-bold">
                Arama Sonuçları: "{aranan}"
              </h1>
            </div>
            <div className="">
              <h1 className="font-semibold max-sm:text-md text-xl">
                Toplam {news?.news?.length} arama sonucu bulundu.
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 my-10">
            {news?.news?.map((item) => (
              <div className="search-news-card news-style-big-card">
                <a href={`/haber/${item?.category?.slug}/${item?.slug}`}>
                  <img src={item?.images[0]?.url} alt="" />
                </a>
                <a href={`/haber/${item?.category?.slug}`}>
                  <p className="text-[#39608B] font-bold py-3">
                    {item?.category?.name}
                  </p>
                </a>
                <a href={`/haber/${item?.category?.slug}/${item?.slug}`}>
                  <h1 className="font-bold text-xl">{item?.title}</h1>
                </a>
                <p>{getTimeFunc(item?.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchNews;
