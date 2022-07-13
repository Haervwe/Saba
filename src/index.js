

const sabaGame = (()=>{
    var board = document.getElementById("board");
    var game = [[]];
    var players = [];
    var currentPlayer = 2;
    var gameType;
    var mark = "";


    const PlayerFactory = (name,type) =>{
        let mark;
        let score = 0;
        if (players.length > 1){
            return;
        }
        if (players.length == 0 ){
            mark = "O";
        } else {
            mark = "X";
        }
        if (name == ""){
            name = `Player ${players.length+1}`;
        }
        function plusScore (n){
            this.score += n;
        }
        return {
            name,
            type,
            score,
            mark,
            plusScore,
        };
    };

    const SquareFactory = (i,j) =>{
        let id = `X${i}Y${j}`;
        function render(a) {
            let current = document.getElementById(`square${a.id}`);
            if (current == null) {
                let square = document.createElement("div");
                square.id = `square${id}`;
                square.className = "square";
                square.innerText = "";
                a.mark = "";
                square.onclick = function (){a.setMark();};
                board.appendChild(square);
                    
            } else {
                current.className = `square ${a.mark}`;
                board.className = `player${currentPlayer}`;
            }
        }

        

        function setMark (){
            let player1score = document.getElementById("player1score");
            let player2score = document.getElementById("player2score");

            if (this.mark == ""){
                if  (currentPlayer == 2){
                    render(this);
                } else {
                    this.mark = players[currentPlayer].mark;
                    if ((gameType == "ai") && (checkWinner(game,currentPlayer)== 8)){
                        currentPlayer = 1;
                        let index = miniMax(game,0,true).index;
                        game[index].mark = "O";
                        currentPlayer = 0;
                        render(game[index]);
                    } else {
                        if (currentPlayer == 0){
                            currentPlayer = 1;
                        } else {
                            currentPlayer = 0;
                        }
                    }
                    console.log(currentPlayer);
                    if (checkWinner(game,currentPlayer)==-1){
                        players[1].plusScore();
                        player2score.innerText = `Score: ${players[1].score}`;
                        currentPlayer = 0;
                        resetGame();
                        return;
                    } else if (checkWinner(game,currentPlayer)==1){
                        players[0].plusScore();
                        player1score.innerText = `Score: ${players[0].score}`;
                        currentPlayer = 1;
                        resetGame();
                        return;
                    }else if (checkWinner(game,currentPlayer)==0){
                       
                        if (currentPlayer == 0){
                            currentPlayer = 1;
                        } else {
                            currentPlayer = 0;
                        } 
                        resetGame();
                        return;
                    }
                    render(this);
                }
            }
        }
        return {
        id,
        mark,
        setMark,
        };
    };

    function checkWinner(game,currentPlayer,lastMove){

    }

    function populateBoard (){
        let inner = [];
        for (let i = 0; i < 12; i++){
            inner = [];
            for (let j = 0; j < 12; j++){
                inner.push(SquareFactory(i,j));
                inner[j].setMark();
            }
            game.push(inner);
        }
        console.log(game);
    }

    function resetGame () {
        game = [[]];
        currentPlayer = 2;
        let lastPlayer = currentPlayer;
        board.innerHTML = "";
        populateBoard ();
        if (lastPlayer == 2){
            currentPlayer = 0;
        } else {
            currentPlayer = lastPlayer;
        }
        board.className = `player${currentPlayer}`;
    }

    function setGameType (type){
        if (type == "ai"){
            gameType = "ai";
        } else {
            gameType = "twoPlayers";
        }
    }

    function newPlayers (){
        let form = document.getElementById("playerSelection");
        let player1name = document.getElementById("player1name");
        let player2name = document.getElementById("player2name");
        if (gameType == "ai"){
            players.push(PlayerFactory(`${form.player.value}`,"human"));
            players.push(PlayerFactory(`AI`,"ai"));
            
        } else {
            players.push(PlayerFactory(`${form.player1.value}`,"human"));
            players.push(PlayerFactory(`${form.player2.value}`,"human"));
        }
        player1name.innerText = `${players[0].name}`;
        player2name.innerText = `${players[1].name}`;
    }

    //game first initialization
    
    resetGame();

    return {
        setGameType,
        newPlayers,
    };
})();


//functions to change visivility of the player selection menu.

function displayTwoPlayers () {
    const gameType = document.querySelector(".gameType");
    const twoPNames = document.querySelector(".twoPNames");
    gameType.style.display = "none";
    twoPNames.style.display = "grid";
    BoardFactory.setGameType("two");
}

function displayOnePlayer () {
    const gameType = document.querySelector(".gameType");
    const onePName = document.querySelector(".onePName");
    gameType.style.display = "none";
    onePName.style.display = "grid";
    BoardFactory.setGameType("ai");
}

function displayGame () {
    const form = document.getElementById("playerSelection");
    const gameBoard = document.querySelector(".gameBoard");
    const onePName = document.querySelector(".onePName");
    const twoPNames = document.querySelector(".twoPNames");
    gameBoard.style.display = "Grid";
    onePName.style.display = "none";
    twoPNames.style.display = "none";
    form.style.display = "none";
    BoardFactory.newPlayers();
}
// event listneters

const twoPlayer = document.getElementById("twoPlayers");
const ai=  document.getElementById("ai");
const startGame = document.getElementById("startGame");
const startGameAi = document.getElementById("startGameAi");
startGame.addEventListener("click",displayGame);
startGameAi.addEventListener("click",displayGame);
ai.addEventListener("click",displayOnePlayer);
twoPlayer.addEventListener("click",displayTwoPlayers);