import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useGetNewsDetailsQuery } from "../../../redux/api/newsApi";
import Loader from "../../layouts/Loader";
import MetaData from "../../layouts/MetaData";

const NewsDetails = () => {
  const { slug } = useParams();
  const { data: news, isLoading, error } = useGetNewsDetailsQuery({ slug });

  console.log(error?.status);

  const [formattedCreatedAt, setFormattedCreatedAt] = useState(null);
  const [formattedUpdatedAt, setFormattedUpdatedAt] = useState(null);

  useEffect(() => {
    
    if (news?.news) {
      const options = {
        timeZone: "Europe/Istanbul", // Türkiye saat dilimi
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      const createdAt = new Date(news?.news?.createdAt);
      const updatedAt = new Date(news?.news?.updatedAt);

      setFormattedCreatedAt(
        new Intl.DateTimeFormat("tr-TR", options).format(createdAt)
      );
      setFormattedUpdatedAt(
        new Intl.DateTimeFormat("tr-TR", options).format(updatedAt)
      );
    }
  }, [news]);

  if (isLoading) return <Loader />;
  if (error?.status === 404) {
    return <Navigate to={"*"} />
  }

  return (
    <>
      <MetaData title={`${news?.news?.title}`} />

      <div className="font-noto">
        <div className="flex justify-center">
          <div className="lg:w-2/3">
            <div className="flex items-center gap-10">
              <div className="">
                <a href={`/haber/${news?.news?.category?.slug}`}  className="font-semibold text-base size-10 w-full mt-2 cursor-pointer p-1 bg-[#39608B] rounded-se-lg rounded-es-lg text-white">
                  {news?.news?.category?.name}
                </a>
              </div>

              <p className="font-bold text-sm">
                Oluşturulma Tarihi:{" "}
                <span className="font-normal">{formattedCreatedAt}</span>
              </p>
              <p className="font-bold text-sm">
                Son Güncelleme:{" "}
                <span className="font-normal">{formattedUpdatedAt}</span>
              </p>
            </div>

            <div className="text-left mt-10">
              <h1 className="max-sm:text-2xl text-6xl font-bold mb-10">
                {news?.news?.title}
              </h1>
              <p className="text-lg">{news?.news?.subtitle}</p>
            </div>

            <img
              src={news?.news?.images[0]?.url}
              alt="news_img"
              className="w-full mt-10"
            />

            <p
              className="text-lg my-10 "
              dangerouslySetInnerHTML={{ __html: news?.news?.content }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
