//decalaring variables
var score = 0;
var currentQuestion = -1;
var timer = 0;
var timeDecrease;

var questions = [
  {
    question: "Which of these is NOT a CSS framework?",
    choices: ["Foundation", "Bulma", "Tachyon", "Dextro"],
    answer: "Dextro",
  },
  {
    question: "Which of these is NOT a CRUD operation?",
    choices: ["Create", "Delete", "Update", "Rewrite"],
    answer: "Rewrite",
  },
  {
    question: "What type of tag should you JavaScript link be in?",
    choices: ["meta", "JS", "script", "div"],
    answer: "script",
  },
  {
    question: "Which of these is NOT a JavaScript library?",
    choices: ["React", "Ember", "Angular", "Reactor"],
    answer: "Reactor",
  },
  {
    question: "What is a var ?",
    choices: ["an object", "a variable", "a variant", "a function"],
    answer: "a variable",
  },
  {
    question: "What command-line command should be run to instal dependencies? ",
    choices: ["npm i -g", "npm", "install", "npm i"],
    answer: "npm i",
  },
  {
    question: "What is the JS operator for increments?",
    choices: ["+", "++", "+=", "plus"],
    answer: "++",
  },
  {
    question: "What is an true/false data type?",
    choices: ["boolean", "char", "int", "float"],
    answer: "boolean",
  },
  {
    question: "What can you call a block of code written to perform a particular task?",
    choices: ["syntax", "function", "array", "method"],
    answer: "function",
  },
  {
    question: "Will You pass this Quiz?",
    choices: ["never", "maybe", "yes", "at least i tried"],
    answer: "yes",
  },
];

//Starts countdown for quiz
function begin() {
  timer = 90;
  document.getElementById("timer").innerHTML = timer;
  timeDecrease = setInterval(function () {
    timer--;
    document.getElementById("timer").innerHTML = timer;
    //End quiz if timer reaches 0
    if (timer <= 0) {
      clearInterval(timeDecrease);
      endQuiz();
    }
  }, 2000);
  nextQuestion();
}

//Stop and clear timer
function endQuiz() {
  clearInterval(timeDecrease);

  var quizContent =
    `
    <h2>Quiz over!</h2>
    <h3>Your score is  ` +
    score +
    ` /100!</h3>
    <input type="text" id="name" placeholder="Initials"> 
    <button onclick="setScore()">Set score!</button>`;
  document.getElementById("quizBody").innerHTML = quizContent;
}

//Use localStorage to store score
function setScore() {
  localStorage.setItem("highscore", score);
  localStorage.setItem("highscoreName", document.getElementById("name").value);
  getScore();
}
function getScore() {
  var quizContent =
    `
    <h2>` +
    localStorage.getItem("highscoreName") +
    ` highscore is:</h2>
    <h1>` +
    localStorage.getItem("highscore") +
    `</h1><br> 
    `;

  document.getElementById("quizBody").innerHTML = quizContent;
}

function clear() {
  localStorage.setItem("highscore", "");
  localStorage.setItem("highscoreName", "");
  reset();
}
//quiz reset
function reset() {
  clearInterval(timeDecrease);
  score = 0;
  currentQuestion = -1;
  timer = 0;
  timeDecrease = null;
  document.getElementById("timer").innerHTML = timer;

  var quizContent = `
    <h1>
       Quiz Time!
    </h1>
    <h3>
      Click to play!   
    </h3>
    <button onclick="begin()">Start!</button>`;

  document.getElementById("quizBody").innerHTML = quizContent;
}

//Gives ten points for each correct answer
function correct() {
  score += 10;
  nextQuestion();
}
//Takes seven seconds from time left for each incorrect answer
function incorrect() {
  timer -= 7;
  nextQuestion();
}
//Iterates through the questions
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion > questions.length - 1) {
    endQuiz();

    return;
  }
  var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>";
  for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
    var buttonCode = buttonCode.replace (
      "[CHOICE]",
      questions[currentQuestion].choices[buttonLoop]
    );
    if (
      questions[currentQuestion].choices[buttonLoop] ==
      questions[currentQuestion].answer
    ) {
      buttonCode = buttonCode.replace("[ANS]", "correct()");
    } else { buttonCode= buttonCode.replace("[ANS]", "incorrect()");}
    quizContent += buttonCode
  }
  document.getElementById("quizBody").innerHTML = quizContent;
}

