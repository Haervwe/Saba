import "./style.scss";
//import _ from "lodash";

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
            mark = 1;
        } else {
            mark = 2;
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
                a.mark = 0;
                square.onclick = function (){a.setMark();};
                board.appendChild(square);
                    
            } else {
                if(a.mark == 1){
                    current.className = `square O`;
                }
                if(a.mark == 2){
                    current.className = `square X`;
                }
                if(a.mark == 0){
                    current.className = `square`;
                }
                
                
            }
        }

        function resetMark (){
            this.mark = 0;
            render(this);
        }

        function setMark (){
            let player1score = document.getElementById("player1score");
            let player2score = document.getElementById("player2score");
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
                            if ((currentPlayer == 1)&&(gameType == "ai")){
                                console.log("1")
                                game[6][6].mark = players[1].mark;
                                render(game[6][6]);
                                currentPlayer = 0;
                                board.className = `player1turn`;
                                return;
                            }
                        }
                        if ((gameType == "ai") && (check.reset == false)){
                            var gameCopy = JSON.parse(JSON.stringify(game));
                            let index = miniMax(gameCopy,0,true,this.x,this.y,-Infinity,Infinity);
                            game[index.x][index.y].mark = players[1].mark;
                            let internalCheck = checkWinner(game,index.x,index.y,false);
                            players[1].plusScore(internalCheck.score);
                            player2score.innerText = `Score: ${players[1].score}`;
                            render(game[index.x][index.y]);
                            board.className = `player1turn`;
                            if (internalCheck.reset == true){
                                resetGame();
                                if (currentPlayer == 1){
                                    game[6][6].mark = players[1].mark;
                                    console.log("2")
                                    render(game[6][6]);
                                    currentPlayer = 0;
                                    board.className = `player1turn`;
                                }
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

    function nextPossiblemoves(gameCopy,checked,moves){
        let nextX = 0;
        let nextY = 0;
        let toCheck = true;
        let result;
        for(let m= 0; m<12; m++){
            for(let l= 0; l<12; l++){
                if(gameCopy[m][l].mark != 0){
                    checked.push({x: m , y: l});
                    for (let i = -1; i < 2 ; i++){
                        for (let j = -1; j < 2; j++){
                            nextX = m+i;
                            nextY = l+j;
                            for(let k = 0;k < checked.length;k++){
                                if ((checked[k].x == nextX)&&(checked[k].y == nextY)){
                                    toCheck = false;
                                    break;
                                } 
                            }
                            if (toCheck == true){
                                if((nextX >= 0)&&(nextX <= 11)&&(nextY >= 0)&&(nextY <= 11)){
                                    if(gameCopy[nextX][nextY].mark == 0){
                                        moves.push({x: nextX, y: nextY});
                                        checked.push({x: nextX, y: nextY});
                                    } else {
                                        checked.push({x: nextX, y: nextY});
                                        result = nextPossiblemoves(gameCopy,checked,moves);
                                        checked = result.checked;
                                        moves = result.moves;
                                    }
                                }
                            }
                            toCheck = true;  
                        }
                    }
                }
            }
        }
        return {moves,checked};
    }

    //miniMax algorithm function for ai play
    
    function miniMax (gameTemp,depth,isMaximizer,x,y,alfa,beta){
        let check = checkWinner(gameTemp,x,y,true);
        let nextmoves = (nextPossiblemoves(gameTemp,[],[])).moves;
        let bestX;
        let bestY;
        let value;
        if (check.reset == true||depth==5){
            if(isMaximizer==false){
                if(check.erased.length > 0){
                    for (let k = 0; k < check.erased.length; k++){
                        gameTemp[check.erased[k].x][check.erased[k].y].mark = 2;
                    }
                }
                return {score: check.score, x: x, y: y,erased: check.erased}; 
            }
            if(isMaximizer==true){
                if(check.erased.length > 0){
                    for (let k = 0; k < check.erased.length; k++){
                        gameTemp[check.erased[k].x][check.erased[k].y].mark = 1;
                    }
                }
                return {score: -check.score, x: x, y: y,erased: check.erased};
            }
        }
        if (depth == 0){
            check.score = 0;
        }
    //next possible moves evaluator for AI player

        if (isMaximizer == true){
            value = -Infinity;
            for (let i = 0; i < nextmoves.length; i++){
                if (gameTemp[nextmoves[i].x][nextmoves[i].y].mark == 0){
                    gameTemp[nextmoves[i].x][nextmoves[i].y].mark = 2;
                    let move = miniMax(gameTemp, depth +1, false,nextmoves[i].x,nextmoves[i].y,alfa,beta);
                    gameTemp[nextmoves[i].x][nextmoves[i].y].mark = 0;
                    if (((+move.score-+check.score) > value)){
                        bestX = nextmoves[i].x;
                        bestY = nextmoves[i].y;
                        value = (+move.score - +check.score); 
                    }
                    if ((+move.score-+check.score)>= alfa){
                        alfa = move.score - check.score;
                    } 
                    if (move.erased.length > 0){
                        for (let k = 0; k < move.erased.length; k++){
                                gameTemp[move.erased[k].x][move.erased[k].y].mark = 1;
                        }
                    }
                    if(beta<alfa){
                        break;
                    }
                }
            }
            return ({score: value, x: bestX, y: bestY,erased: check.erased});    
        }

        
    //next possible moves evaluator for human player

        if(isMaximizer == false){
            value = Infinity;
            for (let i = 0; i < nextmoves.length; i++){
                if (gameTemp[nextmoves[i].x][nextmoves[i].y].mark == 0){
                    gameTemp[nextmoves[i].x][nextmoves[i].y].mark = 1;
                    let move = miniMax(gameTemp, depth +1, true,nextmoves[i].x,nextmoves[i].y,alfa,beta,);
                    gameTemp[nextmoves[i].x][nextmoves[i].y].mark = 0;
                    if(((move.score + check.score) < value)){
                        bestX = nextmoves[i].x;
                        bestY = nextmoves[i].y;
                        value = (move.score + check.score);
                    }
                    if((move.score + check.score) <= beta){
                        beta = move.score + check.score;
                    }
                    if(move.erased.length > 0){
                        for (let k = 0; k < move.erased.length; k++){
                            gameTemp[move.erased[k].x][move.erased[k].y].mark = 2;
                        }
                    }
                    if(beta<alfa){
                        break;
                    }     
                }
            }
            return {score: value, x: bestX, y: bestY,erased: check.erased};
        }  
    }

    function checkWinner(game,x,y,internal){

        let turnScore = 0;
        let reset = false;
        let erased = [];
        
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
            if(((game[x][y].mark != game[x+1][y].mark)&&(game[x+1][y].mark != 0))&&((game[x+1][y].mark == game[x+2][y].mark))&&((game[x][y].mark == game[x+3][y].mark))){
                turnScore +=2;
                if (internal == true){
                    game[x+1][y].mark = 0;
                    game[x+2][y].mark = 0;
                    erased.push({x: game[x+1][y].x , y: game[x+1][y].y});
                    erased.push({x: game[x+2][y].x , y: game[x+2][y].y});
                } else {
                    game[x+1][y].resetMark();
                    game[x+2][y].resetMark();
                }
                
            }
        }
        if(x>2){
            if(((game[x][y].mark != game[x-1][y].mark)&&(game[x-1][y].mark != 0))&&((game[x-1][y].mark == game[x-2][y].mark))&&((game[x][y].mark == game[x-3][y].mark))){
                turnScore +=2;
                if (internal == true){
                    game[x-1][y].mark = 0;
                    game[x-2][y].mark = 0;
                    erased.push({x: game[x-1][y].x , y: game[x-1][y].y});
                    erased.push({x: game[x-2][y].x , y: game[x-2][y].y});
                } else {
                    game[x-1][y].resetMark();
                    game[x-2][y].resetMark();
                }
            }
        }
        if(y<9){
            if(((game[x][y].mark != game[x][y+1].mark)&&(game[x][y+1].mark != 0))&&((game[x][y+1].mark == game[x][y+2].mark))&&((game[x][y].mark == game[x][y+3].mark))){
                turnScore +=2;
                if (internal == true){
                    game[x][y+1].mark = 0;
                    game[x][y+2].mark = 0;
                    erased.push({x: game[x][y+1].x , y: game[x][y+1].y});
                    erased.push({x: game[x][y+2].x , y: game[x][y+2].y});
                } else {
                    game[x][y+1].resetMark();
                    game[x][y+2].resetMark();
                }
            }
        }
        if(y>2){
            if(((game[x][y].mark != game[x][y-1].mark)&&(game[x][y-1].mark != 0))&&((game[x][y-1].mark == game[x][y-2].mark))&&((game[x][y].mark == game[x][y-3].mark))){
                turnScore +=2;
                if (internal == true){
                    game[x][y-1].mark = 0;
                    game[x][y-2].mark = 0;
                    erased.push({x: game[x][y-1].x , y: game[x][y-1].y});
                    erased.push({x: game[x][y-2].x , y: game[x][y-2].y});
                } else {
                    game[x][y-1].resetMark();
                    game[x][y-2].resetMark();
                }
            }
        }
        if((x<9)&&(y<9)){
            if(((game[x][y].mark != game[x+1][y+1].mark)&&(game[x+1][y+1].mark != 0))&&((game[x+1][y+1].mark == game[x+2][y+2].mark))&&((game[x][y].mark == game[x+3][y+3].mark))){
                turnScore +=2;
                if (internal == true){
                    game[x+1][y+1].mark = 0;
                    game[x+2][y+2].mark = 0;
                    erased.push({x: game[x+1][y+1].x , y: game[x+1][y+1].y});
                    erased.push({x: game[x+2][y+2].x , y: game[x+2][y+2].y});
                } else {
                    game[x+1][y+1].resetMark();
                    game[x+2][y+2].resetMark();
                }
            }
        }
        if((x>2)&&(y>2)){
            if(((game[x][y].mark != game[x-1][y-1].mark)&&(game[x-1][y-1].mark != 0))&&((game[x-1][y-1].mark == game[x-2][y-2].mark))&&((game[x][y].mark == game[x-3][y-3].mark))){
                turnScore +=2;
                if (internal == true){
                    game[x-1][y-1].mark = 0;
                    game[x-2][y-2].mark = 0;
                    erased.push({x: game[x-1][y-1].x , y: game[x-1][y-1].y});
                    erased.push({x: game[x-2][y-2].x , y: game[x-2][y-2].y});
                } else {
                    game[x-1][y-1].resetMark();
                    game[x-2][y-2].resetMark();
                }
            }
        }
        if((x>2)&&(y<9)){
            if(((game[x][y].mark != game[x-1][y+1].mark)&&(game[x-1][y+1].mark != 0))&&((game[x-1][y+1].mark == game[x-2][y+2].mark))&&((game[x][y].mark == game[x-3][y+3].mark))){
                turnScore +=2;
                if (internal == true){
                    game[x-1][y+1].mark = 0;
                    game[x-2][y+2].mark = 0;
                    erased.push({x: game[x-1][y+1].x , y: game[x-1][y+1].y});
                    erased.push({x: game[x-2][y+2].x , y: game[x-2][y+2].y});
                } else {
                    game[x-1][y+1].resetMark();
                    game[x-2][y+2].resetMark();
                }
            }
        }
        if((x<9)&&(y>2)){
            if(((game[x][y].mark != game[x+1][y-1].mark)&&(game[x+1][y-1].mark != 0))&&((game[x+1][y-1].mark == game[x+2][y-2].mark))&&((game[x][y].mark == game[x+3][y-3].mark))){
                turnScore +=2;
                if (internal == true){
                    game[x+1][y-1].mark = 0;
                    game[x+2][y-2].mark = 0; 
                    erased.push({x: game[x+1][y-1].x , y: game[x+1][y-1].y});
                    erased.push({x: game[x+2][y-2].x , y: game[x+2][y-2].y});
                } else {
                    game[x+1][y-1].resetMark();
                    game[x+2][y-2].resetMark();
                }
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
            erased,
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
        } else
        if(roundStartPlayer == 1){
            roundStartPlayer = 0;
        } else
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