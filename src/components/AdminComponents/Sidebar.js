import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-purple-700 text-white w-64 min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Admin</h2>
      <ul>
        <li className="mb-4">
          <NavLink
            to="/admin-panel/profile"
            className={({ isActive }) =>
              isActive
                ? "font-semibold text-purple-300"
                : "hover:text-purple-300"
            }
          >
            Profile
          </NavLink>
        </li>
        <li className="mb-4">
          <NavLink
            to="/admin-panel/admin"
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
  );
};

export default Sidebar;
