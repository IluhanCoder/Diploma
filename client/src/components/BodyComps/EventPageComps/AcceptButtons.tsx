import { IEvent } from "../../../models/IEvent";
import { Context } from "../../..";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useNavigate } from "react-router";
import UserService from "../../../services/UserService";

type LocalParams = {
  event?: IEvent;
};

function object_contains(object: Array<IEvent>, id: string) {
  var found = false;
  for (var i = 0; i < object.length; i++) {
    if (object[i]._id == id) {
      found = true;
      break;
    }
  }
  return found;
}

const AcceptButtons = (params: LocalParams) => {
  const { store } = useContext(Context);
  const { event } = params;
  const userEvents = toJS(store.user.eventInvites);
  const navigate = useNavigate();

  function acceptHandler() {}

  async function rejectHandler() {
    if (event) {
      await UserService.removeInvite(event, store.user._id);
    }
  }

  if (event && object_contains(userEvents, event._id))
    return (
      <div className="bg-white rounded drop-shadow w-1/3 p-4 flex flex-row gap-6">
        <button
          type="button"
          onClick={() => {
            acceptHandler();
            navigate("/user/" + store.user._id);
          }}
        >
          Погодитись на участь
        </button>
        <button
          type="button"
          onClick={() => {
            rejectHandler();
            navigate("/user/" + store.user._id);
          }}
        >
          Відмоситись від участі
        </button>
      </div>
    );
  else return <></>;
};

export default observer(AcceptButtons);
