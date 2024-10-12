import React, { useState } from "react";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApi";

const News = ({ data }) => {
  const { data: categories } = useGetAllCategoriesQuery();
  return (
    <div className="">
      <a href={`/haber/${data?.news[0]?.category?.slug}/${data?.news[0]?.slug}`}>
        <div className="md:block lg:flex lg:gap-10 big-news mt-10">
          <div className="">
            <img
              src={data?.news[0]?.images[0]?.url}
              alt="news_img"
              className="max-h-[550px] h-full"
            />
          </div>
          <div className="max-lg:bg-[#faefe5] font-noto lg:mt-10 flex-1 p-3">
            <h1 className="max-sm-text-2xl md:text-5xl lg:text-5xl font-bold mb-10 max-lg:pt-4 big-news-title hover:text-[#39608B]">
              {data?.news[0]?.title}
            </h1>
            <p className="text-[#3f3f3f] big-news-subtitle">
              {data?.news[0]?.subtitle}
            </p>
          </div>
        </div>
      </a>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 my-4 gap-4">
        <div className="news-card">
          <a
            href={`/haber/${data?.news[1]?.category?.slug}/${data?.news[1]?.slug}`}
          >
            <img
              src={data?.news[1]?.images[0]?.url}
              className="mb-3 cursor-pointer"
              alt="news_img"
            />
            <span className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white">
              {data?.news[1]?.category?.name}
            </span>
            <h1 className="card-title mt-3 font-bold font-noto text-xl cursor-pointer">
              {data?.news[1]?.title}
            </h1>
          </a>
        </div>

        <div className="news-card">
          <a
            href={`/haber/${data?.news[2]?.category?.slug}/${data?.news[2]?.slug}`}
          >
            <img
              src={data?.news[2]?.images[0]?.url}
              className="mb-3 cursor-pointer"
              alt="news_img"
            />
            <span className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white">
              {data?.news[2]?.category?.name}
            </span>
            <h1 className="card-title mt-3 font-bold font-noto text-xl cursor-pointer">
              {data?.news[2]?.title}
            </h1>
          </a>
        </div>

        <div className="news-card">
          <a
            href={`/haber/${data?.news[3]?.category?.slug}/${data?.news[3]?.slug}`}
          >
            <img
              src={data?.news[3]?.images[0]?.url}
              className="mb-3 cursor-pointer"
              alt="news_img"
            />
            <span className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white">
              {data?.news[3]?.category?.name}
            </span>
            <h1 className="card-title mt-3 font-bold font-noto text-xl cursor-pointer">
              {data?.news[3]?.title}
            </h1>
          </a>
        </div>

        <div className="news-card">
          <a
            href={`/haber/${data?.news[4]?.category?.slug}/${data?.news[4]?.slug}`}
          >
            <img
              src={data?.news[4]?.images[0]?.url}
              className="mb-3 cursor-pointer"
              alt="news_img"
            />
            <span className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white">
              {data?.news[4]?.category?.name}
            </span>
            <h1 className="card-title mt-3 font-bold font-noto text-xl cursor-pointer">
              {data?.news[4]?.title}
            </h1>
          </a>
        </div>
      </div>
    </div>
  );
};

export default News;
