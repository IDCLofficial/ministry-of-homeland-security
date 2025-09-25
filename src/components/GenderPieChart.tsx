// Gender Pie Chart Component
const GenderPieChart = ({ stats }: { stats: Record<string, number> }) => {
  const total = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const colors = {
    Male: "#3B82F6",
    Female: "#EC4899",
    Unknown: "#6B7280"
  };

  let cumulativePercentage = 0;
  const segments = Object.entries(stats).map(([gender, count]) => {
    const percentage = (count / total) * 100;
    const startAngle = cumulativePercentage * 3.6; // Convert to degrees
    const endAngle = (cumulativePercentage + percentage) * 3.6;
    cumulativePercentage += percentage;

    return {
      gender,
      count,
      percentage,
      startAngle,
      endAngle,
      color: colors[gender as keyof typeof colors] || "#6B7280"
    };
  });

  return (
    <div className="flex flex-col md:flex-row items-center space-x-8">
      {/* Pie Chart */}
      <div className="relative">
        <svg width="200" height="200" className="transform -rotate-90">
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="4"
          />
          {segments.map((segment, index) => {
            const { startAngle, endAngle, color } = segment;
            const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
            
            const startX = 100 + 80 * Math.cos((startAngle * Math.PI) / 180);
            const startY = 100 + 80 * Math.sin((startAngle * Math.PI) / 180);
            const endX = 100 + 80 * Math.cos((endAngle * Math.PI) / 180);
            const endY = 100 + 80 * Math.sin((endAngle * Math.PI) / 180);

            const pathData = [
              `M 100 100`,
              `L ${startX} ${startY}`,
              `A 80 80 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `Z`
            ].join(' ');

            return (
              <path
                key={index}
                d={pathData}
                fill={color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {segments.map((segment) => (
          <div key={segment.gender} className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: segment.color }}
            />
            <div className="text-sm">
              <span className="font-medium">{segment.gender}</span>
              <span className="text-gray-600 ml-2">
                {segment.count} ({segment.percentage.toFixed(1)}%)
              </span>
            </div>
          </div>
        ))}
        <div className="pt-2 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700">
            Total: {total} records
          </span>
        </div>
      </div>
    </div>
  );
};

export default GenderPieChart;
