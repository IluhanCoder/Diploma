import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
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
import { useLocation } from "react-router";
import AcceptInviteButton from "./EventPageComps/AcceptInviteButton";

type LocalParams = {
  eventId: string;
};

const url = API_URL.replace("/api", "");

const EventPage = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const { eventId } = useParams<LocalParams>();

  const [event, setEvent] = useState<IEvent>();
  const [commentInput, setCommentInput] = useState<string>();

  const submitHandler = () => {
    EventService.submitEvent(event?._id!);
    window.location.reload();
  };

  const deleteHandler = () => {
    EventService.deleteEvent(event?._id!);
    navigate("/events");
  };

  const proposeHandler = () => {
    navigate(`/event-proposition/${event?._id}`);
  };

  const getData = async () => {
    await EventService.getEvent(eventId!).then((res) => {
      setEvent(res.data);
    });
  };
  useEffect(() => {
    if (eventId) getData();
  }, [eventId, setEvent]);

  return (
    <div className="grid grid-cols-3 w-full bg-gray-200 p-4 gap-4">
      {store.user.login == "ADMIN" && (
        <div className="bg-white rounded drop-shadow flex justify-center p-2 gap-4 col-start-2">
          {!event?.isSubmited && (
            <button
              className="bg-green-500 text-white hover:bg-green-300 rounded p-2"
              onClick={() => submitHandler()}
            >
              Підтвердити
            </button>
          )}
          <button
            className="bg-red-500 text-white hover:bg-red-300 rounded p-2"
            onClick={() => deleteHandler()}
          >
            Видалити
          </button>
        </div>
      )}
      <div className="col-span-3 flex flex-row gap-2 mx-6">
        <div className="bg-white flex justify-between rounded drop-shadow grow h-fit py-4 px-12 mt-10">
          <div className="text-center text-4xl">{event?.name}</div>
          {(!event?.isSubmited && (
            <div className="bg-red-200 text-red-400 rounded border-2 border-red-400 p-2">
              подію не підтверджено
            </div>
          )) || (
            <div className="bg-green-200 text-green-400 rounded border-2 border-green-400 p-2">
              подію підтверджено
            </div>
          )}
        </div>
        <div className="bg-white rounded drop-shadow w-fit px-4 py-1 flex-col gap-2">
          <div className="text-center">Сворив подію:</div>
          <div className="flex justify-center">
            <Avatar
              src={url + "/" + event?.creator.avatar}
              className="rounded"
              name={event?.creator.login}
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
          {(event?.participants.length! > 0 &&
            event?.participants.map((participant: IParticipant) => {
              return (
                <Link to={`/user/${participant._id}`} key={participant._id}>
                  <div className="bg-cyan-500 drop-shadow rounded text-white flex flex-col p-4 gap-4">
                    <div className="text-center text-xl">
                      {participant.name}
                    </div>
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
            })) || (
            <div className="col-span-2 text-center text-gray-500">
              Учасників нема
            </div>
          )}
        </div>
      </div>
      {!event?.participants.some(
        (participant: IParticipant) => participant._id == store.user._id
      ) &&
        event?.creator._id != store.user._id && (
          <div className="bg-white drop-shadow rounded p-2 flex justify-center col-start-2">
            <button
              type="button"
              className="bg-cyan-400 hover:bg-cyan-300 rounded p-2"
              onClick={proposeHandler}
            >
              запропонувати свою участь
            </button>
          </div>
        )}
      <AcceptInviteButton
        eventId={event?._id!}
        className="bg-white rounded p-2 drop-shadow flex justify-center gap-2 col-start-2"
      />
      <Comments eventId={eventId!} />
    </div>
  );
};

export default observer(EventPage);
