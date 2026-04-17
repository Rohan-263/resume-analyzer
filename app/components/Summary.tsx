import React from "react";
import ScoreGauge from "./ScoreGauge";
import ScoreBadge from "./ScoreBadge";

const Category = ({ title, score }: { title: string; score: number }) => {
  return (
    <div className="flex flex-row items-center justify-between w-full py-2 border-b border-gray-100 last:border-b-0">
      <div className="flex flex-row items-center gap-2">
        <p className="text-2xl font-medium text-gray-700">{title}</p>
        <ScoreBadge score={score} />
      </div>
      <p className="text-xl font-semibold text-gray-800">
        {score}
        <span className="text-gray-400 font-normal">/100</span>
      </p>
    </div>
  );
};

const Summary = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-6">
      <div className="flex flex-col items-left gap-8">
        {/* Left: Gauge + title */}
        <div className="flex flex-row items-center gap-4 flex-shrink-0">
          <ScoreGauge score={feedback.overallScore} />
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-gray-900">
              Your Resume Score
            </h2>
            <p className="text-lg text-gray-400 max-w-[300px] leading-snug">
              This score is calculated based on the variables listed below.
            </p>
          </div>
        </div>

        {/* Right: Categories stacked vertically */}
        <div className="flex flex-col flex-1 divide-y divide-gray-100">
          <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
          <Category title="Content" score={feedback.content.score} />
          <Category title="Structure" score={feedback.structure.score} />
          <Category title="Skills" score={feedback.skills.score} />
        </div>
      </div>
    </div>
  );
};

export default Summary;
