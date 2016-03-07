$(document).ready(function() {
/*--------------------------*/
/*--- Global variables ---*/ 
/*--------------------------*/
var numberCorrect = 0;

// For displaying questions in random order
var currentQuestion = 0; // to be overwritten by randNum() later
var askedList = []; // questions already asked will be appended here
var absoluteQuestion = 1;

/*-------------------------------*/
/*--- Quiz Array ---*/
/*------------------------------*/
var quizQuestions = [
{
    questionNum: 0,
    questionText: "What does FFA stand for?",
    choices: ["Fastest Free Ascent", "First Free Ascent", "First Foreign Ascent", "Fastest Foreign Ascent"],
    correct: 1,
    fact: "FFA could stand for First Free Ascent or First Female Ascent"
},
{
    questionNum: 1,
    questionText: "ABO means... ",
    choices: ["Always Be Outdoors", "Assisted Brake Option", "Abominable", "Analysis of Belay Outcome"],
    correct: 2,
    fact: "Abominable (ABO) is the top rating on the French Alpine grading scale"
},
{
	questionNum: 2,
    questionText: "A favourite retailer of outdoor recreation gear in Canada, MEC stands for",
    choices: ["Mountain Equipment Co-op", "Mountain Equipment Co.", "Mount Edmonton Clothiers", "Mecca Excursion Center"],
    correct: 0,
    fact: "Mountain Equipment Co-op  (MEC) is notable for its commitment to environmental protection"
},
{
	questionNum: 3,
    questionText: "The common \"V\" scale for grading the difficulty of a bouldering problem is als called",
    choices: ["Vertical Scale", "Biller's System", "Vermin's Grade", "Hueco Scale"],
    correct: 3,
    fact: "Created by John \"Vermin\" Sherman in the 1990s, the \"V\" scale or Hueco Scale is the most widely used system in North America"
},
{
	questionNum: 4,
    questionText: "Beta refers to",
    choices: ["a test route when designing competitions", "the second person to ascent", "plan B", "advice for completion (solution) of a route"],
    correct: 3,
    fact: "There can be multiple betas or solutions to a problem.  Some believe that providing betas 'taints' an ascent."
}];

/*--------------------------*/
/*--- Declare functions ---*/
/*--------------------------*/
// Generate random question number
function randNum() {
    // Continue generating random number if generated number already is askedList
    while (($.inArray(currentQuestion, askedList) != -1) && (askedList.length < quizQuestions.length)) {
        console.log("Random question number: " + currentQuestion + " is already asked: " + askedList);
        //Max is last index of quiz, min is 0
        currentQuestion = Math.floor(Math.random() * ((quizQuestions.length - 1)- 0 + 1)) + 0; 
    }
    if (askedList.length < quizQuestions.length) {
        console.log("New question number generated: " + currentQuestion);
        // Append new random number to askedList
        askedList.push(currentQuestion);
    }
    else {
        console.log("All quiz questions have been asked.");
    }
}

// Show first question
function firstQuestion() {
    $("#question_wrapper").show();
    $("#next").val("Next Question");
    $("#final_wrapper").hide();
    $("#bottom").hide();
    $(".question").text("Question #" + absoluteQuestion + ": " + quizQuestions[currentQuestion].questionText);
    $("#answer_holder").empty();
    for (var i = 0; i < quizQuestions[currentQuestion].choices.length; i++) {
        $("#answer_holder").append("<input type=\'radio\' name=\'option\' class=\'option\' id=\'opt" + (i + 1) + "\' value=\'" + (i + 1) + "\'><span class=\'answer\' id=\'" + (i + 1) + "\'></span><br>");
        $("#"+ (i + 1)).text(quizQuestions[currentQuestion].choices[i]);
    }
    $("#submit").prop('disabled', false).css('color', '#000000');
    $("#next").prop('disabled', true).css('color', '#dddddd');
}

// Compare choice with correct answer and update numCorrect
function checkAnswer() {
    var userAnswer = ($("input[type='radio']:checked").val() - 1);
    var feedback = '';
    if (userAnswer == quizQuestions[currentQuestion].correct) {
        numberCorrect += 1;
        feedback = 'Correct! ';
        $("#last_question_fact").text(feedback + quizQuestions[currentQuestion].fact);
        console.log("Correct!  Your current score is: " + numberCorrect);
    }
    else {
        feedback = 'Incorrect! ';
        $("#last_question_fact").text(feedback + quizQuestions[currentQuestion].fact);
        console.log("Wrong!  Your current score is: " + numberCorrect);
    }
    $(".current_score").text(numberCorrect);

}

// Show next question
function nextQuestion() {
    currentQuestion += 1;
    $("#submit").prop('disabled', false).css('color', '#000000');
    $("#next").prop('disabled', true).css('color', '#dddddd');
    $(".question").text("Question #" + (currentQuestion + 1) + ": " + quizQuestions[currentQuestion].questionText);
    $("#answer_holder").empty();
    for (var i = 0; i < quizQuestions[currentQuestion].choices.length; i++) {
        $("#answer_holder").append("<input type=\'radio\' name=\'option\' class=\'option\' id=\'opt" + (i + 1) + "\' value=\'" + (i + 1) + "\'><span class=\'answer\' id=\'" + (i + 1) + "\'></span><br>");
        $("#"+ (i + 1)).text(quizQuestions[currentQuestion].choices[i]);
    }
    if (currentQuestion == (quizQuestions.length - 1)) {
        $("#next").val("Finish quiz");
    }
}
// End game when currentQuestion goes to 5
// Look into doing this with a timer?

/*------------------------*/
/*--- Event Listeners ---*/
/*-----------------------*/
$("#final_wrapper").hide();
$("#bottom").hide();
$(".max_score").text("out of " + quizQuestions.length);

// Show first question
firstQuestion();

// Submit answer should:
    // 1. Compare choice with correct answer
    // 2. Update score
    // 3. Display fact
    // 4. Display next question

$("#submit").click(function() {
    var answerSelected = false;
    var i = 1;
    while ((answerSelected == false) && (i < 5)) {
        if ($("#opt" + i).is(':checked')) {
            answerSelected = true;
            console.log("You selected answer: " + i);
        }
        i += 1;
    }

    if (answerSelected == true) {
        checkAnswer();
        //nextQuestion();
        $("#bottom").show();
        $("#submit").prop('disabled', true).css('color', '#dddddd');
        $("#next").prop('disabled', false).css('color', '#000000');
    }
    else {
        $("#last_question_fact").text("You must pick an answer before submitting");
        $("#bottom").show();
    }
    
});

$("#next").click(function() {
    if (currentQuestion != (quizQuestions.length - 1)) {
        nextQuestion();
    }
    else {
        $("#question_wrapper").hide();
        $("#final_score").text(numberCorrect);
        $("#final_wrapper").show();
        $("#bottom").hide();
    }
});

$("#restart").click(function() {
    numberCorrect = 0;
    currentQuestion = 0;
    firstQuestion();
});
// EOF
});
