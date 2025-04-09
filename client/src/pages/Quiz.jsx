import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavigationButtons from "../components/NavigationButtons";
import QuestionBlock from "../components/QuestionBlock";
import ProgressBar from "../components/ProgressBar";
import {
  personalQuestions,
  likertQuestions,
  likertOptions,
  positiveFeedbacks,
} from "../data/Quizdata";

export default function QuizPage() {
  const savedProgress = localStorage.getItem("quizProgress");
  const initialProgress = savedProgress ? JSON.parse(savedProgress) : null;

  const [step, setStep] = useState(initialProgress?.step || 0);
  const [responses, setResponses] = useState(initialProgress?.responses || {});
  const [score, setScore] = useState(initialProgress?.score || 0);
  const [answeredCount, setAnsweredCount] = useState(initialProgress?.answeredCount || 0);

  const [started, setStarted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const totalQuestions = personalQuestions.length + likertQuestions.length;
  const progress = Math.round(((step + 1) / totalQuestions) * 100);
  const allQuestions = [...personalQuestions, ...likertQuestions];
  const current = allQuestions[step];

  useEffect(() => {
    const progressData = { step, responses, score, answeredCount };
    localStorage.setItem("quizProgress", JSON.stringify(progressData));
  }, [step, responses, score, answeredCount]);

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
      setShowConfirmation(true);
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  if (!started && initialProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-16">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Resume Quiz?</h1>
          <p className="text-gray-600">
            You have unsaved quiz progress. Would you like to continue where you left off?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setStarted(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Resume Quiz
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("quizProgress");
                window.location.reload();
              }}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    );
  }

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

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg text-gray-700">Submitting your quiz...</p>
        </div>
      </div>
    );
  }

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-16">
        <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">Ready to submit?</h2>
          <p className="text-gray-600">Make sure you've answered everything as best as you can.</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                localStorage.removeItem("quizProgress");
                setIsSubmitting(true);
                setTimeout(() => {
                  navigate("/result", {
                    state: { responses, score, answeredCount, totalQuestions },
                  });
                }, 1200);
              }}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            >
              Submit Quiz
            </button>
            <button
              onClick={() => setShowConfirmation(false)}
              className="bg-gray-300 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-400"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-purple-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 md:p-10 space-y-6">
        <QuestionBlock
          current={current}
          response={responses[current.id]}
          error={error}
          feedback={feedback}
          onChange={handleChange}
          likertOptions={likertOptions}
        />
        <ProgressBar progress={progress} />
        <NavigationButtons
          step={step}
          totalSteps={totalQuestions}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}
