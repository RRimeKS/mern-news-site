import React, { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { useDeleteUserMutation, useGetAllAdminsQuery } from "../../../redux/api/userApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination, Popconfirm } from "antd";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/Loader";
import MetaData from "../../layouts/MetaData";

const UserList = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const [fullname, setFullname] = useState("")
  const navigate = useNavigate();
  
  let { data: users } = useGetAllAdminsQuery({page, aranan: fullname});
  const [deleteUser, { error, isSuccess, isLoading }] =
  useDeleteUserMutation();

  const onChangePagi = (page) => {
    setPage(page);
  };
  const deleteHandler = (id) => deleteUser({ id });
  const onChangeSearch = (e) => {
    setFullname(e.target.value)
  }

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Kullanıcı Başarıyla Silindi");
      window.location.href = `/admin/kullanicilar`;
    }
    
  }, [error, page, fullname, isSuccess]);

  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <MetaData title={`Yetkili Listesi`} />

      <div className=" min-h-[80vh]">
        <h1 className="mb-5 text-3xl font-bold">Kullanıcılar</h1>
        <div className="w-1/3">
          <form>
            <div className="mb-5">
            <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Kullanıcı Adı
                  </span>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Kullanıcı Ara"
                    onChange={onChangeSearch}
                    value={fullname}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
            </div>
          </form>
        </div>
        <div className="flex flex-col justify-center">
          <div className="w-full shadow p-5 border rounded-md">
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell><b>Ad-Soyad</b></TableCell>
                    <TableCell><b>Rol</b></TableCell>
                    <TableCell><b>İşlemler  </b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users?.users?.map((user) => (
                    <TableRow
                      key={user?._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>{user?.fullname}</TableCell>

                      <TableCell>{user?.role}</TableCell>
                      <TableCell>
                        <div className="flex gap-4">
                          <Popconfirm
                            title="Kullanıcıyı Sil"
                            description="Bu kullanıcıyı silmek istediğine emin misin ?"
                            onConfirm={() => deleteHandler(user?._id)}
                            okText="Evet"
                            cancelText="Hayır"
                          >
                            <button
                              className="bg-[#39608B] py-2 px-4 rounded text-white"
                              disabled={isLoading}
                            >
                              Sil
                            </button>
                          </Popconfirm>
                          <a
                            href={`/admin/kullanici-guncelle/${user?._id}`}
                            className="bg-blue-500 py-2 px-4 rounded text-white"
                          >
                            Güncelle
                          </a>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
        <div className="my-10">
          <Pagination
            align="center"
            defaultCurrent={1}
            total={users?.totalCount}
            onChange={onChangePagi}
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default UserList;
