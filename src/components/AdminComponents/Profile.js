import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Profile = ({ adminDetails, toggleRefresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (adminDetails) {
      setFormData({
        name: adminDetails.name || "",
        email: adminDetails.email || "",
        phone: adminDetails.phone || "",
      });
    }
  }, [adminDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.patch(
        "http://localhost:4000/api/v1/admin/details/update",
        formData,
        { withCredentials: true }
      );

      if (res.status === 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      toast.error("Error while updating profile.");
      console.error("Error during profile update:", err);
    } finally {
      toggleRefresh();
    }
    setIsEditing(false);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-purple-700 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-purple-700 rounded"
            required
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-purple-700 mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-purple-700 rounded"
            required
            readOnly={!isEditing}
          />
        </div>
        <div>
          <label className="block text-purple-700 mb-1">Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-purple-700 rounded"
            required
            readOnly={!isEditing}
          />
        </div>
        {isEditing ? (
          <div className="flex gap-6">
            <button
              type="submit"
              className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 hover:cursor-pointer"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 hover:cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleEdit}
            className="bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800 hover:cursor-pointer"
          >
            Edit
          </button>
        )}
      </form>

      {/* Ensure ToastContainer is correctly set up */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Profile;
