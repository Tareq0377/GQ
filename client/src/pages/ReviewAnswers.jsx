import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ReviewAnswers() {
  const { state } = useLocation();
  const { responses, score, answeredCount, totalQuestions, allQuestions } = state || {};
  const navigate = useNavigate();

  if (!responses || !allQuestions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">No data to review. Please complete the quiz first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Review Your Answers</h1>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {allQuestions.map((q) => (
            <div key={q.id} className="bg-gray-100 p-4 rounded-md">
              <p className="text-sm text-gray-500">{q.label || q.question}</p>
              <p className="text-base font-semibold text-gray-800">{responses[q.id] || "Not answered"}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
          >
            Go Back
          </button>
          <button
            onClick={() =>
              navigate("/result", {
                state: { responses, score, answeredCount, totalQuestions },
              })
            }
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
