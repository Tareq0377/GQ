import { useState } from "react";
import { useNavigate } from "react-router-dom";

const personalQuestions = [
  { id: "name", type: "text", label: "What is your name?" },
  { id: "email", type: "email", label: "What is your email address?" },
  {
    id: "region",
    type: "select",
    label: "Which region/state do you live in?",
    options: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
      "South Australia",
      "Tasmania",
      "Australian Capital Territory",
      "Northern Territory"
    ]
  }
];

const likertQuestions = [
  { id: "q1", question: "I feel confident talking about end-of-life wishes." },
  { id: "q2", question: "I have discussed my end-of-life preferences with family." },
  { id: "q3", question: "I understand options like wills, power of attorney, etc." },
  { id: "q4", question: "I’ve taken steps to prepare for end-of-life decisions." },
];

const likertOptions = [
  { text: "Strongly Agree", value: 5 },
  { text: "Agree", value: 4 },
  { text: "Neutral", value: 3 },
  { text: "Disagree", value: 2 },
  { text: "Strongly Disagree", value: 1 },
];

const positiveFeedbacks = [
  "Good reflection!",
  "You're thinking ahead!",
  "Keep going!",
  "Great response!",
];

export default function QuizPage() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const navigate = useNavigate();

  const totalQuestions = personalQuestions.length + likertQuestions.length;
  const progress = Math.round(((step + 1) / totalQuestions) * 100);

  const allQuestions = [...personalQuestions, ...likertQuestions];
  const current = allQuestions[step];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses((prev) => ({ ...prev, [name]: value }));
    setError("");

    if (step >= personalQuestions.length) {
      const val = parseInt(value);
      if (!isNaN(val) && !responses[`scored_${name}`]) {
        setScore((prev) => prev + val);
        setAnsweredCount((prev) => prev + 1);
        setResponses((prev) => ({ ...prev, [`scored_${name}`]: true }));
        const msg = positiveFeedbacks[Math.floor(Math.random() * positiveFeedbacks.length)];
        setFeedback(msg);
        setTimeout(() => setFeedback(""), 1500);
      }
    }
  };

  const handleNext = () => {
    if (step < personalQuestions.length) {
      if (!responses[current.id]) {
        setError("This field is required.");
        return;
      }
      if (current.id === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(responses[current.id])) {
          setError("Please enter a valid email address.");
          return;
        }
      }
    }

    if (step + 1 < totalQuestions) {
      setStep(step + 1);
    } else {
      navigate("/result", {
        state: {
          responses,
          score,
          answeredCount,
          totalQuestions,
        },
      });
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-16">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Ready to begin your HELP Quiz?</h1>
          <p className="text-lg text-gray-600">
            This quiz includes basic questions and a series of simple statements.
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-6">
        <div>
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
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          ) : current.type === "select" ? (
            <div>
              <label className="block text-lg font-medium text-gray-800 mb-2">
                {current.label}
              </label>
              <select
                name={current.id}
                value={responses[current.id] || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">-- Select State --</option>
                {current.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {current.question}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {likertOptions.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center space-x-2 bg-gray-100 hover:bg-indigo-100 px-4 py-2 rounded-md border border-gray-300 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={current.id}
                      value={opt.value}
                      checked={responses[current.id] == opt.value}
                      onChange={handleChange}
                      className=""
                    />
                    <span className="text-lg">{opt.text}</span>
                  </label>
                ))}
              </div>
              {feedback && <p className="text-green-500 pt-2">{feedback}</p>}
            </div>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
          <div
            className="bg-indigo-600 h-3 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
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
            {step === totalQuestions - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
