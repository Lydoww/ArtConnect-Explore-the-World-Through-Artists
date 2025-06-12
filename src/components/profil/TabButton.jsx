const TabButton = ({ value, children, isActive, onClick }) => (
  <button
    onClick={() => onClick(value)}
    className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
      isActive
        ? "bg-white/20 text-white border border-fuchsia-500"
        : "text-slate-400 hover:text-white hover:bg-white/10"
    }`}
  >
    {children}
  </button>
);

export default TabButton;
