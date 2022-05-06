import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
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

  useEffect(() => {
    const getEvents = async () => {
      await EventService.getUserEvents(currentUser._id).then((res) =>
        setEvents(res.data)
      );
    };
  }, [setEvents]);

  if (!receiverId) throw new Error("Помилка адреси");
  if (!currentUser) throw new Error("Помилка авторизації");
  if (!events || events.length < 1)
    throw new Error("У вас нема доступних подій");

  return (
    <div className="flex-col">
      <div className="flex justify-center text-xl">
        Будь-ласка, оберіть подію, на участь в якій ви хочете запросити
        користувача:
      </div>
      <SmallEventMapper events={events} />
      <div className="overflow-auto">
        <div className="flex-col"></div>
      </div>
    </div>
  );
};

export default InvitePage;
