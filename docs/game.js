var buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    // Changes the h1 from "Press A to Start" to the Number of the Level (Level 0 )
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    console.log('Game has Started');
  }
});

$('.btn').click( function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    pressAnimate(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });

function nextSequence() {
  userClickedPattern = [];
    level++;
  $('#level-title').text('Level ' + level);

    //Creates a random number between 0 and 4
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

          // Button Animation
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  checkAnswer(level);
}

//Checks for which button was pressed and then Plays that corresponding sound
function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//Adds class and removes it after 200ms
function pressAnimate(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setInterval(function(){

    $("#" + currentColour).removeClass("pressed");

  }, 200);
}

function checkAnswer(currentLevel){
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  console.log("success");
  //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
  if (userClickedPattern.length === gamePattern.length){
    //Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence();
      }, 1000);
    }
  }else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
    playSound('wrong');
    $('body').addClass('game-over');
    $('#level-title').text('Game Over, Press Any Key to Restart');
    setTimeout(function () {
      $('body').removeClass('game-over');
    }, 200);
    startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

//Add flashing to iteration
//Try using jQuery.data() for elements
