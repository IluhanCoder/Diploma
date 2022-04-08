import { useContext } from "react";
import { Context } from "../../..";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

type LocalParams = {
  className?: string 
}

const EventCreateRequest = (params: LocalParams) => {
  const { store } = useContext(Context);
  const { className } = params;
  if (store.isAuth && store.user.login == "ADMIN") {
    return <Link to={"/events-admin"}><div className={className}>Запроси на створення подій</div></Link>;
  } else return <></>;
};

export default observer(EventCreateRequest);
