import TabButton from "./TabButton";

export const TabsNavigation = ({ activeTab, setActiveTab }) => (
  <div className="mb-8">
    <div className="flex gap-2 p-1 bg-black/30 border border-white/10 rounded-xl w-fit">
      <TabButton
        data-cy="tab-overview"
        value="overview"
        isActive={activeTab === "overview"}
        onClick={setActiveTab}
      >
        Overview
      </TabButton>
      <TabButton
        data-cy="tab-collection"
        value="collection"
        isActive={activeTab === "collection"}
        onClick={setActiveTab}
      >
        Collection
      </TabButton>
      <TabButton
        data-cy="tab-insights"
        value="insights"
        isActive={activeTab === "insights"}
        onClick={setActiveTab}
      >
        Insights
      </TabButton>
    </div>
  </div>
);
