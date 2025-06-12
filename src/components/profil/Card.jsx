const Card = ({ children, className = "" }) => (
  <div
    className={`bg-slate-800/50 shadow border border-slate-700 backdrop-blur-sm rounded-xl overflow-hidden hover:scale-105 hover:border-fuchsia-500 transition-transform duration-300 ${className}`}
  >
    {children}
  </div>
);

export default Card;
