import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import $api from "../../http";
import { IEvent, IParticipant } from "../../models/IEvent";
import { API_URL } from "../../http";
import DateFormater from "../UniversalComps/DateFormater";
import ArrayMapper from "../UniversalComps/ArrayMapper";
import ImgDisplayer from "../UniversalComps/ImgDisplayer";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import NewSongButton from "./EventPageComps/NewSongButton";
import AdminButtons from "./EventPageComps/AdminButtons";
import EventStatus from "./EventsPageComps/EventStatus";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import ProposeButtons from "../BodyComps/EventPageComps/ProposeButtons";
import { IComment } from "../../models/IComment";
import EventService from "../../services/EventService";
import CommentAdmin from "../UniversalComps/CommentAdmin";
import Comments from "./EventsPageComps/Comments";

type LocalParams = {
  eventId: string;
};

const url = API_URL.replace("/api", "");

const EventPage = () => {
  const { store } = useContext(Context);

  const params = useParams<LocalParams>();
  const [eventId, setEventId] = useState<string>(params.eventId ?? "");

  const [event, setEvent] = useState<IEvent>();
  const [commentInput, setCommentInput] = useState<string>();

  const getData = async () => {
    await EventService.getEvent(eventId).then((res) => {
      setEvent(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    if (eventId) getData();
  }, [eventId]);

  return (
    <div className="grid grid-cols-3 w-full bg-gray-200 p-4 gap-4">
      <div className="col-span-3 flex flex-row gap-2 mx-6">
        <div className="bg-white rounded drop-shadow text-center grow h-fit p-4 mt-10">
          <div className="text-center text-4xl">{event?.name}</div>
        </div>
        <div className="bg-white rounded drop-shadow w-fit px-4 py-1 flex-col gap-2">
          <div className="text-center">Сворив подію:</div>
          <div className="flex justify-center">
            <Avatar
              src={url + "/" + event?.creator.avatar}
              className="rounded"
            />
          </div>
          <div className="text-center">{event?.creator.login}</div>
        </div>
      </div>
      <div className="bg-white rounded drop-shadow p-2">
        <ImgDisplayer src={url + "/" + event?.avatar} />
      </div>
      <div className="col-span-2 flex flex-col bg-white rounded drop-shadow p-4 h-fit">
        <div className="text-center text-2xl">Опис події:</div>
        <div className="p-6">
          <p>{event?.desc}</p>
        </div>
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
        <div className="text-center bg-gray-300 rounded drop-whadow flex justify-between py-2 px-4">
          <div>Дата проведення:</div>
          <div>
            <DateFormater value={event?.date} dayOfWeek />
          </div>
        </div>
        <div className="text-center bg-gray-300 rounded drop-whadow flex justify-between py-2 px-4">
          <div>Місто:</div>
          <div>{event?.adress}</div>
        </div>
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
        <div className="text-center">Жанри:</div>
        <ArrayMapper
          className="flex flex-wrap gap-2 overflow-auto"
          itemClassName="bg-gray-300 rounded drop-shadow p-3"
          array={event?.genres ?? []}
        />
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
        <div className="text-center">Потрібні музиканти:</div>
        <ArrayMapper
          className="flex flex-wrap gap-2 overflow-auto"
          itemClassName="bg-gray-300 rounded drop-shadow p-3"
          array={event?.musiciansNeeded ?? []}
        />
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-4">
        <div className="text-center">Технічний райдер:</div>
        <div>
          <p>{event?.rider}</p>
        </div>
      </div>
      <div className="bg-white rounded drop-shadow p-4 flex flex-col gap-2 col-span-2">
        <div className="text-center">Учасники:</div>
        <div className="p-4 grid grid-cols-2 gap-2">
          {event?.participants.map((participant: IParticipant) => {
            return (
              <Link to={`/user/${participant._id}`}>
                <div className="bg-cyan-500 drop-shadow rounded text-white flex flex-col p-4 gap-4">
                  <div className="text-center text-xl">{participant.name}</div>
                  <div className="grid grid-cols-2 gap-28">
                    <div className="flex justify-between">
                      <div>Роль:</div>
                      <div>{participant.role}</div>
                    </div>
                    <div className="flex justify-between">
                      <div>Права:</div>
                      <div>{participant.rights}</div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Comments eventId={eventId} />
    </div>
  );
};

export default observer(EventPage);
