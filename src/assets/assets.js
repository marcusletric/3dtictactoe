/**
 * Created by Martyin Kornél
 */

/**
 * Játéktér térbeli elemei
 *
 * @constructor
 */
function Assets(){
    this.boxSize = 0.5;

    var lineMaterial = new THREE.LineBasicMaterial( { color: 0x002000, transparent: true, opacity: 0.2, linewidth: 2 } );
    var figureSize = this.boxSize * 0.7;

    /**
     * Játéktér létrehozása kockaélek vonalaiból.
     *
     * @param size {number} a pálya mérete (kockák száma egy élen)
     * @returns {THREE.Object3D}
     */
    this.createStage = function(size){
        var box = createBox(new THREE.Vector3(0,0,0),this.boxSize);
        return multiply(box,size,size,size);
    };

    /**
     * Gömb játékos modellje
     *
     * @returns {THREE.Object3D}
     */
    this.sphere = function(){
        var sphereModel = new THREE.Object3D();
        var geometry = new THREE.IcosahedronGeometry(figureSize/2,3);
        var material = new THREE.MeshPhysicalMaterial( {
            map: null,
            color: 0xff0000,
            metalness: 0.3,
            roughness: 0.2,
            opacity: 0.4,
            side: THREE.FrontSide,
            transparent: true,
            shading: THREE.SmoothShading,
            envMapIntensity: 5,
            premultipliedAlpha: true
        } );
        var sphereMesh = new THREE.Mesh( geometry, material );
        sphereModel.add(sphereMesh);
        return sphereModel;
    };

    /**
     * Kocka játékos modellje
     *
     * @returns {THREE.Object3D}
     */
    this.box = function(){
        var sphereModel = new THREE.Object3D();
        var geometry = new THREE.BoxBufferGeometry( figureSize, figureSize, figureSize );
        var material = new THREE.MeshPhysicalMaterial( {
            map: null,
            color: 0x0000ff,
            metalness: 0.3,
            roughness: 0.2,
            opacity: 0.4,
            side: THREE.FrontSide,
            transparent: true,
            shading: THREE.SmoothShading,
            envMapIntensity: 5,
            premultipliedAlpha: true
        } );
        var sphereMesh = new THREE.Mesh( geometry, material );
        sphereModel.add(sphereMesh);
        return sphereModel;
    };

    /**
     * Tetraéder játékos modellje
     *
     * @returns {THREE.Object3D}
     */
    this.pyramid = function(){
        var pyramidModel = new THREE.Object3D();
        var geometry = new THREE.TetrahedronGeometry( figureSize*0.8 );
        var material = new THREE.MeshPhysicalMaterial( {
            map: null,
            color: 0x00ff00,
            metalness: 0.3,
            roughness: 0.2,
            opacity: 0.4,
            side: THREE.FrontSide,
            transparent: true,
            shading: THREE.SmoothShading,
            envMapIntensity: 5,
            premultipliedAlpha: true
        } );
        var pyramidMesh = new THREE.Mesh( geometry, material );
        pyramidMesh.setRotationFromAxisAngle(new THREE.Vector3(1,0,1).normalize(),Math.PI + Math.PI/3.3);
        pyramidMesh.position.set(0,-0.1,0);
        pyramidModel.add(pyramidMesh);
        return pyramidModel;
    };


    /**
     * Egy szakasz legyártása
     *
     * @param startPoint {THREE.Vector3} kezdőpont
     * @param endPoint {THREE.Vector3} végpont
     * @returns {THREE.Line}
     */
    function createLine(startPoint, endPoint){
        var lineObj = new THREE.Object3D();
        var geometry = new THREE.Geometry();
        geometry.vertices.push(startPoint);
        geometry.vertices.push(endPoint);
        lineObj.add(new THREE.Line( geometry, lineMaterial ));

        return lineObj;
    }

    /**
     * Egy kocka legyártásának metódusa
     *
     * @param center {THREE.Vector3} a kocka középpontja
     * @param edgeLength {number} oldalhossz
     * @returns {THREE.Object3D}
     */
    function createBox(center, edgeLength){
        var boxVertices = [];
        var boxModel = new THREE.Object3D();
        var top = (edgeLength / 2) + center.y;
        var bottom = (-edgeLength / 2) + center.y;
        var front = (edgeLength / 2) + center.z;
        var back = (-edgeLength / 2) + center.z;
        var right = (edgeLength / 2) + center.x;
        var left = (-edgeLength / 2) + center.x;
        boxVertices.push(new THREE.Vector3(left,top,front));
        boxVertices.push(new THREE.Vector3(right,top,front));
        boxVertices.push(new THREE.Vector3(right,top,back));
        boxVertices.push(new THREE.Vector3(left,top,back));
        boxVertices.push(new THREE.Vector3(left,bottom,front));
        boxVertices.push(new THREE.Vector3(right,bottom,front));
        boxVertices.push(new THREE.Vector3(right,bottom,back));
        boxVertices.push(new THREE.Vector3(left,bottom,back));
        for(i = 0; i < 4; i++){
            var next = i < 3 ? i + 1 : 0;
            boxModel.add(createLine(boxVertices[i],boxVertices[next]));
            boxModel.add(createLine(boxVertices[i+4],boxVertices[next+4]));
            boxModel.add(createLine(boxVertices[i],boxVertices[i+4]));
        }
        return boxModel;
    }

    /**
     * Modell sokszorozása
     *
     * @param model {THREE.Object3D} a sokszorozandó modell
     * @param xMult {number} x tengely mentén történő sokszorozás száma
     * @param yMult {number} y tengely mentén történő sokszorozás száma
     * @param zMult {number} z tengely mentén történő sokszorozás száma
     * @returns {THREE.Object3D}
     */
    function multiply(model,xMult,yMult,zMult) {
        var newModel = new THREE.Object3D;
        var cursor = null;

        var boxHelper = new THREE.BoundingBoxHelper( model, 0xff0000 );
        boxHelper.update();
        boundbox = boxHelper.box;

        cursor = model.clone();
        cursor.translateX(-boundbox.max.x*(xMult-1));
        cursor.translateY(boundbox.min.y*(yMult-1));
        cursor.translateZ(-boundbox.max.z*(zMult-1));
        for (var x = 0; x < xMult; x++) {
            newModel.add(cursor.clone());
            cursor.translateX(boundbox.max.x*2);
        }
        cursor = newModel.clone();
        for (var y = 0; y < yMult; y++) {
            newModel.add(cursor.clone());
            cursor.translateY(boundbox.max.y*2);
        }
        cursor = newModel.clone();
        for (var z = 0; z < zMult; z++) {
            newModel.add(cursor.clone());
            cursor.translateZ(boundbox.max.z*2);
        }

        return newModel;
    }


}