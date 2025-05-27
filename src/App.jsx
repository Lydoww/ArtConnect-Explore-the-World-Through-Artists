import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainHub from "./pages/MainHub";
import Navbar from "./components/ui/Navbar";

const App = () => {
  return (
    <div className="px-4 bg-gradient-to-r from-slate-800 to-slate-900 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/hub" element={<MainHub />} />
      </Routes>
    </div>
  );
};

export default App;
