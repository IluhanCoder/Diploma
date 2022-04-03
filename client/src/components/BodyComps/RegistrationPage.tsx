import React, { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import IRoute from "../../interfaces/route";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const RegForm: FC = () => {
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [cell, setCell] = useState<string>("+380");
  const [city, setCity] = useState<string>("");
  const [gender, setGender] = useState<string>("чоловіча");
  const [password, setPassword] = useState<string>("");
  const [passwordConf, setPasswordConf] = useState<string>("");
  const { store } = useContext(Context);
  const navigate = useNavigate();

  function RegHandler() {
    store.registration(login, email, password, birthday, cell, city, gender);
    if (password !== passwordConf) throw new Error(`failed password confirm`);
    navigate("/events");
  }

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col py-6">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded drop-shadow-lg text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Реєстрація</h1>
          <input
            onChange={(e) => setLogin(e.target.value)}
            value={login}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="fullname"
            placeholder="Ім'я користувача"
          />

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Електрона пошта"
          />

          <DatePicker
            className="block border border-grey-light w-full p-3 rounded mb-4"
            selected={birthday}
            onChange={(date: Date) => setBirthday(date)}
          />

          <input
            onChange={(e) => setCell(e.target.value)}
            value={cell}
            type="tel"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="cell"
            placeholder="Номер телефону"
          />

          <input
            onChange={(e) => setCity(e.target.value)}
            value={city}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="cell"
            placeholder="Місто"
          />

          <select
            onChange={(e) => setGender(e.target.value)}
            value={gender}
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
          >
            <option value="male">чоловіча стать</option>
            <option value="female">жіноча стать</option>
            <option value="none">не вказувати стать</option>
          </select>

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Пароль"
          />

          <input
            onChange={(e) => setPasswordConf(e.target.value)}
            value={passwordConf}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Підтвердження пароля"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-300 focus:outline-none my-1"
            onClick={() => RegHandler()}
          >
            Створити Аккаунт
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Вже маєте акаунт?
          <a
            className="no-underline border-b border-blue text-blue-700"
            href="../login/"
          >
            Увійти
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default observer(RegForm);
