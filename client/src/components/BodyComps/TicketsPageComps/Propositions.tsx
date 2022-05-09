import { IEvent } from "../../../models/IEvent";
import { Context } from "../../../index";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import $api from "../../../http";
import { IUser } from "../../../models/IUser";
import { ITicket } from "../../../models/IProposition";
import UserService from "../../../services/UserService";
import { observer } from "mobx-react-lite";
import PropositionService from "../../../services/PropositionService";
import DateFormater from "../../UniversalComps/DateFormater";
import { getEnvironmentData } from "worker_threads";
import { BiAlarmSnooze } from "react-icons/bi";

type LocalParams = {
  userId: string;
  className?: string;
};

const Propositions = ({ userId, className }: LocalParams) => {
  const [propositions, setPropositions] = useState<ITicket[]>([]);

  const getData = async () => {
    await $api
      .get("/propositions/" + userId)
      .then((response) => setPropositions(response.data));
  };
  useEffect(() => {
    if (userId) getData();
    getData();
  }, [userId]);

  if (propositions) {
    return (
      <div className={className}>
        <div className="flex justify-center h-fit">
          <p className="text-xl">Пропозиції на участь в ваших подіях:</p>
        </div>
        {propositions.length > 0 && (
          <div>
            {propositions.map((proposition: ITicket) => {
              const proposer = proposition.proposer;
              const event = proposition.event;
              return (
                <Link to={"/aaa/" + proposer[0]._id + "/" + proposition._id}>
                  <div className="flex-col gap-2 bg-cyan-400 hover:bg-cyan-200 rounded drop-shadow px-3 py-6 text-white">
                    <div className="flex justify-end">
                      <div>
                        Дата пропозиції:{" "}
                        <DateFormater
                          value={proposition.date}
                          dayOfWeek={true}
                        />
                      </div>
                    </div>
                    <div className="flex-wrap p-4">
                      <div className="text-xl">
                        Пропонує: {proposer[0].login}
                      </div>
                      <div className="text-xl">
                        Подія: {event[0].name} (
                        <DateFormater value={event[0].date} dayOfWeek />)
                      </div>
                      <div className="text-xl">Роль: {proposition.role}</div>
                    </div>
                    <div className="px-6">{proposition.comment}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {propositions.length == 0 && (
          <div className="text-center text-gray-400 p-4">Пропозицій нема</div>
        )}
      </div>
    );
  } else return <></>;
};

export default observer(Propositions);
