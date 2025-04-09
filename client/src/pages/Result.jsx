import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";

export default function Result() {
  const { state } = useLocation();
  const { responses, score, answeredCount, totalQuestions } = state || {};

  // Guard: Prevent crash if accessed directly
  if (!responses) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-center px-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-red-600">Oops! 😬</h2>
          <p className="text-gray-700 mt-2">
            No quiz data found. Please complete the quiz first.
          </p>
        </div>
      </div>
    );
  }

  const average = answeredCount ? ((score / answeredCount) * 2).toFixed(2) : 0;

  const getOverallFeedback = (avg) => {
    if (avg >= 9) return "Excellent death literacy. You're well-prepared and informed.";
    if (avg >= 7) return "Good awareness. You have a solid understanding.";
    if (avg >= 5) return "Moderate awareness. There’s room to improve.";
    return "Limited awareness. Consider learning more about end-of-life planning.";
  };

  const overallFeedback = getOverallFeedback(average);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("HELP Quiz Report", 20, 20);
    doc.setFontSize(12);
    doc.text(`Name: ${responses.name || "User"}`, 20, 40);
    doc.text(`Email: ${responses.email || "Not provided"}`, 20, 50);
    doc.text(`Region: ${responses.region || "Not specified"}`, 20, 60);
    doc.text(`Score: ${score} / ${answeredCount * 5}`, 20, 80);
    doc.text(`Average Score: ${average} / 10`, 20, 90);
    doc.text(`Feedback: ${overallFeedback}`, 20, 110);
    doc.save("HELP_Quiz_Report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Results 📝</h1>

        <div className="mb-6">
          <p className="text-lg text-gray-700">
            <strong>Name:</strong> {responses.name || "User"}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Email:</strong> {responses.email || "Not provided"}
          </p>
          <p className="text-lg text-gray-700">
            <strong>Region:</strong> {responses.region || "Not specified"}
          </p>
        </div>

        <div className="text-xl font-semibold text-indigo-600 mb-2">
          Score: {score} / {answeredCount * 5}
        </div>
        <div className="text-lg text-gray-800 mb-6">
          Average Score: {average} / 10
        </div>

        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 text-gray-800 text-base rounded">
          <strong>Feedback:</strong> {overallFeedback}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleDownloadPDF}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition font-medium"
          >
            Download Report (PDF)
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Want to revisit your answers or learn more? Stay tuned for your full report.
          </p>
        </div>
      </div>
    </div>
  );
}
