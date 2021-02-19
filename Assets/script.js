//decalaring variables
var score = 0;
var currentQuestion = -1;
var timer = 0;
var timeDecrease;

var questions = [{
    question:"",
    choices:["", "", "", ""],
    answer:"",
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
{
    question:"",
    choices:["", "", "", ""],
    answer:"",  
},
]

//Starts countdown for quiz
function start() {
    timer = 90;
    document.getElementById("timer").innerHTML = timer;
    timeDecrease = setInterval(function(){
        timer--;
        document.getElementById("timer").innerHTML = timer;
        //End quiz if timer reaches 0
        if (timer <= 0) {
            clearInterval(timeDecrease);
            endQuiz();
        }
    }, 1000);
    next();
   
}

//Stop and clear timer 
function endQuiz() {
    clearInterval(timeDecrease);
    
    var quiz = `
    <h2>Game over!</h2>
    <h3>You got a ` + score +  ` /100!</h3>
    <h3>That means you got ` + score / 10 +  ` questions correct!</h3>
    <input type="text" id="name" placeholder="First name"> 
    <button onclick="setScore()">Set score!</button>`;
    
    document.getElementById("quizBody").innerHTML = quiz;
    }