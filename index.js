import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const width = 10000;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);
// camera
const fov = 75;
const aspect = width / height;
const near = 0.1;
const far = 10;

const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 3;

// scene
const scene = new THREE.Scene();

// controls
const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
controls.dampingFactor = 0.04;

// geometry
// size & detail parameters
const geo = new THREE.IcosahedronGeometry(1.0, 3);

const mat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  flatShading: true,
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshBasicMaterial({
  color: "#fff",
  wireframe: true,
});
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

// light
const hemiLight = new THREE.HemisphereLight("#E0E5B6", "#914F1E");
scene.add(hemiLight);
function animate(t = 0) {
  requestAnimationFrame(animate);

  mesh.rotation.x = t * 0.0001;
  mesh.rotation.y = t * 0.0001;
  mesh.rotation.z = t * 0.0001;
  //   mesh.scale.setScalar(Math.cos(t * 0.001) + 2.0);
  renderer.render(scene, camera);
  controls.update();
  //   console.log(t);
}
animate();
