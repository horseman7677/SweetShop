import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "../src/components/Home";
import Register from "../src/components/Register";
import Items from "../src/components/Items";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/home/:name" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
