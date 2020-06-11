var timerEl = document.querySelector("#timer");
console.log(timerEl);
var startBtnEl = document.querySelector("#startBtn");
var mainContentEl = document.querySelector(".mainContent");
var questionEl;
var answersEl;

questionCount = 0;
var interval;
var countDown = 75;
var qArray = [
  {
    question: "Commonly used data types do NOT include",
    answers: ["1: Strings", "2: Booleans", "3: Alerts", "4: Numbers"],
    correctAnswer: 3,
  },
  {
    question:
      "The condition within an if/else statement is enclosed within _____.",
    answers: [
      "1. Quotes",
      "2. Curly Brackets",
      "3. Parenthesis",
      "4. Square Brackets",
    ],
    correctAnswer: 3,
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "1. Numbers and Strings",
      "2. Other Arrays",
      "3. Booleans",
      "4. All of the Above",
    ],
    correctAnswer: 4,
  },
  {
    question:
      "String values must be enclosed within __ when being assigned to variables.",
    answers: ["1. Commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctAnswer: 3,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: [
      "1. JavaScript",
      "2. terminal/ bash",
      "3. for loops",
      "4. console.log",
    ],
    correctAnswer: 4,
  },
];
var currentQIndex = 0;
console.log(qArray.length);
console.log(qArray);

function startQuiz() {
  interval = setInterval(function () {
    countDown--;
    timerEl.innerHTML = "Time: " + countDown;
    if (countDown <= 0) {
      clearInterval(interval);
    }
  }, 1000);
  renderQuestion();
}


function renderQuestion() {
  mainContentEl.innerHTML = "";
  questionEl = document.createElement("h4");
  questionEl.innerText = qArray[questionCount]["question"];
  mainContentEl.append(questionEl);
  console.log(qArray[questionCount]["question"]);
  for (var i = 0; i < qArray[questionCount]["answers"].length; i++) {
    answersEl = document.createElement("button");
    answersEl.innerText = qArray[questionCount]["answers"][i];
    answersEl.setAttribute("class", "btn-group-vertical quizBtn");
    answersEl.setAttribute("data-index", i)
    mainContentEl.appendChild(answersEl);
  }
}
function ansCheck(){
    
}
function wrongAnswer() {
    countDown = countDown - 15;
    questionCount++;
    renderQuestion()
  }
  function rightAnswer() {
      questionCount++;
      renderQuestion()
  }

startBtnEl.addEventListener("click", startQuiz);
