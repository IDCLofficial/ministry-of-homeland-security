// Age Bar Chart Component
const AgeBarChart = ({ data }: { data: Array<{ "Date of Birth"?: number }> }) => {
  // Calculate age from Excel serial date
  const calculateAge = (dateOfBirth?: number): number => {
    if (!dateOfBirth) return 0;
    
    const excelEpoch = new Date(1899, 11, 30); // December 30, 1899
    const birthDate = new Date(excelEpoch.getTime() + (dateOfBirth * 24 * 60 * 60 * 1000));
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  // Group ages into ranges
  const getAgeGroups = () => {
    const ageGroups = {
      "18-25": 0,
      "26-35": 0,
      "36-45": 0,
      "46-55": 0,
      "56-65": 0,
      "65+": 0,
      "Unknown": 0
    };

    data.forEach(person => {
      const age = calculateAge(person["Date of Birth"]);
      
      if (age === 0) {
        ageGroups["Unknown"]++;
      } else if (age >= 18 && age <= 25) {
        ageGroups["18-25"]++;
      } else if (age >= 26 && age <= 35) {
        ageGroups["26-35"]++;
      } else if (age >= 36 && age <= 45) {
        ageGroups["36-45"]++;
      } else if (age >= 46 && age <= 55) {
        ageGroups["46-55"]++;
      } else if (age >= 56 && age <= 65) {
        ageGroups["56-65"]++;
      } else if (age > 65) {
        ageGroups["65+"]++;
      }
    });

    return ageGroups;
  };

  const ageGroups = getAgeGroups();
  const maxCount = Math.max(...Object.values(ageGroups));
  const total = Object.values(ageGroups).reduce((sum, count) => sum + count, 0);

  const colors = [
    "#3B82F6", // Blue
    "#10B981", // Green
    "#F59E0B", // Yellow
    "#EF4444", // Red
    "#8B5CF6", // Purple
    "#F97316", // Orange
    "#6B7280"  // Gray for Unknown
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Age Distribution</h2>
      
      <div className="space-y-4">
        {Object.entries(ageGroups).map(([ageRange, count], index) => {
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const barWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
          
          return (
            <div key={ageRange} className="flex items-center space-x-4">
              {/* Age Range Label */}
              <div className="w-16 text-sm font-medium text-gray-700">
                {ageRange}
              </div>
              
              {/* Bar Container */}
              <div className="flex-1 relative">
                <div className="w-full bg-gray-200 rounded-full h-8 relative overflow-hidden">
                  {/* Bar */}
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end pr-2"
                    style={{
                      width: `${barWidth}%`,
                      backgroundColor: colors[index]
                    }}
                  >
                    {/* Count inside bar (if bar is wide enough) */}
                    {barWidth > 15 && (
                      <span className="text-white text-xs font-medium">
                        {count}
                      </span>
                    )}
                  </div>
                  
                  {/* Count outside bar (if bar is too narrow) */}
                  {barWidth <= 15 && count > 0 && (
                    <span 
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-700"
                    >
                      {count}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Percentage */}
              <div className="w-16 text-sm text-gray-600 text-right">
                {percentage.toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="font-medium text-gray-700">Total Records:</span>
          <span className="font-semibold">{total}</span>
        </div>
        <div className="flex justify-between items-center text-sm mt-1">
          <span className="font-medium text-gray-700">Valid Ages:</span>
          <span className="font-semibold">{total - ageGroups["Unknown"]}</span>
        </div>
      </div>
    </div>
  );
};

export default AgeBarChart;
