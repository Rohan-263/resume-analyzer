import { useState } from "react";

type Suggestion = {
  type: "good" | "improve";
  tip: string;
};

type ATSProps = {
  score: number;
  suggestions?: Suggestion[];
};

function getGradient(score: number) {
  if (score > 69) return "from-green-100 via-emerald-50 to-white";
  if (score > 49) return "from-yellow-100 via-amber-50 to-white";
  return "from-red-100 via-rose-50 to-white";
}

function getAccentColor(score: number) {
  if (score > 69)
    return {
      text: "text-green-700",
      border: "border-green-200",
      badge: "bg-green-100 text-green-800",
    };
  if (score > 49)
    return {
      text: "text-yellow-700",
      border: "border-yellow-200",
      badge: "bg-yellow-100 text-yellow-800",
    };
  return {
    text: "text-red-700",
    border: "border-red-200",
    badge: "bg-red-100 text-red-800",
  };
}

function getIcon(score: number) {
  if (score > 69) return "/icons/ats-good.svg";
  if (score > 49) return "/icons/ats-warning.svg";
  return "/icons/ats-bad.svg";
}

function getHeadline(score: number) {
  if (score > 69) return "Great Match";
  if (score > 49) return "Needs Improvement";
  return "Low Compatibility";
}

function getSubtitle(score: number) {
  if (score > 69) return "Your resume is well-optimized for this role.";
  if (score > 49) return "A few tweaks could significantly boost your chances.";
  return "Your resume may not pass automated screening.";
}

function getDescription(score: number) {
  if (score > 69)
    return "ATS systems scan resumes for keywords and formatting alignment. Your score indicates strong compatibility — most automated systems should pass your resume through to recruiters.";
  if (score > 49)
    return "Your resume is partially optimized but missing some key signals. Addressing the suggestions below can meaningfully improve how ATS systems rank your application.";
  return "Your resume lacks critical keywords, structure, or formatting expected by ATS software. Without improvements, it is likely to be filtered out before a human ever reviews it.";
}

function getClosingLine(score: number) {
  if (score > 69) return "Keep refining and apply with confidence!";
  if (score > 49)
    return "Small changes can make a big difference — keep going!";
  return "Don't give up — every improvement brings you closer to your goal.";
}

export default function ATS({ score, suggestions = [] }: ATSProps) {
  const gradient = getGradient(score);
  const accent = getAccentColor(score);
  const icon = getIcon(score);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradient} font-sans`}
      style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
    >
      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Top section */}
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className={`w-16 h-16 mb-4 rounded-2xl flex items-center justify-center border ${accent.border} bg-white shadow-sm`}
          >
            <img
              src={icon}
              alt="ATS score icon"
              className="w-8 h-8"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                const span = document.createElement("span");
                span.className = "text-2xl";
                span.textContent = score > 69 ? "✅" : score > 49 ? "⚠️" : "❌";
                el.parentElement?.appendChild(span);
              }}
            />
          </div>

          <h1
            className={`text-4xl font-bold tracking-tight mb-1 ${accent.text}`}
            style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
          >
            ATS Score — {score}/100
          </h1>

          <span
            className={`mt-2 inline-block text-sm font-semibold px-3 py-1 rounded-full ${accent.badge}`}
          >
            {getHeadline(score)}
          </span>
        </div>

        {/* Description section */}
        <div
          className={`rounded-2xl border ${accent.border} bg-white/70 backdrop-blur-sm px-6 py-5 mb-6 shadow-sm`}
        >
          <p className="text-base font-semibold text-gray-800 mb-1">
            {getSubtitle(score)}
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            {getDescription(score)}
          </p>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Suggestions
            </h2>
            <ul className="space-y-3">
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 rounded-xl border bg-white/70 backdrop-blur-sm px-4 py-3 shadow-sm ${
                    s.type === "good" ? "border-green-200" : "border-yellow-200"
                  }`}
                >
                  <img
                    src={
                      s.type === "good"
                        ? "/icons/check.svg"
                        : "/icons/warning.svg"
                    }
                    alt={s.type}
                    className="w-5 h-5 mt-0.5 flex-shrink-0"
                    onError={(e) => {
                      const el = e.currentTarget;
                      el.style.display = "none";
                      const span = document.createElement("span");
                      span.textContent = s.type === "good" ? "✓" : "⚠";
                      span.className = `text-base font-bold ${s.type === "good" ? "text-green-600" : "text-yellow-600"}`;
                      el.parentElement?.insertBefore(span, el.nextSibling);
                    }}
                  />
                  <p className="text-sm text-gray-700 leading-snug">{s.tip}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Closing line */}
        <p className={`text-center text-sm font-medium ${accent.text} mt-2`}>
          {getClosingLine(score)}
        </p>
      </div>
    </div>
  );
}
