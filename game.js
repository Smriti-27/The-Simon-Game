var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;
var level=0;
$(document).keypress(function()
{
    if(!started)
    {
    nextSequence();
    started=true;
    }
});


function nextSequence()
{
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //adding audio
    playSound(randomChosenColour);
}

$(".btn").click(function()
{
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name)
{
    var audio1=new Audio("sounds/"+name+".mp3");
    audio1.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")}
        ,100);
}

function checkAnswer(currentLevel)
{
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length===gamePattern.length)
        {
            setTimeout(function()
            {
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over,Press Any Key to Restart");
        startOver();
    }
}
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}

