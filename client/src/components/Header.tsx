import "../index.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RightButtons from "./HeaderComps/AccountButtons";
import { observer } from "mobx-react-lite";
import UserPageLink from "./HeaderComps/UserPageLink";
import { storeAnnotation } from "mobx/dist/internal";
import { Context } from "../index";
import AdminUsersLink from "./HeaderComps/AdminUsersLink";

function Header() {
  const { store } = useContext(Context);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-gradient-to-r from-cyan-500 to-sky-500 p-4 drop-shadow-lg">
        <div className="flex items-center gap-10 text-white">
          <span className="font-bold text-xl tracking-tight hidden md:flex">
            Music WEB
          </span>
          <div className="flex gap-4 md:gap-5 text-xl md:text-base">
            {store.isAuth && (
              <div className="hover:text-gray-300">
                <Link to={"/user-events"}>мої події</Link>
              </div>
            )}
            {store.isAuth && (
              <div className="hover:text-gray-300">
                <Link to={`/user/${store.user._id}`}>моя сторінка</Link>
              </div>
            )}
            {store.isAuth && (
              <div className="hover:text-gray-300">
                <Link to={`/tickets`}>пропозиції</Link>
              </div>
            )}
            {store.isAuth && (
              <div className="hover:text-gray-300">
                <Link to={`/event-history`}>історія подій</Link>
              </div>
            )}
            <div className="hover:text-gray-300">
              <Link to={`/events`}>події</Link>
            </div>
            <div className="hover:text-gray-300">
              <Link to={`/users`}>користувачі</Link>
            </div>
          </div>
        </div>

        <div>
          <RightButtons />
        </div>
      </nav>
    </>
  );
}

export default observer(Header);
