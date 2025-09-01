import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Tour from "./pages/Tour/Tour";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ExamplePage from "./pages/VirtualTour/VirtualTour";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/virtual" element={<ExamplePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
