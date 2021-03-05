//variable declaration
var quizTimer = 100;
var pos = 0;
var correct = 0;
var test = "";
var test_status = "";
var question = "";
var choice = "";
var choices = "";
var chA = "";
var chB = "";
var chC = "";
var chD = "";
var questions = [
  {
    question: "Which of these is NOT a CSS framework?",
    a: "Foundation",
    b: "Bulma",
    c: "Tachyon",
    d: "Dextro",
    answer: "D",
  },

  {
    question: "Which of these is NOT a CRUD operation?",
    a: "Create",
    b: "Delete",
    c: "Update",
    d: "Rewrite",
    answer: "D",
  },

  {
    question: "What type of tag should your JavaScript link be in?",
    a: "meta",
    b: "JS",
    c: "script",
    d: "div",
    answer: "C",
  },

  {
    question: "Which of these is NOT a JavaScript library?",
    a: "React",
    b: "Ember",
    c: "Angular",
    d: "Reactor",
    answer: "D",
  },

  {
    question: "What is a var?",
    a: "an object",
    b: "a variable",
    c: "a variant",
    d: "a function",
    answer: "B",
  },

  {
    question: "What is the command to run to install dependencies?",
    a: "npm",
    b: "npm -g",
    c: "npm i",
    d: "npm init",
    answer: "C",
  },
];

function get(x) {
  return document.getElementById(x);
}

//display question and choices
function displayQuestion() {
  //take the test ID and asaign it to a test variable
  test = get("test");

  //when the user position in the quiz is equal or more than the number of questions it will move to the results
  if (pos >= questions.length) {
    test.innerHTML =
      "<h2>You got " +
      correct +
      " of " +
      questions.length +
      " questions correct</h2>" +
      Math.round((100 * correct) / questions.length) +
      "%";
    get("test_status").innerHTML = "Test Completed";

    //display the hidden input form
    get("initialInput").setAttribute("style", "display: block");

    quizTimer = "";
    // Hide the timer
    get("timer").setAttribute("style", "display: none");

    //display highscore button
    get("submit-button").setAttribute("style", "display: block", "center");

    //grab highscore ID and change it to what is in localStorage
    var highscore = document.querySelector("#highscore");
    highscore.textContent =
      "Highscore: " +
      localStorage.getItem(localStorage.key(1)) +
      " by: " +
      localStorage.getItem(localStorage.key(0));

    //if localStorage is empty, display nothing
    if (localStorage.getItem(localStorage.key(1)) == null) {
      highscore.textContent = "";
    }
    return false;
  }
  

  get("test_status").innerHTML =
  question = questions[pos].question;
  chA = questions[pos].a;
  chB = questions[pos].b;
  chC = questions[pos].c;
  chD = questions[pos].d;

  test.innerHTML = "<h3>" + question + "</h3>";
  test.innerHTML +=
    "<label> <input type='radio' name='choices' value='A'> " +
    chA +
    "</label><br>";
  test.innerHTML +=
    "<label> <input type='radio' name='choices' value='B'> " +
    chB +
    "</label><br>";
  test.innerHTML +=
    "<label> <input type='radio' name='choices' value='C'> " +
    chC +
    "</label><br><br>";
  test.innerHTML +=
    "<label> <input type='radio' name='choices' value='D'> " +
    chD +
    "</label><br><br>";
  test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}

//hide the name form while quix is played
get("initialInput").setAttribute("style", "display: none");

//checkAnswer, if correct it increments the variable. When wrong the timer will take 10 sec away. Loops through the questions after answered.
function checkAnswer() {

  choices = document.getElementsByName("choices");
  for (var i = 0; i < choices.length; i++) {
    if (choices[i].checked) {
      choice = choices[i].value;
    }
  }

  if (choice == questions[pos].answer) {
    correct++;
  } else {
    quizTimer -= 10;
  }

  pos++;

  displayQuestion();
}

function start() {
  //hide the begin button when quiz starts
  get("start-button").setAttribute("style", "display: none");
  //show quiz
  get("displayQuiz").setAttribute("style", "display: block !important");
  
  setInterval(function () {
    // Once the timer reaches 0 it will notify the user
    if (quizTimer <= 0) {
      clearInterval(quizTimer);
      get("timer").innerHTML = "OUT OF TIME!";
      test.innerHTML =
        "<h2>Great, you got " +
        correct +
        " of " +
        questions.length +
        " questions correct!</h2>" +
        Math.round((100 * correct) / questions.length) +
        "%";
      get("test_status").innerHTML = "Quiz over";
      
      var highscore = document.querySelector("#highscore");
      highscore.textContent =
        "Highscore: " +
        localStorage.getItem(localStorage.key(1)) +
        " by: " +
        localStorage.getItem(localStorage.key(0));

      // if there is no value and key stored, display nothing
      if (localStorage.getItem(localStorage.key(1)) == null) {
        highscore.textContent = "";
      }
      return false;
    } else {
      //display time left
      get("timer").innerHTML = quizTimer;
    }
    quizTimer -= 1;
  }, 1000);
  displayQuestion();
}
//hide the submit button until needed
get("submit-button").setAttribute("style", "display: none");


function submitButton() {
  // variables to store the IDs
  var userSubmit = document.getElementById("initialInput").value;
  var highscore = document.querySelector("#highscore");

  //set highscore to localStorage
  var hsStore = localStorage.getItem(localStorage.key(1));

  //if the current user gets a higher score thn the current score stored replace with higher score.
  if (correct > hsStore) {
    localStorage.setItem("Highscore: ", correct);
    localStorage.setItem("Player: ", userSubmit);
    highscore.textContent = "Highscore: " + correct + " by: " + userSubmit;
  }
}

get("submit-button").addEventListener("click", submitButton);
get("start-button").addEventListener("click", start);
