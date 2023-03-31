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
    answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    correctAnswer: "All of the above",
  },
  {
    question: "String values must be enclosed within ___ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    correctAnswer: "console.log",
  }

  // Add more questions here
];

//

var startButton = document.getElementById("start-button");
let timeLeft = 60;
let currentQuestionIndex = 0;

startButton.addEventListener("click", function () {
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
// Event Listener
// var answerButtons = document.querySelectorAll(".answer-button");

// answerButtons.forEach(function(button) {
//   button.addEventListener("click", function(event) {
//     var selectedAnswer = event.target.dataset.answer;
//     var isCorrect = event.target.dataset.correct === "true";

//     if (isCorrect) {
//       // Increment the current question index and show the next question
//       currentQuestionIndex++;
//       showQuestion(currentQuestionIndex);
//     } else {
//       // Decrement the timer and show an incorrect message
//       timeLeft -= 10;
//       // Show the same question again
//       showQuestion(currentQuestionIndex);
//     }

//     if (currentQuestionIndex === questions.length) {
//       endQuiz();
//     }
//   });
// });

// Show Question
function showQuestion(questionIndex) {
  var questionScreen = document.getElementById("question-screen");
  var questionText = document.getElementById("question");
  var answerList = document.getElementById("answers");

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

  //
  questionScreen.classList.remove("hide");
}
var highScore = 0;

function checkAnswer(e) {
  console.log(e.target.textContent);
  //once clicked
  //  if whatever is clicked is equal to the correctAnswer for this question
  //    then I would increase score
  //  else if it's incorrect
  //    I want to decrease the time that the user has left
  //
  //  I want to increase to the next question after checking correct/incorrect

  // highScore = 0;

  if (e.target.textContent == questions[currentQuestionIndex].correctAnswer) {
    console.log("correct");
    highScore = highScore + 10;
  } else {
    console.log("incorrect");
    timeLeft -= 7
  }
  console.log(highScore);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

// Defining endQuiz function
function endQuiz() {
  console.log("string" + highScore);
  var endScreen = document.getElementById("end-screen");
  var questionScreen = document.getElementById("question-screen");
  var score = document.getElementById("score");
  var initialsInput = document.getElementById("initials");

  clearInterval(timer);

  questionScreen.classList.add("hide");
  endScreen.classList.remove("hide");
  score.textContent = timeLeft.toString();
}
function viewHS() {
  var highScoreScreen = document.getElementById("high-score");
  var endScreen = document.getElementById("end-screen");
  endScreen.classList.add("hide");
  highScoreScreen.classList.remove("hide");
}