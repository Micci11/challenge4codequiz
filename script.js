// Questions
const questions = [
    {
      question: "What does HTML stand for?",
      answers: [
        "Hyper Text Markup Language",
        "Hyperlinks and Text Markup Language",
        "Home Tool Markup Language",
        "None of the above"
      ],
      correctAnswer: "Hyper Text Markup Language"
    },
    {
      question: "What does CSS stand for?",
      answers: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets",
        "Colorful Style Sheets"
      ],
      correctAnswer: "Cascading Style Sheets"
    },
    // Add more questions here
  ];

  const startButton = document.getElementById("start-button");

startButton.addEventListener("click", function() {
  showQuestion(0);
});
  
  // Timer
  let timeLeft = 60;
  const timerEl = document.getElementById("timer");
  
  const timer = setInterval(function() {
    if (timeLeft > 0) {
      timeLeft--;
      timerEl.textContent = timeLeft.toString();
    } else {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
  
  // Event Listener
  const answerButtons = document.querySelectorAll(".answer-button");
  let currentQuestionIndex = 0;
  
  answerButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
      const selectedAnswer = event.target.dataset.answer;
      const isCorrect = event.target.dataset.correct === "true";
  
      if (isCorrect) {
        // Increment the current question index and show the next question
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
      } else {
        // Decrement the timer and show an incorrect message
        timeLeft -= 10;
        // Show the same question again
        showQuestion(currentQuestionIndex);
      }
  
      if (currentQuestionIndex === questions.length) {
        endQuiz();
      }
    });
  });
  
  // Show Question
  function showQuestion(questionIndex) {
    const questionScreen = document.getElementById("question-screen");
    const questionText = document.getElementById("question");
    const answerList = document.getElementById("answers");
  
    const question = questions[questionIndex];
    questionText.textContent = question.question;
  
    answerList.innerHTML = "";
    question.answers.forEach(function(answer) {
      const answerItem = document.createElement("li");
      const answerButton = document.createElement("button");
      answerButton.textContent = answer;
      answerButton.dataset.answer = answer;
      answerButton.dataset.correct = answer === question.correctAnswer;
      answerButton.classList.add("answer-button");
      answerItem.appendChild(answerButton);
      answerList.appendChild(answerItem);
    });
  
    // Fix syntax error by closing function call with a closing parenthesis
    questionScreen.classList.remove("hide");
  }
  
  // Define endQuiz function
  function endQuiz() {
    const endScreen = document.getElementById("end-screen");
    const score = document.getElementById("score");
    const initialsInput = document.getElementById("initials");
  
    clearInterval(timer);
  
    questionScreen.classList.add("hide");
    endScreen.classList.remove("hide");
    score.textContent = timeLeft.toString();
  }
  