const player1 = {
    Name:"",
    Choice: "",

    init: function(){
        document.querySelector("#player1").addEventListener("input", this.NameInput.bind(this));
        
        const buttons = document.querySelectorAll(".choose");

        buttons.forEach(button => {
           button.addEventListener("click", this.symbolChoice.bind(this));
        })
    },

    NameInput: function(e){
        this.Name = e.target.value;
        console.log("player one name: ", this.Name);
    },

    symbolChoice: function(e){
        this.Choice = e.target.textContent;
        console.log("player one choice: ", this.Choice);
        if (this.Choice === 'X'){
            player2.Choice = "O";
        } else {
            player2.Choice = "X";
        }
        console.log("player two choice: ", player2.Choice);
    }
    
};

player1.init();

const player2 = {
    Name:"",
    Choice: "",

    init: function(){
        document.querySelector("#player2").addEventListener("input", this.NameInput.bind(this));
    },

    NameInput: function(e){
        this.Name = e.target.value;
        console.log("player two name is: ", this.Name);
    }
};

player2.init();

const table = ["","","","","","","","",""];
const marks = document.querySelectorAll(".mark");


const playingGame = {

    currentPlayer: player1,
    gameOver: true,

    init: function(){
        this.gameOver = false;
        console.log("START!");
    },

    Click: function(e){

        if (this.gameOver) return;

        const target = e.target.dataset.index;

        if (table[target] !== "") return;

        table[target] = this.currentPlayer.Choice;

        this.markboard(e);

        if (this.check()){
            console.log("The winner is: ", this.currentPlayer.Name);
            this.reset();
            this.winnerMessage();
            this.gameOver = true;
            return;
        };


        this.TurnClick();

    },

    TurnClick: function(){
        if (this.currentPlayer === player1){
            this.currentPlayer = player2;
        } else{
            this.currentPlayer = player1;
        }

        console.log("The current player is: ", this.currentPlayer.Name);
    },

    check: function() { 
        const victoryArray = [ [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8], [6,4,2], [0,4,8] ];

        return victoryArray.some(comb => 
        comb.every(index => table[index] === this.currentPlayer.Choice));
    },

    reset: function(){
        table.fill("");
        marks.forEach(mark => mark.textContent = "");
        this.gameOver = false;
        const rm = document.querySelector(".winner");
        if (rm) {
            rm.remove();
        }

        console.log("Nova partida");
    },

    markboard: function(e){
        const index = e.target.dataset.index;
        marks[index].textContent = this.currentPlayer.Choice;
        marks[index].style.color = ("white");
        if (this.check === true){
            marks[index].textContent = "";
        };
    },

    winnerMessage: function() {

        const winner = document.createElement("h1");
            winner.textContent = `THE WINNER IS ${this.currentPlayer.Name}!`;
            winner.classList.add("winner");
            winner.style.color = ('gold');
            document.body.appendChild(winner);

            this.Score();
    },

    player1Score: 0,
    player2Score: 0,

    Score: function(){
        const score1 = document.querySelector("#h2one");
        const score2 = document.querySelector("#h2two");

        if (this.currentPlayer === player1){
            this.player1Score++;
            score1.textContent = this.player1Score;
        } else {
            this.player2Score++;
            score2.textContent = this.player2Score;
        }
    },

    clearScore: function(){
        this.player1Score = 0;
        this.player2Score = 0;

        const score1 = document.querySelector("#h2one");
        const score2 = document.querySelector("#h2two");

        score1.textContent = "0";
        score2.textContent = "0";
    }

    /*roundTied: function(){

    }*/


};

marks.forEach((mark, index) => {
    mark.dataset.index = index;
    mark.addEventListener("click", playingGame.Click.bind(playingGame));
    
});


document.querySelector("#restart").addEventListener("click", function(){
    playingGame.reset();
});

document.querySelector("#clear").addEventListener("click", function(){
    playingGame.clearScore();
});



const start = document.querySelector("#start").addEventListener("click", function(){
        if(player1.Name === "" || player1.Choice === "" || player2.Name === "" || player2.Choice === ""){
            alert("Fill all");
        };
        playingGame.init();
});




