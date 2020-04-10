//$(document).ready(function(){
var userClickedPattern = [];
var gamePattern = [];
var level = 1;
var started = false;
var buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
  userClickedPattern = [];
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(4 * Math.random());
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  playSound(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  level++;
}
$(".btn").on("click", function() {
  var userChosenColour = this.id; //you can also use $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  //audio.autoplay=true;
  audio.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function() {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentlevel) {
  if (userClickedPattern[currentlevel] == gamePattern[currentlevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else{
    console.log("fail");
    var fail= new Audio("sounds/wrong.mp3");
    fail.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart.");
    startOver();

  }
}
function startOver(){
  gamePattern=[];
  level=1;
  started=false;
}
$(document).on("keypress", function() {
if(!started){
   started = true;
   nextSequence();
 }
});



//});
