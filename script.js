// Questions
var questions = [
  {
    question: "Commonly used data types DO Not Include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  {
    question: "The condition in an if / else statement is enclosed with ___",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: "parenthesis",
  },
  {
    question: "Arrays in Javascript can be used to store _____",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correctAnswer: "All of the above",
  },
  {
    question:
      "String values must be enclosed within ___ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log",
  },

  // Add more questions here
];


let highScoresArray = JSON.parse(localStorage.getItem("highScores")) || []

//

var startButton = document.getElementById("start-button");
let timeLeft = 60;
let currentQuestionIndex = 0;

startButton.addEventListener("click", function () {
  document.getElementById("start-screen").classList.add("hide");
  showQuestion(0);
  startTimer();
});


// Timer
function startTimer() {
  var timerEl = document.getElementById("timer");

  var timer = setInterval(function () {
    timeLeft--;
    timerEl.textContent = timeLeft.toString();

    if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}
// Show Question
function showQuestion(questionIndex) {
  var questionScreen = document.getElementById("question-screen");
  var questionText = document.getElementById("question");
  var answerList = document.getElementById("answers");
  var questionNum = questionIndex + 1; // add this line to get the current question number

  var question = questions[questionIndex];
  questionText.textContent = question.question;

  answerList.innerHTML = "";
  question.answers.forEach(function (answer) {
    var answerItem = document.createElement("li");
    var answerButton = document.createElement("button");
    answerButton.textContent = answer;
    answerButton.dataset.answer = answer;
    answerButton.dataset.correct = answer === question.correctAnswer;
    answerButton.classList.add("answer-button");
    answerButton.addEventListener("click", checkAnswer);
    answerItem.appendChild(answerButton);
    answerList.appendChild(answerItem);
  });

  // update the question number in the question screen
  document.querySelector("#question-screen h2").textContent =
    "Question " + questionNum + " of 5";

  questionScreen.classList.remove("hide");
}




var highScore = 0;

function checkAnswer(e) {
  console.log(e.target.textContent);

  if (e.target.textContent == questions[currentQuestionIndex].correctAnswer) {
    console.log("correct");
    highScore = highScore + 10;
  } else {
    console.log("incorrect");
    timeLeft -= 7;
  }
  console.log(highScore);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}


function endQuiz() {
  var endScreen = document.getElementById("end-screen");
  var questionScreen = document.getElementById("question-screen");
  var score = document.getElementById("score");

  clearInterval(timer);

  questionScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  score.textContent = timeLeft.toString();
}


document.getElementById("submit-score").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  var endScreen = document.getElementById("end-screen");
  var highScores = document.getElementById("high-scores");
  var initialsInput = document.getElementById("initials");
  var highScoreDisplay = document.getElementById("high-score-display");

  let highScoreInstance = {
    name: initialsInput.value,
    score: timeLeft.toString()
  }

  highScoresArray.push(highScoreInstance)

  // Save the high score
    localStorage.setItem("highScores", JSON.stringify(highScoresArray));

let table = document.createElement("table");
let tBody = document.createElement("tbody")
let headerRow = document.createElement("tr");
let nameHeader = document.createElement("th");
let scoreHeader = document.createElement("th");
nameHeader.textContent = "Name";
scoreHeader.textContent = "Score";

table.appendChild(tBody);
tBody.appendChild(headerRow);
headerRow.appendChild(nameHeader);
headerRow.appendChild(scoreHeader);


for(i=0;i<highScoresArray.length;i++){
  let row = document.createElement("tr");
  let nameField = document.createElement("td");
  nameField.textContent = highScoresArray[i].name;
  let scoreField = document.createElement("td");
  scoreField.textContent=highScoresArray[i].score;
  row.appendChild(nameField);
  row.appendChild(scoreField);
  tBody.appendChild(row)
}

if(document.getElementById("highScoresTable").classList.contains("hide")){
  document.getElementById("highScoresTable").classList.remove("hide")
}

document.getElementById("highScoresTable").appendChild(table);

  // highScoreDisplay.textContent = localStorage.getItem("initials") + ": " + localStorage.getItem("highScore");

  // endScreen.classList.add("hide");
  // highScores.classList.remove("hide");
});




function goBack() {
  var endScreen = document.getElementById("end-screen");
  var startScreen = document.getElementById("start-screen");

  endScreen.classList.add("hide");
  startScreen.classList.remove("hide");

  timeLeft = 60;
  currentQuestionIndex = 0;
}

function clearHighScores() {
  localStorage.removeItem("highScores");
  document.getElementById("high-score-display").textContent = "0";

  if(!document.getElementById("highScoresTable").classList.contains("hide")){
    document.getElementById("highScoresTable").classList.add("hide")
  }
}

// Add event listeners for the new buttons
document.getElementById("go-back").addEventListener("click", goBack);
document
  .getElementById("clear-high-scores")
  .addEventListener("click", clearHighScores);


  window.onload = function () {
    var goBackButton = document.getElementById("go-back");
    var clearHighScoresButton = document.getElementById("clear-high-scores");
  
    if (goBackButton && clearHighScoresButton) {
      goBackButton.addEventListener("click", goBack);
      clearHighScoresButton.addEventListener("click", clearHighScores);
    }
  };