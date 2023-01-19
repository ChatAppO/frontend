import React from "react";
import "./App.css";
import { socket, WebsocketProvider } from "./contexts/WebsocketContext";
import { Home } from "./components/pages/Home";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <WebsocketProvider value={socket}>
      <UserProvider>
        <Home />
      </UserProvider>
    </WebsocketProvider>
  );
}

export default App;
