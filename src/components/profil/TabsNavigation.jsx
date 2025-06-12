import TabButton from "../TabButton";

export const TabsNavigation = ({ activeTab, setActiveTab }) => (
  <div className="mb-8">
    <div className="flex gap-2 p-1 bg-black/30 border border-white/10 rounded-xl w-fit">
      <TabButton
        value="overview"
        isActive={activeTab === "overview"}
        onClick={setActiveTab}
      >
        Overview
      </TabButton>
      <TabButton
        value="collection"
        isActive={activeTab === "collection"}
        onClick={setActiveTab}
      >
        Collection
      </TabButton>
      <TabButton
        value="insights"
        isActive={activeTab === "insights"}
        onClick={setActiveTab}
      >
        Insights
      </TabButton>
    </div>
  </div>
);
