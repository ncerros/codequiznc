// Declaring variables
var startQuizDiv = document.getElementById("launchpage");
var quizBody = document.getElementById("quiz");
var quizTimer = document.getElementById("timer");
var questionsEl = document.getElementById("questions");
var resultEl = document.getElementById("quizresult");
var gameoverDiv = document.getElementById("gameover");
var highscoreInputInitials = document.getElementById("initials");
var finalScoreEl = document.getElementById("finalScore");
var startQuizButton = document.getElementById("startbtn");
var submitScoreBtn = document.getElementById("scores");
var highscoreContainer = document.getElementById("highscoreContainer");
var highscoreDiv = document.getElementById("topScoreResult");
var highscoreShowInitials = document.getElementById("highScoreinitials");
var highscoreShowScore = document.getElementById("highscore");
var endGameBtn = document.getElementById("thisIsTheEnd");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

// Different Code Quiz Questions
var quizMeQuestion = [{
    Question: "What document.getElementById is use for?",
    answerA: "To delete a file",
    answerB: "To match an id property with specific string",
    answerC: "To undefine an element",
    answerD: "To create a function",
    correct: "b"
},
{
    Question: "which is a property of Javascript?",
    answerA: "Local Storage",
    answerB: "HtmL",
    answerC: "CSS",
    answerD: "DOM",
    correct: "a"
},
{
    Question: "How does a HTML document start?",
    answerA: "class= col-3",
    answerB: "With css",
    answerC: "<!DOCTYPE html>",
    answerD: "<!script>",
    correct: "c"
},
{
    Question: "What does CSS mean",
    answerA: "Computer sour syndrome",
    answerB: " Captus Sandy Sunday",
    answerC: "Cat Super Soil",
    answerD: "Cascading Style Sheets",
    correct: "d"
},
{
    Question: "What is For Loop use for?",
    answerA: "To style a specific element in CSS",
    answerB: "To create a specific HTML",
    answerC: "To reapeat a specific block of code",
    answerD: "To create a file in the local storage",
    correct: "c"
},
{
    Question: "A boolean is always?",
    answerA: "A number",
    answerB: "True or false", 
    answerC: "Null",
    answerD: "Undefined",
    correct: "b"
},
];

// variables
var finalQuestion = quizMeQuestion.length;
var actualQuestion = 0;
var timeLeft = 90;
var timeInterval;
var score = 0;
var correct;

// Declaring function to obtain an output
function generateQuizMeQuestions(){
    gameoverDiv.style.display = "none";
    if (actualQuestion === finalQuestion){
        return showScore();
    }
   var actualQuestion = quizMeQuestion[actualQuestion];
   questionsEl.innerHTML = "<p>" + actualQuestion.question + "<p>";
   buttonA.innerHTML = actualQuestion.answerA;
   buttonB.innerHTML = actualQuestion.answerB;
   buttonC.innerHTML = actualQuestion.answerC;
   buttonD.innerHTML = actualQuestion.answerD;
};

// This is the function to start the quiz
function startQuiz(){
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    generateQuizMeQuestion();

    // Time state
    timerInterval = setInterval(function() {
        timeLeft --;
        quizTimer.textContent = "Time left: " + timeLeft;
        if(timeLeft === 0) {
          clearInterval(timeInterval);
          showScore();
        }
    }, 1000);
    quizBody.style.display = "block";
}

//  Will display the final score
function showScore() {
    quizBody.style.display = "nome";
    gameoverDiv.style.display = "flex";
    clearInterval(timerInterval);
    highscoreInputInitials.value = "";
    finalScoreEl.innerHTML = "you had " + score + "from" + quizMeQuestion.length + " correct";
}

// This function will run highscore that is in the local storage
submitScoreBtn.addEventListener("click", function highscore(){
    
    if(highscoreInputInitials.value === "") {
        alert("Must type your initials");
        return false;
    }else{
        var savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
        var actualUser = highscoreInputInitials.value.trim();
        var actualHighscore = {
            name : actualUser,
            score : score 
        };
        gameoverDiv.style.display = "none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGameBtn.style.display = "flex";

        savedHighscore.push(actualHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

// The local storage will be clean to get a new score
function generateHighscores(){
    highscoreShowInitials.innerHTML = "";
    highscoreShowScore.innerHTML = "";
    var highscores = JSON.parse(locarStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highScores.length; i++){
        var createNameSpan = document.createElement("li");
        var createScoreSpan = document.createElement("li");
        createNameSpan.textContent = highscores[i].name;
        createScoreSpan.textContent = highscores[i].score;
        highscoreShowInitials.appendChild(createNameSpan);
        highscoreShowScore.appendChild(createScoreSpan);
    }
}

// New score will be displayed
function displayHighScore() { 
    startQuizDiv.style.display = "none";
    gameoverDiv.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGameBtn.style.display = "flex";
    generateHighscores();

}
// The local storage will be clean to get a new score
function clearScore(){
    window.localStorage.clear();
    highscoreShowInitials.textContent = "";
    highscoreShowScore.textContent = "";
}

function playAgain() {
    highscoreContainer.style.display = "none";
    gameoverDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    timeLeft = 90;
    score = 0;
    actualQuestion = 0;
}

// It will self check 
function verifyAnswer(answer){
    correct = quizMeQuestion[actualQuestion].correct;
    if (answer ===correct && actualQuestion !== finalQuestion){
        score++;
        alert("Correct answer");
        actualQuestion++;
        generateQuizMeQuestion();
    // Will show the answer is incorrect
    }else if (answer !== correct && actualQuestion !== finalQuestion){
        alert("Incorrect answer");
        actualQuestion++;
        generateQuizMeQuestion();
    }else{
        showScore();
    }
} 

    // Click to begin the quiz
    startQuizButton.addEventListener("click", startQuiz);
