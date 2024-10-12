import React, { useEffect, useRef, useState } from "react";

const NewsTicker = ({ data }) => {
  const newsArticles = [
    {
        title: `Haber 1: ${data?.news[0]?.title}`,
        url: `/haber/${data?.news[0]?.category?.slug}/${data?.news[0]?.slug}`
    },
    {
        title: `Haber 2: ${data?.news[1]?.title}`,
        url: `/haber/${data?.news[1]?.category?.slug}/${data?.news[1]?.slug}`
    },
    {
        title: `Haber 3: ${data?.news[2]?.title}`,
        url: `/haber/${data?.news[2]?.category?.slug}/${data?.news[2]?.slug}`
    },
    {
        title: `Haber 4: ${data?.news[3]?.title}`,
        url: `/haber/${data?.news[3]?.category?.slug}/${data?.news[3]?.slug}`
    },
    {
        title: `Haber 5: ${data?.news[4]?.title}`,
        url: `/haber/${data?.news[4]?.category?.slug}/${data?.news[4]?.slug}`
    },
  ];

  const [isHovered, setIsHovered] = useState(false);
  const [offset, setOffset] = useState(0);
  const tickerRef = useRef(null);

  useEffect(() => {
    const tickerElement = tickerRef.current;
    const tickInterval = setInterval(() => {
      if (!isHovered && tickerElement) {
        setOffset((prev) => {
          // Offset değeri, ticker genişliğini aşıyorsa sıfırla
          if (prev <= -tickerElement.scrollWidth) {
            return tickerElement.clientWidth; // Bir tur kaydırdıktan sonra başa dön
          }
          return prev - 1; // Kaydırma
        });
      }
    }, 10); // Her 10ms'de bir kaydırma

    return () => clearInterval(tickInterval);
  }, [isHovered]);

  return (
    <div className="bg-white text-black rounded-ss-xl border rounded-ee-xl mb-10">
      <div className="relative flex overflow-hidden">
        <div className="z-10 h-full min-w-[140px] bg-[#39608B] p-4 rounded-ss-xl">
          <h1 className="text-white font-semibold">Son Haberler</h1>
        </div>
        <div
          ref={tickerRef}
          className="whitespace-nowrap p-4"
          style={{
            transform: `translateX(${offset}px)`,
            transition: "transform 0.1s",
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {newsArticles.map((article, index) => (
            <a href={article?.url} key={index} className="mr-8 font-semibold hover:text-[#39608B]">
              {article?.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
