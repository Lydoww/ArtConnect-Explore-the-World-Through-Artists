import { useEffect, useState } from "react";
import { useProfileData } from "../hooks/useProfileData";
import { HeroSection } from "../components/profil/HeroSection";
import { TabsNavigation } from "../components/profil/TabsNavigation";
import OverviewTab from "../components/profil/OverviewTab";
import CollectionTab from "../components/profil/CollectionTab";
import InsightsTab from "../components/profil/InsightTab";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useAvatarStore } from "../stores/useAvatarStore";
import ProfileSkeleton from "../components/ui/skeleton/ProfileSkeleton";

const Profile = () => {
  const { user } = useAuth();
  const { avatar, changeAvatar, isLoading } = useAvatarStore();
  const [activeTab, setActiveTab] = useState("overview");
  const {
    savedArtwork,
    recentArtworks,
    styleCounts,
    favoriteArtists,
    artStyles,
    isLoadingLikes,
  } = useProfileData();

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

  if (isLoading || isLoadingLikes) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <HeroSection
        savedArtwork={savedArtwork}
        selectedAvatar={isLoading ? null : avatar}
        onAvatarSelect={changeAvatar}
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
        <div className="fixed inset-0 backdrop-blur-md bg-slate-900/90 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl shadow-xl border border-slate-700 w-full max-w-md text-center">
            <div className="flex justify-center mb-5">
              <div className="p-4 bg-fuchsia-500/10 rounded-full inline-flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-fuchsia-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-100 mb-3">
              Authentication Required
            </h2>
            <p className="text-gray-400 mb-6">
              Please sign in to access your profile
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link
                to="/login"
                className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 hover:from-fuchsia-700 hover:to-fuchsia-900 text-white font-medium py-2.5 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-fuchsia-500/20"
              >
                Sign In
              </Link>
              <Link
                to="/"
                className="bg-slate-700 hover:bg-slate-600 text-gray-200 font-medium py-2.5 px-6 rounded-lg transition-colors duration-200"
              >
                Go Home
              </Link>
            </div>

            <p className="text-sm text-gray-500 mt-6">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-fuchsia-400 hover:text-fuchsia-300 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
