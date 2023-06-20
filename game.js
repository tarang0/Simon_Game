var gamePattern=[];
var userClickedPattern=[];

var buttonColours=["red", "blue", "green", "yellow"];

var level=0;
var button=-1;
$(".start").click(function(){
    nextSequence();
    
    $(".start").addClass("visibility");
    $(".btn").click(function(){
        button++;
        var userChosenColour=$(this).attr("id");
        animatePress(userChosenColour);
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);
    
        if(gamePattern[button]!=userClickedPattern[button])
        {
            $("#level-title").text("Game over, Press restart to begin again");
            console.log("game pattern: "+gamePattern);
            console.log("user pattern: "+userClickedPattern);
            $(".start").removeClass("visibility");
            gamePattern=[];
            level=0;
            button=-1;   
        }
        else
        {
            if (level-1==button)
            {
                button=-1;  
                console.log("moving to next sequence "+userClickedPattern);
                userClickedPattern=[];
                setTimeout(nextSequence,1200);
                // nextSequence();
            }
            else
            {
                console.log("waiting for next button "+userClickedPattern);
                console.log("level-1: "+(level-1));
                console.log("button: "+button);
            }
        }
    });
});
function playaudio(color)
{
    var audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function nextSequence()
{
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playaudio(randomChosenColour);
    console.log("game pattern "+ gamePattern);
}
function playSound(name)
{
    if(name==null)
    {
        var randomNumber=Math.round(Math.random()*3);
        var randomChosenColour=buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);
        $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
        playaudio(randomChosenColour);
    }
    else
    {
        playaudio(name);
    }
    
}

function animatePress(currentColour)
{
    var active="#"+currentColour;
    $(active).addClass("pressed");
    setTimeout(function(){
        $(active).removeClass("pressed");
    },100);
}