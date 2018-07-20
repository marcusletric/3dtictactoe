/**
 * Created by Martyin Kornél
 */

/**
 * Vezérlő prototípus emberi játékos számáre
 *
 * @param renderer {Renderer} a képalkotó objektuma
 * @param gameState {GameState} a játéktér példánya
 * @param op {Op} operátorok konténere
 * @param gameStep {function} lépéskezelő függvény
 * @param userPlayer {number} a felhasználó játékosának azonosítója
 * @constructor
 */
function PlayerControls(renderer,gameState,op,gameStep,userPlayer){
    var raycaster = new THREE.Raycaster();
    var projector = new THREE.Projector();
    var selectedOP = null;

    var controlMeshes = [];
    var selectionMeshes = [];

    var currIndex = 0;
    for(var x = 1; x <= stageSize; x++){
        for(var y = 1; y <= stageSize; y++){
            for(var z = 1; z <= stageSize; z++){
                var geometry = new THREE.IcosahedronGeometry(0.1,2);
                var material = new THREE.MeshBasicMaterial( {
                    visible: false,
                    color: 0x44FF00,
                } );
                var controlMesh = new THREE.Mesh(geometry,material);
                controlMesh.ctrlIndex = currIndex;
                currIndex++;

                geometry = new THREE.BoxBufferGeometry(assets.boxSize,assets.boxSize,assets.boxSize);
                material = new THREE.MeshBasicMaterial( {
                    color: 0x44FF00,
                    transparent: true,
                    opacity: 0.3,
                    visible: false
                } );
                var selectionMesh = new THREE.Mesh(geometry,material);
                var selectionModel = new THREE.Object3D();
                var controlModel = new THREE.Object3D();
                controlModel.add(controlMesh);
                selectionModel.add(selectionMesh);
                controlModel.position.set(((x-(stageSize-1))*assets.boxSize),((y-(stageSize-1))*assets.boxSize),((z-(stageSize-1))*assets.boxSize));
                selectionModel.position.set(((x-(stageSize-1))*assets.boxSize),((y-(stageSize-1))*assets.boxSize),((z-(stageSize-1))*assets.boxSize));
                renderer.scene.add(controlModel);
                renderer.scene.add(selectionModel);
                controlMeshes.push(controlModel);
                selectionMeshes.push(selectionModel);
            }
        }
    }

    window.addEventListener( 'mousemove', onMouseMove, false );
    window.addEventListener( 'click', onClick, false );

    /**
     * A mezőkijelölés eltűntetése
     */
    function hideVisuals(){
        selectionMeshes.forEach(function(visual){
            visual.children[0].material.visible = false;
            selectedOP = null
        });
    }

    /**
     * Egérmozgás hatására mezőkijelölés készítése
     *
     * @param {object} event egérmozgás eseménye
     */
    function onMouseMove(event){
        hideVisuals();
        if(gameState.over() || gameState.nextPlayer() != userPlayer){
            return;
        }
        var mouse = {};
        mouse.x =( event.clientX / window.innerWidth ) * 2 - 1;   //x
        mouse.y =-( event.clientY / window.innerHeight ) * 2 + 1;

        raycaster.setFromCamera( mouse, renderer.camera );
        var intersects = raycaster.intersectObjects( controlMeshes , true );

        if(intersects[0]){
            selectionMeshes[intersects[0].object.ctrlIndex].children[0].material.visible = true;
            selectedOP = intersects[0].object.ctrlIndex;
        }
    }

    /**
     * Klikkelés kezelése, szükség esetén operátoralkalmazás
     */
    function onClick(){
        if(gameState.over()){
            return;
        }
        if(typeof (selectedOP) == 'number' && op.operators[selectedOP].applicable(gameState)){
            op.operators[selectedOP].apply(gameState);
            hideVisuals();
            gameStep();
        }
    }

}