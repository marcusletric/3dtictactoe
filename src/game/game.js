/**
 * Created by Martyin Kornél
 *
 * 3D Tic tac toe játék.
 */
var stageSize = 3;
var renderer = new Renderer($("#renderFrame"));
var assets = new Assets();
var gameState = new GameState(stageSize,3,3);
var op = new Op(stageSize);
var stageModel = assets.createStage(stageSize);
var figures = [];
var figureNames = ['', 'gömb', 'kocka', 'tetraéder'];

var userPlayer = 1;

var cpuLVL = {
    2: 5,
    3: 3
};

figures.push(null);
figures.push(assets.sphere());
figures.push(assets.box());
figures.push(assets.pyramid());

/**
 * Játékállás megjelenítése
 *
 * @param state {GameState} játékállás
 */
function renderState(state) {
    renderer.empty();
    renderer.addObject(stageModel);
    for(var x = 1; x <= stageSize; x++){
        for(var y = 1; y <= stageSize; y++){
            for(var z = 1; z <= stageSize; z++){
                if(state.table[x][y][z] != 0){
                    var figure = figures[state.table[x][y][z]].clone();
                    figure.position.set(((x-(stageSize-1))*assets.boxSize),((y-(stageSize-1))*assets.boxSize),((z-(stageSize-1))*assets.boxSize));
                    renderer.addObject(figure);
                }
            }
        }
    }
}

/**
 * Gépi játékos lépésének kiszámolása, alkalmazása
 */
function cpuMove(){
    var offerOP = maxN(gameState,cpuLVL[gameState.nextPlayer()],heuristic,op.operators);
    offerOP.apply(gameState);
    renderState(gameState);
    gameStep();
}

/**
 * A játékban lépés történt, frissítjük a megjelenítést
 */
function gameStep(){
    if(gameState.nextPlayer() != userPlayer && !gameState.over()) {
        setTimeout(cpuMove,100);
    }
    renderState(gameState);
    if(gameState.over()){
        setTimeout(function(){if(confirm(gameState.over() == 'deuce' ? 'Döntetlen!':'A ' + figureNames[gameState.over()] + ' nyert!\nÚj játék indítása?')){
            gameState = new GameState(stageSize,3,3);
            gameStep();
            new PlayerControls(renderer,gameState,op,gameStep,userPlayer);
        }},100);
    }
}

gameStep();

new PlayerControls(renderer,gameState,op,gameStep,userPlayer);