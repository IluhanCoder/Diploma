import { useEffect, useState } from "react";
import { IUser } from "../../models/IUser";
import UserService from "../../services/UserService";
import ImgDisplayer from "../UniversalComps/ImgDisplayer";
import { API_URL } from "../../http";
import UsersMapper from "./UsersPageComps/UsersMapper";

const UsersPage = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("name");

  const getData = async () => {
    await UserService.getUsers().then((res) => setUsers(res.data));
  };
  useEffect(() => {
    getData();
  }, [setUsers]);

  const filterUsers = (users: IUser[]) => {
    return users.filter((user: IUser) => {
      if (searchValue.length > 0) {
        const upperValue = searchValue.toUpperCase();
        switch (searchType) {
          case "name":
            return (
              user.name.toUpperCase().includes(upperValue) ||
              user.surname.toUpperCase().includes(upperValue) ||
              user.login.toUpperCase().includes(upperValue)
            );
            break;
          case "city":
            return user.city.toUpperCase().includes(upperValue);
            break;
        }
      } else return true;
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex md:justify-between md:flex-row-reverse flex-col items-center gap-5 bg-gray-200 py-2 px-5 drop-shadow">
        <div className="flex gap-3">
          <input
            type="text"
            className="rounded drop-shadow"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="py-1 pr-6 pl-1 rounded drop-shadow"
          >
            <option value="name">за ім'ям</option>
            <option value="city">за містом</option>
          </select>
        </div>
      </div>
      <div className="bg-gray-100 flex flex-col p-4 gap-4">
        <div className="text-center text-3xl">Користувачі:</div>
        {users.length > 0 && <UsersMapper users={filterUsers(users)} />}
        {users.length == 0 && (
          <div className="text-center text-gray-400">користувачів нема</div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
