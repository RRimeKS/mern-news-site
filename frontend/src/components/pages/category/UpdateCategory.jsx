import React, { useEffect, useState } from "react";
import { useUpdateCategoryMutation } from "../../../redux/api/categoryApi";
import { toast } from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import MetaData from "../../layouts/MetaData";

const UpdateCategory = () => {
  const [data, setData] = useState({ name: "" });
  const { name } = data;
  const [create, { isSuccess, error }] = useUpdateCategoryMutation();

  const submitHandler = () => {
    create({ name });
  };

  useEffect(() => {
    if (error) toast.error(error?.data?.message);
    if (isSuccess) {
      toast.success("Kategori Güncellendi.");
    }
  }, [isSuccess, error]);
  return (
    <AdminLayout>
      <MetaData title={``} />
      <div className=""></div>
    </AdminLayout>
  );
};

export default UpdateCategory;
