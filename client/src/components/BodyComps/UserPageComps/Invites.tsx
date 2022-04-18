import { IEvent } from "../../../models/IEvent";
import { Context } from "../../../index";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import $api from "../../../http";

type LocalParams = {
  invites: Array<IEvent>;
  id: string;
  display: boolean;
};

const Invites = (params: LocalParams) => {
  const { store } = useContext(Context);

  if (store.isAuth && params.id == store.user._id) {
    return (
      <div className="p-5 bg-white border drop-shadow rounded w-1/2 flex flex-col gap-10">
        <div className="flex justify-center h-fit">
          <p className="text-xl">Пропозиції на участь:</p>
        </div>
        <div className="flex flex-col gap-5 text-white">
          {params.invites.map((item) => {
            return (
              <Link to={"/event/" + item._id}>
                <div className="bg-cyan-400 p-5 rounded drop-shadow border-1 flex justify-between hover:bg-cyan-200">
                  <div>{item.name}</div>
                  <div>{"запрошує: " + item.creatorName}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  } else return <></>;
};

export default Invites;
