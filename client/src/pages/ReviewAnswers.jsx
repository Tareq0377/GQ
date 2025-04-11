import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { likertOptions } from "../data/Quizdata";

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

  const getResponseText = (q) => {
    if (q.type === "text" || q.type === "email" || q.type === "select") {
      return responses[q.id] || "Not answered";
    }

    const matched = likertOptions.find((opt) => opt.value === parseInt(responses[q.id]));
    return matched?.text || "Not answered";
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4 flex flex-col items-center font-sans">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-primary-dark text-center">Review Your Answers</h1>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto px-1">
          {allQuestions.map((q, index) => (
            <div key={q.id} className="bg-gray-100 p-4 rounded-md border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Q{index + 1}: {q.label || q.question}</p>
              <div className="flex justify-between items-center">
                <span className="text-base font-medium text-gray-800">{getResponseText(q)}</span>
                <button
                  onClick={() =>
                    navigate("/quiz", {
                      state: {
                        goToStep: index,
                        resumeData: { responses, score, answeredCount },
                      },
                    })
                  }                 
                  className="text-sm text-indigo-600 hover:underline"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <button
            onClick={() =>
              navigate("/quiz", {
                state: { goToLastStep: true }
              })
            }
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
