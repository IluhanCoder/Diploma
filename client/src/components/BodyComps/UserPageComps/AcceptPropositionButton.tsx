import { useContext, useEffect, useState } from "react";
import { idText } from "typescript";
import { ITicket } from "../../../models/ITicket";
import InviteService from "../../../services/InviteService";
import { Context } from "../../../index";
import { useNavigate } from "react-router";
import PropositionService from "../../../services/PropositionService";

type LocalParams = {
  className?: string;
  userId: string;
};

const AcceptPropositionButton = ({ userId, className }: LocalParams) => {
  const [proposition, setProposition] = useState<ITicket>();
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const acceptHandler = () => {
    PropositionService.acceptProposition(proposition?._id!);
    window.location.reload();
  };
  const rejectHandler = () => {
    PropositionService.rejectProposition(proposition?._id!);
    navigate(`/events`);
  };

  const getData = () => {
    PropositionService.getProposition(store.user._id, userId).then((res) =>
      setProposition(res.data)
    );
  };
  useEffect(() => {
    if (store.user._id && userId) getData();
  }, [store.user._id, userId]);

  if (proposition) {
    return (
      <div className={className}>
        <button
          type="button"
          className="bg-green-400 hover:bg-green-300 rounded p-2 drop-shadow"
          onClick={() => acceptHandler()}
        >
          погодитись
        </button>
        <button
          type="button"
          className="bg-red-400 hover:bg-red-300 rounded p-2 drop-shadow"
          onClick={() => {
            rejectHandler();
          }}
        >
          відмовитись
        </button>
      </div>
    );
  } else return <></>;
};

export default AcceptPropositionButton;
