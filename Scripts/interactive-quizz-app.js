const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false }
    ]
  },
  {
    question: "Which language is used for web development?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "Swift", correct: false }
    ]
  },
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "HyperText Markup Language", correct: true },
      { text: "HighText Markup Language", correct: false },
      { text: "HyperTransfer Markup Language", correct: false },
      { text: "Hyperlink Markup Language", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-button");
const scoreContainer = document.getElementById("score-container");
const scoreElement = document.getElementById("score");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.add("hide");
  scoreContainer.classList.add("hide");
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  if (correct) {
    score++;
    selectedButton.classList.add("correct");
  } else {
    selectedButton.classList.add("wrong");
  }
  Array.from(answerButtonsElement.children).forEach(button => {
    button.disabled = true;
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
  });
  nextButton.classList.remove("hide");
}

function showScore() {
  questionContainer.classList.add("hide");
  nextButton.classList.add("hide");
  scoreContainer.classList.remove("hide");
  scoreElement.innerText = `Your Score: ${score} out of ${questions.length}`;
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

startQuiz();
