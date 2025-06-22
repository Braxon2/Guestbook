import "./App.css";
import Home from "./pages/Home";
import SendMessage from "./pages/SendMessage";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/send-message" element={<SendMessage />} />;
      </Routes>
    </BrowserRouter>
  );
}

export default App;
