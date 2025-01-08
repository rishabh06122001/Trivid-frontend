import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.clear();

    navigate("/");
  };

  return (
    <div className="bg-purple-700 text-white w-full p-4 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-2xl font-bold mr-8">SuperAdmin</h2>
        <ul className="flex gap-8">
          <li>
            <NavLink
              to="/superadmin-panel/profile"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-purple-300"
                  : "hover:text-purple-300"
              }
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/superadmin-panel/admin"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-purple-300"
                  : "hover:text-purple-300"
              }
            >
              Admins
            </NavLink>
          </li>
        </ul>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
