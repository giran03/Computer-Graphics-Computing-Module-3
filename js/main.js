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

// right wall
const rightWall1Geo = new THREE.BoxGeometry( .1, 2.9, 2.5);
const rightWall2Geo = new THREE.BoxGeometry( .1, 2.9, 1);
const rightWall3Geo = new THREE.BoxGeometry( .1, 1.2, 1.5);
const rightWall4Geo = new THREE.BoxGeometry( .1, .4, 1.5);
const windowDividerGeo = new THREE.BoxGeometry( .1, 1.3, .05);
const rightWallMat = new THREE.MeshBasicMaterial( {color:0xf7f7f7, wireframe: wireframeStatus} );
const windowDividerMat = new THREE.MeshBasicMaterial( {color:0xb3b3b3, wireframe: wireframeStatus} );
const rightWall1Mesh = new THREE.Mesh( rightWall1Geo, rightWallMat );
const rightWall2Mesh = new THREE.Mesh( rightWall2Geo, rightWallMat );
const rightWall3Mesh = new THREE.Mesh( rightWall3Geo, rightWallMat );
const rightWall4Mesh = new THREE.Mesh( rightWall4Geo, rightWallMat );   
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
scene.add(rightWall1Mesh,rightWall2Mesh,rightWall3Mesh,rightWall4Mesh,windowDividerMesh);

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

//monitor
const monitorGeo = new THREE.BoxGeometry( 1.4,.7,.1);
const monitorMat = new THREE.MeshBasicMaterial( {color: 0xb3b3b3, wireframe: wireframeStatus} );
const monitorMesh = new THREE.Mesh( monitorGeo, monitorMat );
monitorMesh.rotation.y = rotateNinetyDeg;
monitorMesh.position.set(-2.3,1.6,-1);
scene.add(monitorMesh);

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