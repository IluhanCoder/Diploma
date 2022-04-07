import { useContext } from "react";
import { Context } from "../../..";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const EventCreateRequest = () => {
  const { store } = useContext(Context);
  if (store.isAuth && store.user.login == "ADMIN") {
    return <Link to={"/events-admin"}>Запроси на створення подій</Link>;
  } else return <></>;
};

export default observer(EventCreateRequest);
