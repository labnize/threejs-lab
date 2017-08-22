var scene, camera,renderer, rouletteScene;
function startGame(){
  console.log('Game started...');
  scene = new THREE.Scene();
  aspect = window.innerWidth/window.innerHeight;
  D = 8;
  camera = new THREE.OrthographicCamera(-D*aspect, D*aspect, D, -D, 1, 1000);
  // camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,200)
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  /*
      var spotLight = new THREE.SpotLight( 0xffffff );
      spotLight.position.set( 100, 1000, 100 );

      spotLight.castShadow = true;

      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;

      spotLight.shadow.camera.near = 500;
      spotLight.shadow.camera.far = 4000;
      spotLight.shadow.camera.fov = 30;

      scene.add( spotLight );
  */
  var light = new THREE.DirectionalLight( 0xffffff, 2 );
  light.position.set( 100, 20, 15 );
  scene.add( light );

  camera.position.set(100,100,100);
  camera.lookAt(new THREE.Vector3(0,0,0));
  camera.rotation.z = 5/6*Math.PI;

  var loader = new THREE.ColladaLoader();
  loader.load("./demo.dae", function( collada ){
      rouletteScene = collada.scene;
      rouletteScene.scale.set(0.03,0.03,0.03);
      rouletteScene.position.set(0,0,0);
      scene.add(rouletteScene);
    },
    function( xhr) {
      console.log((xhr.loaded/xhr.total * 100)+"% loaded");
    });

  render();
}


function render(){
  requestAnimationFrame(render);
  renderer.render(scene, camera);
  if( rouletteScene ){
    rouletteScene.rotation.z = rouletteScene.rotation.z+ 0.01;
  }
}

window.onresize = function() {
  aspect = window.innerWidth/window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
};
