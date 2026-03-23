// ============== QUIZ QUESTIONS ==================
const questions = [
  {
    question: "What is entrepreneurship?",
    answers: [
      { text: "Managing government organizations", correct: false },
      { text: "A type of investment strategy", correct: false },
      { text: "Working only in IT companies", correct: false },
      {
        text: "Creating and running new businesses while taking risks",
        correct: true,
      },
    ],
  },
  {
    question: "An entrepreneur is someone who:",
    answers: [
      { text: "Avoids risks", correct: false },
      { text: "Waits for instructions", correct: false },
      { text: "Identifies opportunities and creates value", correct: true },
      { text: "Works only for profit", correct: false },
    ],
  },
  {
    question: "Innovation in IT mainly involves:",
    answers: [
      { text: "Copying existing products", correct: false },
      {
        text: "Using technology to create new or improved solutions",
        correct: true,
      },
      { text: "Reducing employee numbers", correct: false },
      { text: "Selling hardware only", correct: false },
    ],
  },
  {
    question: "Which of the following best describes innovation?",
    answers: [
      { text: "Discovering a new idea only", correct: false },
      { text: "Applying ideas to create value", correct: true },
      { text: "Writing computer code", correct: false },
      { text: "Making profit without change", correct: false },
    ],
  },
  {
    question: "What distinguishes innovation from invention?",
    answers: [
      { text: "Innovation is theoretical", correct: false },
      { text: "Invention is cheaper", correct: false },
      { text: "Innovation focuses on market application", correct: true },
      { text: "They mean the same thing", correct: false },
    ],
  },
  {
    question: "Which skill is most important for IT entrepreneurs?",
    answers: [
      { text: "Memorization", correct: false },
      { text: "Creativity and problem-solving", correct: true },
      { text: "Physical strength", correct: false },
      { text: "Typing speed", correct: false },
    ],
  },
  {
    question: "A startup is best described as:",
    answers: [
      { text: "A large established company", correct: false },
      {
        text: "A temporary organization searching for a scalable model",
        correct: true,
      },
      { text: "A government-owned firm", correct: false },
      { text: "A non-profit organization", correct: false },
    ],
  },
  {
    question: "Risk-taking in entrepreneurship means:",
    answers: [
      { text: "Acting without planning", correct: false },
      { text: "Making decisions under uncertainty", correct: true },
      { text: "Avoiding challenges", correct: false },
      { text: "Ignoring market needs", correct: false },
    ],
  },
  {
    question: "Which technology has most enabled global startups?",
    answers: [
      { text: "Typewriters", correct: false },
      { text: "Fax machines", correct: false },
      { text: "Cloud computing", correct: true },
      { text: "Landline phones", correct: false },
    ],
  },
  {
    question: "What is a key role of IT innovation in business?",
    answers: [
      { text: "Increasing paperwork", correct: false },
      { text: "Creating competitive advantage", correct: true },
      { text: "Eliminating customers", correct: false },
      { text: "Slowing business processes", correct: false },
    ],
  },
];

// ================== GET HTML ELEMENTS ==================

// Get the <h2> that displays the question text
// We use its ID "questions" from HTML
const questionElement = document.getElementById("questions");

// Get the div that will hold all the answer buttons
// ID in HTML must be "answer-button"
const answerButton = document.getElementById("answer-button");

// Get the Next button at the bottom
const nextButton = document.getElementById("next-btn");

// ================== QUIZ DATA TRACKING VARIABLES ==================

// This keeps track of which question number we are currently on
// Example: 0 = first question, 1 = second question...
let currentQuestionIndex = 0;

// This stores the total number of correct answers the user gets
let score = 0;

// ================== START QUIZ FUNCTION ==================
// This function runs when the quiz begins or restarts
function startQuiz() {
  currentQuestionIndex = 0; // Start from first question
  score = 0; // Reset score back to 0
  nextButton.innerHTML = "Next"; // Make sure button text is "Next"
  showQuestion(); // Display the first question on screen
}

// ================== DISPLAY QUESTION FUNCTION ==================
function showQuestion() {
  // First remove previous answers and hide Next button
  resetState();

  // Get the question object from the array using current index
  let currentQuestion = questions[currentQuestionIndex];

  // Question number for display (1 instead of 0 index)
  let questionNo = currentQuestionIndex + 1;

  // Display "1. Question text here"
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Loop through each answer in the current question
  currentQuestion.answers.forEach((answers) => {
    // Create a new <button> element for each answer
    const button = document.createElement("button");

    // Put the text of the answer on the button
    button.innerHTML = answers.text;

    // Add CSS class to style the button
    button.classList.add("btn");

    // Add button to the HTML answer area
    answerButton.appendChild(button);

    // If the answer is correct, mark it secretly using dataset
    // This helps check later if user clicked correct answer
    if (answers.correct) {
      button.dataset.correct = answers.correct;
    }

    // Add click event so when user clicks this button,
    // it will run selectAnswer() function
    button.addEventListener("click", selectAnswer);
  });
}

// ================== RESET BEFORE SHOWING NEW QUESTION ==================
function resetState() {
  // Hide next button until user selects an answer
  nextButton.style.display = "none";

  // Remove all previous answer buttons from screen
  // This prevents stacking buttons endlessly
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

// ================== FUNCTION WHEN USER SELECTS AN ANSWER ==================
function selectAnswer(e) {
  // e.target means the exact button that was clicked
  const selectedBtn = e.target;

  // Check if this button contains correct="true"
  const iscorrect = selectedBtn.dataset.correct === "true";

  // If the answer is correct
  if (iscorrect) {
    selectedBtn.classList.add("correct"); // turn green
    score++; // increase score
  } else {
    selectedBtn.classList.add("incorrect"); // turn red
  }

  // Show the real correct answer to help learning
  Array.from(answerButton.children).forEach((button) => {
    // If this button is correct, make it green
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }

    // Disable all buttons so user can't click again
    button.disabled = true;
  });

  // Show next button so user can continue
  nextButton.style.display = "block";
}

// ================== SHOW FINAL SCORE ==================
function showScore() {
  // Clear previous buttons and UI
  resetState();

  // Display final message and score
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

  // Change button text to Play Again
  nextButton.innerHTML = "Play Again";

  // Show button so user can restart quiz
  nextButton.style.display = "block";
}

// ================== HANDLE NEXT BUTTON ==================
function handleNextButton() {
  // Move to next question index number
  currentQuestionIndex++;

  // If there are still more questions, show next one
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    // If no questions left → show final score
    showScore();
  }
}

// ================== WHEN NEXT BUTTON IS CLICKED ==================
nextButton.addEventListener("click", () => {
  // If still within question range → go next
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    // If quiz finished → restart quiz
    startQuiz();
  }
});

// ================== START QUIZ AUTOMATICALLY ==================
startQuiz();
// As soon as page loads, quiz begins the startQuiz() function is called to initialize the quiz.
