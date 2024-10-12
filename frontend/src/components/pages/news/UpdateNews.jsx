import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useGetAllCategoriesQuery } from "../../../redux/api/categoryApi";
import { Editor } from "primereact/editor";
import {
  useGetNewsDetailsQuery,
  useUpdateNewsMutation,
} from "../../../redux/api/newsApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../../layouts/Loader";
import MetaData from "../../layouts/MetaData";

const UpdateNews = () => {
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    images: "",
    category: "",
    conten: "",
  });

  const [previewImage, setPreviewImage] = useState("");
  const { title, subtitle, category, images, content } = data;

  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: categories } = useGetAllCategoriesQuery();
  const [update, { error, isSuccess, isLoading }] = useUpdateNewsMutation();
  const { data: news } = useGetNewsDetailsQuery({ slug });

  const submitHandler = () => {
    update({id:news?.news?._id, title, subtitle, category, images, content});
  };
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const onChangeImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setData({ ...data, images: reader.result });
        setPreviewImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (news) {
      setData({
        title: news?.news?.title,
        subtitle: news?.news?.subtitle,
        content: news?.news?.content,
        category: news?.news?.category?._id,
        images: news?.news?.images[0]?.url,
      });
      setPreviewImage(news?.news?.images[0]?.url);
    }

    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Haber başarıyla güncellendi.");
      navigate("/admin/haberler");
    }
  }, [news, error, isSuccess]);

  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <MetaData title={`${news?.news?.title} Adlı Haber Güncelleniyor...`} />

      <div className="min-h-[80vh]">
        <div className="flex justify-center flex-col">
          <div className="w-full">
            <h1 className="mb-5 text-3xl font-semibold">Haber Güncelle</h1>
            <form className="shadow p-5 border rounded-md">
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Başlık
                  </span>
                  <input
                    type="text"
                    name="title"
                    placeholder="Başlık"
                    onChange={onChange}
                    value={title}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
              </div>
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Altbaşlık
                  </span>
                  <textarea
                    type="text"
                    name="subtitle"
                    placeholder="Altbaşlık"
                    onChange={onChange}
                    value={subtitle}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
              </div>

              <div className="mb-5">
                <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                  Kategori
                </span>
                <select
                  name="category"
                  value={category}
                  onChange={onChange}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                >
                  <option selected>Bir kategori seç</option>
                  {categories?.category?.map((c) => (
                    <option value={c?._id}>{c?.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-5">
                <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                  Kapak Resmi
                </span>
                <div class="flex items-center justify-center w-full">
                  <label
                    for="file-upload"
                    class="flex flex-col items-center justify-center w-full h-16 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 border-gray-300 hover:bg-gray-100"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                      <p class="mb-2 text-sm text-gray-500">
                        <span class="font-semibold">Yüklemek için tıkla</span>{" "}
                        ya da sürükle
                      </p>
                      <p class="text-xs text-gray-500">PNG, JPG</p>
                    </div>
                    <input
                      id="file-upload"
                      type="file"
                      name="images"
                      className="hidden"
                      onChange={onChangeImage}
                    />
                  </label>
                </div>
                {previewImage && (
                  <img src={previewImage} className="max-h-40 w-full mt-5" />
                )}
              </div>
              <div className="mb-5">
                <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                  İçerik
                </span>
                <div className="card">
                  <Editor
                    value={content}
                    onTextChange={(e) =>
                      setData({ ...data, content: e.htmlValue })
                    }
                    style={{ height: "320px" }}
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="my-5 flex justify-end">
            <button
              className={`py-3 bg-[#39608B] text-white max-sm:w-2/4 w-1/4 rounded-md font-semibold`}
              onClick={submitHandler}
            >
              Oluştur
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UpdateNews;
