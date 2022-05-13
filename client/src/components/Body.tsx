import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useContext } from "react";
import LoginForm from "./BodyComps/LoginPage";
import RegForm from "./BodyComps/RegistrationPage";
import { observer } from "mobx-react-lite";
import Profile from "./BodyComps/UserAccountPage";
import Events from "./BodyComps/EventsPage";
import AddEventForm from "./BodyComps/NewEventPage";
import UserPage from "./BodyComps/UserPage";
import SendEventRequest from "./BodyComps/InvitePage";
import EventPage from "./BodyComps/EventPage";
import UsersAdminPage from "./BodyComps/UsersAdminPage";
import PropositionPage from "./BodyComps/PropositionPage";
import AcceptPropositionPage from "./BodyComps/AcceptPropositionPage";
import InvitePage from "./BodyComps/InvitePage";
import { Context } from "..";
import TicketsPage from "./BodyComps/TicketsPage";
import UsersPage from "./BodyComps/UsersPage";
import EditEventPage from "./BodyComps/EditEventPage";
import NewSongPage from "./BodyComps/NewSongPage";
import SongPage from "./BodyComps/SongPage";

function Body() {
  const { store } = useContext(Context);
  const currentUser = store.user;

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reg" element={<RegForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:userId" element={<UserPage />} />
        <Route path="/events" element={<Events type={"submited"} />} />
        <Route path="/events-admin" element={<Events type={"unsubmited"} />} />
        <Route path="/users-admin" element={<UsersAdminPage />} />
        <Route path="/event-form" element={<AddEventForm />} />
        <Route path="/user-events" element={<Events type={"user"} />} />
        <Route
          path="/aaa/:userId/:propositionId"
          element={<AcceptPropositionPage />}
        />
        <Route path="/invite/:receiverId" element={<InvitePage />} />
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/tickets" element={<TicketsPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route
          path="/event-proposition/:eventId"
          element={<PropositionPage />}
        ></Route>
        <Route path="/event-edit/:eventId" element={<EditEventPage />} />
        <Route path="/song-form/:eventId" element={<NewSongPage />} />
        <Route path="/song/:songId" element={<SongPage />}></Route>
      </Routes>
    </>
  );
}

export default observer(Body);
