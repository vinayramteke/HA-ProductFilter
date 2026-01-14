const Shimmer = () => {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-3">
      <div className="h-6 w-40 bg-gray-200 rounded mb-4 animate-pulse"></div>

      <div className="space-y-2">
        {Array(8)
          .fill("")
          .map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-100 rounded animate-pulse"
            ></div>
          ))}
      </div>
    </div>
  );
};
export default Shimmer;
