import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import $api from "../../http";
import { IEvent } from "../../models/IEvent";
import UserService from "../../services/UserService";
import { Context } from "../..";
import PropositionService from "../../services/PropositionService";

const PropositionPage = () => {
  const { eventId } = useParams();
  const { store } = useContext(Context);
  const currentUser = store.user;

  const [event, setEvent] = useState<IEvent>();
  const [chosenRoleIndex, setChosenRoleIndex] = useState<number>(-1);
  const [commentAreaContent, setCommentAreaContent] = useState<string>("");
  const navigate = useNavigate();

  const proposeButtonHandler = async () => {
    await PropositionService.eventPropose(
      currentUser._id,
      event?.creator._id!,
      event?._id!,
      event?.roles[chosenRoleIndex]!,
      commentAreaContent
    );
  };

  useEffect(() => {
    $api.get("/event/" + eventId).then((response) => {
      setEvent(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex justify-center">
        <p className="text-2xl">Оберіть роль, на яку ви себе пропонуєте:</p>
      </div>
      <div className="flex flex-wrap p-4 gap-2">
        {event?.roles.map((role: string) => {
          const currentIndex = event.roles.indexOf(role);
          let color =
            chosenRoleIndex == currentIndex ? "bg-cyan-500" : "bg-cyan-300";
          return (
            <div
              className={"rounded py-2 px-6 w-1/4 " + color}
              onClick={() => setChosenRoleIndex(currentIndex)}
            >
              {role}
            </div>
          );
        })}
      </div>
      <div className="flex-col justify-center p-2">
        <div className="flex justify-center text-xl py-4">
          Повідомлення творцю події:
        </div>
        <div className="flex justify-center">
          <textarea
            className="w-3/4 border-2 p-2"
            value={commentAreaContent}
            onChange={(e) => setCommentAreaContent(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            proposeButtonHandler();
            navigate("/events");
          }}
          className="rounded p-2 bg-cyan-400 hover:bg-cyan-200 drop-shadow"
        >
          Надіслати пропозицію
        </button>
      </div>
    </div>
  );
};

export default PropositionPage;
