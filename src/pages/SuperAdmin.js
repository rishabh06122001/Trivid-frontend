import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "../components/SuperAdminComponents/Sidebar";
import Profile from "../components/SuperAdminComponents/Profile";
import Pandits from "../components/SuperAdminComponents/Pandits";
import axios from "axios";

const SuperAdmin = () => {
  const [superDetails, setSuperDetails] = useState({});
  const [pandits, setPandits] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchDetails = async () => {
    try {
      const res = await axios.get(
        "https://trivid-backend.onrender.com/api/v1/superadmin/details",
        {
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        setSuperDetails(res?.data?.data);
      }
    } catch (err) {
      console.error("Error while fetching SuperDetails:", err);
    }
  };

  const fetchPandits = async () => {
    try {
      const res = await axios.get(
        "https://trivid-backend.onrender.com/api/v1/superadmin/get-admin-list",
        { withCredentials: true }
      );
      if (res.status === 200) {
        setPandits(res?.data?.data);
      }
    } catch (err) {
      console.error("Error while fetching Pandits:", err);
    }
  };

  useEffect(() => {
    fetchDetails();
    fetchPandits();
  }, [refresh]);

  return (
    <div>
      <Sidebar />
      <div className="p-6 bg-white">
        <Routes>
          <Route
            path="profile"
            element={
              <Profile
                superDetails={superDetails}
                toggleRefresh={() => setRefresh(!refresh)}
              />
            }
          />
          <Route
            path="admin"
            element={
              <Pandits
                pandits={pandits}
                toggleRefresh={() => setRefresh(!refresh)}
              />
            }
          />
          <Route
            path="*"
            element={<Navigate to="/superadmin-panel/profile" replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdmin;
