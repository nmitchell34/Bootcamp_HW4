var timerEl = document.querySelector("#timer");
var containerEl = document.querySelector(".container");
var startBtnEl = document.querySelector("#startBtn");
var mainContentEl = document.querySelector(".mainContent");
var answerBarEl = document.querySelector(".answerBar");
var goBackBtnEl = document.querySelector("#goBackBtn");
var clearScoresBtn = document.querySelector("#clearScores");
var viewHSBtnEl = document.querySelector("#viewHSBtn");
var scoreAppendDiv = document.querySelector("#scoresAppend");
var lastPgHead;
var scoreArr = [];
var formValue;
var divEl;
var lastPgBody;
var lastPgForm;
var lastPgFormLabel;
var lastPgFormInput;
var questionEl;
var answersEl;
var wrongLine;
var correctLine;
var lineBreak;
questionCount = 0;
var interval;
var countDown = 75;
var qArray = [
  {
    question: "Commonly used data types do NOT include",
    answers: ["1: Strings", "2: Booleans", "3: Alerts", "4: Numbers"],
    correctAnswer: 2,
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
    correctAnswer: 2,
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    answers: [
      "1. Numbers and Strings",
      "2. Other Arrays",
      "3. Booleans",
      "4. All of the Above",
    ],
    correctAnswer: 3,
  },
  {
    question:
      "String values must be enclosed within __ when being assigned to variables.",
    answers: ["1. Commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    correctAnswer: 2,
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
    correctAnswer: 3,
  },
];
var currentQIndex = 0;
console.log(qArray.length);
console.log(qArray);
// Startquiz starts the interval count down.
// Within the interval if the timer hits 0, the interval is stopped,
//  and the question counter is put to 5 which will trigger the last render.
function startQuiz() {
  interval = setInterval(function () {
    countDown--;
    timerEl.innerHTML = "Time: " + countDown;
    if (countDown <= 0) {
      clearInterval(interval);
      questionCount = 5;
      renderQuestion();
    }
  }, 1000);
  renderQuestion();
}
// This question wipes the screen and repopulates it with the next question.
function renderQuestion() {
  mainContentEl.innerHTML = "";
  // If question counter is >4, the function ends the interval and pushes the last render function.
  if (questionCount > 4) {
    clearInterval(interval);
    timerEl.innerHTML = "Time: " + countDown;
    lastRender();
  } else {
    // questionCount under 4, populates the page with the next question content.
    questionEl = document.createElement("h4");
    questionEl.innerText = qArray[questionCount]["question"];
    mainContentEl.append(questionEl);
    divEl = document.createElement("div");
    divEl.setAttribute("class", "divEl btn-group-vertical");
    console.log(qArray[questionCount]["question"]);
    for (var i = 0; i < qArray[questionCount]["answers"].length; i++) {
      answersEl = document.createElement("button");
      answersEl.innerText = qArray[questionCount]["answers"][i];
      answersEl.setAttribute("class", "btn-group-vertical quizBtn");
      // data index used later for event delegation, determining the correct answer
      answersEl.setAttribute("data-index", i);
      divEl.appendChild(answersEl);
    }
    mainContentEl.append(divEl);
  }
}
// if wrong answer is picked, 15s taken from timer, wrong! printed below questions for 1s.
function wrongAnswer() {
  answerBarEl.innerHTML = "";
  wrongLine = document.createElement("div");
  wrongLine.innerText = "Wrong!";
  wrongLine.setAttribute("class", "answerBar");
  wrongLine.setAttribute("style", "border-top: lightgray solid 1px");
  answerBarEl.append(wrongLine);
  setTimeout(function () {
    wrongLine.innerHTML = "";
    wrongLine.setAttribute("style", "border-top: none");
  }, 1000);
  countDown = countDown - 15;
  questionCount++;
  console.log(questionCount);
  renderQuestion();
}
// Function to execute when right answer is selected: correct bar flashes and it moves to next with no deduction
function rightAnswer() {
  answerBarEl.innerHTML = "";
  correctLine = document.createElement("div");
  correctLine.innerText = "Correct!";
  correctLine.setAttribute("class", "answerBar");
  correctLine.setAttribute("style", "border-top: lightgray solid 1px");
  answerBarEl.append(correctLine);
  setTimeout(function () {
    correctLine.innerHTML = "";
    correctLine.setAttribute("style", "border-top: none");
  }, 1000);
  questionCount++;
  console.log(questionCount);
  renderQuestion();
}
// This is run after quiz is done or failed. Pastes on last page of content.
function lastRender() {
  lastPgHead = document.createElement("h4");
  lastPgHead.setAttribute("class", "mainContent");
  lastPgHead.innerText = "All Done!";
  lastPgBody = document.createElement("div");
  lastPgBody.innerText = "Your final score is: " + countDown;
  lastPgBody.setAttribute("style", "font-weight: normal");
  lastPgHead.append(lastPgBody);
  lastPgForm = document.createElement("form");
  lastPgForm.setAttribute("style", "padding: 20px");
  lastPgFormLabel = document.createElement("label");
  lastPgFormLabel.innerText = "Enter Initials:";
  lastPgForm.append(lastPgFormLabel);
  lastPgFormInput = document.createElement("input");
  lastPgFormInput.setAttribute("class", "form-control");
  lastPgFormInput.setAttribute("type", "text");
  lastPgFormInput.setAttribute("pattern", "[A-Za-z]{3}");
  lastPgFormInput.setAttribute("id", "formInput");
  lastPgFormInput.setAttribute(
    "placeholder",
    "Initials Here (Letters only, 3 Characters Max)"
  );
  lastPgForm.append(lastPgFormInput);
  lastPgBody.append(lastPgForm);
  mainContentEl.append(lastPgHead);
}
// function called for the highscores page. Pastes the high scores that have been stored.
function pg2Start() {
  console.log(scoreAppendDiv);
  console.log("pg2Start called");
  if (scoreAppendDiv !== null) {
    var localArr = JSON.parse(localStorage.getItem("scoreArr"));
    scoreAppendDiv.innerHTML = "";
    for (i = 0; i < localArr.length; i += 2) {
      var scoreAppend = document.createElement("div");
      scoreAppend.setAttribute("class", "highScores");
      scoreAppend.innerText =
        i / 2 + 1 + ". " + localArr[i] + " Score " + localArr[i + 1];
      scoreAppendDiv.append(scoreAppend);
    }
  }
}
pg2Start();

if (startBtnEl !== null) {
  startBtnEl.addEventListener("click", startQuiz);
}
// Function checks if answer selected is right or wrong comparing data index with correct answer index.
mainContentEl.addEventListener("click", function (event) {
  var element = event.target;
  console.log(event.target);
  if (element.matches("button")) {
    if (element.dataset.index == qArray[questionCount]["correctAnswer"]) {
      rightAnswer();
    } else if (!element.hasAttribute("data-index")) {
    } else {
      wrongAnswer();
    }
  }
});
// Function stores new initials in local storage. switches to highscores html page.
mainContentEl.addEventListener("submit", function () {
  event.preventDefault();
  var element = event.target;
  formValue = lastPgFormInput.value;
  if (element.matches("form")) {
    if (JSON.parse(localStorage.getItem("scoreArr") == null)) {
      scoreArr = [];
    } else {
      scoreArr = JSON.parse(localStorage.getItem("scoreArr"));
    }
    console.log(scoreArr);
    console.log(formValue);
    console.log(countDown);
    scoreArr.push(formValue);
    scoreArr.push(countDown);

    localStorage.setItem("scoreArr", JSON.stringify(scoreArr));
    window.location.href = "./highscores.html";
  }
});
// cleares local storage, re-renders high scores list.
if (clearScoresBtn !== null) {
  clearScoresBtn.addEventListener("click", function () {
    localStorage.setItem("scoreArr", JSON.stringify([]));
    pg2Start();
  });
}
