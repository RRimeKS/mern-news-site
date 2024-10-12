import React, { useEffect, useState } from "react";
import axios from "axios";
import * as cheerio from "cheerio";

const Exchange = () => {
  const [usdToTry, setUsdToTry] = useState(null);
  const [eurToTry, setEurToTry] = useState(null);
  const [gbpToTry, setGbpToTry] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const apiKey = process.env.REACT_APP_EXCHANGERATE_API;
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`)
      .then((response) => response.json())
      .then((data) => {
        const tryRate = data.conversion_rates.TRY; // USD -> TRY oranı
        setUsdToTry(tryRate);

        const eurRate = data.conversion_rates.EUR; // USD -> EUR oranı (EUR/TRY için 1 EUR kaç TRY)
        const eurToTryRate = tryRate / eurRate; // EUR -> TRY oranı
        setEurToTry(eurToTryRate);

        const gbpRate = data.conversion_rates.GBP; // USD -> GBP oranı
        const gbpToTryRate = tryRate / gbpRate; // GBP -> TRY oranı
        setGbpToTry(gbpToTryRate);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Döviz yakalama hatası:", error);
      });
  }, []);

  return (
    <>

        <div className="flex justify-center w-full mb-10">
            <div className="hidden sm:grid grid-cols-3 ">
          <div className="flex border border-[#1B3D6C]">
            <div className="bg-[#1B3D6C] text-white w-52 flex h-16 items-center justify-center font-semibold">
              $ Dolar
            </div>
            <div className="flex items-center justify-center w-36">
              {usdToTry?.toFixed(3)}
            </div>
          </div>
          <div className="flex border border-[#1B3D6C]">
            <div className="bg-[#1B3D6C] text-white w-52 flex h-16 items-center justify-center font-semibold">
              € Euro
            </div>
            <div className="flex items-center justify-center w-36">
              {eurToTry?.toFixed(3)}
            </div>
          </div>
          <div className="flex border border-[#1B3D6C]">
            <div className="bg-[#1B3D6C] text-white w-52 flex h-16 items-center justify-center font-semibold">
              £ Pound
            </div>
            <div className="flex items-center justify-center w-36">{gbpToTry?.toFixed(3)}</div>
          </div>
        </div>
        </div>

    </>
  );
};

export default Exchange;
