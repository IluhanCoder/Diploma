import { useEffect, useState } from "react";
import { useParams } from "react-router";
import $api from "../../http";
import { IEvent } from "../../models/IEvent";
import { API_URL } from "../../http";
import DateFormater from "../UniversalComps/DateFormater";
import ArrayMapper from "../UniversalComps/ArrayMapper";
import ImgDisplayer from "../UniversalComps/ImgDisplayer";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import NewSongButton from "./EventPageComps/NewSongButton";
import AdminButtons from "./EventPageComps/AdminButtons";
import EventStatus from "./EventsPageComps/EventStatus";

type LocalParams = {
  eventId: string;
};

const url = API_URL.replace("/api", "");

const EventPage = () => {
  const params = useParams<LocalParams>();
  const { eventId } = params;

  const [event, setEvent] = useState<IEvent>();
  const [creatorAvar, setCreatorAvatar] = useState<string>("");

  useEffect(() => {
    $api.get("/event/" + eventId).then((response) => {
      const eventData = response.data;
      setEvent(eventData);
      $api.get("/avatar/" + eventData.creatorId).then((response) => {
        const { avatar } = response.data;
        setCreatorAvatar(avatar);
      });
    });
  }, []);

  return (
    <div className="bg-gray-100 p-5 flex flex-wrap gap-5 justify-center">
      <div className="flex flex-row w-full justify-center gap-2">
        <div className="flex justify-between space-x px-7 py-5 bg-white rounded border drop-shadow w-3/4 h-fit">
          <div>
            <h1 className="text-4xl text-center">{event?.name}</h1>
          </div>
          <div>
            <EventStatus
              className="px-4 py-1 rounded"
              isSubmited={event?.isSubmited ? event.isSubmited : false}
            />
          </div>
        </div>
        <Link to={`/user/${event?.creatorId}`}>
          <div className="flex flex-col justify-center px-4 py-1 bg-white rounded border drop-shadow w-fit">
            <div className="flex justify-center">
              <h1>Створив:</h1>
            </div>
            <div className="flex justify-center">
              <Avatar
                name={event?.creatorName}
                src={url + "/" + creatorAvar}
                size="55"
                className="rounded"
              />
            </div>
            <div className="flex justify-center">{event?.creatorName}</div>
          </div>
        </Link>
      </div>
      <div className="bg-white rounded border drop-shadow p-3">
        <ImgDisplayer src={url + "/" + event?.avatar} className="h-80" />
      </div>
      <div className="bg-white rounded border drop-shadow w-1/2 flex flex-col px-8 py-6 h-fit">
        <div className="px-8">
          <div className="flex justify-center w-full">
            <h1 className="text-center text-xl">Опис події:</h1>
          </div>
          <div className="py-6">
            <p className="mt-1">{event?.desc}</p>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex gap-4">
              <div>
                <p>Дата:</p>
              </div>
              <div>
                <DateFormater value={event?.date} dayOfWeek={false} />
              </div>
            </div>
            <div className="flex gap-4">
              <p>Місто:</p>
              <p>{event?.adress}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded border drop-shadow min-w-[25%] max-w-[45%] px-10 py-4 flex flex-col gap-3 h-fit">
        <div className="flex w-full justify-center">
          <h1 className="text-2xl text-center">Учасники:</h1>
        </div>
        <div className="flex flex-wrap w-full pb-3">
          <ArrayMapper
            array={event?.participants ? event.participants : []}
            itemClassName="bg-cyan-300 px-4 py-1 rounded drop-shadow mr-3 mb-3"
          />
        </div>
      </div>
      <div className="bg-white rounded border drop-shadow min-w-[25%] max-w-[45%] px-10 py-4 flex flex-col gap-3 h-fit">
        <div className="flex w-full justify-center">
          <h1 className="text-2xl text-center">Жанри:</h1>
        </div>
        <div className="flex flex-wrap w-full pb-3">
          <ArrayMapper
            array={event?.genres ? event.genres : []}
            itemClassName="bg-cyan-300 px-4 py-1 rounded drop-shadow mr-3 mb-3"
          />
        </div>
      </div>
      <div className="bg-white rounded border drop-shadow w-1/3 px-10 py-4 flex flex-col gap-3">
        <div>
          <h1 className="text-2xl text-center">Технічний райдер:</h1>
        </div>
        <div className="px-4 py-2 w-full">
          <p>
            demo demo demo demo demo demo demo demo demo demo demo demo demo
            demo demo demo demo demo demo demo demo demo demo demo demo demo
            demo demo demo demo demo demo demo demo demo demo demo demo demo
            demo demo demo demo demo demo demo demo demo demo demo demo demo
            demo demo demo demo demo demo demo demo demo demo
          </p>
        </div>
      </div>
      <div className="bg-white rounded border drop-shadow w-2/3 px-10 py-4 flex flex-col gap-3">
        <div>
          <h1 className="text-2xl text-center">Репертуар:</h1>
        </div>
        <div className="px-4 py-2 w-full">
          <div className="overflow-auto flex flex-col w-full gap-2 max-h-52">
            <div className="w-full bg-cyan-300 px-3 py-2 rounded drop-shadow">
              Пісня
            </div>
            <div className="w-full bg-cyan-300 px-3 py-2 rounded drop-shadow">
              Пісня
            </div>
            <div className="w-full bg-cyan-300 px-3 py-2 rounded drop-shadow">
              Пісня
            </div>
            <div className="w-full bg-cyan-300 px-3 py-2 rounded drop-shadow">
              Пісня
            </div>
            <div className="w-full bg-cyan-300 px-3 py-2 rounded drop-shadow">
              Пісня
            </div>
            <div className="w-full bg-cyan-300 px-3 py-2 rounded drop-shadow">
              Пісня
            </div>
            <div className="w-full bg-cyan-300 px-3 py-2 rounded drop-shadow">
              Пісня
            </div>
            <div className="w-full bg-cyan-300 px-3 py-2 rounded drop-shadow">
              Пісня
            </div>
          </div>
        </div>
        <div className="flex justify-center w-full">
          <NewSongButton
            className="bg-cyan-400 hover:bg-cyan-200 px-2 py-1 rounded drop-shadow"
            eventCreatorId={event?.creatorId ? event?.creatorId : ""}
          />
        </div>
      </div>
      <AdminButtons event={event} />
    </div>
  );
};

export default EventPage;
