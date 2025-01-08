import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../components/AdminComponents/Sidebar";
import Profile from "../components/AdminComponents/Profile";
import Pandits from "../components/AdminComponents/Pandits";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Admin = () => {
  const [adminDetails, setAdminDetails] = useState({});
  const [pandits, setPandits] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/admin/details",
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success === true) {
        setAdminDetails(res?.data?.data);
      }
    } catch (err) {
      toast.error("Error while fetching Admin Details.");
      console.log(err);
    }
  };

  const fetchPandits = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/superadmin/get-admin-list",
        { withCredentials: true }
      );
      if (res.status === 200) {
        setPandits(res?.data?.data);
      }
    } catch (err) {
      toast.error("Error while fetching Pandits.");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchPandits();
  }, [refresh]);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-white">
        <Routes>
          <Route
            path="profile"
            element={
              <Profile
                adminDetails={adminDetails}
                toggleRefresh={() => {
                  setRefresh(!refresh);
                }}
              />
            }
          />
          <Route
            path="admin"
            element={
              <Pandits
                pandits={pandits}
                toggleRefresh={() => {
                  setRefresh(!refresh);
                }}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/admin-panel/profile" replace />}
          />
        </Routes>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Admin;
