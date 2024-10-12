import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import toast from "react-hot-toast";
import { useRegisterMutation } from "../../../redux/api/authApi";
import { useNavigate } from "react-router-dom";
import MetaData from "../../layouts/MetaData";

const UserCreate = () => {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "",
  });
  const { fullname, email, password, role } = data;

  const [create, { isSuccess, error }] = useRegisterMutation();

  const navigate = useNavigate();

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const submitHandler = () => create({ fullname, email, password, role });

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Kullanıcı Oluşturuldu.");
      navigate("/admin/kullanicilar");
    }
  }, [isSuccess, error]);

  return (
    <AdminLayout>
      <MetaData title={`Yetkili Ekle`} />

      <div className="min-h-[80vh]">
        <div className="flex justify-center">
          <div className="w-full">
            <h1 className="mb-5 text-3xl font-semibold">Yetkili Oluştur</h1>
            <form
              className="shadow p-5 border rounded-md"
              onSubmit={submitHandler}
            >
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Adı-Soyadı
                  </span>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Ad-Soyad"
                    onChange={onChange}
                    value={fullname}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
              </div>
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    E-Posta Adresi
                  </span>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-Posta adresi"
                    onChange={onChange}
                    value={email}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
              </div>
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Parola
                  </span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Parola"
                    value={password}
                    onChange={onChange}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
              </div>
              <div className="mb-5">
                <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                  Rol
                </span>
                <select
                  name="role"
                  value={role}
                  onChange={onChange}
                  className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                >
                  <option selected>Bir rol seç</option>
                  <option value="admin">Admin</option>
                  <option value="user">Kullanıcı</option>
                </select>
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

export default UserCreate;
