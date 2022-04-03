import React, { FC, useContext, useState } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import IRoute from "../../interfaces/route";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

export const LoginForm: FC = () => {
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);
  const navigate = useNavigate();

  function LoginHandler() {
    store.loginF(email, password);
    navigate("/events");
  }

  return (
    <div className="bg-grey-lighter mt-10 flex flex-col py-6">
      <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded drop-shadow-lg text-black w-full">
          <h1 className="mb-8 text-3xl text-center">Вхід в обліковий запис</h1>

          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Електрона пошта"
          />

          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Пароль"
          />

          <button
            type="submit"
            className="w-full text-center py-3 rounded bg-cyan-500 text-white hover:bg-cyan-300 focus:outline-none my-1"
            onClick={() => LoginHandler()}
          >
            Увійти в систему
          </button>
        </div>

        <div className="text-grey-dark mt-6">
          Ще не маєте аккаунту?
          <a
            className="no-underline border-b border-blue text-blue-700"
            href="../reg/"
          >
            Зареєструватись
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default observer(LoginForm);
