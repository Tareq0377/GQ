import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReviewAnswers() {
  const { state } = useLocation();
  const { responses, score, answeredCount, totalQuestions, allQuestions } = state || {};
  const navigate = useNavigate();

  if (!responses || !allQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 font-sans">
        <p className="text-gray-600 text-center">No data to review. Please complete the quiz first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4 flex flex-col items-center font-sans">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-primary-dark text-center">Review Your Answers</h1>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          {allQuestions.map((q) => (
            <div key={q.id} className="bg-gray-100 p-4 rounded-md border border-gray-200">
              <p className="text-sm text-gray-500">{q.label || q.question}</p>
              <p className="text-base font-medium text-gray-800 mt-1">{responses[q.id] || "Not answered"}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Go Back
          </button>
          <button
            onClick={() =>
              navigate("/result", {
                state: { responses, score, answeredCount, totalQuestions },
              })
            }
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
          >
            Submit Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
