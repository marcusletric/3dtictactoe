/**
 * Created by Martyin Kornél
 */

/**
 * Operátor prototípusa
 *
 * @param x {number} az operátor alkalmazásának x koordinátája
 * @param y {number} az operátor alkalmazásának y koordinátája
 * @param z {number} az operátor alkalmazásának z koordinátája
 * @constructor
 */
function Operator(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;

    this.apply = function(gameState){
        gameState.table[x][y][z] = gameState.nextPlayer();
        gameState.moves++;
        return gameState;
    };

    this.applicable= function(gameState){
        return !gameState.table[x][y][z];
    };
}

/**
 * Operátorok tárolója, generátora
 *
 * @param stageSize a játéktér mezőinek száma egy sorban
 * @constructor
 */
function Op(stageSize){
    this.operators = [];

    for(var x = 1; x <= stageSize; x++){
        for(var y = 1; y <= stageSize; y++){
            for(var z = 1; z <= stageSize; z++){
                this.operators.push(new Operator(x,y,z));
            }
        }
    }
}