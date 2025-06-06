import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainHub from "./pages/MainHub";
import Navbar from "./components/ui/Navbar";
import Footer from "./components/ui/Footer";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen px-4 bg-gradient-to-r from-slate-800 to-slate-900">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/hub" element={<MainHub />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
