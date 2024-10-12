import React, { useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "../../../redux/api/categoryApi";
import { toast } from "react-hot-toast";
import { useCreateNewsMutation } from "../../../redux/api/newsApi";
import { Editor } from "primereact/editor";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import MetaData from "../../layouts/MetaData";

const CreateNews = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    subtitle: "",
    content: "",
    tags: "",
    category: "",
    images: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const onChangeImage = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState == 2) {
        setPreviewImage(reader.result);
        setData({ ...data, images: reader.result });
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const { title, subtitle, content, category, images } = data;
  const [create, { isSuccess, error, isLoading }] = useCreateNewsMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const submitHandler = (e) => {
    e.preventDefault();

    if (title == "" || subtitle == "" || content == "" || category == "") {
      toast.error("Lütfen bilgileri eksiksiz giriniz.");
    } else {
      create({ title, subtitle, content, category, images });
    }
  };

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Haber Oluşturuldu.");
      setData({ title:"", subtitle:"", content:"", category:"", images:"" });
      setPreviewImage("");
    }
  }, [isSuccess, error]);
  return (
    <AdminLayout>
      <MetaData title={`Haber Ekle`} />

      <div className="min-h-[80vh]">
        <div className="flex justify-center">
          <div className="w-full">
            <h1 className="mb-5 text-3xl font-semibold">Haber Oluştur</h1>
            <form
              className="shadow p-5 border rounded-md"
              onSubmit={submitHandler}
            >
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Başlık
                  </span>
                  <input
                    type="text"
                    name="title"
                    placeholder="Başlık"
                    value={title}
                    onChange={onChange}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
              </div>
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Altbaşlık
                  </span>
                  <input
                    type="text"
                    name="subtitle"
                    placeholder="Altbaşlık"
                    value={subtitle}
                    onChange={onChange}
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
                  <Editor
                    value={content}
                    name="content"
                    onChange={onChange}
                    onTextChange={(e) =>
                      setData({ ...data, content: e.htmlValue })
                    }
                    style={{ height: "320px" }}
                  />
              </div>
            </form>
            <div className="mb-5 flex justify-end mt-5">
              <button
                className={`py-3 bg-[#39608B] text-white max-sm:w-2/4 w-1/4 rounded-md font-semibold`}
                onClick={submitHandler}
              >
                Oluştur
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateNews;
