import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Gigs from "./pages/Gigs";
import Bids from "./pages/Bids";

import socket from "./services/socket";

function App() {
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (userId) {
      socket.emit("join", userId);
    }

    socket.on("hired", (data) => {
      alert(data.message);
    });

    return () => {
      socket.off("hired");
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<Gigs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bids/:gigId" element={<Bids />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
