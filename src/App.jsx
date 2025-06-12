import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MainHub from "./pages/MainHub";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Artwork from "./pages/Artwork";
import Profil from "./pages/Profil";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster richColors position="top-center" />

      <div className="flex flex-col min-h-screen px-4 bg-gradient-to-r from-slate-800 to-slate-900">
        <Navbar />

        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/hub" element={<MainHub />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/art/:id" element={<Artwork />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
