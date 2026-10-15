import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Feedback from "./components/Feedback";
import "./App.css";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/add" element={<Feedback />} />
      </Routes>
    </>
  );
}

export default App;