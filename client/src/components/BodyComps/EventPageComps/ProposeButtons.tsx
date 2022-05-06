import { storeAnnotation } from "mobx/dist/internal";
import { useNavigate } from "react-router";
import { IEvent } from "../../../models/IEvent";
import UserService from "../../../services/UserService";
import { Context } from "../../..";
import { useContext } from "react";

type LocalParams = {
  event?: IEvent;
};

const ProposeButtons = (params: LocalParams) => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  async function proposeHandler(eventId: string) {
    navigate("/event-proposition/" + eventId);
  }

  const { event } = params;
  if (event && store.user._id != event.creator._id && event.roles.length > 0) {
    return (
      <div className="rounded bg-white flex justify-center p-4 drop-shadow w-1/3">
        <button
          className="bg-green-400 hover:bg-green-300 rounded p-2"
          onClick={async () => {
            await proposeHandler(event._id);
          }}
        >
          Запропонувати свою участь
        </button>
      </div>
    );
  } else return <></>;
};

export default ProposeButtons;
