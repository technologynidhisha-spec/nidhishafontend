// Three.js Background Animation
class ThreeBackground {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.particles = [];
    this.animationId = null;
    this.mouseX = 0;
    this.mouseY = 0;

    this.init();
  }

  init() {
    this.setupScene();
    this.setupCamera();
    this.setupRenderer();
    this.createParticles();
    this.setupEventListeners();
    this.animate();
  }

  setupScene() {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0x0a0a0a, 100, 1000);
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = 500;
  }

  setupRenderer() {
    const canvas = document.getElementById("bg-canvas");
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setClearColor(0x000000, 0);
  }

  createParticles() {
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;

      // Color
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      // Size
      sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    // Create particle material
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        pixelRatio: { value: this.renderer.getPixelRatio() },
      },
      vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                uniform float pixelRatio;
                
                void main() {
                    vColor = color;
                    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
      fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    float distance = length(gl_PointCoord - vec2(0.5));
                    if (distance > 0.5) discard;
                    
                    float alpha = 1.0 - (distance * 2.0);
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.particles = new THREE.Points(geometry, particleMaterial);
    this.scene.add(this.particles);

    // Create floating geometric shapes
    this.createGeometricShapes();
  }

  createGeometricShapes() {
    // Create floating cubes
    for (let i = 0; i < 20; i++) {
      const geometry = new THREE.BoxGeometry(
        Math.random() * 50 + 20,
        Math.random() * 50 + 20,
        Math.random() * 50 + 20
      );

      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.6),
        transparent: true,
        opacity: 0.1,
        wireframe: true,
      });

      const cube = new THREE.Mesh(geometry, material);
      cube.position.set(
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000,
        (Math.random() - 0.5) * 1000
      );
      cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      cube.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        floatSpeed: Math.random() * 0.5 + 0.5,
      };

      this.scene.add(cube);
    }

    // Create floating spheres
    for (let i = 0; i < 10; i++) {
      const geometry = new THREE.SphereGeometry(
        Math.random() * 30 + 15,
        16,
        16
      );

      const material = new THREE.MeshBasicMaterial({
        color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.6),
        transparent: true,
        opacity: 0.05,
        wireframe: true,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800
      );

      sphere.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01,
        },
        floatSpeed: Math.random() * 0.3 + 0.3,
      };

      this.scene.add(sphere);
    }
  }

  setupEventListeners() {
    // Mouse movement
    document.addEventListener("mousemove", (event) => {
      this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Window resize
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    // Scroll effect
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      this.camera.position.y = rate;
    });
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.001;

    // Update particle material time uniform
    if (this.particles.material.uniforms) {
      this.particles.material.uniforms.time.value = time;
    }

    // Rotate particles
    this.particles.rotation.x = time * 0.1;
    this.particles.rotation.y = time * 0.15;

    // Update geometric shapes
    this.scene.children.forEach((child) => {
      if (child.userData && child.userData.rotationSpeed) {
        child.rotation.x += child.userData.rotationSpeed.x;
        child.rotation.y += child.userData.rotationSpeed.y;
        child.rotation.z += child.userData.rotationSpeed.z;

        // Floating animation
        child.position.y += Math.sin(time * child.userData.floatSpeed) * 0.5;
      }
    });

    // Camera movement based on mouse
    this.camera.position.x +=
      (this.mouseX * 50 - this.camera.position.x) * 0.05;
    this.camera.position.y +=
      (this.mouseY * 50 - this.camera.position.y) * 0.05;
    this.camera.lookAt(this.scene.position);

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.renderer) {
      this.renderer.dispose();
    }

    // Clean up geometries and materials
    this.scene.traverse((child) => {
      if (child.geometry) {
        child.geometry.dispose();
      }
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((material) => material.dispose());
        } else {
          child.material.dispose();
        }
      }
    });
  }
}

// Initialize Three.js background when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Check if Three.js is loaded
  if (typeof THREE !== "undefined") {
    const threeBackground = new ThreeBackground();

    // Make it globally accessible
    window.threeBackground = threeBackground;

    // Clean up on page unload
    window.addEventListener("beforeunload", () => {
      threeBackground.destroy();
    });
  } else {
    console.warn("Three.js not loaded. Background animation disabled.");
  }
});

// Add some utility functions for Three.js
window.threeUtils = {
  // Create a gradient background as fallback
  createGradientBackground: () => {
    const canvas = document.getElementById("bg-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );

      gradient.addColorStop(0, "#0a0a0a");
      gradient.addColorStop(0.5, "#1a1a2e");
      gradient.addColorStop(1, "#16213e");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  },

  // Animate gradient background
  animateGradient: () => {
    const canvas = document.getElementById("bg-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let time = 0;

      const animate = () => {
        time += 0.01;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const gradient = ctx.createRadialGradient(
          canvas.width / 2 + Math.sin(time) * 100,
          canvas.height / 2 + Math.cos(time) * 100,
          0,
          canvas.width / 2,
          canvas.height / 2,
          canvas.width / 2
        );

        gradient.addColorStop(0, "#0a0a0a");
        gradient.addColorStop(0.5, "#1a1a2e");
        gradient.addColorStop(1, "#16213e");

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        requestAnimationFrame(animate);
      };

      animate();
    }
  },
};

// Fallback if Three.js fails to load
setTimeout(() => {
  if (typeof THREE === "undefined") {
    window.threeUtils.createGradientBackground();
    window.threeUtils.animateGradient();
  }
}, 1000);
