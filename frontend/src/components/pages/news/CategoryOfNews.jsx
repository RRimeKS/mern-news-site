import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetNewsCategoryQuery } from "../../../redux/api/newsApi";
import Title from "../../layouts/Title";
import MostReads from "../../layouts/MostReads";
import Loader from "../../layouts/Loader";
import MetaData from "../../layouts/MetaData";

const CategoryOfNews = () => {
  const { category } = useParams();
  const {
    data: news,
    isLoading,
    error,
  } = useGetNewsCategoryQuery({ category });
  console.log(error);

  const [firstFiveData, setFirstFiveData] = useState([]);
  const [data, setData] = useState([]);
  let newsData = [];

  useEffect(() => {
    if (news) {
      for (let i = 1; i < 5; i++) {
        newsData.push(news?.news[i]);
      }
      setFirstFiveData(newsData);
      newsData = [];
    }
    if (news?.news) {
      for (let i = 5; i < news?.news?.length; i++) {
        newsData.push(news?.news[i]);
      }
      setData(newsData);
    }
  }, [news]);

  if (isLoading) return <Loader />;
  if (error?.status === 404) {
    return <Navigate to={"*"} />;
  }

  return (
    <>
      <MetaData title={`${news?.news[0]?.category[0]?.name} Haberleri`} />

      <div className="font-noto">
        <div className="flex justify-center">
          <div className="">
            <div className="mb-10">
              <Title title={`${news?.news[0]?.category[0]?.name}`} />
            </div>

            <div className="relative flex bg-[#39608B] lg:max-h-[400px] max-lg:max-h-[600px] category-news-wrapper">
              <div className="max-sm:w-full max-md:w-2/4 max-lg:w-4/6 xl:w-3/4">
                <a
                  href={`/haber/${news?.news[0]?.category[0]?.slug}/${news?.news[0]?.slug}`}
                >
                  <img
                    src={news?.news[0]?.images[0]?.url}
                    alt="news_img"
                    className="h-full w-full object-cover"
                  />
                </a>
              </div>
              <div className="max-sm:absolute max-sm:bg-[#39608B] bg-gradient max-sm:w-full max-md:w-2/4 max-lg:w-3/6 xl:w-1/4 bottom-0 flex items-center justify-center flex-col px-5 py-3 gap-4 overflow-hidden  text-white">
                <a
                  href={`/haber/${news?.news[0]?.category[0]?.slug}/${news?.news[0]?.slug}`}
                  className=""
                >
                  <h1 className="max-sm:text-2xl max-lg:text-2xl text-2xl font-bold">
                    {news?.news[0]?.title}
                  </h1>
                  <p className="overflow-hidden max-sm:hidden text-sm ">
                    {news?.news[0]?.subtitle}
                  </p>
                </a>
              </div>
            </div>

            <div className="grid max-sm:grid-cols-1 grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
              {firstFiveData?.map((news) => (
                <a href={`/haber/${news?.category[0]?.slug}/${news?.slug}`}>
                  <div className="news-card gap-2 flex flex-col">
                    <img
                      src={news?.images[0]?.url}
                      className="mb-3 cursor-pointer"
                      alt="news_img"
                    />
                    <div className="">
                      <span className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white">
                        {news?.category[0]?.name}
                      </span>
                    </div>
                    <h1 className="card-title font-bold font-noto text-sm cursor-pointer mb-5 news-card-title">
                      {news?.title}
                    </h1>
                    <div className="">
                      <p className="sm:hidden text-[#3f3f3f]">
                        {news?.subtitle}
                      </p>
                      <hr className="mt-10 sm:hidden" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <hr className="mt-10 max-sm:hidden" />

            <div className="flex py-10 gap-10">
              <div className="lg:w-2/3">
                {data?.map((news) => (
                  <a href={`/haber/${news?.category[0]?.slug}/${news?.slug}`}>
                    <div className="flex gap-4 mt-4 category-of-news-card">
                      <img
                        src={news?.images[0]?.url}
                        className="max-lg:max-w-[50%] max-lg:max-h-[40%] lg:max-w-[40%] lg:max-h-[30%] xl:max-w-[30%] xl:max-h-[20%] h-full w-full"
                        alt="news_img"
                      />
                      <div className="">
                        <h1 className="max-sm:text-sm text-md font-bold mb-3 hover:text-[#39608B]">
                          {news?.title}
                        </h1>
                        <p className="max-sm:hidden max-lg:text-sm">
                          {news?.subtitle}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="w-[1px] min-h-full bg-gray-300 max-lg:hidden"></div>
              <div className="lg:w-1/3 max-lg:hidden">
                <MostReads />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryOfNews;
