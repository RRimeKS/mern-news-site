import React, { useEffect, useState } from "react";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../redux/api/categoryApi";
import AdminLayout from "../../layouts/AdminLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Popconfirm } from "antd";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../layouts/Loader";
import MetaData from "../../layouts/MetaData";

const CategoryList = () => {
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const { data: categories } = useGetAllCategoriesQuery();
  const [deleteNews, { error, isSuccess, isLoading }] =
    useDeleteCategoryMutation();

  const deleteHandler = (id) => deleteNews({ id });

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Kategori Başarıyla Silindi");
    }
  }, [error, isSuccess]);

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"Kategoriler"} />
      <div className="flex flex-col justify-center mb-10">
        <h1 className="mb-5 text-3xl font-bold">Kategoriler</h1>

        <div className="w-full shadow p-5 border rounded-md">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Adı</TableCell>
                  <TableCell>İşlemler</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories?.category?.map((item) => (
                  <TableRow
                    key={item?._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>
                      <div className="flex gap-4">
                        <Popconfirm
                          title="Kategoriyi Sil"
                          description="Bu kategoriyi silmek istediğine emin misin ?"
                          onConfirm={() => deleteHandler(item?._id)}
                          okText="Evet"
                          cancelText="Hayır"
                        >
                          <button className="bg-[#39608B] py-2 px-4 rounded text-white" disabled={isLoading}>
                            Sil
                          </button>
                        </Popconfirm>
                        <a
                          href={`/admin/kategori-guncelle/${item?._id}`}
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
    </AdminLayout>
  );
};

export default CategoryList;
