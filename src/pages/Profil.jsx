import { useState } from "react";
import { useProfileData } from "../hooks/useProfileData";
import { HeroSection } from "../components/profil/HeroSection";
import { TabsNavigation } from "../components/profil/TabsNavigation";
import OverviewTab from "../components/profil/OverviewTab";
import CollectionTab from "../components/profil/CollectionTab";
import InsightsTab from "../components/profil/InsightTab";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const {
    savedArtwork,
    recentArtworks,
    styleCounts,
    favoriteArtists,
    artStyles,
  } = useProfileData();

  return (
    <div className="min-h-screen">
      <HeroSection savedArtwork={savedArtwork} />

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
    </div>
  );
};

export default Profile;
