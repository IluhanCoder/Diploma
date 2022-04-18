import React, { useContext, useEffect, useState, FC } from "react";
import { useNavigate, useParams } from "react-router";
import { IUser } from "../../models/IUser";
import UserService from "../../services/UserService";
import $api from "../../http";
import { Context } from "../../index";
import { IEvent } from "../../models/IEvent";
import EventsMapper from "./InvitePageComps/EventsMapper";
import { observer } from "mobx-react-lite";
import Event from "./EventsPageComps/Event";

type LocalParams = {
  userId: string;
};

const SendEventRequest: FC = () => {
  const { store } = useContext(Context);
  const { userId } = useParams<LocalParams>();
  const [user, setUser] = useState<IUser>();
  const [events, setEvents] = useState<Array<IEvent>>([]);
  const [chosenIndex, setChosenIndex] = useState<number>(-1);
  const navigate = useNavigate();

  React.useEffect(() => {
    $api.get("/user-events/" + store.user._id).then((response) => {
      setEvents(response.data);
    });
  }, []);

  useEffect(() => {
    $api.get("/users/" + userId).then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <div className="flex flex-col p-2 gap-12">
      <div className="flex justify-center">
        <div className="p-3 text-2xl">
          Будь ласка, оберіть подію, участь у якій ви хочете запропонувати
          користувачу {user?.login}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="max-h-80 overflow-auto w-2/3">
          <EventsMapper
            events={events}
            chosenIndex={chosenIndex}
            setChosenIndex={setChosenIndex}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => {
            UserService.sendInvite(
              events[chosenIndex]._id,
              userId ? userId : ""
            );
            navigate("/events");
          }}
        >
          Надіслати пропозицію
        </button>
      </div>
    </div>
  );
};

export default observer(SendEventRequest);
