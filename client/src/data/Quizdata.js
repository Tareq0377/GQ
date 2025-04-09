export const personalQuestions = [
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
        "Northern Territory",
      ],
    },
  ];
  
  export const likertQuestions = [
    { id: "q1", question: "I feel confident talking about end-of-life wishes." },
    { id: "q2", question: "I have discussed my end-of-life preferences with family." },
    { id: "q3", question: "I understand options like wills, power of attorney, etc." },
    { id: "q4", question: "I’ve taken steps to prepare for end-of-life decisions." },
    // Add more up to q29
  ];
  
  export const likertOptions = [
    { text: "Strongly Agree", value: 5 },
    { text: "Agree", value: 4 },
    { text: "Neutral", value: 3 },
    { text: "Disagree", value: 2 },
    { text: "Strongly Disagree", value: 1 },
  ];
  
  export const positiveFeedbacks = [
    "Good reflection!",
    "You're thinking ahead!",
    "Keep going!",
    "Great response!",
  ];
  