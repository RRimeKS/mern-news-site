import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Pagination, Popconfirm } from "antd";
import {
  useDeleteNewsMutation,
  useGetAllNewsAdminQuery,
} from "../../../redux/api/newsApi";
import { useGetAllCategoriesQuery } from "../../../redux/api/categoryApi";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import Loader from "../../layouts/Loader";
import MetaData from "../../layouts/MetaData";

const NewsList = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [title, setTitle] = useState("")

  const { data: news, isLoading: newsLoading } = useGetAllNewsAdminQuery({ page, aranan: title });
  const { data: categories } = useGetAllCategoriesQuery();
  const [deleteNews, { error, isSuccess, isLoading }] = useDeleteNewsMutation();

  const onChangePagi = (page) => {
    setPage(page);
  };
  const deleteHandler = (id) => deleteNews({ id });
  const onChangeSearch = (e) => setTitle(e.target.value)

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Haber Başarıyla Silindi");
    }
  }, [error, isSuccess]);

  if (newsLoading) return <Loader />

  return (
    <AdminLayout>
      <MetaData title={`Haberler`} />

      <div className="flex flex-col justify-center">
      <h1 className="mb-5 text-3xl font-bold">Haberler</h1>
      <div className="w-1/3">
          <form>
            <div className="mb-5">
            <label className="block">
                  <span className="after:content-['*'] after:ml-0.5 after:text-[#39608B] block text-sm font-medium text-slate-700">
                    Haber Başlığı
                  </span>
                  <input
                    type="text"
                    name="fullname"
                    placeholder="Haber başlığı ara"
                    onChange={onChangeSearch}
                    value={title}
                    className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-[#39608B] focus:ring-[#39608B] block w-full rounded-md sm:text-sm focus:ring-1"
                  />
                </label>
            </div>
          </form>
        </div>

        <div className="w-full shadow p-5 border rounded-md min-h-[80vh]">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Başlık</TableCell>
                  <TableCell>Resim</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {news?.news?.map((item) => (
                  <TableRow
                    key={item?.title}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      <a
                        href={`/haber/${item?.category?.slug}/${item?.slug}`}
                        className="hover:text-[#39608B]"
                      >
                        {item?.title}
                      </a>
                    </TableCell>
                    <TableCell>
                      <img
                        src={item?.images[0]?.url}
                        alt="news_img"
                        width={70}
                        height={70}
                      />
                    </TableCell>
                    <TableCell>
                      {categories?.category?.map((category) => (
                        category?._id === item?.category?._id && category?.name
                      ))}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        <Popconfirm
                          title="Haber'i Sil"
                          description="Bu haberi silmek istediğine emin misin ?"
                          onConfirm={() => deleteHandler(item?._id)}
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
                        <a href={`/admin/haber-guncelle/${item?.slug}`} className="bg-blue-500 py-2 px-4 rounded text-white">
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
        <div className="my-10">
            <Pagination
              align="center"
              defaultCurrent={1}
              total={news?.totalCount}
              onChange={onChangePagi}
            />
          </div>
      </div>
    </AdminLayout>
  );
};

export default NewsList;
