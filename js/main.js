import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls( camera, renderer.domElement );

scene.background = new THREE.Color( 0x525252 );
renderer.setSize( window .innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// variables
let rotateNinetyDeg = Math.PI*0.5;

// settings
let wireframeStatus = false;
let enableGridHelper = false;

// room boundaries
// floor
const floorGeo = new THREE.BoxGeometry( 5, .1, 5);
const floorMat = new THREE.MeshBasicMaterial( {color:0x9c804e, wireframe: wireframeStatus} );
const floorMesh = new THREE.Mesh( floorGeo, floorMat );
floorMesh.position.set(0,0,0);
scene.add(floorMesh);

//left wall
const leftWallGeo = new THREE.BoxGeometry( .1, 2.9, 5);
const leftWallMat = new THREE.MeshBasicMaterial( {color:0xf7f7f7, wireframe: wireframeStatus} );
const leftWallMesh = new THREE.Mesh( leftWallGeo, leftWallMat );
leftWallMesh.position.set(-2.55,1.5,0);
scene.add(leftWallMesh);

// right wall | divided into 4 wall panels to create a window and a window divider
const rightWall1Geo = new THREE.BoxGeometry( .1, 2.9, 2.5);
const rightWallMat = new THREE.MeshBasicMaterial( {color:0xf7f7f7, wireframe: wireframeStatus} );
const rightWall1Mesh = new THREE.Mesh( rightWall1Geo, rightWallMat );

const rightWall2Geo = new THREE.BoxGeometry( .1, 2.9, 1);
const rightWall2Mesh = new THREE.Mesh( rightWall2Geo, rightWallMat );

const rightWall3Geo = new THREE.BoxGeometry( .1, 1.2, 1.5);
const rightWall3Mesh = new THREE.Mesh( rightWall3Geo, rightWallMat );

const rightWall4Geo = new THREE.BoxGeometry( .1, .4, 1.5);
const rightWall4Mesh = new THREE.Mesh( rightWall4Geo, rightWallMat );   

const windowDividerGeo = new THREE.BoxGeometry( .1, 1.3, .05);
const windowDividerMat = new THREE.MeshBasicMaterial( {color:0xb3b3b3, wireframe: wireframeStatus} );
const windowDividerMesh = new THREE.Mesh( windowDividerGeo, windowDividerMat ); 

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

// table | consists of 2 box geometry to create a L-Shape table
const tableGeo = new THREE.BoxGeometry( 1, .1, 1);
const table2Geo = new THREE.BoxGeometry( 1, .1, 3);

const tableMat = new THREE.MeshBasicMaterial( {color:0x1c1c1c, wireframe: wireframeStatus} );

const tableMesh = new THREE.Mesh( tableGeo, tableMat );
const table2Mesh = new THREE.Mesh( table2Geo, tableMat );

tableMesh.position.set(-1,1,-2);
table2Mesh.position.set(-2,1,-1);

scene.add(tableMesh, table2Mesh);

//chair
const chairGeo = new THREE.BoxGeometry( .8, .1, 1);
const chairBackRestGeo = new THREE.BoxGeometry( 1.2, .1, 1);

const chairMat = new THREE.MeshBasicMaterial( {color:0x1c1c1c, wireframe: wireframeStatus} );

const chairMesh = new THREE.Mesh( chairGeo, chairMat );
const chairBackRestMesh = new THREE.Mesh( chairBackRestGeo, chairMat );

chairBackRestMesh.rotation.z = rotateNinetyDeg;
chairBackRestMesh.position.set(-.45,1.2,-1);
chairMesh.position.set(-.9,.65,-1);

//chair stand
const chairFeet1Geo = new THREE.BoxGeometry( .1, 1, .1);
const chairFeetMat = new THREE.MeshBasicMaterial( {color:0xcfcfcf, wireframe: wireframeStatus} );
const chairFeet1Mesh = new THREE.Mesh( chairFeet1Geo, chairFeetMat );

const chairFeet2Geo = new THREE.BoxGeometry( .1, 1, .1);
const chairFeet2Mesh = new THREE.Mesh( chairFeet2Geo, chairFeetMat );

const chairFeetBase2Geo = new THREE.BoxGeometry( .8, .1, .1);
const chairFeetBase2Mesh = new THREE.Mesh( chairFeetBase2Geo, chairFeetMat );

const chairFeetBase1Geo = new THREE.BoxGeometry( .8, .1, .1);
const chairFeetBase1Mesh = new THREE.Mesh( chairFeetBase1Geo, chairFeetMat );

chairFeet1Mesh.rotation.z = Math.PI*-0.25;
chairFeet2Mesh.rotation.z = Math.PI*-0.25;
chairFeet1Mesh.position.set(-1,.3,-1.44);
chairFeet2Mesh.position.set(-1,.3,-.56);
chairFeetBase1Mesh.position.set(-.8,.1,-.56);
chairFeetBase2Mesh.position.set(-.8,.1,-1.44);

scene.add(chairMesh,chairBackRestMesh,chairFeet1Mesh,chairFeet2Mesh,
    chairFeetBase1Mesh,chairFeetBase2Mesh);


// monitor and television
const monitorGeo = new THREE.BoxGeometry( 1.4,.7,.1);
const bezelMat = new THREE.MeshBasicMaterial( {color: 0xcfcfcf, wireframe: wireframeStatus} );
const monitorMesh = new THREE.Mesh( monitorGeo, bezelMat );
monitorMesh.rotation.y = rotateNinetyDeg;
monitorMesh.position.set(-2.3,1.6,-1);

const monitorScreenGeo = new THREE.PlaneGeometry(1.35,.65);
const monitorScreenMat = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: wireframeStatus, side: THREE.DoubleSide} );
const monitorScreenMesh = new THREE.Mesh( monitorScreenGeo,monitorScreenMat );
monitorScreenMesh.rotation.y = rotateNinetyDeg;
monitorScreenMesh.position.set(-2.249,1.6,-1);

const tvGeo = new THREE.BoxGeometry( 2,1.1,.1);
const tvMesh = new THREE.Mesh( tvGeo, bezelMat );
tvMesh.rotation.y = rotateNinetyDeg;
tvMesh.position.set(-2.45,2,1.3);

const tvScreenGeo = new THREE.PlaneGeometry(1.95,1.05);
const tvScreenMat = new THREE.MeshBasicMaterial( {color: 0xffffff, wireframe: wireframeStatus, side: THREE.DoubleSide} );
const tvScreenMesh = new THREE.Mesh( tvScreenGeo,tvScreenMat );
tvScreenMesh.rotation.y = rotateNinetyDeg;
tvScreenMesh.position.set(-2.399,2,1.3);

scene.add(monitorMesh, tvMesh, monitorScreenMesh, tvScreenMesh);

// system unit
const sysUnitGeo = new THREE.BoxGeometry(.7,.7,.4);
const sysUnitMat = new THREE.MeshBasicMaterial( {color: 0xcfcfcf, wireframe: wireframeStatus} );
const sysUnitMesh = new THREE.Mesh( sysUnitGeo, sysUnitMat );
sysUnitMesh.rotation.y = Math.PI*.1;
sysUnitMesh.position.set(-2.1,1.4,-2.1);

// peripherals
const keybGeo = new THREE.BoxGeometry(.3,.05,.7);
const keybMat = new THREE.MeshBasicMaterial( {color: 0xcfcfcf, wireframe: wireframeStatus} );
const keybMesh = new THREE.Mesh( keybGeo, keybMat );
keybMesh.rotation.y = Math.PI*-.1;
keybMesh.position.set(-1.8,1.1,-.8);

const mouseGeo = new THREE.CapsuleGeometry( .05, .05, 4, 8 );
const mouseMat = new THREE.MeshBasicMaterial( {color: 0xcfcfcf} );
const mouseMesh = new THREE.Mesh( mouseGeo, mouseMat );
mouseMesh.rotation.x = rotateNinetyDeg;
mouseMesh.rotation.z = rotateNinetyDeg;
mouseMesh.position.set(-1.8,1.06,-1.4);

scene.add(sysUnitMesh,keybMesh,mouseMesh);

//couch
const couch1Geo = new THREE.TorusGeometry(.6,.4,7.5,15);
const couchMat = new THREE.MeshBasicMaterial( {color: 0xff673d, wireframe: wireframeStatus} );
const couch1Mesh = new THREE.Mesh( couch1Geo, couchMat );
couch1Mesh.rotation.x = Math.PI*.5;
couch1Mesh.position.set(1,.3,1)

const couch2Geo = new THREE.SphereGeometry( .5, 10, 10 );
const couch2Mesh = new THREE.Mesh( couch2Geo, couchMat );
couch2Mesh.position.set(1,.1,1)

scene.add(couch1Mesh,couch2Mesh);

// helper
const size = 15;
const divisions = 15;
const gridHelper = new THREE.GridHelper( size, divisions );
if (enableGridHelper == true)
    scene.add( gridHelper );

// camera position
camera.position.set( 2.9, 4.2, 3);
camera.lookAt(0, 0, 0);
controls.update();
function animate() {
	requestAnimationFrame( animate );

    controls.update();
    
renderer.render( scene, camera );
}
animate();