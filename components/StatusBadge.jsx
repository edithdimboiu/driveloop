const StatusBadge = ({ status }) => {
  const statusStyles = {
    Upcoming: "bg-blue-500 text-white",
    "In Progress": "bg-green-500 text-white",
    Finalized: "bg-gray-500 text-white",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-bold rounded ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
