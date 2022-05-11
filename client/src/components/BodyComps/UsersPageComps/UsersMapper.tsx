import { IUser } from "../../../models/IUser";
import { API_URL } from "../../../http";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { Context } from "../../../index";
import { useContext } from "react";

type LocalParams = {
  users: IUser[];
};

const UsersMapper = ({ users }: LocalParams) => {
  const url = API_URL.replace("/api", "");
  const { store } = useContext(Context);

  return (
    <div className="grid grid-cols-2 gap-4">
      {users.map((user: IUser) => {
        if (user._id != store.user!._id)
          return (
            <div
              className="flex bg-white drop-shadow rounded p-4"
              key={user._id}
            >
              <div className="p-4">
                <Avatar
                  src={url + "/" + user.avatar}
                  className="rounded"
                  name={user.login}
                />
              </div>
              <div key={user._id} className="flex flex-col grow gap-2">
                <div className="text-center text-2xl">{user.login}</div>
                <div className="grid grid-cols-2">
                  <div className="flex gap-4">
                    <div>Ім'я:</div>
                    <div>{user.name}</div>
                  </div>
                  <div className="flex gap-4">
                    <div>Прізвище:</div>
                    <div>{user.surname}</div>
                  </div>
                  <div className="flex gap-4">
                    <div>Стать:</div>
                    <div>{user.gender}</div>
                  </div>
                  <div className="flex gap-4">
                    <div>Місто:</div>
                    <div>{user.city}</div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Link to={`/user/${user._id}`}>
                    <button
                      type="button"
                      className="bg-cyan-400 hover:bg-cyan-200 rounded drop-shadow px-2 py-1"
                    >
                      Детальніше
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
      })}
    </div>
  );
};

export default UsersMapper;
