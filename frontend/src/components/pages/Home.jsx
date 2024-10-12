import React from "react";
import { useGetAllNewsQuery } from "../../redux/api/newsApi";
import News from "../layouts/News";
import Title from "../layouts/Title";
import NewsStyle from "../layouts/NewsStyle";
import MostReads from "../layouts/MostReads";
import Loader from "../layouts/Loader";
import MetaData from "../layouts/MetaData";
import Exchange from "../layouts/Exchange";
import NewsTicker from "../layouts/NewsTicker";
import Weather from "../layouts/Weather";

const Home = () => {
  const { data: news, isLoading } = useGetAllNewsQuery();
  if (isLoading) return <Loader />;
  return (
    <div className="">
      <NewsTicker data={news} />
      <MetaData title={`Anasayfa`} />

      <div className="flex items-center gap-2">
        <div className="bg-[#39608B] rounded-full h-8 w-8"></div>
        <p className="text-2xl lg:text-4xl font-bold font-noto uppercase">
          Son Haberler
        </p>
      </div>
      <News data={news} />

      {/* <Exchange /> */}

      <div className="flex max-lg:flex-col lg:gap-10">
        <div className="lg:w-3/4">
          <NewsStyle category={"gundem"} title="Gündem" slug="gundem" />
        </div>
        <div className="lg:w-1/4 mt-8">
          <MostReads />
        </div>
      </div>
      <NewsStyle category={"turkiye"} title="Türkiye" slug="turkiye" />

      <NewsStyle category={"dunya"} title="Dünya" slug="dunya" />

      <NewsStyle category={"ekonomi"} title="Ekonomi" slug="ekonomi" />
    </div>
  );
};

export default Home;
