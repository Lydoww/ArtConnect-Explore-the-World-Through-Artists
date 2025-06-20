import { useEffect, useState } from "react";
import { useProfileData } from "../hooks/useProfileData";
import { HeroSection } from "../components/profil/HeroSection";
import { TabsNavigation } from "../components/profil/TabsNavigation";
import OverviewTab from "../components/profil/OverviewTab";
import CollectionTab from "../components/profil/CollectionTab";
import InsightsTab from "../components/profil/InsightTab";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(() => {
    const savedAvatar = localStorage.getItem("selectedAvatar");
    return savedAvatar ? JSON.parse(savedAvatar) : null;
  });
  const [activeTab, setActiveTab] = useState("overview");
  const {
    savedArtwork,
    recentArtworks,
    styleCounts,
    favoriteArtists,
    artStyles,
  } = useProfileData();

  useEffect(() => {
    if (selectedAvatar) {
      localStorage.setItem("selectedAvatar", JSON.stringify(selectedAvatar));
    } else {
      localStorage.removeItem("selectedAvatar");
    }
  }, [selectedAvatar]);

  useEffect(() => {
    if (!user) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [user]);

  return (
    <div className="min-h-screen">
      <HeroSection
        savedArtwork={savedArtwork}
        selectedAvatar={selectedAvatar}
        onAvatarSelect={setSelectedAvatar}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
        <TabsNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === "overview" && (
          <OverviewTab
            savedArtwork={savedArtwork}
            recentArtworks={recentArtworks}
            favoriteArtists={favoriteArtists}
            sortedStyles={artStyles}
            styleCounts={styleCounts}
            artStyles={artStyles}
          />
        )}

        {activeTab === "collection" && (
          <CollectionTab savedArtwork={savedArtwork} />
        )}

        {activeTab === "insights" && (
          <InsightsTab
            favoriteArtists={favoriteArtists}
            artStyles={artStyles}
          />
        )}
      </div>
      {/* Lock screen si non connecté */}
      {!user && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-2xl border border-gray-100 w-full max-w-md text-center">
            <div className="flex justify-center mb-5">
              <div className="p-3 bg-red-50 rounded-full inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              Access Restricted
            </h2>
            <p className="text-gray-600 mb-7 mx-auto max-w-xs">
              You need to be logged in to view your profile.
            </p>

            <div className="flex justify-center">
              <Link to="/">
                <button className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                  Back to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
