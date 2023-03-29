const createArt = () => {
  // Get emoji from input
  const emoji = document.querySelector("#input").value;
  const font = new THREE.FontLoader().parse(emojiFont);

  // Set up scene and camera
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  // Set up renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(500, 500);
  document.querySelector("#canvas").appendChild(renderer.domElement);

  // Set up text and material
  const textGeometry = new THREE.TextGeometry(emoji, {
    font: new THREE.Font(font),
    size: 50,
    height: 33,
  });
  const material = new THREE.MeshLambertMaterial({
    color: "#4CAF50"
  });
  const group = new THREE.Group();

  // Create mesh for each character
  for (let i = 0; i < emoji.length; i++) {
    const mesh = new THREE.Mesh(textGeometry, material);
    mesh.position.x = (i - emoji.length / 2) * 60;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    group.add(mesh);
  }


  // Add group to scene
  scene.add(group);

  // Create a directional light
  const light = new THREE.DirectionalLight(0xffffff, 0.5);
  light.position.set(1, 1, 1);
  scene.add(light);

  // Position camera
  camera.position.z = 500;

  // Animate ASCII art
  function animate() {
    requestAnimationFrame(animate);
    group.rotation.x += 0.01;
    group.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
};
