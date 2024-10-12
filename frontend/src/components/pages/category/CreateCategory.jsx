import React, { useEffect, useState } from "react";
import { useCreateCategoryMutation } from "../../../redux/api/categoryApi";
import { toast } from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import MetaData from "../../layouts/MetaData";

const CreateCategory = () => {
  const [data, setData] = useState({ name: "" });
  const { name } = data;
  const [create, { isSuccess, error }] = useCreateCategoryMutation();

  const submitHandler = () => {
    create({ name });
  };

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Kategori Oluşturuldu.");
    }
  }, [isSuccess, error]);
  return (
    <AdminLayout>
      <MetaData title={"Kategori Oluştur"} />

      <div className="min-h-[80vh]">
        <div className="flex justify-center">
          <div className="w-full">
            <h1 className="mb-5 text-3xl font-semibold">Kategori Oluştur</h1>
            <form
              className="shadow p-5 border rounded-md"
              onSubmit={submitHandler}
            >
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Kategori Adı
                  </span>
                  <input
                    type="text"
                    name="title"
                    placeholder="Kategori Adı"
                    onChange={(e) => setData({ name: e.target.value })}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
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

export default CreateCategory;
