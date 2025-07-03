import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ButterflyScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    butterfly: THREE.Group;
    fabrics: THREE.Group[];
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced lighting setup for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight1.position.set(-10, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 0.8, 100);
    pointLight2.position.set(10, -5, 10);
    scene.add(pointLight2);

    // Create MUCH BIGGER butterfly
    const butterfly = new THREE.Group();
    
    // Butterfly body - bigger
    const bodyGeometry = new THREE.CylinderGeometry(0.15, 0.25, 4, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    butterfly.add(body);

    // MUCH BIGGER butterfly wings with enhanced iridescent material
    const wingGeometry = new THREE.PlaneGeometry(4, 5); // Much bigger wings
    const wingMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
      shininess: 150,
      specular: 0xccccff,
      side: THREE.DoubleSide,
      emissive: 0x111111
    });

    // Left wing - bigger
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-2.2, 0, 0);
    leftWing.rotation.z = Math.PI / 6;
    butterfly.add(leftWing);

    // Right wing - bigger
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(2.2, 0, 0);
    rightWing.rotation.z = -Math.PI / 6;
    butterfly.add(rightWing);

    // Lower wings - bigger
    const lowerWingGeometry = new THREE.PlaneGeometry(3, 3.5);
    const leftLowerWing = new THREE.Mesh(lowerWingGeometry, wingMaterial);
    leftLowerWing.position.set(-1.8, -2, 0);
    leftLowerWing.rotation.z = Math.PI / 4;
    butterfly.add(leftLowerWing);

    const rightLowerWing = new THREE.Mesh(lowerWingGeometry, wingMaterial);
    rightLowerWing.position.set(1.8, -2, 0);
    rightLowerWing.rotation.z = -Math.PI / 4;
    butterfly.add(rightLowerWing);

    // Position butterfly closer and bigger
    butterfly.position.set(0, 0, -1);
    butterfly.scale.set(1.5, 1.5, 1.5); // Make it even bigger
    scene.add(butterfly);

    // Create subtle flowing fabric elements (fewer and more transparent)
    const fabrics: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const fabricGroup = new THREE.Group();
      
      const fabricGeometry = new THREE.PlaneGeometry(4, 6, 10, 10);
      const fabricMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.6 + i * 0.1, 0.2, 0.8),
        transparent: true,
        opacity: 0.15, // More transparent
        side: THREE.DoubleSide
      });
      
      const fabric = new THREE.Mesh(fabricGeometry, fabricMaterial);
      fabric.position.set(
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 15,
        -15 - Math.random() * 15
      );
      fabric.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      fabricGroup.add(fabric);
      fabrics.push(fabricGroup);
      scene.add(fabricGroup);
    }

    // Reduced particle system for cleaner look
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 50; // Fewer particles
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 60;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.4
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 8; // Move camera closer for bigger butterfly

    // Store references
    sceneRef.current = {
      scene,
      camera,
      renderer,
      butterfly,
      fabrics,
      animationId: 0
    };

    // Animation loop
    const animate = () => {
      if (!sceneRef.current) return;
      
      const time = Date.now() * 0.001;
      
      // Animate butterfly wings with more dramatic movement
      const wingFlap = Math.sin(time * 6) * 0.4;
      butterfly.children[1].rotation.z = Math.PI / 6 + wingFlap; // Left wing
      butterfly.children[2].rotation.z = -Math.PI / 6 - wingFlap; // Right wing
      butterfly.children[3].rotation.z = Math.PI / 4 + wingFlap * 0.6; // Left lower wing
      butterfly.children[4].rotation.z = -Math.PI / 4 - wingFlap * 0.6; // Right lower wing
      
      // More prominent butterfly movement
      butterfly.position.y = Math.sin(time * 0.4) * 0.5;
      butterfly.position.x = Math.cos(time * 0.2) * 0.3;
      butterfly.rotation.y = Math.sin(time * 0.3) * 0.1;
      
      // Animate fabrics more subtly
      fabrics.forEach((fabric, index) => {
        fabric.rotation.x += 0.0005 + index * 0.0001;
        fabric.rotation.y += 0.001 + index * 0.0001;
        fabric.position.y += Math.sin(time + index) * 0.005;
      });
      
      // Animate particles
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
      sceneRef.current.animationId = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
        
        // Dispose of geometries and materials
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
        
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  );
};

export default ButterflyScene;