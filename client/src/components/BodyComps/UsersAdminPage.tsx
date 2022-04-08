import { useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import UserService from "../../services/UserService";
import UserMoreButtons from "./UserAdminPageComps/UserMoreButtons";

const UsersAdminPage = () => {
  const [users, setUsers] = useState<Array<IUser>>([]);

  useEffect(() => {
    UserService.fetchUsers().then((response) => {
      const users = response.data;
      setUsers(users);
    });
  }, []);

  if (users.length == 0 || !users)
    return (
      <div className="p-10">
        <div className="flex justify-center w-full">
          <p className="text-4xl">Нема користвачів</p>
        </div>
      </div>
    );
  else
    return (
      <div className="flex flex-col p-10 gap-2 w-full">
        {users.map((user: IUser) => {
          return (
            <div
              key={user._id}
              className="bg-cyan-400 rounded px-10 py-4 flex justify-between"
            >
              <div>{user.login}</div>
              <div>{user.email}</div>
              <div>{user.cell}</div>
              <div>
                <UserMoreButtons userId={user._id} />
              </div>
            </div>
          );
        })}
      </div>
    );
};

export default UsersAdminPage;
