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

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xff9999, 0.5, 100);
    pointLight1.position.set(-10, 5, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x9999ff, 0.5, 100);
    pointLight2.position.set(10, -5, 10);
    scene.add(pointLight2);

    // Create butterfly
    const butterfly = new THREE.Group();
    
    // Butterfly body
    const bodyGeometry = new THREE.CylinderGeometry(0.05, 0.1, 2, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x333333,
      shininess: 100 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    butterfly.add(body);

    // Butterfly wings with iridescent material
    const wingGeometry = new THREE.PlaneGeometry(1.5, 2);
    const wingMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      shininess: 100,
      specular: 0x9999ff,
      side: THREE.DoubleSide
    });

    // Left wing
    const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
    leftWing.position.set(-0.8, 0, 0);
    leftWing.rotation.z = Math.PI / 6;
    butterfly.add(leftWing);

    // Right wing
    const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
    rightWing.position.set(0.8, 0, 0);
    rightWing.rotation.z = -Math.PI / 6;
    butterfly.add(rightWing);

    // Lower wings
    const lowerWingGeometry = new THREE.PlaneGeometry(1, 1.2);
    const leftLowerWing = new THREE.Mesh(lowerWingGeometry, wingMaterial);
    leftLowerWing.position.set(-0.6, -0.8, 0);
    leftLowerWing.rotation.z = Math.PI / 4;
    butterfly.add(leftLowerWing);

    const rightLowerWing = new THREE.Mesh(lowerWingGeometry, wingMaterial);
    rightLowerWing.position.set(0.6, -0.8, 0);
    rightLowerWing.rotation.z = -Math.PI / 4;
    butterfly.add(rightLowerWing);

    butterfly.position.set(0, 0, -2);
    scene.add(butterfly);

    // Create flowing fabric elements
    const fabrics: THREE.Group[] = [];
    for (let i = 0; i < 5; i++) {
      const fabricGroup = new THREE.Group();
      
      const fabricGeometry = new THREE.PlaneGeometry(3, 4, 10, 10);
      const fabricMaterial = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.6 + i * 0.1, 0.3, 0.7),
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide
      });
      
      const fabric = new THREE.Mesh(fabricGeometry, fabricMaterial);
      fabric.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        -10 - Math.random() * 10
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

    // Particle system for ambient effects
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 50;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.6
    });
    
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

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
      
      // Animate butterfly wings
      const wingFlap = Math.sin(time * 8) * 0.3;
      butterfly.children[1].rotation.z = Math.PI / 6 + wingFlap; // Left wing
      butterfly.children[2].rotation.z = -Math.PI / 6 - wingFlap; // Right wing
      butterfly.children[3].rotation.z = Math.PI / 4 + wingFlap * 0.5; // Left lower wing
      butterfly.children[4].rotation.z = -Math.PI / 4 - wingFlap * 0.5; // Right lower wing
      
      // Gentle butterfly movement
      butterfly.position.y = Math.sin(time * 0.5) * 0.2;
      butterfly.position.x = Math.cos(time * 0.3) * 0.1;
      
      // Animate fabrics
      fabrics.forEach((fabric, index) => {
        fabric.rotation.x += 0.001 + index * 0.0002;
        fabric.rotation.y += 0.002 + index * 0.0001;
        fabric.position.y += Math.sin(time + index) * 0.01;
      });
      
      // Animate particles
      particles.rotation.y += 0.001;
      
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