import React from "react";
import MetaData from "./MetaData";

const NotFound = () => {
  return (
    <>
      <MetaData title={"404 Sayfa Bulunamadı"} />
      <div className="flex flex-col items-center justify-center h-[80ch]">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir. Lütfen URL'yi
          kontrol edin veya ana sayfaya dönmek için aşağıdaki düğmeye tıklayın.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-[#39608B] text-white rounded hover:bg-[#4571a1] transition"
        >
          Anasayfaya Dön
        </a>
      </div>
    </>
  );
};

export default NotFound;
