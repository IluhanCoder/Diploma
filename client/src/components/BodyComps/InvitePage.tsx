import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import { IEvent } from "../../models/IEvent";
import EventService from "../../services/EventService";
import SmallEventMapper from "../UniversalComps/SmallEventMapper";
import SmallEvent from "./InvitePageComps/EventMapperComps/SmallEvent";

const InvitePage = () => {
  const { store } = useContext(Context);
  const currentUser = store.user;
  const { receiverId } = useParams();
  const [events, setEvents] = useState<IEvent[]>();
  const [roles, setRoles] = useState<string[]>();
  const [selectedEvent, setSelectedEvent] = useState<number>(-1);
  const [selectedRole, serSelectedRole] = useState<number>(-1);

  useEffect(() => {
    const getEvents = async () => {
      await EventService.getUserEvents(currentUser._id).then((res) =>
        setEvents(res.data)
      );
    };
    getEvents();
  }, [currentUser._id]);

  if (!receiverId) throw new Error("Помилка адреси");
  if (!currentUser) throw new Error("Помилка авторизації");

  return (
    <div className="flex-col">
      <div className="flex justify-center text-xl">
        Будь-ласка, оберіть подію, на участь в якій ви хочете запросити
        користувача:
      </div>

      <div>
        {events?.map((event: IEvent) => {
          const currentIndex = events.indexOf(event);
          return (
            <div
              onClick={(e) => {
                setSelectedEvent(currentIndex);
              }}
              className={
                currentIndex == selectedEvent ? "bg-cyan-600" : "bg-cyan-500"
              }
            >
              {event.name}
            </div>
          );
        })}
      </div>
      {selectedEvent > 0 && (
        <div>
          {events![selectedEvent].roles.map((role: string) => {
            return <div>{role}</div>;
          })}
        </div>
      )}

      <div className="overflow-auto">
        <div className="flex-col"></div>
      </div>
    </div>
  );
};

export default InvitePage;
