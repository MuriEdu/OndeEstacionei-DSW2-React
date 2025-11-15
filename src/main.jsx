import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css';
import History from "./pages/History.jsx";
import Home from "./pages/home.jsx";
import Park from "./pages/Park.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/history" element={<History/>} />
      <Route path="/park" element={<Park/>} />
    </Routes>
  </BrowserRouter>,
);
