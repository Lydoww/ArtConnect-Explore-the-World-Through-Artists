const MainHubSkeleton = () => {
  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg w-full h-[20rem] group">
      {/* Fond gris qui couvre toute la carte */}
      <div className="absolute inset-0 bg-gray-700" />

      {/* Overlay spinner centré */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-fuchsia-500" />
      </div>
    </div>
  );
};

export default MainHubSkeleton;
