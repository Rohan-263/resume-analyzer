type ScoreBadgeProps = {
  score: number;
};

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  let bgColor = "";
  let textColor = "";
  let label = "";

  if (score > 80) {
    bgColor = "bg-green-100";
    textColor = "text-green-700";
    label = "Strong";
  } else if (score > 50) {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-700";
    label = "Good Start";
  } else {
    bgColor = "bg-red-100";
    textColor = "text-red-700";
    label = "Needs Work";
  }

  return (
    <div
      className={`inline-flex items-center px-3 py-1 rounded-full ${bgColor}`}
    >
      <p className={`text-sm font-medium ${textColor}`}>{label}</p>
    </div>
  );
};

export default ScoreBadge;
