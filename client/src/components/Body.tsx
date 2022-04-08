import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from "react";
import LoginForm from "./BodyComps/LoginPage";
import RegForm from "./BodyComps/RegistrationPage";
import { observer } from "mobx-react-lite";
import Profile from "./BodyComps/UserAccountPage";
import Events from "./BodyComps/EventsPage";
import AddEventForm from "./BodyComps/NewEventPage";
import UserEvents from "./BodyComps/UserEventsPage";
import UserPage from "./BodyComps/UserPage";
import SendEventRequest from "./BodyComps/InvitePage";
import EventPage from "./BodyComps/EventPage";
import EventsAdmin from "./BodyComps/EventsAdminPage";
import UsersAdminPage from "./BodyComps/UsersAdminPage";

function Body() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/reg" element={<RegForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events-admin" element={<EventsAdmin />} />
        <Route path="/users-admin" element={<UsersAdminPage />} />
        <Route path="/event-form" element={<AddEventForm />} />
        <Route path="/user-events/:userId" element={<UserEvents />} />
        <Route
          path="/send-event-request/:userId"
          element={<SendEventRequest />}
        />
        <Route path="/event/:eventId" element={<EventPage />} />
      </Routes>
    </>
  );
}

export default observer(Body);
