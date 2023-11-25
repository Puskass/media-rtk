import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Skeleton from "../common/Skeleton";
import Button from "../common/Button";
import { useThunk } from "../hooks/use-thunk";

const UsersList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  const { data } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    doFetchUsers();
  }, []);

  if (isLoadingUsers) {
    return <Skeleton times={4} className="h-10 w-full" />;
  }
  if (loadingUsersError) {
    return <div>Error fetching data</div>;
  }

  const handleUserAdd = () => {
    doCreateUser();
  };

  const renderedUsers = data.map((user) => {
    return (
      <div key={user.id} className="mb-2 border rounded">
        <div className="flex p-2 justify-between items-center cursor-pointer">
          {user.name}
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="flex flex-row justify-between m-3">
        <h1 className="m-2 text-xl">Users</h1>
        {isCreatingUser ? (
          "Creating User"
        ) : (
          <Button onClick={handleUserAdd}>+ Add User</Button>
        )}
      </div>
      {creatingUserError && <p>User Error</p>}
      {renderedUsers}
    </div>
  );
};

export default UsersList;
