const MainHubSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] group ">
      {/* Fond gris qui couvre toute la carte */}
      <div className="absolute inset-0 bg-gray-700" />

      {/* Overlay sans dégradé, fond opaque, spinner centré */}
      <div className="absolute inset-0 bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500" />
      </div>
    </div>
  );
};

export default MainHubSkeleton;
