var buttonColours = ["red", "blue", "green", "yellow"];

var gamepattern = [];

var userclickedpattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userchosencolour = $(this).attr("id");
  userclickedpattern.push(userchosencolour);
  playsound(userchosencolour);
  animatepress(userchosencolour);
  checkanswer(userclickedpattern.length - 1);
});

function checkanswer(currentlevel) {
  if (gamepattern[currentlevel] === userclickedpattern[currentlevel]) {
    if (userclickedpattern.length === gamepattern.length) {
      setTimeout(function () {
        nextsequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    animategameover();
    $("#level-title").text("Game Over,Press Any Key to Restart");
    startover();
  }
}

function nextsequence() {
  userclickedpattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomnumber = Math.floor(Math.random() * 4);
  var randomchosencolour = buttonColours[randomnumber];
  gamepattern.push(randomchosencolour);
  $("#" + randomchosencolour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomchosencolour);
}

function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatepress(currentcolour) {
  $("#" + currentcolour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentcolour).removeClass("pressed");
  }, 100);
}

function animategameover() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function startover() {
  level = 0;
  started = false;
  gamepattern = [];
}
