const questions = [
  {
    question: "What is JavaScript used for?",
    answers: [
      { text: "A) Database management", correct: false },
      {
        text: "B) Adding interactive features to web pages",
        correct: true,
      },
      { text: "C) Graphic design", correct: false },
      { text: "D) Network security", correct: false },
    ],
  },
  {
    question: "Which one is a JavaScript loop?",
    answers: [
      { text: "A) for", correct: true },
      { text: "B) if-else", correct: false },
      { text: "C) while", correct: false },
      { text: "D) switch-case", correct: false },
    ],
  },
  {
    question: "Which keyword is used for declaring a variable in JavaScript?",
    answers: [
      { text: "C) float", correct: false },
      { text: "B) int", correct: false },
      { text: "A) var", correct: true },
      { text: "D) double", correct: false },
    ],
  },
  {
    question:
      "Which method is used to get the length of an array in JavaScript?",
    answers: [
      { text: "A) .size()", correct: false },
      { text: "B) .index()", correct: false },
      { text: "C) .count()", correct: false },
      { text: "D) .length", correct: true },
    ],
  },
  {
    question: "Which data type does not exist in JavaScript?",
    answers: [
      { text: "A) String", correct: false },
      { text: "B) Number", correct: false },
      { text: "C) Character", correct: true },
      { text: "D) Boolean", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
//* Timer'ı göstermek için bir element
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 10;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  //* Timer'ı yeniden görünür yap
  timerElement.style.display = "block";
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  //* Soru gösterildiğinde timer başlasın
  startTimer();
}
showQuestion();

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
  //* Timer'ı sıfırla
  clearInterval(timer);
  //* Timer rengi başlangıçta siyah olsun
  timerElement.style.color = "black";
  //* Zamanı sıfırla
  timeLeft = 10;
  timerElement.innerHTML = `Time left: ${timeLeft}s`;
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 3) {
      //* Son 3 saniyede kırmızı renk
      timerElement.style.color = "red";
    }
    timerElement.innerHTML = `Time left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      //* Zaman dolunca timer durdur
      clearInterval(timer);
      //* Zaman dolunca bir sonraki soruya geç
      handleNextButton();
    }
    //* Timer her 1 saniyede bir azalacak
  }, 1000);
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
  //* Cevap verildiğinde timer durdurulsun
  clearInterval(timer);
}

function showScore() {
  resetState();

  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    //* Timer'ı durdur
    clearInterval(timer);
    //* Son soruya gelindiğinde timer'ı gizle
    timerElement.style.display = "none";
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});
