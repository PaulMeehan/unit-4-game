
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

// Game object
var game = {
    numWins: 0,        //total number of wins
    numLosses: 0,      //total number of losses
    currentGoal: 0,    //current randomized goal
    addends: [],        //array of randomized addends for each crystal
    currentScore: 0,   //players current score
    mode: "between games",  //flag indicating the current game mode

    // function to check and process win or lose
    checkScore: function () {
        if (this.currentScore === this.currentGoal) {
            $("#results").text("You Win!!");
            this.numWins = this.numWins + 1;
            $("#wins").text(this.numWins);
            this.mode = "between games";
            $("#newRound").show();
        } else if (this.currentScore > this.currentGoal) {
            $("#results").text("Sorry, You lose!");
            this.numLosses = this.numLosses + 1;
            $("#losses").text(this.numLosses);
            this.mode = "between games";
            $("#newRound").show();
        };
    },

    // function to update score and check results
    processClick: function (crystalNum) {
        if (this.mode === "in play") {    //Only process crystal clicks when game in play
            game.currentScore = game.currentScore + parseInt(game.addends[crystalNum]);
            $("#score").text(game.currentScore);
            game.checkScore();
        }
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

        game.mode = "in play";

        $("#results").text("Game on!").css("font-size","30px");

        $("#newRound").hide();
    });


    $("#crystal0").click(function() {
        game.processClick(0);
    });

    $("#crystal1").click(function () {
        game.processClick(1);
    });

    $("#crystal2").click(function () {
        game.processClick(2);
    });

    $("#crystal3").click(function () {
        game.processClick(3);
    });
});
