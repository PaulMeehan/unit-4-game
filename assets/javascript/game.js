
//Define global contstants:
const ADDENDMIN = 1;   //minumum addend value
const ADDENDMAX = 12;  //maximum addend value
const GOALMIN = 19;   //minimum goal value
const GOALMAX = 120;  //maximum goal value

// Function to generate random number between specified values.
function pickRandomNumber(minVal, maxVal) {
    var newRandomNum = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal
    return newRandomNum;
};

var game = {
    numWins: 0,        //total number of wins
    numLosses: 0,      //total number of losses
    currentGoal: 0,    //current randomized goal
    addends: [],        //array of randomized addends for each crystal
    currentScore: 0,   //players current score
    
    checkScore: function () {
        if (this.currentScore === this.currentGoal) {
            alert("Win!");
        } else if (this.currentScore > this.currentGoal) {
            alert("lose");
        };
    }
};


$(document).ready(function () {

    // set up new game when newRound button clicked
    $("#newRound").click(function() {
        //select new goal
        game.currentGoal = pickRandomNumber(GOALMIN, GOALMAX);
        $("#goal").text(game.currentGoal);

        //select new addends for each crystal
        for (var i = 0; i <= 3; i++) {    //for each crystal
            var isUnique = false;    //flag indicating new addend is unique
            while (!isUnique) {
                var newAddend = pickRandomNumber(ADDENDMIN, ADDENDMAX);
                var preUsed = false;   //flag indicating added was used for previous crystal
                for (var j = 0; j < i; j++) {   //check addends for previous crystals
                    if (newAddend === game.addends[j]) {
                        preUsed = true;
                    };
                };
                if (!preUsed) {
                    isUnique = true;
                };
            };
            game.addends[i] = newAddend;
        };

        game.currentScore = 0;
        $("#score").text(game.currentScore);

        $("#results").text("Game on!");
    });


    $("#crystal0").click(function() {
        console.log("zero")
        game.currentScore = game.currentScore + parseInt(game.addends[0]);
        $("#score").text(game.currentScore);
        game.checkScore();
    });

    $("#crystal1").click(function () {
        console.log("one")
        game.currentScore = game.currentScore + parseInt(game.addends[1]);
        $("#score").text(game.currentScore);
        game.checkScore();

    });

    $("#crystal2").click(function () {
        console.log("two")
        game.currentScore = game.currentScore + parseInt(game.addends[2]);
        $("#score").text(game.currentScore);
        game.checkScore();

    });

    $("#crystal3").click(function () {
        console.log("three")
        game.currentScore = game.currentScore + parseInt(game.addends[3]);
        $("#score").text(game.currentScore);
        game.checkScore();

    });
});
