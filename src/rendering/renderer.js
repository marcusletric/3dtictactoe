/**
 * Martyin Kornél
 */

/**
 * THREE.JS képalkotó konténere
 *
 * @param element {jQuery} a képalkotás HTML eleme
 * @constructor
 */
function Renderer(element){
    var config = {
        'camera':{
            'fov':75,
            'aspect':element.width()/element.height(),
            'near':0.01,
            'far':1000
        },
        'dimensions':{
            'width':element.width(),
            'height':element.height()
        }
    };

    var self = this;

    self.scene = new THREE.Scene();
    var sceneElements = [];
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    var baseCamera = new THREE.PerspectiveCamera(config.camera.fov, config.camera.aspect, config.camera.near, config.camera.far);

    self.camera = baseCamera;

    var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 2.2 );
    hemiLight.color.setHSL( 0, 0, 1.1);
    hemiLight.groundColor.setHSL( 0, 0, 0.6 );
    hemiLight.position.set( 0, 500, 0 );

    var dirLight = new THREE.DirectionalLight( 0xffffff, 1.3 );
    dirLight.color.setHSL( 0.1, 1, 0.95 );
    dirLight.position.set( 1, 1.75, -0.7 );
    dirLight.position.multiplyScalar( 200 );

    dirLight.castShadow = true;

    dirLight.shadow.mapSize.width = 4096;
    dirLight.shadow.mapSize.height = 4096;

    var d = 100;

    dirLight.shadow.camera.left = -d;
    dirLight.shadow.camera.right = d;
    dirLight.shadow.camera.top = d;
    dirLight.shadow.camera.bottom = -d;

    dirLight.shadow.camera.far = 1000;
    dirLight.shadow.bias = -0.0003;


    /**
     * Térelem hozzáadása a színtérhez
     *
     * @param object {THREE.Object3D} a hozzáadandó objektum
     */
    this.addObject = function(object){
        sceneElements.push(object);
        self.scene.add(object);
    };

    /**
     * Minden korábban hozzáadott térelem eltávolítása
     */
    this.empty = function(){
        sceneElements.forEach(function(element){
           self.removeObject(element);
        });
    };

    /**
     * Térelem eltávolítása a képalkotás színteréről
     *
     * @param object {THREE.Object3D} az eltávolítandó objektum
     */
    this.removeObject = function(object) {
        self.scene.remove(object);
    };

    var controls = new THREE.OrbitControls( baseCamera, renderer.domElement );
    //controls.addEventListener( 'change', render ); // add this only if there is no animation loop (requestAnimationFrame)

    baseCamera.position.set(3,0,0);

    controls.enableDamping = false;
    controls.dampingFactor = 0.5;
    controls.enableZoom = true;

    self.scene.add(hemiLight);
    self.scene.add(dirLight);
    self.scene.add(baseCamera);

    element.append(renderer.domElement);
    renderer.setSize(config.dimensions.width,config.dimensions.height);
    renderer.setPixelRatio(1);
    renderer.antialias = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.physicallyCorrectLights = true;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    renderer.shadowMap.cullFace = THREE.CullFaceBack;

    render();

    window.onresize = function(){
        renderer.setSize(element.width(),element.height());
        baseCamera.aspect = element.width()/element.height();
        baseCamera.updateProjectionMatrix();
    };

    /**
     * Képalkotás rekurziója
     */
    function render() {
        requestAnimationFrame(render);
        controls.update();
        renderer && renderer.render(self.scene, baseCamera);
    }

}