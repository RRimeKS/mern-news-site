import React, { useEffect, useState } from "react";
import { useGetNewsCategoryQuery } from "../../redux/api/newsApi";
import Title from "./Title";

const NewsStyle = ({ category, title, slug }) => {
  const { data: news } = useGetNewsCategoryQuery({ category });
  const [data, setData] = useState([]);
  const newsData = [];

  useEffect(() => {
    if (news) {
      for (let i = 2; i < 6; i++) {
        newsData.push(news?.news[i]);
      }
      setData(newsData);
    }
  }, [news]);

  return (
    <>
      <Title title={title} slug={slug} />
      <div className="mt-10 max-sm:block max-lg:flex gap-10">
        <div className="flex-1 mb-5">
          <div className="flex max-lg:flex-col gap-5 lg:gap-10">
            <div className="max-lg:flex max-lg:flex-col flex-1 news-style-big-card">
              <div className="">
                <a
                  href={`/haber/${news?.news[0]?.category[0]?.slug}/${news?.news[0]?.slug}`}
                >
                  <img
                    src={news?.news[0]?.images[0]?.url}
                    alt="news_img"
                    className="lg:max-h-[550px]"
                  />
                </a>
              </div>
              <div className="font-noto lg:mt-10 flex-1">
                <a
                  href={`/haber/${news?.news[0]?.category[0]?.slug}/${news?.news[0]?.slug}`}
                >
                  <h1 className="max-sm-text-2xl md:text-4xl font-bold mb-5 max-lg:pt-4 hover:text-[#39608B]">
                    {news?.news[0]?.title}
                  </h1>
                  <p className="text-[#3F3F3F]">{news?.news[0]?.subtitle}</p>
                </a>
              </div>
            </div>
            <div className="flex-1 news-style-big-card">
              <a
                href={`/haber/${news?.news[1]?.category[0]?.slug}/${news?.news[1]?.slug}`}
              >
                <div className="">
                  <img
                    src={news?.news[1]?.images[0]?.url}
                    alt="news_img"
                    className="lg:max-h-[550px]"
                  />
                </div>
                <div className="font-noto lg:mt-10 flex-1">
                  <h1 className="max-sm-text-2xl md:text-4xl font-bold mb-5 max-lg:pt-4 hover:text-[#39608B]">
                    {news?.news[1]?.title}
                  </h1>
                  <p className="text-[#3F3F3F]">{news?.news[1]?.subtitle}</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="grid grid-cols-4 max-lg:grid-cols-1 max-lg:grid-rows-4 lg:gap-5">
            {data[0] !== undefined &&
              data?.map((item) => (
                <a href={`/haber/${item?.category[0]?.slug}/${item?.slug}`}>
                  <div className="news-card max-lg:flex gap-2 mb-10 ">
                    <div className="max-lg:block">
                      <img
                        src={item?.images[0]?.url}
                        className="mb-3 cursor-pointer max-lg:max-w-[150px] max-lg:max-h-[150px]"
                        alt="news_img"
                      />
                      <span className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white max-sm:hidden inline lg:hidden">
                        {item?.category[0]?.name}
                      </span>
                    </div>
                    <span className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white  max-lg:hidden">
                      {item?.category[0]?.name}
                    </span>
                    <div className="">
                      <h1 className="card-title lg:mt-3 font-bold font-noto text-sm cursor-pointer mb-5">
                        {item?.title}
                      </h1>
                      <span className="font-semibold font-noto text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white hidden max-sm:inline">
                        {item?.category[0]?.name}
                      </span>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsStyle;
