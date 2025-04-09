import React from "react";

const QuestionBlock = ({ current, response, error, feedback, onChange, likertOptions }) => {
  if (current.type === "text" || current.type === "email") {
    return (
      <div>
        <label className="block text-lg font-medium text-gray-800 mb-2">
          {current.label}
        </label>
        <input
          type={current.type}
          name={current.id}
          value={response || ""}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  if (current.type === "select") {
    return (
      <div>
        <label className="block text-lg font-medium text-gray-800 mb-2">
          {current.label}
        </label>
        <select
          name={current.id}
          value={response || ""}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Select State --</option>
          {current.options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{current.question}</h2>
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
              checked={response == opt.value}
              onChange={onChange}
            />
            <span className="text-lg">{opt.text}</span>
          </label>
        ))}
      </div>
      {feedback && <p className="text-green-500 pt-2">{feedback}</p>}
    </div>
  );
};

export default QuestionBlock;
