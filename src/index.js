import "./style.scss";


const sabaGame = (()=>{
    var board = document.getElementById("board");
    var game = [];
    var players = [];
    var currentPlayer = 2;
    var gameType;
    var mark = "";
    var roundStartPlayer = 1;

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
        function clearScore () {
            this.score =0;
        }
        return {
            name,
            type,
            score,
            mark,
            plusScore,
            clearScore,
        };
    };

    const SquareFactory = (i,j) =>{
        let id = `X${i}Y${j}`;
        let x = i;
        let y = j;
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
            }
        }

        function resetMark (){
            this.mark = "";
            render(this);
        }

        function setMark (){
            let player1score = document.getElementById("player1score");
            let player2score = document.getElementById("player2score");
            console.log("X:",this.x,"Y:",this.y,"ID:",this.id);
            if (this.mark == ""){
                if  (currentPlayer == 2){
                    render(this);
                } else {
                    if(currentPlayer == 1){
                        board.className = `player1turn`;
                    }
                    if(currentPlayer == 0){
                        board.className = `player0turn`;
                    }
                    this.mark = players[currentPlayer].mark;
                    let check = checkWinner(game,this.x,this.y);
                    render(this);
                    if (check.score>=0){
                        if (currentPlayer == 0){
                            players[0].plusScore(check.score)
                            player1score.innerText = `Score: ${players[0].score}`;
                            currentPlayer = 1;
                            if (check.reset == true){
                                resetGame();
                            }
                            return;
                        }
                        if(currentPlayer == 1){
                            players[1].plusScore(check.score)
                            player2score.innerText = `Score: ${players[1].score}`;
                            currentPlayer = 0;
                            if (check.reset == true){
                                resetGame();
                            }
                            return;
                        }
                    }
                    if ((gameType == "ai") && (check.reset == false)){
                        currentPlayer = 1;
                        let index = miniMax(game,0,true).index;
                        game[index].mark = "O";
                        players[1].plusScore(checkWinner(game,this.x,this.y).score)
                        player2score.innerText = `Score: ${players[1].score}`;
                        render(game[index]);
                        if (check.reset == true){
                            resetGame();
                        }
                        currentPlayer = 0;
                        return;
                    } else {
                        if (currentPlayer == 0){
                            currentPlayer = 1;
                        } else {
                            currentPlayer = 0;
                        }
                        
                    }
                    
                    console.log(currentPlayer);
                    if(players[0].score >= 100){
                        showWinner(players[0]);
                    }
                    if(players[1].score >= 100){
                        showWinner(players[1]);
                    }
                    
                }
            }
        }
        return {
        id,
        x,
        y,
        mark,
        resetMark,
        setMark,
        };
    };

    function checkWinner(game,x,y){

        let turnScore = 0;
        let reset = false;

        //checks for 4 in a row

        if(x<9){
            if((game[x][y].mark == game[x+1][y].mark)&&(game[x+1][y].mark == game[x+2][y].mark)&&(game[x+2][y].mark == game[x+3][y].mark)){
                turnScore +=3;
            }
        }
        if(x>2){
            if((game[x][y].mark == game[x-1][y].mark)&&(game[x-1][y].mark == game[x-2][y].mark)&&(game[x-2][y].mark == game[x-3][y].mark)){
                turnScore +=3;
            }
        }
        if(y<9){
            if((game[x][y].mark == game[x][y+1].mark)&&(game[x][y+1].mark == game[x][y+2].mark)&&(game[x][y+2].mark == game[x][y+3].mark)){
                turnScore +=3;
            }
        }
        if(y>2){
            if((game[x][y].mark == game[x][y-1].mark)&&(game[x][y-1].mark == game[x][y-2].mark)&&(game[x][y-2].mark == game[x][y-3].mark)){
                turnScore +=3;
            }
        }
        if((x<9)&&(y<9)){
            if((game[x][y].mark == game[x+1][y+1].mark)&&(game[x+1][y+1].mark == game[x+2][y+2].mark)&&(game[x+2][y+2].mark == game[x+3][y+3].mark)){
                turnScore +=3;
            }
        }
        if((x>2)&&(y>2)){
            if((game[x][y].mark == game[x-1][y-1].mark)&&(game[x-1][y-1].mark == game[x-2][y-2].mark)&&(game[x-2][y-2].mark == game[x-3][y-3].mark)){
                turnScore +=3;
            }
        }
        if((x>2)&&(y<9)){
            if((game[x][y].mark == game[x-1][y+1].mark)&&(game[x-1][y+1].mark == game[x-2][y+2].mark)&&(game[x-2][y+2].mark == game[x-3][y+3].mark)){
                turnScore +=3;
            }
        }
        if((x<9)&&(y>2)){
            if((game[x][y].mark == game[x+1][y-1].mark)&&(game[x+1][y-1].mark == game[x+2][y-2].mark)&&(game[x+2][y-2].mark == game[x+3][y-3].mark)){
                turnScore +=3;
            }
        }

        if((x<10)&&(x>0)){
            if((game[x][y].mark == game[x-1][y].mark)&&(game[x][y].mark == game[x+1][y].mark)&&(game[x+1][y].mark == game[x+2][y].mark)){
                turnScore +=3;
            }
        }
        if((x>1)&&(x<11)){
            if((game[x][y].mark == game[x+1][y].mark)&&(game[x][y].mark == game[x-1][y].mark)&&(game[x-1][y].mark == game[x-2][y].mark)){
                turnScore +=3;
            }
        }
        if((y<10)&&(y>0)){
            if((game[x][y].mark == game[x][y-1].mark)&&(game[x][y].mark == game[x][y+1].mark)&&(game[x][y+1].mark == game[x][y+2].mark)){
                turnScore +=3;
            }
        }
        if((y>1)&&(y<11)){
            if((game[x][y].mark == game[x][y+1].mark)&&(game[x][y].mark == game[x][y-1].mark)&&(game[x][y-1].mark == game[x][y-2].mark)){
                turnScore +=3;
            }
        }
        if((x<10)&&(y<10)&&(x>0)&&(y>0)){
            if((game[x][y].mark == game[x-1][y-1].mark)&&(game[x][y].mark == game[x+1][y+1].mark)&&(game[x+1][y+1].mark == game[x+2][y+2].mark)){
                turnScore +=3;
            }
        }
        if((x>1)&&(y>1)&&(x<11)&&(y<11)){
            if((game[x][y].mark == game[x+1][y+1].mark)&&(game[x][y].mark == game[x-1][y-1].mark)&&(game[x-1][y-1].mark == game[x-2][y-2].mark)){
                turnScore +=3;
            }
        }
        if((x>1)&&(y<10)&&(x<11)&&(y>0)){
            if((game[x][y].mark == game[x+1][y-1].mark)&&(game[x][y].mark == game[x-1][y+1].mark)&&(game[x-1][y+1].mark == game[x-2][y+2].mark)){
                turnScore +=3;
            }
        }
        if((x<10)&&(y>1)&&(x>0)&&(y<11)){
            if((game[x][y].mark == game[x-1][y+1].mark)&&(game[x][y].mark == game[x+1][y-1].mark)&&(game[x+1][y-1].mark == game[x+2][y-2].mark)){
                turnScore +=3;
            }
        }

        //checks for an eats 2 move and erase eaten marks.

        if(x<9){
            if(((game[x][y].mark != game[x+1][y].mark)&&(game[x+1][y].mark != ""))&&((game[x+1][y].mark == game[x+2][y].mark))&&((game[x][y].mark == game[x+3][y].mark))){
                turnScore +=2;
                game[x+1][y].resetMark();
                game[x+2][y].resetMark();
            }
        }
        if(x>2){
            if(((game[x][y].mark != game[x-1][y].mark)&&(game[x-1][y].mark != ""))&&((game[x-1][y].mark == game[x-2][y].mark))&&((game[x][y].mark == game[x-3][y].mark))){
                turnScore +=2;
                game[x-1][y].resetMark();
                game[x-2][y].resetMark();
            }
        }
        if(y<9){
            if(((game[x][y].mark != game[x][y+1].mark)&&(game[x][y+1].mark != ""))&&((game[x][y+1].mark == game[x][y+2].mark))&&((game[x][y].mark == game[x][y+3].mark))){
                turnScore +=2;
                game[x][y+1].resetMark();
                game[x][y+2].resetMark();
            }
        }
        if(y>2){
            if(((game[x][y].mark != game[x][y-1].mark)&&(game[x][y-1].mark != ""))&&((game[x][y-1].mark == game[x][y-2].mark))&&((game[x][y].mark == game[x][y-3].mark))){
                turnScore +=2;
                game[x][y-1].resetMark();
                game[x][y-2].resetMark();
            }
        }
        if((x<9)&&(y<9)){
            if(((game[x][y].mark != game[x+1][y+1].mark)&&(game[x+1][y+1].mark != ""))&&((game[x+1][y+1].mark == game[x+2][y+2].mark))&&((game[x][y].mark == game[x+3][y+3].mark))){
                turnScore +=2;
                game[x+1][y+1].resetMark();
                game[x+2][y+2].resetMark();
            }
        }
        if((x>2)&&(y>2)){
            if(((game[x][y].mark != game[x-1][y-1].mark)&&(game[x-1][y-1].mark != ""))&&((game[x-1][y-1].mark == game[x-2][y-2].mark))&&((game[x][y].mark == game[x-3][y-3].mark))){
                turnScore +=2;
                game[x-1][y-1].resetMark();
                game[x-2][y-2].resetMark();
            }
        }
        if((x>2)&&(y<9)){
            if(((game[x][y].mark != game[x-1][y+1].mark)&&(game[x-1][y+1].mark != ""))&&((game[x-1][y+1].mark == game[x-2][y+2].mark))&&((game[x][y].mark == game[x-3][y+3].mark))){
                turnScore +=2;
                game[x-1][y+1].resetMark();
                game[x-2][y+2].resetMark();
            }
        }
        if((x<9)&&(y>2)){
            if(((game[x][y].mark != game[x+1][y-1].mark)&&(game[x+1][y-1].mark != ""))&&((game[x+1][y-1].mark == game[x+2][y-2].mark))&&((game[x][y].mark == game[x+3][y-3].mark))){
                turnScore +=2;
                game[x+1][y-1].resetMark();
                game[x+2][y-2].resetMark();
            }
        }

        //checks for 5 in a row wich resets the board

        if(x<8){
            if((game[x][y].mark == game[x+1][y].mark)&&(game[x+1][y].mark == game[x+2][y].mark)&&(game[x+2][y].mark == game[x+3][y].mark)&&(game[x+3][y].mark == game[x+4][y].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if(x>3){
            if((game[x][y].mark == game[x-1][y].mark)&&(game[x-1][y].mark == game[x-2][y].mark)&&(game[x-2][y].mark == game[x-3][y].mark)&&(game[x-3][y].mark == game[x-4][y].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if(y<8){
            if((game[x][y].mark == game[x][y+1].mark)&&(game[x][y+1].mark == game[x][y+2].mark)&&(game[x][y+2].mark == game[x][y+3].mark)&&(game[x][y+3].mark == game[x][y+4].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if(y>3){
            if((game[x][y].mark == game[x][y-1].mark)&&(game[x][y-1].mark == game[x][y-2].mark)&&(game[x][y-2].mark == game[x][y-3].mark)&&(game[x][y-3].mark == game[x][y-4].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if((x<8)&&(y<8)){
            if((game[x][y].mark == game[x+1][y+1].mark)&&(game[x+1][y+1].mark == game[x+2][y+2].mark)&&(game[x+2][y+2].mark == game[x+3][y+3].mark)&&(game[x+3][y+3].mark == game[x+4][y+4].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if((x>3)&&(y>3)){
            if((game[x][y].mark == game[x-1][y-1].mark)&&(game[x-1][y-1].mark == game[x-2][y-2].mark)&&(game[x-2][y-2].mark == game[x-3][y-3].mark)&&(game[x-3][y-3].mark == game[x-4][y-4].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if((x>3)&&(y<8)){
            if((game[x][y].mark == game[x-1][y+1].mark)&&(game[x-1][y+1].mark == game[x-2][y+2].mark)&&(game[x-2][y+2].mark == game[x-3][y+3].mark)&&(game[x-3][y+3].mark == game[x-4][y+4].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if((x<8)&&(y>3)){
            if((game[x][y].mark == game[x+1][y-1].mark)&&(game[x+1][y-1].mark == game[x+2][y-2].mark)&&(game[x+2][y-2].mark == game[x+3][y-3].mark)&&(game[x+3][y-3].mark == game[x+4][y-4].mark)){
                turnScore +=2;
                reset = true;
            }
        }

        // //
        if((x<9)&&(x>0)){
            if((game[x][y].mark == game[x-1][y].mark)&&(game[x][y].mark == game[x+1][y].mark)&&(game[x+1][y].mark == game[x+2][y].mark)&&(game[x+2][y].mark == game[x+3][y].mark)){
                turnScore -=1;
                reset = true;
            }
        }
        if((x>2)&&(x<11)){
            if((game[x][y].mark == game[x+1][y].mark)&&(game[x][y].mark == game[x-1][y].mark)&&(game[x-1][y].mark == game[x-2][y].mark)&&(game[x-2][y].mark == game[x-3][y].mark)){
                turnScore -=1;
                reset = true;
            }
        }
        if((y<9)&&(y>0)){
            if((game[x][y].mark == game[x][y-1].mark)&&(game[x][y].mark == game[x][y+1].mark)&&(game[x][y+1].mark == game[x][y+2].mark)&&(game[x][y+2].mark == game[x][y+3].mark)){
                turnScore -=1;
                reset = true;
            }
        }
        if((y>2)&&(y<11)){
            if((game[x][y].mark == game[x][y+1].mark)&&(game[x][y].mark == game[x][y-1].mark)&&(game[x][y-1].mark == game[x][y-2].mark)&&(game[x][y-2].mark == game[x][y-3].mark)){
                turnScore -=1;
                reset = true;
            }
        }
        if((x<9)&&(y<9)&&(x>0)&&(y>0)){
            if((game[x][y].mark == game[x-1][y-1].mark)&&(game[x][y].mark == game[x+1][y+1].mark)&&(game[x+1][y+1].mark == game[x+2][y+2].mark)&&(game[x+2][y+2].mark == game[x+3][y+3].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if((x>2)&&(y>2)&&(x<11)&&(y<11)){
            if((game[x][y].mark == game[x+1][y+1].mark)&&(game[x][y].mark == game[x-1][y-1].mark)&&(game[x-1][y-1].mark == game[x-2][y-2].mark)&&(game[x-2][y-2].mark == game[x-3][y-3].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if((x>2)&&(y<9)&&(x<11)&&(y>0)){
            if((game[x][y].mark == game[x+1][y-1].mark)&&(game[x][y].mark == game[x-1][y+1].mark)&&(game[x-1][y+1].mark == game[x-2][y+2].mark)&&(game[x-2][y+2].mark == game[x-3][y+3].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        if((x<9)&&(y>2)&&(x>0)&&(y<11)){
            if((game[x][y].mark == game[x-1][y+1].mark)&&(game[x][y].mark == game[x+1][y-1].mark)&&(game[x+1][y-1].mark == game[x+2][y-2].mark)&&(game[x+2][y-2].mark == game[x+3][y-3].mark)){
                turnScore +=2;
                reset = true;
            }
        }
        // //
        if((x>1)&&(x<10)){
            if((game[x][y].mark == game[x+1][y].mark)&&(game[x][y].mark == game[x+2][y].mark)&&(game[x][y].mark == game[x-1][y].mark)&&(game[x][y].mark == game[x-2][y].mark)){
                turnScore -=1;
                reset = true;
            }
        }
        if((y>1)&&(y<10)){
            if((game[x][y].mark == game[x][y-1].mark)&&(game[x][y].mark == game[x][y-2].mark)&&(game[x][y].mark == game[x][y+1].mark)&&(game[x][y].mark == game[x][y+2].mark)){
                turnScore -=1;
                reset = true;
            }
        }
        if((x>1)&&(y<10)&&(x<10)&&(y>1)){
            if((game[x][y].mark == game[x+1][y-1].mark)&&(game[x][y].mark == game[x+2][y-2].mark)&&(game[x][y].mark == game[x-1][y+1].mark)&&(game[x][y].mark == game[x-2][y+2].mark)){
                turnScore -=1;
                reset = true;
            }
        }
        if((x>1)&&(y<10)&&(x<10)&&(y>1)){
            if((game[x][y].mark == game[x+1][y+1].mark)&&(game[x][y].mark == game[x+2][y+2].mark)&&(game[x][y].mark == game[x-1][y-1].mark)&&(game[x][y].mark == game[x-2][y-2].mark)){
                turnScore -=1;
                reset = true;
            }
        }
        console.log(reset,turnScore);
        return {
            reset,
            score: turnScore,
        };
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
        game = [];
        currentPlayer = 2;
        if(roundStartPlayer == 0){
            roundStartPlayer = 1;
        }
        if(roundStartPlayer == 1){
            roundStartPlayer = 0;
        }
        board.innerHTML = "";
        populateBoard ();
        currentPlayer = roundStartPlayer;
        if(currentPlayer == 1){
            board.className = `player0turn`;
        }
        if(currentPlayer == 0){
            board.className = `player1turn`;
        }
    }

    function showWinner (player) {
        
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
    sabaGame.setGameType("two");
}

function displayOnePlayer () {
    const gameType = document.querySelector(".gameType");
    const onePName = document.querySelector(".onePName");
    gameType.style.display = "none";
    onePName.style.display = "grid";
    sabaGame.setGameType("ai");
}

function displayGame () {
    const form = document.getElementById("playerSelection");
    const gameBoard = document.querySelector(".gameBoard");
    const onePName = document.querySelector(".onePName");
    const twoPNames = document.querySelector(".twoPNames");
    gameBoard.style.display = "grid";
    onePName.style.display = "none";
    twoPNames.style.display = "none";
    form.style.display = "none";
    sabaGame.newPlayers();
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