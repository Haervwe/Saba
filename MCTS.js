import * as tf from '@tensorflow/tfjs-node';

EPS = 1e-8;

class MTCS {
    constructor(game, nnet, args) {
        this.game = game;
        this.nnet = nnet;
        this.args = args;
        this.Qsa = {};  // stores Q values for s,a (as defined in the paper)
        this.Nsa = {};  // stores #times edge s,a was visited
        this.Ns = {};  // stores #times board s was visited
        this.Ps = {};  // stores initial policy (returned by neural net)
        this.Es = {};  // stores game.getGameEnded ended for board s
        this.Vs = {};  // stores game.getValidMoves for board s
    }
}





// utility function for agent training.
function checkWinner(game,x,y){

    let turnScore = 0;
    let reset = false;
    //let erased = [];
    
    //checks for 4 in a row

    if(x<9){
        if((game[x][y] == game[x+1][y])&&(game[x+1][y] == game[x+2][y])&&(game[x+2][y] == game[x+3][y])){
            turnScore +=3;
        }
    }
    if(x>2){
        if((game[x][y] == game[x-1][y])&&(game[x-1][y] == game[x-2][y])&&(game[x-2][y] == game[x-3][y])){
            turnScore +=3;
        }
    }
    if(y<9){
        if((game[x][y] == game[x][y+1])&&(game[x][y+1] == game[x][y+2])&&(game[x][y+2] == game[x][y+3])){
            turnScore +=3;
        }
    }
    if(y>2){
        if((game[x][y] == game[x][y-1])&&(game[x][y-1] == game[x][y-2])&&(game[x][y-2] == game[x][y-3])){
            turnScore +=3;
        }
    }
    if((x<9)&&(y<9)){
        if((game[x][y] == game[x+1][y+1])&&(game[x+1][y+1] == game[x+2][y+2])&&(game[x+2][y+2] == game[x+3][y+3])){
            turnScore +=3;
        }
    }
    if((x>2)&&(y>2)){
        if((game[x][y] == game[x-1][y-1])&&(game[x-1][y-1] == game[x-2][y-2])&&(game[x-2][y-2] == game[x-3][y-3])){
            turnScore +=3;
        }
    }
    if((x>2)&&(y<9)){
        if((game[x][y] == game[x-1][y+1])&&(game[x-1][y+1] == game[x-2][y+2])&&(game[x-2][y+2] == game[x-3][y+3])){
            turnScore +=3;
        }
    }
    if((x<9)&&(y>2)){
        if((game[x][y] == game[x+1][y-1])&&(game[x+1][y-1] == game[x+2][y-2])&&(game[x+2][y-2] == game[x+3][y-3])){
            turnScore +=3;
        }
    }

    if((x<10)&&(x>0)){
        if((game[x][y] == game[x-1][y])&&(game[x][y] == game[x+1][y])&&(game[x+1][y] == game[x+2][y])){
            turnScore +=3;
        }
    }
    if((x>1)&&(x<11)){
        if((game[x][y] == game[x+1][y])&&(game[x][y] == game[x-1][y])&&(game[x-1][y] == game[x-2][y])){
            turnScore +=3;
        }
    }
    if((y<10)&&(y>0)){
        if((game[x][y] == game[x][y-1])&&(game[x][y] == game[x][y+1])&&(game[x][y+1] == game[x][y+2])){
            turnScore +=3;
        }
    }
    if((y>1)&&(y<11)){
        if((game[x][y] == game[x][y+1])&&(game[x][y] == game[x][y-1])&&(game[x][y-1] == game[x][y-2])){
            turnScore +=3;
        }
    }
    if((x<10)&&(y<10)&&(x>0)&&(y>0)){
        if((game[x][y] == game[x-1][y-1])&&(game[x][y] == game[x+1][y+1])&&(game[x+1][y+1] == game[x+2][y+2])){
            turnScore +=3;
        }
    }
    if((x>1)&&(y>1)&&(x<11)&&(y<11)){
        if((game[x][y] == game[x+1][y+1])&&(game[x][y] == game[x-1][y-1])&&(game[x-1][y-1] == game[x-2][y-2])){
            turnScore +=3;
        }
    }
    if((x>1)&&(y<10)&&(x<11)&&(y>0)){
        if((game[x][y] == game[x+1][y-1])&&(game[x][y] == game[x-1][y+1])&&(game[x-1][y+1] == game[x-2][y+2])){
            turnScore +=3;
        }
    }
    if((x<10)&&(y>1)&&(x>0)&&(y<11)){
        if((game[x][y] == game[x-1][y+1])&&(game[x][y] == game[x+1][y-1])&&(game[x+1][y-1] == game[x+2][y-2])){
            turnScore +=3;
        }
    }

    //checks for an eats 2 move and erase eaten marks.

    if(x<9){
        if(((game[x][y] != game[x+1][y])&&(game[x+1][y] != 0))&&((game[x+1][y] == game[x+2][y]))&&((game[x][y] == game[x+3][y]))){
            turnScore +=2;
            game[x+1][y] = 0;
            game[x+2][y] = 0;
            //erased.push({x: game[x+1][y].x , y: game[x+1][y].y});
            //erased.push({x: game[x+2][y].x , y: game[x+2][y].y});
        }
    }
    if(x>2){
        if(((game[x][y] != game[x-1][y])&&(game[x-1][y] != 0))&&((game[x-1][y] == game[x-2][y]))&&((game[x][y] == game[x-3][y]))){
            turnScore +=2;
            game[x-1][y] = 0;
            game[x-2][y] = 0;
            //erased.push({x: game[x-1][y].x , y: game[x-1][y].y});
            //erased.push({x: game[x-2][y].x , y: game[x-2][y].y});
        }
    }
    if(y<9){
        if(((game[x][y] != game[x][y+1])&&(game[x][y+1] != 0))&&((game[x][y+1] == game[x][y+2]))&&((game[x][y] == game[x][y+3]))){
            turnScore +=2;
            game[x][y+1] = 0;
            game[x][y+2] = 0;
            //erased.push({x: game[x][y+1].x , y: game[x][y+1].y});
            //erased.push({x: game[x][y+2].x , y: game[x][y+2].y});
        }
    }
    if(y>2){
        if(((game[x][y] != game[x][y-1])&&(game[x][y-1] != 0))&&((game[x][y-1] == game[x][y-2]))&&((game[x][y] == game[x][y-3]))){
            turnScore +=2;
            game[x][y-1] = 0;
            game[x][y-2] = 0;
            //erased.push({x: game[x][y-1].x , y: game[x][y-1].y});
            //erased.push({x: game[x][y-2].x , y: game[x][y-2].y});
        }
    }
    if((x<9)&&(y<9)){
        if(((game[x][y] != game[x+1][y+1])&&(game[x+1][y+1] != 0))&&((game[x+1][y+1] == game[x+2][y+2]))&&((game[x][y] == game[x+3][y+3]))){
            turnScore +=2;
            game[x+1][y+1] = 0;
            game[x+2][y+2] = 0;
            //erased.push({x: game[x+1][y+1].x , y: game[x+1][y+1].y});
            //erased.push({x: game[x+2][y+2].x , y: game[x+2][y+2].y});
        }
    }
    if((x>2)&&(y>2)){
        if(((game[x][y] != game[x-1][y-1])&&(game[x-1][y-1] != 0))&&((game[x-1][y-1] == game[x-2][y-2]))&&((game[x][y] == game[x-3][y-3]))){
            turnScore +=2;
            game[x-1][y-1] = 0;
            game[x-2][y-2] = 0;
            //erased.push({x: game[x-1][y-1].x , y: game[x-1][y-1].y});
            //erased.push({x: game[x-2][y-2].x , y: game[x-2][y-2].y});
        }
    }
    if((x>2)&&(y<9)){
        if(((game[x][y] != game[x-1][y+1])&&(game[x-1][y+1] != 0))&&((game[x-1][y+1] == game[x-2][y+2]))&&((game[x][y] == game[x-3][y+3]))){
            turnScore +=2;
            game[x-1][y+1] = 0;
            game[x-2][y+2] = 0;
            //erased.push({x: game[x-1][y+1].x , y: game[x-1][y+1].y});
            //erased.push({x: game[x-2][y+2].x , y: game[x-2][y+2].y});
        }
    }
    if((x<9)&&(y>2)){
        if(((game[x][y] != game[x+1][y-1])&&(game[x+1][y-1] != 0))&&((game[x+1][y-1] == game[x+2][y-2]))&&((game[x][y] == game[x+3][y-3]))){
            turnScore +=2;
            game[x+1][y-1] = 0;
            game[x+2][y-2] = 0; 
            //erased.push({x: game[x+1][y-1].x , y: game[x+1][y-1].y});
            //erased.push({x: game[x+2][y-2].x , y: game[x+2][y-2].y});
        }
    }

    //checks for 5 in a row wich resets the board

    if(x<8){
        if((game[x][y] == game[x+1][y])&&(game[x+1][y] == game[x+2][y])&&(game[x+2][y] == game[x+3][y])&&(game[x+3][y] == game[x+4][y])){
            turnScore +=2;
            reset = true;
        }
    }
    if(x>3){
        if((game[x][y] == game[x-1][y])&&(game[x-1][y] == game[x-2][y])&&(game[x-2][y] == game[x-3][y])&&(game[x-3][y] == game[x-4][y])){
            turnScore +=2;
            reset = true;
        }
    }
    if(y<8){
        if((game[x][y] == game[x][y+1])&&(game[x][y+1] == game[x][y+2])&&(game[x][y+2] == game[x][y+3])&&(game[x][y+3] == game[x][y+4])){
            turnScore +=2;
            reset = true;
        }
    }
    if(y>3){
        if((game[x][y] == game[x][y-1])&&(game[x][y-1] == game[x][y-2])&&(game[x][y-2] == game[x][y-3])&&(game[x][y-3] == game[x][y-4])){
            turnScore +=2;
            reset = true;
        }
    }
    if((x<8)&&(y<8)){
        if((game[x][y] == game[x+1][y+1])&&(game[x+1][y+1] == game[x+2][y+2])&&(game[x+2][y+2] == game[x+3][y+3])&&(game[x+3][y+3] == game[x+4][y+4])){
            turnScore +=2;
            reset = true;
        }
    }
    if((x>3)&&(y>3)){
        if((game[x][y] == game[x-1][y-1])&&(game[x-1][y-1] == game[x-2][y-2])&&(game[x-2][y-2] == game[x-3][y-3])&&(game[x-3][y-3] == game[x-4][y-4])){
            turnScore +=2;
            reset = true;
        }
    }
    if((x>3)&&(y<8)){
        if((game[x][y] == game[x-1][y+1])&&(game[x-1][y+1] == game[x-2][y+2])&&(game[x-2][y+2] == game[x-3][y+3])&&(game[x-3][y+3] == game[x-4][y+4])){
            turnScore +=2;
            reset = true;
        }
    }
    if((x<8)&&(y>3)){
        if((game[x][y] == game[x+1][y-1])&&(game[x+1][y-1] == game[x+2][y-2])&&(game[x+2][y-2] == game[x+3][y-3])&&(game[x+3][y-3] == game[x+4][y-4])){
            turnScore +=2;
            reset = true;
        }
    }

    // //
    if((x<9)&&(x>0)){
        if((game[x][y] == game[x-1][y])&&(game[x][y] == game[x+1][y])&&(game[x+1][y] == game[x+2][y])&&(game[x+2][y] == game[x+3][y])){
            turnScore -=1;
            reset = true;
        }
    }
    if((x>2)&&(x<11)){
        if((game[x][y] == game[x+1][y])&&(game[x][y] == game[x-1][y])&&(game[x-1][y] == game[x-2][y])&&(game[x-2][y] == game[x-3][y])){
            turnScore -=1;
            reset = true;
        }
    }
    if((y<9)&&(y>0)){
        if((game[x][y] == game[x][y-1])&&(game[x][y] == game[x][y+1])&&(game[x][y+1] == game[x][y+2])&&(game[x][y+2] == game[x][y+3])){
            turnScore -=1;
            reset = true;
        }
    }
    if((y>2)&&(y<11)){
        if((game[x][y] == game[x][y+1])&&(game[x][y] == game[x][y-1])&&(game[x][y-1] == game[x][y-2])&&(game[x][y-2] == game[x][y-3])){
            turnScore -=1;
            reset = true;
        }
    }
    if((x<9)&&(y<9)&&(x>0)&&(y>0)){
        if((game[x][y] == game[x-1][y-1])&&(game[x][y] == game[x+1][y+1])&&(game[x+1][y+1] == game[x+2][y+2])&&(game[x+2][y+2] == game[x+3][y+3])){
            turnScore +=2;
            reset = true;
        }
    }
    if((x>2)&&(y>2)&&(x<11)&&(y<11)){
        if((game[x][y] == game[x+1][y+1])&&(game[x][y] == game[x-1][y-1])&&(game[x-1][y-1] == game[x-2][y-2])&&(game[x-2][y-2] == game[x-3][y-3])){
            turnScore +=2;
            reset = true;
        }
    }
    if((x>2)&&(y<9)&&(x<11)&&(y>0)){
        if((game[x][y] == game[x+1][y-1])&&(game[x][y] == game[x-1][y+1])&&(game[x-1][y+1] == game[x-2][y+2])&&(game[x-2][y+2] == game[x-3][y+3])){
            turnScore +=2;
            reset = true;
        }
    }
    if((x<9)&&(y>2)&&(x>0)&&(y<11)){
        if((game[x][y] == game[x-1][y+1])&&(game[x][y] == game[x+1][y-1])&&(game[x+1][y-1] == game[x+2][y-2])&&(game[x+2][y-2] == game[x+3][y-3])){
            turnScore +=2;
            reset = true;
        }
    }
    // //
    if((x>1)&&(x<10)){
        if((game[x][y] == game[x+1][y])&&(game[x][y] == game[x+2][y])&&(game[x][y] == game[x-1][y])&&(game[x][y] == game[x-2][y])){
            turnScore -=1;
            reset = true;
        }
    }
    if((y>1)&&(y<10)){
        if((game[x][y] == game[x][y-1])&&(game[x][y] == game[x][y-2])&&(game[x][y] == game[x][y+1])&&(game[x][y] == game[x][y+2])){
            turnScore -=1;
            reset = true;
        }
    }
    if((x>1)&&(y<10)&&(x<10)&&(y>1)){
        if((game[x][y] == game[x+1][y-1])&&(game[x][y] == game[x+2][y-2])&&(game[x][y] == game[x-1][y+1])&&(game[x][y] == game[x-2][y+2])){
            turnScore -=1;
            reset = true;
        }
    }
    if((x>1)&&(y<10)&&(x<10)&&(y>1)){
        if((game[x][y] == game[x+1][y+1])&&(game[x][y] == game[x+2][y+2])&&(game[x][y] == game[x-1][y-1])&&(game[x][y] == game[x-2][y-2])){
            turnScore -=1;
            reset = true;
        }
    }

    return {
        //erased,
        reset,
        score: turnScore,
    };
}