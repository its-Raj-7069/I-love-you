import * as THREE from 'https://unpkg.com/three@0.155.0/build/three.module.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Particle Heart Geometry
const particles = [];
const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 0.5, -0.5, 0.5, -0.5, 0);
heartShape.bezierCurveTo(-0.5, -0.5, 0, -0.8, 0, -1);
heartShape.bezierCurveTo(0, -0.8, 0.5, -0.5, 0.5, 0);
heartShape.bezierCurveTo(0.5, 0.5, 0, 0.5, 0, 0);

const geometry = new THREE.ShapeGeometry(heartShape);
const material = new THREE.MeshBasicMaterial({ color: 0xff69b4 });

for (let i = 0; i < 150; i++) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.scale.set(0.05, 0.05, 0.05);
  mesh.position.set(
    (Math.random() - 0.5) * 10,
    (Math.random() - 0.5) * 6,
    (Math.random() - 0.5) * 5
  );
  mesh.userData = {
    velocityY: 0.01 + Math.random() * 0.01
  };
  particles.push(mesh);
  scene.add(mesh);
}

function animateParticles() {
  particles.forEach(p => {
    p.position.y += p.userData.velocityY;
    if (p.position.y > 4) {
      p.position.y = -4;
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  animateParticles();
  renderer.render(scene, camera);
}
animate();

// Go Button Interaction
const goBtn = document.getElementById('goBtn');
const title = document.getElementById('title');

goBtn.addEventListener('click', () => {
  title.classList.add('show');
  goBtn.style.display = 'none';
});

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
