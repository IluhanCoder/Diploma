import React, { FC, useContext, useState } from "react";
import { Context } from "../../../index";
import { observer } from "mobx-react-lite";
import IRoute from "../../../interfaces/route";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { IEvent } from "../../../models/IEvent";
import { API_URL } from "../../../http";
import EventService from "../../../services/EventService";
import ArrayMapper from "../../UniversalComps/ArrayMapper";
import DateFormater from "../../UniversalComps/DateFormater";
import UserService from "../../../services/UserService";
import ImgDisplayer from "../../UniversalComps/ImgDisplayer";
import Events from "../EventsPage";

type LocalProps = {
  event: IEvent;
};

const url = API_URL.replace("/api", "");

export const Event = ({ event }: LocalProps) => {
  return (
    <div className="bg-white border-gray-300 border-2 rounded-md md:px-24 px-2 py-6">
      <div className="grid grid-rows-8">
        <div className="flex md:place-content-end place-content-center">
          <h2>
            Створив подію:{" "}
            <a href={`user/` + event.creator._id}>{event.creator.login}</a>
          </h2>
        </div>
        <div className="flex justify-center">
          <h1 className="font-bold text-4xl">{event.name}</h1>
        </div>
        <div className="row-span-2 lg:px-1/4 flex justify-center content-center py-4 max-h-96">
          {/* <img src={url + "/" + event.avatar} className="h-full"></img> */}
          <ImgDisplayer src={url + "/" + event.avatar} className="h-full" />
        </div>
        <div>
          <div className="mt-4 mb-6 mx-2">
            <p>{event.desc}</p>
          </div>
        </div>
        <div className="row-span-3">
          <div className="grid md:grid-cols-2 sm:grid-rows-2">
            <div>
              <p className="mb-2">Жанри:</p>
              <div className="flex flex-wrap">
                <ArrayMapper
                  itemClassName="bg-gray-400 mr-4 mb-2 rounded px-4 py-1"
                  array={event.genres}
                />
              </div>
            </div>
            <div>
              <p className="mb-2">Учасники:</p>
              <div className="flex flex-wrap">
                {/* <ArrayMapper
                  itemClassName="bg-gray-400 mr-4 mb-2 rounded px-4 py-1"
                  array={event.participants}
                /> */}
              </div>
            </div>
            <div>
              <p className="mb-2">Потрібні:</p>
              <div className="flex flex-wrap">
                <ArrayMapper
                  itemClassName="bg-gray-400 mr-4 mb-2 rounded px-4 py-1"
                  array={event.musiciansNeeded}
                />
              </div>
            </div>
          </div>
          <div>
            <p>
              Дата: <DateFormater value={event.date} dayOfWeek />
            </p>
            <p>Адреса: {event.adress}</p>
          </div>
        </div>
        <div className="flex justify-center py-2">
          <Link to={"/event/" + event._id}>
            <button
              type="button"
              className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-300"
            >
              Детальніше
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Event;
