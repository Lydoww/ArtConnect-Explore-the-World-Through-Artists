const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

export default Badge;
