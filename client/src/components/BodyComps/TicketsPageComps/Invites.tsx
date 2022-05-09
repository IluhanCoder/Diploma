import { IEvent } from "../../../models/IEvent";
import { Context } from "../../../index";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $api from "../../../http";
import { IUser } from "../../../models/IUser";
import { ITicket } from "../../../models/IProposition";
import UserService from "../../../services/UserService";
import { observer } from "mobx-react-lite";
import PropositionService from "../../../services/PropositionService";
import DateFormater from "../../UniversalComps/DateFormater";
import { getEnvironmentData } from "worker_threads";

type LocalParams = {
  userId: string;
  className?: string;
};

const Invites = ({ userId, className }: LocalParams) => {
  const [invites, setInvites] = useState<ITicket[]>([]);

  useEffect(() => {
    const getData = async () => {
      await $api
        .get("/invites/" + userId)
        .then((response) => setInvites(response.data));
      getData();
    };
  }, [setInvites]);

  if (invites) {
    return (
      <div className={className}>
        <div className="flex justify-center h-fit">
          <p className="text-xl">Запоршення на участь в подіях:</p>
        </div>
        {invites.length > 0 && (
          <div>
            {invites.map((invite: ITicket) => {
              const proposer = invite.proposer;
              const event = invite.event;
              return (
                <Link to={"/aaa/" + proposer[0]._id + "/" + invite._id}>
                  <div className="flex-col gap-2 bg-cyan-400 hover:bg-cyan-200 rounded drop-shadow px-3 py-6 text-white">
                    <div className="flex justify-end">
                      <div>
                        Дата пропозиції:{" "}
                        <DateFormater value={invite.date} dayOfWeek={true} />
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
                      <div className="text-xl">Роль: {invite.role}</div>
                    </div>
                    <div className="px-6">{invite.comment}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
        {invites.length == 0 && (
          <div className="text-center text-gray-400 p-4">Запрошень нема</div>
        )}
      </div>
    );
  } else return <></>;
};

export default observer(Invites);
