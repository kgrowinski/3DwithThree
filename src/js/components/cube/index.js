import React from 'react';
import * as THREE from 'three';

export default class Cube extends React.Component {
  constructor(props) {
    super(props);

    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    const scene = new THREE.Scene();
    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);

    const light1 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light1);


    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 3000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });


    // const geometry = new THREE.BoxGeometry(100, 100, 100);
    const geometry = new THREE.SphereGeometry(50,10,10);


    const material = new THREE.MeshLambertMaterial({ color: 0xff00ff });
    const cube = new THREE.Mesh(geometry, material);

    cube.position.set(0, 0, -1000);
    camera.position.z = 4;
    scene.add(cube);
    renderer.setClearColor('#000000');
    renderer.setSize(width, height);

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.cube = cube;

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start() {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop() {
    cancelAnimationFrame(this.frameId);
  }

  animate() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: '100vw', height: '100vh' }}
        ref={(mount) => { this.mount = mount }}
      />
    )
  }
}
