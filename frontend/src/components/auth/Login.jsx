import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../redux/api/authApi";
import MetaData from "../layouts/MetaData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { email, password } = data;

  const [login, { error, isSuccess }] = useLoginMutation();
  const navigate = useNavigate();

  const onChange = (e) => setData({ ...data, [e.target.name]: e.target.value });
  const submitHandler = (e) => {
    e.preventDefault();
    login({ email, password });
  }
  
  useEffect(() => {
    if (error) toast.error(error?.data?.message);

    if (isSuccess) {
      toast.success("Giriş Yapıldı.");
      navigate("/");
    }
  }, [error, isSuccess]);
  
  return (
    <>
      <MetaData title={"Yetkili Giriş"} />
      <div className="">
        <div className="flex justify-center items-center min-h-[53vh]">
          <form className="max-sm:w-full max-lg: w-2/3 lg:w-1/3 border border-[#39608B] p-5 shadow-xl rounded-lg">
            <h1 className="text-3xl mb-5 font-semibold text-[#39608B]">Giriş Yap</h1>
            <div className="mb-5 flex flex-col">
              <label className="text-[#39608B]">E-Posta</label>
              <input
                type="email"
                name="email"
                onChange={onChange}
                value={email}
                placeholder="E-Posta adresi"
                className="border border-black p-4 rounded-lg focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] focus:ring-1"
              />
            </div>
            <div className="mb-5 flex flex-col">
              <label className="text-[#39608B]">Parola</label>
              <input
                type="password"
                name="password"
                onChange={onChange}
                value={password}
                placeholder="Parola"
                className="border border-black p-4 rounded-lg focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] focus:ring-1"
              />
            </div>
            <div className="mb-5 flex flex-col">
              <button className="w-full bg-[#39608B] py-5 rounded-md text-white hover:text-[#39608B] hover:bg-white hover:ring-2 hover:ring-[#39608B] transition-colors" onClick={submitHandler}>
                Giriş Yap
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
