import UserService from "../../services/UserService";
import { IUser } from "../../models/IUser";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import $api from "../../http";
import { API_URL } from "../../http";
import Avatar from "react-avatar";
import DateFormater from "../UniversalComps/DateFormater";
import InviteButtons from "./UserPageComps/InviteButtons";
import { observer } from "mobx-react-lite";
import Invites from "./TicketsPageComps/Invites";
import AdminButtons from "./UserPageComps/AdminButtons";
import { ITicket } from "../../models/ITicket";
import { IEvent } from "../../models/IEvent";
import { Link } from "react-router-dom";
import { storeAnnotation } from "mobx/dist/internal";
import AcceptPropositionPage from "./AcceptPropositionPage";
import AcceptPropositionButton from "./UserPageComps/AcceptPropositionButton";
import EditButton from "./UserAccountPageComps/EditButton";
import ExtraInput from "./UserAccountPageComps/ExtraForm";
import ReactDatePicker from "react-datepicker";
import { Context } from "../..";
import GenderDisplayer from "../UniversalComps/GenderDisplayer";
import FileUploader from "./UserEventsPageComps/UserAvatarUploader";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import History from "./EventPageComps/History";

const UserPage: React.FC = () => {
  let url = API_URL.replace("/api", "");

  const { store } = useContext(Context);

  const [editMode, setEditMode] = useState<boolean>(false);
  const params = useParams();
  const userId = params.userId ?? "";

  const [name, setName] = useState<string>();
  const [surname, setSurame] = useState<string>();
  const [login, setLogin] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [birthday, setBirthday] = useState<Date>();
  const [cell, setCell] = useState<string>();
  const [city, setCity] = useState<string>();
  const [gender, setGender] = useState<string>();
  const [avatar, setAvatar] = useState<File>();
  const [avatarPath, setAvatarPath] = useState<string>();
  const [description, setDesctiption] = useState<string>("");

  const [user, setUser] = useState<IUser>();

  const changeHandler = () => {
    UserService.update(
      userId,
      name!,
      surname!,
      login!,
      email!,
      cell!,
      city!,
      gender!,
      description!,
      birthday!
    );
    UserService.changeAvatar(avatar!);
    window.location.reload();
  };

  const getData = async () => {
    await $api.get("/users/" + userId).then((response) => {
      setUser(response.data);
      setName(response.data.name);
      setSurame(response.data.surname);
      setLogin(response.data.login);
      setEmail(response.data.email);
      setAvatarPath(response.data.avatar);
      setBirthday(new Date(response.data.birthday));
      setCell(response.data.cell);
      setCity(response.data.city);
      setDesctiption(response.data.desc);
      setGender(response.data.gender);
    });
  };
  React.useEffect(() => {
    getData();
  }, [setUser, userId]);

  return (
    <div className="bg-gray-100 p-5">
      <div className="absolute right-0 mr-6">
        {userId == store.user._id && (
          <EditButton value={editMode} setValue={setEditMode} size={25} />
        )}
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        <div className="grid grid-col gap-5 h-fit">
          <div className="p-10 bg-white rounded w-80 flex flex-col border drop-shadow h-fit gap-2">
            <div className="flex justify-center">
              <Avatar
                name={login}
                src={
                  avatar ? URL.createObjectURL(avatar) : url + "/" + avatarPath
                }
                className="rounded"
                size="200"
              />
            </div>
            <FileUploader display={editMode} setFile={setAvatar} />
            <div className="flex justify-center p-5">
              {(editMode && (
                <ExtraInput
                  editMode={editMode}
                  value={login!}
                  setValue={setLogin}
                />
              )) || <p className="text-4xl">Вітаємо, {user?.login}</p>}
            </div>
          </div>
          <InviteButtons userId={userId} />
          <div>
            <AcceptPropositionButton
              userId={user?._id!}
              className="flex flex-col gap-2 p-4 bg-white rounded drop-shadow border-2 border-yellow-200"
            />
          </div>
        </div>
        <div className="p-10 bg-white border drop-shadow rounded md:w-7/12 sm:w-full grid grid-col h-fit gap-8">
          <div>
            <div>
              <p>Інформація про користувача:</p>
            </div>
            <div className="py-2 px-4">
              {(editMode && (
                <div className="flex flex-col gap-2">
                  {description == "" && (
                    <div className="bg-yellow-100 border-2 border-yellow-400 rounded p-2 flex flex-col gap-2">
                      <div>
                        опишіть себе, щоб інші користувачі могли побачити
                        інформацію про вас
                      </div>
                      <BsFillArrowDownCircleFill />
                    </div>
                  )}
                  <textarea
                    value={description}
                    onChange={(e) => setDesctiption(e.target.value)}
                    className={"w-full border-2 rounded"}
                  />
                </div>
              )) ||
                (description == "" && (
                  <p className="text-gray-400">інформація не вказана</p>
                )) || <p>{description}</p>}
            </div>
          </div>
          <div className="grid xl:grid-cols-2 lg:grid-cols-1 gap-5">
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Ім'я:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={name!}
                  setValue={setName}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Прізвище:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={surname!}
                  setValue={setSurame}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Email:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={email!}
                  setValue={setEmail}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Номер телефону:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={cell!}
                  setValue={setCell}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Стать:</p>
              </div>
              <div className="flex flex-row-reverse">
                {(editMode && (
                  <select
                    value={gender}
                    className="rounded p-1 focus:border-2 border-cyan-600"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="male">чоловіча</option>
                    <option value="female">жіноча</option>
                    <option value="none">не вказувати</option>
                  </select>
                )) || <GenderDisplayer gender={gender!} className="" />}
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Місто:</p>
              </div>
              <div className="flex flex-row-reverse">
                <ExtraInput
                  value={city!}
                  setValue={setCity}
                  editMode={editMode}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 bg-gray-200 p-4 gap-20 rounded h-fit">
              <div>
                <p>Дата народження:</p>
              </div>
              <div className="flex flex-row-reverse">
                {(editMode && (
                  <ReactDatePicker
                    className="w-full rounded p-1"
                    selected={birthday}
                    onChange={(date: Date) => setBirthday(date)}
                    dateFormat="dd/MM/yyyy"
                  />
                )) || <DateFormater value={birthday} dayOfWeek={false} />}
              </div>
            </div>
            {editMode && (
              <div className="flex justify-center bg-green-400 hover:bg-green-200 rounded drop-shadow">
                <button type="button" className="p-2" onClick={changeHandler}>
                  Застосувати зміни
                </button>
              </div>
            )}
          </div>
        </div>
        <History userId={user?._id!} />
      </div>
    </div>
  );
};

export default observer(UserPage);
