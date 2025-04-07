import { useState } from "react";

const quizQuestions = [
  // Personal info questions
  { id: "name", type: "text", label: "What is your name?" },
  { id: "email", type: "email", label: "What is your email address?" },
  { id: "region", type: "text", label: "Which region or state do you live in?" },

  // Likert scale questions (examples)
  {
    id: "q1",
    type: "likert",
    question: "I feel confident talking about end-of-life wishes.",
  },
  {
    id: "q2",
    type: "likert",
    question: "I have shared my end-of-life preferences with a loved one.",
  },
  {
    id: "q3",
    type: "likert",
    question: "I am aware of legal documents like advance care directives.",
  },
];

const likertOptions = [
  "Strongly agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly disagree",
];

export default function Quiz() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});

  const current = quizQuestions[step];
  const progress = Math.round(((step + 1) / quizQuestions.length) * 100);

  const handleChange = (e) => {
    setResponses({ ...responses, [current.id]: e.target.value });
  };

  const handleNext = () => {
    if (step < quizQuestions.length - 1) {
      setStep(step + 1);
    } else {
      console.log("Quiz complete:", responses);
      // TODO: Show summary or navigate to result page
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  // 🎯 Start screen
  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Ready to begin your HELP Quiz?</h1>
          <p className="text-lg text-gray-600">
            This short quiz will take just a few minutes. It begins with some basic info, followed by a few simple questions.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="bg-indigo-600 text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Start the Quiz
          </button>
        </div>
      </div>
    );
  }

  // ✅ The main quiz screen
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question content */}
        <div className="space-y-4">
          {current.type === "text" || current.type === "email" ? (
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                {current.label}
              </label>
              <input
                type={current.type}
                name={current.id}
                value={responses[current.id] || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {current.question}
              </h2>
              <div className="space-y-2">
                {likertOptions.map((opt) => (
                  <label
                    key={opt}
                    className="block w-full cursor-pointer text-lg bg-gray-100 hover:bg-indigo-100 px-4 py-2 rounded-md border border-gray-300"
                  >
                    <input
                      type="radio"
                      name={current.id}
                      value={opt}
                      checked={responses[current.id] === opt}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between pt-4">
          <button
            onClick={handlePrev}
            disabled={step === 0}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {step === quizQuestions.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
