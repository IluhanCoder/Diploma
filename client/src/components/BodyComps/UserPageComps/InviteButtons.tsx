import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from "../../..";
import UserService from "../../../services/UserService";
import { observer } from "mobx-react-lite";
import PropositionService from "../../../services/PropositionService";
import { ITicket } from "../../../models/ITicket";

type LocalParams = {
  userId: string;
};

const InviteButtons = ({ userId }: LocalParams) => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const [proposition, setProposition] = useState<ITicket>();

  const deleteHandler = () => {
    UserService.deleteUserById(userId);
    navigate("/users");
  };

  const getData = () => {
    PropositionService.getProposition(store.user._id, userId).then((res) =>
      setProposition(res.data)
    );
  };
  useEffect(() => {
    if (store.user._id && userId) getData();
  }, [store.user._id, userId]);

  if (store.isAuth && store.user._id != userId) {
    return (
      <div className="flex flex-col gap-3 justify-center bg-white rounded drop-shadow border-1 p-4">
        {(store.user.login == "ADMIN" && (
          <button
            type="button"
            className="rounded bg-red-500 text-white hover:bg-red-700 transition px-4 py-2 hover:text-white lg:mt-0"
            onClick={deleteHandler}
          >
            Видалити
          </button>
        )) ||
          (!proposition && (
            <button
              type="button"
              className="rounded bg-green-500 text-white hover:bg-green-700 transition px-4 py-2 hover:text-white lg:mt-0"
              onClick={() => navigate("/invite/" + userId)}
            >
              Запропонувати участь у події
            </button>
          ))}
        <button
          type="button"
          className="rounded bg-cyan-400 text-white hover:bg-cyan-400 transition px-4 py-2 hover:text-white lg:mt-0"
        >
          Надіслати повідомлення
        </button>
      </div>
    );
  } else return <></>;
};

export default observer(InviteButtons);
