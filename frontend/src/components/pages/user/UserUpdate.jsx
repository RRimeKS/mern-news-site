import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../../redux/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/Loader";
import MetaData from "../../layouts/MetaData";

const UserUpdate = () => {
  const [update, { error, isSuccess, isLoading }] = useUpdateUserMutation();

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: user } = useGetUserDetailsQuery({ id });
  console.log(user);
  const [data, setData] = useState({
    fullname: "",
    role: "",
    email: "",
    password: ""
  });
  const { fullname, role, email, password } = data;

  const submitHandler = () => {
    update({ id: user?.user?._id, fullname, role, email, password });
  };
  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });

  useEffect(() => {
    if (user) {
      setData({
        fullname: user?.user?.fullname,
        role: user?.user?.role,
        email: user?.user?.email,
        password: user?.password,
      });
    }

    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Kullanıcı başarıyla güncellendi.");
      navigate("/admin/kullanicilar");
    }
  }, [error, isSuccess, user]);

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={`${user?.user?.fullname} Adlı Kişi Güncelleniyor...`} />

      <div className="min-h-[80vh]">
        <div className="flex justify-center flex-col">
          <div className="w-full">
            <h1 className="mb-5 text-3xl font-semibold">Kullanıcı Güncelle</h1>
            <form className="shadow p-5 border rounded-md">
              <div className="mb-5">
                <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Ad - Soyad
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
                    E-Posta
                  </span>
                  <input
                    type="text"
                    name="email"
                    placeholder="E-Posta"
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
                    onChange={onChange}
                    value={password}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
              </div>
              <div className="mb-5">
                <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                  Kategori
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
          </div>
          <div className="my-5 flex justify-end">
            <button
              className={`py-3 bg-[#39608B] text-white max-sm:w-2/4 w-1/4 rounded-md font-semibold`}
              onClick={submitHandler}
            >
              Güncelle
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserUpdate;
