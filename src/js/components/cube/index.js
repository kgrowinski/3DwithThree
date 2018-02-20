import React from 'react';
import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';

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

    const camera = new THREE.PerspectiveCamera( 60, width / height, 1, 1000 );
    camera.position.z = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcccccc );
    scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
    const geometry = new THREE.SphereGeometry( 15, 15, 15 );
    const material = new THREE.MeshLambertMaterial({color: '#ff00ff'});
    for ( let i = 0; i < 500; i ++ ) {
      let mesh = new THREE.Mesh( geometry, material );
      mesh.position.x = ( Math.random() - 0.5 ) * 1000;
      mesh.position.y = ( Math.random() - 0.5 ) * 1000;
      mesh.position.z = ( Math.random() - 0.5 ) * 1000;
      mesh.updateMatrix();
      mesh.matrixAutoUpdate = false;
      scene.add( mesh );
    }


    // lights
    const light1 = new THREE.DirectionalLight( '#ffffff' );
    light1.position.set( 1, 1, 1 );
    scene.add( light1 );
    const light2 = new THREE.DirectionalLight( '#000000' );
    light2.position.set( -1, -1, -1 );
    scene.add( light2 );
    const light3 = new THREE.AmbientLight( '#222222' );
    scene.add( light3 );
    // renderer
    const renderer = new THREE.WebGLRenderer( { antialias: false } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );


    const controls = new TrackballControls(camera);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.keys = [ 65, 83, 68 ];
    controls.addEventListener( 'change', this.render );

    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.material = material;
    this.controls = controls;

    window.addEventListener( 'resize', this.onWindowResize, false );

    this.mount.appendChild(this.renderer.domElement);
    this.start();
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.controls.handleResize();
    this.render();
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
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene() {
    this.controls.update();
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
