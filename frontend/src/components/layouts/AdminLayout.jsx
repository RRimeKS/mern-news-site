import React from "react";
import Sidebar from "./Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const {isAuthenticated, loading} = useSelector(state => state.auth);
  
  if (loading) {
    return <Loader />
  }
  if (!isAuthenticated) {
    navigate("/");
  }
  return (
    <div>
      <div className="flex max-lg:flex-col justify-center gap-5">
        <div className="max-lg:w-full w-1/5 max-lg:max-h-[250px] max-h-[80vh] overflow-auto max-lg:border max-lg:rounded max-lg:shadow-lg">
          <Sidebar />
        </div>
        <div className="max-lg:w-full w-4/5">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
