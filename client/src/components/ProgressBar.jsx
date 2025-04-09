import React from "react";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
      <div
        className="bg-indigo-600 h-3 rounded-full transition-all"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
