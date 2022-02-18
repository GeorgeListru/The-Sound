import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Landing from "./screens/Landing/Landing";
import Register from "./screens/Register/Register";
import Login from "./screens/Login/Login";
import Player from "./screens/Player/Player";

function App() {
  const location = useLocation();
  return (
    <div className="App bg-custom-blue-200 w-100 h-100 font-roboto">
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.key}>
          <Route path="/" exact element={<Landing />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/player" exact element={<Player />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
