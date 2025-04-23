import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate
} from "react-router-dom";
import RoomJoinPage    from "./RoomJoinPage";
import CreateRoomPage  from "./CreateRoomPage";

export default class HomePage extends Component {
  render() {
    return (
      <Router>
        <nav>
          <Link to="/">Home</Link> | <Link to="/join">Join</Link> | <Link to="/create">Create</Link>
        </nav>
        <Routes>
          <Route path="/"       element={<p>This is the home page</p>} />
          <Route path="/join"   element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="*"       element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }
}