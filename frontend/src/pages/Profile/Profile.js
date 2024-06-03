import { useState, useEffect } from "react";
import { profileApi } from "../../service/profile.service";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function Profile() {
  const userId = useSelector((state) => state?.auth?.user?._id);
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await profileApi.getUserById(userId);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const updatedUser = { phoneNumber: user.phoneNumber };
      const response = await profileApi.updateUser(userId, updatedUser);
      console.log("User updated successfully:", response.data);
      toast.success("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-3/4">
        <div className="border-b-2 block md:flex">
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 bg-white shadow-md">
            <div className="flex justify-between">
              <span className="text-xl font-semibold block">Profile</span>
            </div>

            <span className="text-gray-600 mr-4">
              This information is secret so be careful
            </span>
            {editing ? (
              <button
                onClick={handleSaveClick}
                className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEditClick}
                className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
              >
                Edit
              </button>
            )}
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border"
                src="https://images.unsplash.com/photo-1477118476589-bff2c5c4cfbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=200"
                alt=""
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-8 bg-white lg:ml-4 shadow-md">
            <div className="rounded  shadow p-6">
              <div className="pb-6">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Username
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="username"
                    className="border-1  rounded-r px-4 py-2 w-full"
                    type="text"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="pb-4">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Email
                </label>
                <input
                  disabled
                  id="email"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>

              <div className="pb-4">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Phone Number
                </label>
                <input
                  disabled={!editing}
                  id="phoneNumber"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="phoneNumber"
                  value={user.phoneNumber}
                  onChange={(e) =>
                    setUser({ ...user, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div className="pb-4 flex items-center">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 block pb-1 mr-2"
                >
                  Password
                </label>
                <input
                  disabled={!editing}
                  id="password"
                  className="border-1  rounded-r px-4 py-2 w-full"
                  type="password"
                  value="*******"
                />
                <Link
                  to={`/change-password?email=${user.email}`}
                  className="text-blue-600 ml-2"
                >
                  Change
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
