import React from "react";

export default function NavigationButtons({ step, totalQuestions, onNext, onPrev }) {
  return (
    <div className="flex justify-between pt-6">
      <button
        onClick={onPrev}
        disabled={step === 0}
        className="px-5 py-2.5 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        Previous
      </button>

      <button
        onClick={onNext}
        className="px-6 py-2.5 rounded-lg bg-primary text-white hover:bg-primary-dark transition font-semibold"
      >
        {step === totalQuestions - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}
