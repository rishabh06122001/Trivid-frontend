import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Pandits = ({ pandits, toggleRefresh }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPandit, setSelectedPandit] = useState(null);
  const [formData, setFormData] = useState({});

  const handleEditClick = (pandit) => {
    setSelectedPandit(pandit);
    setFormData(pandit);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:4000/api/v1/superadmin/admin-update/${selectedPandit._id}`,
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Pandit Updated Successfully");
        toggleRefresh();
        setIsModalOpen(false);
      }
    } catch (err) {
      console.error("Error updating Pandit:", err);

      toast.error("Failed to Update Pandit");
    }
  };
  console.log(pandits);
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Admins</h2>
      <table className="min-w-full bg-white border border-purple-700">
        <thead>
          <tr className="text-left">
            <th className="py-2 px-4 border-b border-purple-700 text-center">
              Name
            </th>
            <th className="py-2 px-4 border-b border-purple-700 text-center">
              Email
            </th>
            <th className="py-2 px-4 border-b border-purple-700 text-center">
              Contact
            </th>
            <th className="py-2 px-4 border-b border-purple-700 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {pandits?.map((pandit, index) => (
            <tr
              key={index}
              className="hover:bg-purple-100 text-center border-b border-purple-700"
            >
              <td className="py-2 px-4">{pandit.name}</td>
              <td className="py-2 px-4">{pandit.email}</td>
              <td className="py-2 px-4">{pandit.phone}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEditClick(pandit)}
                  className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold text-purple-700 mb-4">
              Edit Admin Details
            </h3>
            <div className="mb-4">
              <label className="block text-purple-700 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                className="w-full p-2 border border-purple-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className="w-full p-2 border border-purple-700 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-purple-700 mb-2">Contact</label>
              <input
                type="text"
                name="contact"
                value={formData.phone || ""}
                onChange={handleChange}
                className="w-full p-2 border border-purple-700 rounded"
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-purple-700 mb-2">
                Specialization
              </label>
              <input
                type="text"
                name="specialization"
                value={formData.specialization || ""}
                onChange={handleChange}
                className="w-full p-2 border border-purple-700 rounded"
              />
            </div> */}
            {/* <div className="mb-4">
              <label className="block text-purple-700 mb-2">Password</label>
              <input
                type="password"
                name="Password"
                value=""
                onChange={handleChange}
                className="w-full p-2 border border-purple-700 rounded"
              />
            </div> */}
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Pandits;
