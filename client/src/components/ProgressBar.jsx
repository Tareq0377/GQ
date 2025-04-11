import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full mt-2">
      <div className="bg-neutral-200 rounded-full h-4">
        <div
          className="bg-primary h-4 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* Optional label */}
      <div className="text-right text-sm text-gray-600 mt-1">{progress}% complete</div>
    </div>
  );
}
