import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { RectAreaLightHelper } from './RectAreaLightHelper.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );

scene.background = new THREE.Color( 0x525252 );
renderer.setSize( window .innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// 🕶️ S H D A D O W ( E N A B L E D ) 🕶️
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// 📝 V A R I A B L E S 📝
let rotateNinetyDeg = Math.PI*0.5;
let wallTexture, 
    floorTexture, 
    cushionTexture, 
    keybTexture, 
    pcTexture, 
    monitorTexture, 
    tvTexture, 
    metalTexture, 
    tableTexture;

// ⚙️ S E T T I N G S ⚙️
let wireframeStatus = false; // set to 'true' to enable wireframe. 'true'|'false'
let enableGridHelper = false; // set to 'true' to enable grid helper. 'true'|'false'
let enableLightHelper = false; // set to 'true' to enable light helper. 'true'|'false'
let enableTextures = true; // set to 'true' to enable textures. 'true'|'false'

// 🕳️ T E X T U R E S 🕳️
if (enableTextures == true)
{
    wallTexture = new THREE.TextureLoader().load( './assets/textures/wall_texture.jpg');
    wallTexture.wrapS = THREE.RepeatWrapping;
    wallTexture.wrapT = THREE.RepeatWrapping;
    wallTexture.repeat.set(2,2);
    
    floorTexture = new THREE.TextureLoader().load( './assets/textures/carpet_texture.jpg');
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10,10);
    
    cushionTexture = new THREE.TextureLoader().load( './assets/textures/cotton_texture.jpg');
    cushionTexture.wrapS = THREE.RepeatWrapping;
    cushionTexture.wrapT = THREE.RepeatWrapping;
    cushionTexture.repeat.set(2,2);
    
    keybTexture = new THREE.TextureLoader().load( './assets/textures/keyboard_texture.jpg');
    keybTexture.wrapS = THREE.RepeatWrapping;
    keybTexture.wrapT = THREE.RepeatWrapping;
    keybTexture.rotation = rotateNinetyDeg;
    keybTexture.repeat.set(1,1);
    
    pcTexture = new THREE.TextureLoader().load( './assets/textures/pc_texture.png');
    pcTexture.wrapS = THREE.RepeatWrapping;
    pcTexture.wrapT = THREE.RepeatWrapping;
    pcTexture.repeat.set(1,1);
    
    monitorTexture = new THREE.TextureLoader().load( './assets/textures/monitor_texture.jpg');
    tvTexture = new THREE.TextureLoader().load( './assets/textures/tv_texture.jpg');
    metalTexture = new THREE.TextureLoader().load( './assets/textures/metal_texture.jpg');
    tableTexture = new THREE.TextureLoader().load( './assets/textures/carbon-fiber_texture.jpg');
}

// 🏠 R O O M  B O U N D A R I E S 🏠
// F L O O R
const floorGeo = new THREE.BoxGeometry( 5, .1, 5);
const floorMat = new THREE.MeshStandardMaterial( {map: floorTexture, color:0x9c804e, wireframe: wireframeStatus} );
const floorMesh = new THREE.Mesh( floorGeo, floorMat );
floorMesh.receiveShadow = true;
floorMesh.position.set(0,0,0);
scene.add(floorMesh);

// W A L L ( L )
const leftWallGeo = new THREE.BoxGeometry( .1, 2.9, 5);
const leftWallMat = new THREE.MeshStandardMaterial( {map: wallTexture, color:0xf7f7f7, wireframe: wireframeStatus} );
const leftWallMesh = new THREE.Mesh( leftWallGeo, leftWallMat );
leftWallMesh.position.set(-2.55,1.5,0);
scene.add(leftWallMesh);

// W A L L ( R )
// divided into 4 wall panels to create a window and a window divider
const rightWall1Geo = new THREE.BoxGeometry( .1, 2.9, 2.5);
const rightWallMat = new THREE.MeshStandardMaterial( {map: wallTexture, color:0xf7f7f7, wireframe: wireframeStatus} );
const rightWall1Mesh = new THREE.Mesh( rightWall1Geo, rightWallMat );
rightWall1Mesh.castShadow = true;

const rightWall2Geo = new THREE.BoxGeometry( .1, 2.9, 1);
const rightWall2Mesh = new THREE.Mesh( rightWall2Geo, rightWallMat );
rightWall2Mesh.castShadow = true;

const rightWall3Geo = new THREE.BoxGeometry( .1, 1.2, 1.5);
const rightWall3Mesh = new THREE.Mesh( rightWall3Geo, rightWallMat );
rightWall3Mesh.castShadow = true;

const rightWall4Geo = new THREE.BoxGeometry( .1, .4, 1.5);
const rightWall4Mesh = new THREE.Mesh( rightWall4Geo, rightWallMat );   
rightWall4Mesh.castShadow = true;

const windowDividerGeo = new THREE.BoxGeometry( .1, 1.3, .05);
const windowDividerMat = new THREE.MeshStandardMaterial( {map: metalTexture, color:0xb3b3b3, wireframe: wireframeStatus} );
const windowDividerMesh = new THREE.Mesh( windowDividerGeo, windowDividerMat ); 
windowDividerMesh.castShadow = true;

rightWall1Mesh.rotation.y = rotateNinetyDeg;
rightWall2Mesh.rotation.y = rotateNinetyDeg;
rightWall3Mesh.rotation.y = rotateNinetyDeg;
rightWall4Mesh.rotation.y = rotateNinetyDeg;
windowDividerMesh.rotation.y = rotateNinetyDeg;
rightWall1Mesh.position.set(-1.25,1.5,-2.55);
rightWall2Mesh.position.set(2,1.5,-2.55);
rightWall3Mesh.position.set(.75,.65,-2.55);
rightWall4Mesh.position.set(.75,2.75,-2.55);
windowDividerMesh.position.set(.75,1.9,-2.55);

scene.add(rightWall1Mesh,rightWall2Mesh,rightWall3Mesh,
    rightWall4Mesh,windowDividerMesh);
    
// T R A N S P A R E N T  W A L L S
// used to block directional light from outside the window

// F R O N T  W A L L
const frontWallGeo = new THREE.BoxGeometry( .1, 2.9, 5);
const frontWallMat = new THREE.MeshStandardMaterial( {color:0xf7f7f7, wireframe: wireframeStatus, transparent: true, opacity: 0} );
const frontWallMesh = new THREE.Mesh( frontWallGeo, frontWallMat );
frontWallMesh.castShadow = true;
frontWallMesh.position.set(2.55,1.5,0);
scene.add(frontWallMesh);
// C E I L I N G
const ceilingGeo = new THREE.BoxGeometry( 5, .1, 5);
const ceilingMat = new THREE.MeshStandardMaterial( {color:0x9c804e, wireframe: wireframeStatus, transparent: true, opacity: 0} );
const ceilingMesh = new THREE.Mesh( ceilingGeo, ceilingMat );
ceilingMesh.castShadow = true;
ceilingMesh.position.set(0,3,0);
scene.add(ceilingMesh);


// T A B L E 
// consists of 2 box geometry to create a L-Shape table
const tableGeo = new THREE.BoxGeometry( 1, .1, 1);
const tableMat = new THREE.MeshStandardMaterial( {map: tableTexture, color:0x1c1c1c, wireframe: wireframeStatus} );
const tableMesh = new THREE.Mesh( tableGeo, tableMat );
tableMesh.castShadow = true;
tableMesh.receiveShadow = true;

const table2Geo = new THREE.BoxGeometry( 1, .1, 3);
const table2Mesh = new THREE.Mesh( table2Geo, tableMat );
table2Geo.castShadow = true;
table2Geo.receiveShadow = true;

tableMesh.position.set(-1,1,-2);
table2Mesh.position.set(-2,1,-1);

scene.add(tableMesh, table2Mesh);

// C H A I R
const chairGeo = new THREE.BoxGeometry( .8, .1, 1);
const chairMat = new THREE.MeshStandardMaterial( {map: cushionTexture, color:0x1c1c1c, wireframe: wireframeStatus} );
const chairMesh = new THREE.Mesh( chairGeo, chairMat );
chairMesh.castShadow = true;
chairMesh.receiveShadow = true;

const chairBackRestGeo = new THREE.BoxGeometry( 1.2, .1, 1);
const chairBackRestMesh = new THREE.Mesh( chairBackRestGeo, chairMat );
chairBackRestMesh.castShadow = true;
chairBackRestMesh.receiveShadow = true;

chairBackRestMesh.rotation.z = rotateNinetyDeg;
chairBackRestMesh.position.set(-.45,1.2,-1);
chairMesh.position.set(-.9,.65,-1);

// C H A I R  L E G S
const chairFeet1Geo = new THREE.BoxGeometry( .1, 1, .1);
const chairFeetMat = new THREE.MeshStandardMaterial( {map: metalTexture, color:0xcfcfcf, metalness: 1, 
    roughness: 0, wireframe: wireframeStatus} );
const chairFeet1Mesh = new THREE.Mesh( chairFeet1Geo, chairFeetMat );
chairFeet1Mesh.castShadow = true;
chairFeet1Mesh.receiveShadow = true;

const chairFeet2Geo = new THREE.BoxGeometry( .1, 1, .1);
const chairFeet2Mesh = new THREE.Mesh( chairFeet2Geo, chairFeetMat );
chairFeet2Mesh.castShadow = true;
chairFeet2Mesh.receiveShadow = true;

const chairFeetBase2Geo = new THREE.BoxGeometry( .8, .1, .1);
const chairFeetBase2Mesh = new THREE.Mesh( chairFeetBase2Geo, chairFeetMat );
chairFeetBase2Mesh.castShadow = true;
chairFeetBase2Mesh.receiveShadow = true;

const chairFeetBase1Geo = new THREE.BoxGeometry( .8, .1, .1);
const chairFeetBase1Mesh = new THREE.Mesh( chairFeetBase1Geo, chairFeetMat );
chairFeetBase1Mesh.castShadow = true;
chairFeetBase1Mesh.receiveShadow = true;

chairFeet1Mesh.rotation.z = Math.PI*-0.25;
chairFeet2Mesh.rotation.z = Math.PI*-0.25;
chairFeet1Mesh.position.set(-1,.3,-1.44);
chairFeet2Mesh.position.set(-1,.3,-.56);
chairFeetBase1Mesh.position.set(-.8,.1,-.56);
chairFeetBase2Mesh.position.set(-.8,.1,-1.44);

scene.add(chairMesh,chairBackRestMesh,chairFeet1Mesh,chairFeet2Mesh,
    chairFeetBase1Mesh,chairFeetBase2Mesh);

// M O N I T O R  &  F L A T  S C R E E N  T V
const monitorGeo = new THREE.BoxGeometry( 1.4,.7,.1);
const bezelMat = new THREE.MeshStandardMaterial( {color: 0x121212, wireframe: wireframeStatus} );
const monitorMesh = new THREE.Mesh( monitorGeo, bezelMat );
monitorMesh.rotation.y = rotateNinetyDeg;
monitorMesh.position.set(-2.3,1.6,-1);
monitorMesh.castShadow = true;
monitorMesh.receiveShadow = true;

const monitorScreenGeo = new THREE.PlaneGeometry(1.35,.65);
const monitorScreenMat = new THREE.MeshStandardMaterial( {map: monitorTexture, color: 0xffffff, roughness: 0, wireframe: wireframeStatus, side: THREE.DoubleSide} );
const monitorScreenMesh = new THREE.Mesh( monitorScreenGeo,monitorScreenMat );
monitorScreenMesh.rotation.y = rotateNinetyDeg;
monitorScreenMesh.position.set(-2.249,1.6,-1);

const tvGeo = new THREE.BoxGeometry( 2,1.1,.1);
const tvMesh = new THREE.Mesh( tvGeo, bezelMat );
tvMesh.rotation.y = rotateNinetyDeg;
tvMesh.position.set(-2.3,2,1.3);
tvMesh.castShadow = true;
tvMesh.receiveShadow = true;

const tvScreenGeo = new THREE.PlaneGeometry(1.95,1.05);
const tvScreenMat = new THREE.MeshStandardMaterial( {map: tvTexture, roughness: 0, wireframe: wireframeStatus, side: THREE.DoubleSide} );
const tvScreenMesh = new THREE.Mesh( tvScreenGeo,tvScreenMat );
tvScreenMesh.rotation.y = rotateNinetyDeg;
tvScreenMesh.position.set(-2.249,2,1.3);

scene.add(monitorMesh, tvMesh, monitorScreenMesh, tvScreenMesh);

// S Y S T E M  U N I T
const sysUnitGeo = new THREE.BoxGeometry(.7,.7,.4);
const sysUnitMat = new THREE.MeshStandardMaterial( {map: pcTexture, color: 0xcfcfcf, wireframe: wireframeStatus} );
const sysUnitMesh = new THREE.Mesh( sysUnitGeo, sysUnitMat );
sysUnitMesh.castShadow = true;
sysUnitMesh.receiveShadow = true;
sysUnitMesh.rotation.y = Math.PI*.1;
sysUnitMesh.position.set(-2.1,1.4,-2.1);

// P E R I P H E R A L S
const keybGeo = new THREE.BoxGeometry(.3,.05,.7);
const keybMat = new THREE.MeshStandardMaterial( {map: keybTexture, color: 0xcfcfcf, wireframe: wireframeStatus} );
const keybMesh = new THREE.Mesh( keybGeo, keybMat );
keybMesh.castShadow = true;
keybMesh.receiveShadow = true;
keybMesh.rotation.y = Math.PI*-.1;
keybMesh.position.set(-1.8,1.1,-.8);

const mouseGeo = new THREE.CapsuleGeometry( .05, .05, 4, 8 );
const mouseMat = new THREE.MeshStandardMaterial( {color: 0xcfcfcf} );
const mouseMesh = new THREE.Mesh( mouseGeo, mouseMat );
mouseMesh.castShadow = true;
mouseMesh.receiveShadow = true;
mouseMesh.rotation.x = rotateNinetyDeg;
mouseMesh.rotation.z = rotateNinetyDeg;
mouseMesh.position.set(-1.8,1.06,-1.4);

scene.add(sysUnitMesh,keybMesh,mouseMesh);

// C O U C H
const couch1Geo = new THREE.TorusGeometry(.6,.4,20,30);
const couchMat = new THREE.MeshStandardMaterial( {map: cushionTexture, color: 0xff673d, wireframe: wireframeStatus} );
const couch1Mesh = new THREE.Mesh( couch1Geo, couchMat );
couch1Mesh.castShadow = true;
couch1Mesh.receiveShadow = true;
couch1Mesh.rotation.x = Math.PI*.5;
couch1Mesh.position.set(1,.3,1)

const couch2Geo = new THREE.SphereGeometry( .5, 10, 10 );
const couch2Mesh = new THREE.Mesh( couch2Geo, couchMat );
couch2Mesh.position.set(1,.1,1)
couch2Mesh.castShadow = true;
couch2Mesh.receiveShadow = true;

scene.add(couch1Mesh,couch2Mesh);

// 💡 L I G H T S 💡
const directionalLight = new THREE.DirectionalLight( 0xff9100, 2 );
directionalLight.position.set(1,3,-4);
directionalLight.lookAt(0,0,0)
directionalLight.castShadow = true;

const hemiLight = new THREE.HemisphereLight( 0x00f7ff, 0xf700ff, .3 );
scene.add( hemiLight );

const ptLight = new THREE.PointLight( 0xdbfeff, .5, 6 );
ptLight.castShadow = true;
ptLight.position.set( .7, 3, 3 );
scene.add( ptLight );

const ambientLight = new THREE.AmbientLight( 0x404040, 1 );

const monitorLight = new THREE.RectAreaLight( 0x00f7ff, 3, 1.35,.65 );
monitorLight.castShadow = true; 
monitorLight.position.set( -2.35,1.6,-1 );
monitorLight.lookAt( -4,1.6,-1 );

const monitorScreenLight = new THREE.RectAreaLight( 0xffffff, .5, 1.35,.65 );
monitorScreenLight.position.set( -2.2,1.6,-1 );
monitorScreenLight.lookAt( -4,1.6,-1 );

const televisionLight = new THREE.RectAreaLight( 0x00f7ff, 3, 1.95,1.05 );
televisionLight.position.set( -2.35,2,1.3 );
televisionLight.lookAt( -4,2,1.3 );

const televisionScreenLight = new THREE.RectAreaLight( 0xffffff, .5, 1.95,1.05 );
televisionScreenLight.position.set( -2.2,2,1.3 );
televisionScreenLight.lookAt( -4,2,1.3 );

const tableLight = new THREE.RectAreaLight( 0xf700ff, 2, .95, 2.95 );
tableLight.castShadow = true;
tableLight.position.set( -2,.95,-1 );
tableLight.lookAt( -2,-1,-1 );

const sideLight = new THREE.RectAreaLight( 0xf700ff, 2, 4, .95 );
sideLight.castShadow = true;
sideLight.position.set( 3,1,0 );
sideLight.lookAt( -3,1,0 );

scene.add(directionalLight, ambientLight, monitorLight, televisionLight, tableLight, 
    sideLight, monitorScreenLight, televisionScreenLight )

// 🕶️⚙️ S H A D O W  P R O P E R T I E S ⚙️🕶️
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;

// 🫂 H E L P E R 🫂
const gridHelper = new THREE.GridHelper( 15, 15 );
if (enableGridHelper == true)
    scene.add( gridHelper );

if (enableLightHelper == true)
{
    const pointLightHelper = new THREE.PointLightHelper( ptLight, .5 );
    scene.add( pointLightHelper );
    
    const monitorLighthelper = new RectAreaLightHelper( monitorLight );
    monitorLight.add( monitorLighthelper );
    
    const monitorScreenLighthelper = new RectAreaLightHelper( monitorScreenLight );
    monitorScreenLight.add( monitorScreenLighthelper ); 

    const televisionLighthelper = new RectAreaLightHelper( televisionLight );
    televisionLight.add( televisionLighthelper );

    const televisionScreenLightHelper = new RectAreaLightHelper( televisionScreenLight );
    televisionScreenLight.add( televisionScreenLightHelper );

    const tableLighthelper = new RectAreaLightHelper( tableLight );
    tableLight.add( tableLighthelper );
    
    const sideLighthelper = new RectAreaLightHelper( sideLight );
    sideLight.add( sideLighthelper );
    
    const DirectionalLighthelper = new THREE.DirectionalLightHelper( directionalLight, 2 );
    scene.add( DirectionalLighthelper );
}

// 📷 C A M E R A  P O S I T I O N  &  L O O K  A T 📷
camera.position.set( 2.9, 4.2, 3);
camera.lookAt(0, 0, 0);
controls.update();

function animate() {
	requestAnimationFrame( animate );

    controls.update();
    
renderer.render( scene, camera );
}
animate();