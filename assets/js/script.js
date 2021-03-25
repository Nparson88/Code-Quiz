// declared variables from html
var timerEl = document.getElementById("displayTime");
var quizStartEl = document.getElementById("quizStart");
var questionsEl = document.getElementById("questions");
var containerEl = document.getElementById("container");
//variables for functions
var score = 0;
var questionIndex = 0;
var timeLeft = 76;
var timeInterval = 0;
var deduction = 10;
var ulEl = document.createElement("ul");
//array of questions to be asked 
var quizQuestions = [
    {
        prompt: ("The condition in an if / else statement is enclosed within..."),
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        true: ("parentheses")
    },
    {
        prompt: ("Commonly used data types DO NOT include which of the following"),
        choices: ["strings", "booleans", "alerts", "numbers"],
        true: ("alerts")
    },
    {
        prompt: ("Arrays in Javascript can be used to store..."),
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        true: ("all of the above")
    },
    {
        prompt: ("A very useful tool for used during development and debugging for printing content to the debugger is:"),
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        true: ("console log")
    },
    {
        prompt: ("String values must be enclosed within what when being assigned to variables."),
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        true: ("quotes")
    },
];
// event listener to check for start button
quizStartEl.addEventListener("click", function () {
    // if statement to start the quiz and countdown the timer 
    if (timeInterval === 0) {
        timeInterval = setInterval(function () {
            timeLeft--;
            timerEl.textContent = "Time: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(timeInterval);
                quizEnd();
                currentTime.textContent = "Out of time";
            }
        }, 1000);
    }
    render(questionIndex);
});
// function to render the first question 
function render(questionIndex) {
    ulEl.innerHTML = ""; questionsEl.innerHTML = "";

    for (var i = 0; i < quizQuestions.length; i++) {

        var chosenQuestion = quizQuestions[questionIndex].prompt;
        var answerChoices = quizQuestions[questionIndex].choices;
        questionsEl.textContent = chosenQuestion;
    }
    //function that displays the answers given
    answerChoices.forEach(function (newItem) {

        var newList = document.createElement("li");
        newList.textContent = newItem;
        questionsEl.appendChild(ulEl);
        ulEl.appendChild(newList);
        newList.addEventListener("click", (compare));
    })
}
// compares to see if the question was answered correctly or not 
function compare(event) {
    var element = event.target;
    if (element.matches("li")) {
        var newDiv = document.createElement("div");
        newDiv.setAttribute("id", "newDiv");
        if (element.textContent === quizQuestions[questionIndex].true) {
            score++;
            newDiv.textContent = "Correct!";
        } else {
            timeLeft = timeLeft - deduction;
            newDiv.textContent = "Incorrect, The correct answer is:  " + quizQuestions[questionIndex].true;
        }

    }
    // when the quiz in over the score will be tallied 
    questionIndex++;
    if (questionIndex >= quizQuestions.length) {
        quizEnd();
        newDiv.textContent = "Quiz over " + " You got " + score + "/" + quizQuestions.length;
    } else {
        render(questionIndex);
    }
    questionsEl.appendChild(newDiv);

}
// function that gets rid of questions and shows score 
function quizEnd() {
    questionsEl.innerHTML = "";
    timerEl.innerHTML = "";

    // creates a new header after quiz is over 
    var newH1 = document.createElement("h1");
    newH1.setAttribute("id", "newH1");
    newH1.textContent = "How did you do?"
    questionsEl.appendChild(newH1);
    // new p tage to display score 
    if (timeLeft >= 0) {
        var newPar = document.createElement("p");
        clearInterval(timeInterval);
        newPar.textContent = "Your final score is: " + timeLeft;

        questionsEl.appendChild(newPar);
    }

    // label for submitting initials
    var label = document.createElement("label");
    label.setAttribute("id", "label");
    label.textContent = "Enter your initials: ";
    questionsEl.appendChild(label);
    // input created to enter initials 
    var nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.textContent = "";
    questionsEl.appendChild(nameInput);
    // submit buttun to store score and name 
    var submitBtn = document.createElement("button");
    submitBtn.setAttribute("type", "submit");
    submitBtn.setAttribute("id", "submit");
    submitBtn.textContent = "submit";
    questionsEl.appendChild(submitBtn);
    submitBtn.addEventListener("click", function () {
        var initials = nameInput.value;
        if (initials === null) {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: timeLeft
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            //goes to highscore.html
            window.location.replace("./highScores.html");
        }
    });

}