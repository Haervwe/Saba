import "./style.scss";
import _ from "lodash";

const sabaGame = (()=>{
    var board = document.getElementById("board");
    var game = [];
    var players = [];
    var currentPlayer = 2;
    var gameType;
    var mark = "";
    var roundStartPlayer = 2;

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

        function resetMark (copy){
            if (copy == false){
                this.mark = "";
                render(this);
            }
            if (copy == true){
                this.mark = "";
            }
        }

        function setMark (){
            let player1score = document.getElementById("player1score");
            let player2score = document.getElementById("player2score");
            console.log(currentPlayer);
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
                    let check = checkWinner(game,this.x,this.y,false);
                    render(this);
                    if (currentPlayer == 0){
                        players[0].plusScore(check.score)
                        player1score.innerText = `Score: ${players[0].score}`;
                        currentPlayer = 1;
                        if (check.reset == true){
                            resetGame();
                        }
                        if ((gameType == "ai") && (check.reset == false)){
                            console.log("ai");
                            let index = miniMax(game,0,true,this.x,this.y);
                            game[index.x][index.y].mark = players[1].mark;
                            players[1].plusScore(checkWinner(game,this.x,this.y,false).score);
                            player2score.innerText = `Score: ${players[1].score}`;
                            render(game[index.x][index.y]);
                            board.className = `player0turn`;
                            if (check.reset == true){
                                resetGame();
                                return;
                            }
                            currentPlayer = 0;
                            return;
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

    //miniMax algorithm function for ai play

    function miniMax (gameTemp ,depth, isMaximizer,x,y){

        var gameCopy = _.cloneDeep(gameTemp);
        let moves = [];
    //next possible moves evaluator for AI player
        let check = checkWinner(gameCopy,x,y,true);
        if (check.reset == true||depth==3){
            if(isMaximizer==true){
                return {scoreAi: 0, scoreHuman: check.score, x: x, y: y};
            }
            if(isMaximizer==true){
                return {scoreAi: check.score, scoreHuman: 0, x: x, y: y};
            }
        }
        if (isMaximizer == true){
            for (let i = 0; i < 12; i++){
                for(let j = 0; j < 12; j++){
                    if (gameCopy[i][j].mark == ""){
                        gameCopy[i][j].mark = "O";
                        let move = miniMax(gameCopy, depth +1, false,i,j);
                        gameCopy[i].mark = "";
                        moves.push({scoreAi: check.score + move.scoreAi, scoreHuman: move.scoreHuman, x: i, y: j});
                    }
                }
            }
        }
        
    //next possible moves evaluator for human player
        if(isMaximizer == false){
            for (let i = 0; i < 12; i++){
                for(let j = 0; j < 12; j++){
                    if (gameCopy[i][j].mark == ""){
                        gameCopy[i][j].mark = "X";
                        let move = miniMax(gameCopy, depth +1, true,i,j);
                        gameCopy[i].mark = "";
                        moves.push({scoreAi: move.scoreAi, scoreHuman:  check.score + move.scoreHuman, x: i, y: j});
                    }
                }
            }
        }
            //best posible value comparison  and return the optimal value. it returns an object with the index and value of the best posible move, 
            //the index is only relevant in depth 0 as it is the final return value of the function in every other iteration the value used for calculations is only the branch terminal score.
            
        if (isMaximizer == true){
            let x = 0;
            let y = 0;
            let valueAi = 0;
            let valueHuman = 0;
            for (let i = 0 ; i < moves.length; i++){
                if  ((moves[i].scoreAi>moves[i].scoreHuman)&&(moves[i].scoreAi >= valueAi)&&(moves[i].scoreHuman <= valueHuman)){
                    x = moves[i].x;
                    y = moves[i].y;
                    valueAi = moves[i].scoreAi;
                    valueHuman = moves[i].scoreHuman;
                }
            }
            if (depth == 0){
                console.log({scoreAi: valueAi, scoreHuman: valueHuman, x: x, y: y});
                console.log(moves);
            }
            return {scoreAi: valueAi, scoreHuman: valueHuman, x: x, y: y};
        }
        if (isMaximizer == false){
            let x = 0;
            let y = 0;
            let valueAi = 0;
            let valueHuman = 0;
            for (let i = 0 ; i < moves.length; i++){
                if  ((moves[i].scoreAi<moves[i].scoreHuman)&&(moves[i].scoreAi <= valueAi)&&(moves[i].scoreHuman >= valueHuman)){
                    x = moves[i].x;
                    y = moves[i].y;
                    valueAi = moves[i].scoreAi;
                    valueHuman = moves[i].scoreHuman;
                }
            }
            return {scoreAi: valueAi, scoreHuman: valueHuman, x: x, y: y};
        }
    }

    function checkWinner(game,x,y,internal){

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
                game[x+1][y].resetMark(internal);
                game[x+2][y].resetMark(internal);
            }
        }
        if(x>2){
            if(((game[x][y].mark != game[x-1][y].mark)&&(game[x-1][y].mark != ""))&&((game[x-1][y].mark == game[x-2][y].mark))&&((game[x][y].mark == game[x-3][y].mark))){
                turnScore +=2;
                game[x-1][y].resetMark(internal);
                game[x-2][y].resetMark(internal);
            }
        }
        if(y<9){
            if(((game[x][y].mark != game[x][y+1].mark)&&(game[x][y+1].mark != ""))&&((game[x][y+1].mark == game[x][y+2].mark))&&((game[x][y].mark == game[x][y+3].mark))){
                turnScore +=2;
                game[x][y+1].resetMark(internal);
                game[x][y+2].resetMark(internal);
            }
        }
        if(y>2){
            if(((game[x][y].mark != game[x][y-1].mark)&&(game[x][y-1].mark != ""))&&((game[x][y-1].mark == game[x][y-2].mark))&&((game[x][y].mark == game[x][y-3].mark))){
                turnScore +=2;
                game[x][y-1].resetMark(internal);
                game[x][y-2].resetMark(internal);
            }
        }
        if((x<9)&&(y<9)){
            if(((game[x][y].mark != game[x+1][y+1].mark)&&(game[x+1][y+1].mark != ""))&&((game[x+1][y+1].mark == game[x+2][y+2].mark))&&((game[x][y].mark == game[x+3][y+3].mark))){
                turnScore +=2;
                game[x+1][y+1].resetMark(internal);
                game[x+2][y+2].resetMark(internal);
            }
        }
        if((x>2)&&(y>2)){
            if(((game[x][y].mark != game[x-1][y-1].mark)&&(game[x-1][y-1].mark != ""))&&((game[x-1][y-1].mark == game[x-2][y-2].mark))&&((game[x][y].mark == game[x-3][y-3].mark))){
                turnScore +=2;
                game[x-1][y-1].resetMark(internal);
                game[x-2][y-2].resetMark(internal);
            }
        }
        if((x>2)&&(y<9)){
            if(((game[x][y].mark != game[x-1][y+1].mark)&&(game[x-1][y+1].mark != ""))&&((game[x-1][y+1].mark == game[x-2][y+2].mark))&&((game[x][y].mark == game[x-3][y+3].mark))){
                turnScore +=2;
                game[x-1][y+1].resetMark(internal);
                game[x-2][y+2].resetMark(internal);
            }
        }
        if((x<9)&&(y>2)){
            if(((game[x][y].mark != game[x+1][y-1].mark)&&(game[x+1][y-1].mark != ""))&&((game[x+1][y-1].mark == game[x+2][y-2].mark))&&((game[x][y].mark == game[x+3][y-3].mark))){
                turnScore +=2;
                game[x+1][y-1].resetMark(internal);
                game[x+2][y-2].resetMark(internal);
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
        if(roundStartPlayer == 2){
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