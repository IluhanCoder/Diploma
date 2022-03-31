import React, {FC, useContext, useState} from 'react'
import { Context } from '../../../index'
import { observer } from 'mobx-react-lite'
import IRoute from '../../../interfaces/route';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { IEvent } from '../../../models/IEvent';
import { API_URL } from '../../../http';
import EventService from '../../../services/EventService'
import ArrayMapper  from './EventComps/ArrayMapper'
import DateFormater from '../DateFormater';
import UserService from '../../../services/UserService';

type LocalProps = {
    event: IEvent
}

const url = API_URL.replace("/api", "")

export const Event = ({event}: LocalProps) => {
    const {store} = useContext(Context)

    return(        
        <div className="bg-white border-gray-300 border-2 rounded-md md:px-24 px-2 py-6 mb-4">
              <div className="grid grid-rows-8">
                <div className="flex md:place-content-end place-content-center">
                  <h2>Створив подію: <a href={`user/` + event.creatorId}>{event.creatorName}</a></h2>
                </div>
                <div className="flex justify-center">
                  <h1 className="font-bold text-4xl">{event.name}</h1>
                </div>
                <div className="row-span-2 lg:px-1/4 flex justify-center content-center py-4">
                  <img
                    src={url + '/' + event.avatar}
                    className="h-full"
                  ></img>
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
                        <ArrayMapper array={event.genres}/>
                      </div>
                    </div>
                    <div>
                      <p className="mb-2">Учасники:</p>
                      <div className="flex flex-wrap">
                        <ArrayMapper array={event.participants}/>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Дата: <DateFormater value={event.date} dayOfWeek/></p>
                    <p>Адреса: {event.adress}</p>
                  </div>
                </div>
              </div>
            </div>
    )
}

export default Event