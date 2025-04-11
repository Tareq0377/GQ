import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const reviewStep = location.state?.goToStep;
  const resumeData = location.state?.resumeData;
  const savedProgress = localStorage.getItem("quizProgress");
  const initialProgress = resumeData || (savedProgress ? JSON.parse(savedProgress) : null);
  

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

  useEffect(() => {
    if (reviewStep !== undefined && !started) {
      setStarted(true);
      setStep(reviewStep);
      // Optional: clear the history state
      window.history.replaceState(null, "");
    }
  }, [reviewStep]);

  const totalQuestions = personalQuestions.length + likertQuestions.length;
  const allQuestions = [...personalQuestions, ...likertQuestions];
  const current = allQuestions[step];
  const progress = Math.round(((step + 1) / totalQuestions) * 100);

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
      localStorage.removeItem("quizProgress");
      navigate("/review", {
        state: {
          responses,
          score,
          answeredCount,
          totalQuestions,
          allQuestions,
        },
      });
    }
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleReset = () => {
    localStorage.removeItem("quizProgress");
    setStarted(false);
    setStep(0);
    setResponses({});
    setScore(0);
    setAnsweredCount(0);
    setFeedback("");
    setError("");
    setShowConfirmation(false);
    setIsSubmitting(false);
  };

  if (!started && initialProgress) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-16">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Resume Quiz?</h1>
          <p className="text-gray-600">You have unsaved quiz progress. Continue where you left off?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setStarted(true)}
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition"
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
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-16">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-8 text-center space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">Ready to begin your HELP Quiz?</h1>
          <p className="text-lg text-gray-600">This quiz includes basic questions and a series of simple statements.</p>
          <button
            onClick={() => setStarted(true)}
            className="bg-primary text-white text-lg font-semibold px-6 py-3 rounded-md hover:bg-primary-dark transition"
          >
            Start the Quiz
          </button>
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-lg text-gray-700">Submitting your quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg p-8 md:p-10 grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-8">
        
        {/* Left Column - Main Quiz Content */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600 font-medium">
              Question {step + 1} of {totalQuestions}
            </div>
            <button
              onClick={handleReset}
              className="text-sm text-red-500 hover:underline hover:text-red-700"
            >
              Reset Quiz
            </button>
          </div>
  
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
  
        {/* Right Column - Tracker */}
        <div className="hidden md:block">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Answered Tracker</h3>
          <div className="grid grid-cols-5 gap-2">
          {allQuestions.map((q, idx) => {
            const answered = responses[q.id];
            const allAnswered = allQuestions.every((question) => responses[question.id]);

            const isClickable = allAnswered; // Change this logic if you want stricter rules

            return (
              <button
                key={q.id}
                onClick={() => isClickable && setStep(idx)}
                disabled={!isClickable}
                className={`h-8 w-8 rounded-full text-xs flex items-center justify-center font-bold transition
                  ${answered ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}
                  ${isClickable ? "hover:scale-105 cursor-pointer" : "opacity-50 cursor-not-allowed"}`}
                title={
                  isClickable
                    ? `Go to Question ${idx + 1}`
                    : `Complete all questions to navigate`
                }
              >
                {idx + 1}
              </button>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );  
}
