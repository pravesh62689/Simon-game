var button_colors = ["one", "two", "three", "four"];

var game_pattern = [];

var user_click_pattern = [];

var started = false;

var level = 0;

$(document).keydown(function () {

    if (!started) {
        $("#level-title").text("Level " + level);
        next_sequence();
        started = true;
    }
});

$(".btn").click(function() {
    
    // this will store the current box id on click 
    var user_chosen_color = $(this).attr("id");
    user_click_pattern.push(user_chosen_color);

    play_Sound(user_chosen_color);
    animate_press(user_chosen_color);
    check_answer(user_click_pattern.length-1)
});

function next_sequence() {
    user_click_pattern=[];
    level++;

    $("#level-title").text("Level " + level);
    
    var random_number = Math.floor(Math.random() * 4);
    var random_chosen_color = button_colors[random_number];
    game_pattern.push(random_chosen_color);

    $("#" + random_chosen_color).fadeOut(100).fadeIn(100).fadeIn(100);
    play_Sound(random_chosen_color);




}
function play_Sound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animate_press(current_color) {

    $("#" + current_color).addClass("pressed");
    setTimeout(() => {
        $("#" + current_color).removeClass("pressed");

    }, 100);
}

function check_answer(current_level){
    if (user_click_pattern[current_level]===game_pattern[current_level]) {
        console.log("success");
        if(user_click_pattern.length===game_pattern.length){
            setTimeout(() => {
                next_sequence();
            }, 1000);
        }
       
    }
    else{
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        
    $("body").addClass("game-over");
    setTimeout(() => {
        $("body").removeClass("game-over");

    }, 200);
    
    $("#level-title").text("Game Over, Press Any Key to Restart");
    start_over();
    }
}

function start_over(){
    level=0;
    game_pattern = [];
    started=false;9
}