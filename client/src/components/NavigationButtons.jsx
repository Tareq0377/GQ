import React from "react";

export default function NavigationButtons({ step, totalQuestions, onNext, onPrev }) {
  return (
    <div className="flex justify-between pt-4">
      <button
        onClick={onPrev}
        disabled={step === 0}
        className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
      >
        {step === totalQuestions - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}
