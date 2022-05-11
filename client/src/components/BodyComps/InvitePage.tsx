import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import { IEvent } from "../../models/IEvent";
import EventService from "../../services/EventService";
import InviteService from "../../services/InviteService";
import SmallEventMapper from "../UniversalComps/SmallEventMapper";
import SmallEvent from "./InvitePageComps/EventMapperComps/SmallEvent";

const InvitePage = () => {
  const { store } = useContext(Context);
  const currentUser = store.user;
  const { receiverId } = useParams();
  const [events, setEvents] = useState<IEvent[]>();
  const [selectedEvent, setSelectedEvent] = useState<number>(-1);
  const [selectedRole, setSelectedRole] = useState<number>(-1);
  const [comment, setComment] = useState<string>("");
  const navigate = useNavigate();

  const inviteHandler = () => {
    InviteService.newInvite(
      store.user._id,
      receiverId!,
      events![selectedEvent]._id,
      events![selectedEvent].musiciansNeeded[selectedRole],
      comment
    );
    alert("запрошення було успішно надіслано");
    navigate("/events");
  };

  const getEvents = () => {
    EventService.getEventsWithRights(currentUser._id, 1).then((res) =>
      setEvents(res.data)
    );
  };
  useEffect(() => {
    if (currentUser._id) getEvents();
  }, [currentUser._id]);

  if (!receiverId) throw new Error("Помилка адреси");
  if (!currentUser) throw new Error("Помилка авторизації");

  return (
    <div className="flex flex-col p-4 gap-4">
      <div className="p-6">
        <div className="flex justify-center text-2xl">
          Будь-ласка, оберіть подію, на участь в якій ви хочете запросити
          користувача:
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap gap-4 p-4">
            {events?.map((event: IEvent) => {
              const currentIndex = events.indexOf(event);
              return (
                <button
                  key={currentIndex}
                  type="button"
                  onClick={() => {
                    setSelectedEvent(currentIndex);
                    setSelectedRole(-1);
                  }}
                  className={
                    (currentIndex == selectedEvent
                      ? "bg-cyan-500"
                      : "bg-cyan-400") + " p-2 rounded drop-shadow"
                  }
                >
                  {event.name}
                </button>
              );
            })}
          </div>
        </div>
        {selectedEvent > -1 && (
          <div className="flex flex-col">
            <div className="text-center text-2xl">
              Оберіть роль, в якій ви пропонуєте участь:
            </div>
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-4 p-4">
                {events![selectedEvent].musiciansNeeded.map((role: string) => {
                  const currentIndex =
                    events![selectedEvent].musiciansNeeded.indexOf(role);
                  return (
                    <button
                      key={currentIndex}
                      onClick={() => {
                        setSelectedRole(currentIndex);
                      }}
                      className={
                        (currentIndex == selectedRole
                          ? "bg-cyan-500"
                          : "bg-cyan-400") + " p-2 rounded drop-shadow"
                      }
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex w-full justify-center">
        <form className="flex flex-col gap-4 w-3/4">
          <label>Коментар до запрошення:</label>
          <textarea
            className="h-44"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
        </form>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-green-400 hover:bg-green-300 disabled:bg-gray-200 disabled:text-gray-400 p-2 rounded drop-shadow"
          disabled={selectedRole == -1 || selectedEvent == -1}
          onClick={() => inviteHandler()}
        >
          надіслати запрошення
        </button>
      </div>
    </div>
  );
};

export default InvitePage;
