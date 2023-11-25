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

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={4} className="h-10 w-full" />;
  } else if (loadingUsersError) {
    content = <div>Error fetching data</div>;
  } else {
    content = data.map((user) => {
      return (
        <div key={user.id} className="mb-2 border rounded">
          <div className="flex p-2 justify-between items-center cursor-pointer">
            {user.name}
          </div>
        </div>
      );
    });
  }

  const handleUserAdd = () => {
    doCreateUser();
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center m-3">
        <h1 className="m-2 text-xl">Users</h1>

        <Button loading={isCreatingUser} onClick={handleUserAdd}>
          + Add User
        </Button>
      </div>
      {creatingUserError && <p>User Error</p>}
      {content}
    </div>
  );
};

export default UsersList;
