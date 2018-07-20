/**
 * Created by Martyin Kornél
 */

/**
 * Heurisztikát számol legfeljebb három játékos számára
 *
 * @param actualGameState {GameState} Aktuális játékállás
 * @returns {{1: number, 2: number, 3: number}}
 */
function heuristic(actualGameState){
    var heur = {1:0,2:0,3:0};
    for(var x = 1; x <= actualGameState.stageSize;x++){
        for(var y = 1; y <= actualGameState.stageSize;y++){
            for(var z = 1; z <= actualGameState.stageSize;z++){
                var actualField = actualGameState.table[x][y][z];
                if(actualField != 0){
                    var clusterSize = calculateNeighborhood(actualGameState,x,y,z);
                    if(clusterSize > heur[actualField]){
                        heur[actualField] = clusterSize;
                    }
                }
            }
        }
    }

    return heur;
}

/**
 * Megszámolja az aktuális koordinátával szomszédos azonos figurákat
 *
 * @param gameState Aktuális játékállás
 * @param x {number} x koordináta a játéktérben
 * @param y {number} y koordináta a játéktérben
 * @param z {number} z koordináta a játéktérben
 * @returns {number}
 */
function calculateNeighborhood(gameState,x,y,z){
    var count = 0;

    /*
     for(var i=0; i < utils.directions; i++ ){
        if( gameState.table[x+utils.directions[i].x] &&
            gameState.table[x+utils.directions[i].x][y+utils.directions[i].y] &&
            gameState.table[x+utils.directions[i].x][y+utils.directions[i].y][z+utils.directions[i].z] == gameState.table[x][y][z]){
            count++;
        }
     }
     */


    // Sarkok
    if(x==1 && x==y && y==z){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y+1][z+1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==1 && y==gameState.stageSize && x==z){
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y-1][z+1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==1 && y==x && z==gameState.stageSize){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y+1][z-1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==1 && y==gameState.stageSize && z==gameState.stageSize){
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y-1][z-1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==gameState.stageSize && y==1 && z==1){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y+1][z+1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==gameState.stageSize && y==gameState.stageSize && z==1){
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y-1][z+1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==gameState.stageSize && y==1 && z==gameState.stageSize){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y+1][z-1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==gameState.stageSize && y==gameState.stageSize && z==gameState.stageSize){
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y-1][z-1] == gameState.table[x][y][z]){
            count++
        }
    }





    // Szélközepek

    if(x==1 && y==1 && z==Math.ceil(gameState.stageSize/2)){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==1 && y==Math.ceil(gameState.stageSize/2) && z==1){
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==1 && y==Math.ceil(gameState.stageSize/2) && z==gameState.stageSize){
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==1 && y==gameState.stageSize && z==Math.ceil(gameState.stageSize/2)){
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==Math.ceil(gameState.stageSize/2) && y==1 && z==1){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==Math.ceil(gameState.stageSize/2) && y==1 && z==gameState.stageSize){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==Math.ceil(gameState.stageSize/2) && y==gameState.stageSize && z==1){
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==Math.ceil(gameState.stageSize/2) && y==gameState.stageSize && z==gameState.stageSize){
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==gameState.stageSize && y==Math.ceil(gameState.stageSize/2) && z==1){
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==gameState.stageSize && y==Math.ceil(gameState.stageSize/2) && z==gameState.stageSize){
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==gameState.stageSize && y==1 && z==Math.ceil(gameState.stageSize/2)){
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y+1][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==gameState.stageSize && y==gameState.stageSize && z==Math.ceil(gameState.stageSize/2)){
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y-1][z] == gameState.table[x][y][z]){
            count++
        }
    }


    //Lapközepek
    if(x==Math.ceil(gameState.stageSize/2) && y==x && z==1){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }
    if(x==Math.ceil(gameState.stageSize/2) && y==1 && z==x){
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }
    if(x==Math.ceil(gameState.stageSize/2) && y==x && z==gameState.stageSize){
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }
    if(x==Math.ceil(gameState.stageSize/2) && y==gameState.stageSize && z==x){
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }

    if(x==1 && y==Math.ceil(gameState.stageSize/2) && z==y){
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }
    if(x==gameState.stageSize && y==Math.ceil(gameState.stageSize/2) && z==y){
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
    }




    //Absz. középpont
    if(x==Math.ceil(gameState.stageSize/2) && y==x && z==x){
        if(gameState.table[x][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y-1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x][y+1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y-1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y-1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y+1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x-1][y+1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y+1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y-1][z] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y+1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y-1][z+1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y+1][z-1] == gameState.table[x][y][z]){
            count++
        }
        if(gameState.table[x+1][y-1][z-1] == gameState.table[x][y][z]){
            count++
        }
    }

    return count;
}