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
    questionText: "What is Lionel Messi's middle name?",
    choices: ["Rosario", "Rodrigo", "Andres", "Cristiano"],
    correct: 2,
    fact: "His middle name is in fact, Andres"
},
{
    questionNum: 1,
    questionText: "What Argentinian club was Messi in before moving to Barcelona?",
    choices: ["River Plate", "Newell's Old Boys", "Boca Juniors", "Independiente"],
    correct: 1,
    fact: "He was playing for the Old Boys"
},
{
	questionNum: 2,
    questionText: "What did FCB offer Messi that finally convinced his move?",
    choices: ["Growth hormone treatment", "a new house for his family", "an Aston Martin", "player-coach status"],
    correct: 0,
    fact: "Messi required expensive growth hormone treatment, which FCB happily paid for."
},
{
	questionNum: 3,
    questionText: "How many goals did Messi score during the treble winning 2008-2009 season for Barcelona?",
    choices: ["30", "34", "36", "38"],
    correct: 3,
    fact: "The maestro scored a stunning 38 goals!"
},
{
	questionNum: 4,
    questionText: "Maradona has criticized Messi for being...",
    choices: ["too selfish", "too small", "a poor leader", "weak in the air"],
    correct: 0,
    fact: "He said Messi was too weak, but that's clearly not the case with the MSN."
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
    currentQuestion = Math.floor(Math.random() * ((quizQuestions.length - 1)- 0 + 1)) + 0;
    askedList.push(currentQuestion);
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
    randNum();
    absoluteQuestion += 1;
    $("#submit").prop('disabled', false).css('color', '#000000');
    $("#next").prop('disabled', true).css('color', '#dddddd');
    $(".question").text("Question #" + absoluteQuestion + ": " + quizQuestions[currentQuestion].questionText);
    $("#answer_holder").empty();
    for (var i = 0; i < quizQuestions[currentQuestion].choices.length; i++) {
        $("#answer_holder").append("<input type=\'radio\' name=\'option\' class=\'option\' id=\'opt" + (i + 1) + "\' value=\'" + (i + 1) + "\'><span class=\'answer\' id=\'" + (i + 1) + "\'></span><br>");
        $("#"+ (i + 1)).text(quizQuestions[currentQuestion].choices[i]);
    }
    if (absoluteQuestion == quizQuestions.length) {
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
    if (absoluteQuestion != quizQuestions.length) {
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
    currentQuestion = Math.floor(Math.random() * ((quizQuestions.length - 1)- 0 + 1)) + 0;
    askedList = [];
    absoluteQuestion = 1;
    firstQuestion();
});
// EOF
});
