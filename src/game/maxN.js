/**
 * Created by Martyin Kornél
 */

/**
 * maxN algoritmus implementációja
 *
 * @param currentGameState {GameState} aktuális játékállás
 * @param limit {number} mélységi korlát
 * @param heuristic {function} heurisztika függvénye
 * @param operators {Array} operátorok listája
 * @returns {Operator}
 */
function maxN(currentGameState,limit,heuristic,operators){
    var bestOP = null;
    var max = -1000;
    for(var i = 0; i < operators.length; i++){
        //console.log("Operator " + i);
        if(operators[i].applicable(currentGameState)){
			if(currentGameState.moves <= currentGameState.playerNum){
				return operators[i];
			}
            var newState = new GameState(currentGameState.stageSize,currentGameState.rowLength,currentGameState.playerNum);
            newState.setTable(currentGameState.table);
			newState.moves = currentGameState.moves;
            var opState = operators[i].apply(newState);
            var v = maxNRec(opState, limit-1, heuristic, operators);
            if(bestOP == null || v[currentGameState.nextPlayer()] > max){
                max = v[currentGameState.nextPlayer()];
                bestOP = operators[i];
            }
        }
    }
    return bestOP;
}

/**
 * maxN algoritmus rekurziója
 *
 * @param currentGameState {GameState} játékállás
 * @param limit {number} mélységi korlát
 * @param heuristic {function} heurisztika függvény
 * @param operators {Array} operátorok listája
 * @param retValue {object} előző rekurzió eredmény
 * @returns {object} maximális heurisztika a játékos számára
 */
function maxNRec(currentGameState,limit,heuristic,operators){
    var winner = currentGameState.over();
	var retValue = [];
	
    if(winner) {
        if (typeof (winner) == 'number') {
            for (var i = 1; i <= currentGameState.playerNum; i++) {
                retValue[i] = winner == i ? 1000 : -1000;
            }
        } else if(winner == 'deuce') {
            for (i = 1; i <= currentGameState.playerNum; i++) {
                retValue[i] = 0;
            }
        }
        return retValue
    }

    if(limit == 0){
        return heuristic(currentGameState);
    }

    for(i = 0; i < operators.length; i++){
        if(operators[i].applicable(currentGameState)){
            var newState = new GameState(currentGameState.stageSize,currentGameState.rowLength,currentGameState.playerNum);
            newState.setTable(currentGameState.table);
			newState.moves = currentGameState.moves;
            var opState = operators[i].apply(newState);
            var v = maxNRec(opState, limit-1, heuristic, operators);
            if(retValue.length < 1 || v[currentGameState.nextPlayer()] > retValue[currentGameState.nextPlayer()]){
                retValue = v;
            }
            if(retValue[currentGameState.nextPlayer()] == 1000){
                break;
            }
        }
    }

    return retValue;
}