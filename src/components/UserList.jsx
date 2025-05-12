import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers } from "../features/users/userSlice";
import { useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);
  const loading = useSelector((state) => state.users.loading);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <LoadingScreen />;
  }
  if (error) {
    return (
      <div className="p-4 text-center text-red-500 font-medium">
        Error loading users: {error}
      </div>
    );
  }

  return (
    <div className="p-4">
<h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">User List</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {users.map((user) => (
    <div
      key={user.id}
      className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center transition-transform hover:scale-105 hover:shadow-lg"
    >
      <img
        src="https://img.icons8.com/?size=100&id=23264&format=png&color=000000"
        alt="User icon"
        className="w-20 h-20 rounded-full mb-4"
      />
      <h1 className="text-xl font-semibold text-gray-800 mb-1">{user.name}</h1>
      <h2 className="text-sm text-gray-500 mb-4">{user.email}</h2>
      <button
        className="mt-auto bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-full transition duration-300"
        onClick={() => dispatch(deleteUser(user.id))}
      >
        Delete User
      </button>
    </div>
  ))}
</div>

        {users.length === 0 && (
            <h1 className="text-center self-center text-gray-500 text-2xl font-semibold mt-4">
              No users found.
            </h1>
        )}
      </div>

  );
};

export default UserList;
