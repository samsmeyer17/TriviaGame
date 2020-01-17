var card = $("#quiz-area");

// Question set
var questions = [
  {
    question: "What is the name of the first Flash?",
    answers: ["Wally West", "Barry Allen", "Bart Allen", "Jay Garrick"],
    correctAnswer: "Jay Garrick"
  },
  {
    question: "What is the source of all of the Flash's powers?",
    answers: ["Cosmic Force", "The Sun", "Speed Force", "Velocity Force"],
    correctAnswer: "Speed Force"
  },
  {
    question: "In the Justice League Animated Series, who is The Flash is in the Justice League?",
    answers: ["Barry Allen", "Wally West", "Jay Garrick", "Eobard Thawne"],
    correctAnswer: "Wally West"
  },
  {
    question: "Who is Barry Allen's wife?",
    answers: ["Iris West", "Linda Park", "Patty Spivot", "Lois Lane"],
    correctAnswer: "Iris West"
  },
  {
    question: "Who killed Barry Allen's mother?",
    answers: ["Savitar", "Godspeed", "The Reverse Flash", "Gorilla Grodd"],
    correctAnswer: "The Reverse Flash"
  },
  {
    question: "What is the name of The Reverse Flash?",
    answers: ["Eobard Thawne", "Hunter Zolomon", "Joe West", "Bart Allen"],
    correctAnswer: "Eobard Thawne"
  },
];

// Variable that will hold the setInterval
var timer;

var game = {
  correct: 0,
  incorrect: 0,
  counter: 60,

  countdown: function () {
    game.counter--;
    $("#counter-number").html(game.counter);
    if (game.counter === 0) {
      card.html("<h2>All Done!</h2>");
      card.append("<h3>Correct Answers: " + this.correct + "</h3>");
      card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
      game.done();
    }
    if (game.counter === 10) {
      $("#sub-wrapper").append("<h2 id='alert'>Ten Seconds Left!</h2>")
    }
    else if (game.counter === 8) {
      $("#alert").remove();
    }
  },

  start: function () {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>60</span> Seconds</h2>"
    );

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2 id='questions'>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input id='answers' type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<div><button id='done'>Done</button></div>");
  },

  done: function () {
    var inputs = card.children("input:checked");
    for (var i = 0; i < inputs.length; i++) {
      if ($(inputs[i]).val() === questions[i].correctAnswer) {
        game.correct++;
      } else {
        game.incorrect++;
      }
    }
    this.result();
  },

  restart: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend(
      "<h2>Time Remaining: <span id='counter-number'>60</span> Seconds</h2>"
    );
    $("#start").remove();
    $("#restart").remove();
    $(".result").remove()

    for (var i = 0; i < questions.length; i++) {
      card.append("<h2 id='questions'>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        card.append("<input id='answers' type='radio' name='question-" + i +
          "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    card.append("<div><button id='done'>Done</button></div>");
  },

  result: function () {
    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    card.html("<h2 class='result'>All Done!</h2>");
    card.append("<h3 class='result'>Correct Answers: " + this.correct + "</h3>");
    card.append("<h3 class='result'>Incorrect Answers: " + this.incorrect + "</h3>");
    card.append("<button id='restart'>Take It Again!</button>");
  }
};

// CLICK EVENTS

$(document).on("click", "#start", function () {
  game.start();
});

$(document).on("click", "#done", function () {
  game.done();
});

$(document).on('click', "#restart", function() {
  game.restart()
})
