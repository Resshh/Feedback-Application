import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Feedback from "./components/Feedback";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<Feedback />} />
          <Route path="/edit/:id" element={<Feedback />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
