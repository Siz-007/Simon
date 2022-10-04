let gamePattern= [];
let userClickedPattern = [];

let started= false;
let level= 0;
let bestScore= 0;

let buttonColors= ["red", "blue", "green", "yellow"];

function nextSequence () {
  userClickedPattern= [];
  level++;
  $("#level-title").text("Level " + level);
  let randomNumber= Math.floor(Math.random() * 4);
  let randomChosenColor= buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}

$(".btn").click(function() {
  let userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if(started) {
    checkAnswer(userClickedPattern.length-1);
  }
});

function playSound(name) {
  var audio= new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function() {
  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started= true;
  }
});

function checkAnswer(currentLevel) {
  if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]) {
    console.log("Success");
    if(userClickedPattern.length=== gamePattern.length) {

      if (bestScore < level) {
            bestScore = level;
            $("#best-score span").text(bestScore);
          }
      setTimeout(function() {
        nextSequence();
      },1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
    level= 0;
    gamePattern= [];
    started= false;
  }
