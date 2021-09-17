import { Component, HostListener, OnInit } from '@angular/core';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();

  }

  ngOnInit(): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector('#three-canvas') as HTMLCanvasElement
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.camera.position.setZ(30);

    let geometry = new THREE.TorusGeometry(10, 3, 16, 100);
    let material = new THREE.MeshStandardMaterial( { color: 0xFF6347});
    let torus = new THREE.Mesh( geometry, material );

    this.scene.add(torus);

    let pointLight = new THREE.PointLight(0xffffff);
    pointLight.position.set(20, 20, 20);

    let ambientLight = new THREE.AmbientLight(0xffffff);
    let lightHelper = new THREE.PointLightHelper(pointLight);
    let gridHelper = new THREE.GridHelper(200, 50);
    this.scene.add(pointLight, ambientLight, lightHelper, gridHelper);

    // let controls = new OrbitControls(this.camera, this.renderer.domElement);

    let addStar = () => {
      const geometry = new THREE.SphereGeometry(0.25, 24, 24);
      const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
      const star = new THREE.Mesh( geometry, material);

      const [x, y, z] = Array(3).fill(0).map(() => THREE.MathUtils.randFloatSpread( 100 ));

      star.position.set(x, y, z);
      this.scene.add(star);
    };

    Array(200).fill(0).forEach(addStar);

    const spaceTexture = new THREE.TextureLoader().load('assets/space.jpg');
    this.scene.background = spaceTexture;

    this.scene.add(this.genAvater());
    this.scene.add(this.genMoon());



    document.body.onscroll = () => {
      const t = document.querySelector('.app-container')?.getBoundingClientRect().top; //scroll distance from top of page
      console.log(t);
      // this.camera.position.setZ(t * -1);
      // this.camera.position.x = t * -1;
    }

    let animate = () => {
      requestAnimationFrame( animate );

      torus.rotation.x += 0.01;
      torus.rotation.y += 0.005;
      torus.rotation.z += 0.01;

      // controls.update();

      this.renderer.render( this.scene, this.camera);
    };
    animate();
  }

  @HostListener('window:scroll', ['$event'])
  onscroll(event: any) {
    console.log(event);

    const t = document.body.getBoundingClientRect().top;
    this.camera.position.setZ(t * -0.01);
    this.camera.position.setX(t * -0.02);
  }

  genAvater() {
    const jeffTexture = new THREE.TextureLoader().load('assets/pic.jpg');

    const jeff = new THREE.Mesh(
      new THREE.BoxGeometry(3, 3, 3),
      new THREE.MeshBasicMaterial( { map:jeffTexture })
    );

    return jeff;
  }

  genMoon() {
    const moonTexture = new THREE.TextureLoader().load('assets/moon.jpg'); //Texture map
    const normalTexture = new THREE.TextureLoader().load('assets/moon_normal.png'); //Normal map

    const moon = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial( {
        map: moonTexture,
        normalMap: normalTexture
      })
    );

    moon.position.z = 30;
    moon.position.setX(-10);

    return moon;
  }

  moveCamera() {
    const t = document.body.getBoundingClientRect().top; //scroll distance from top of page
    this.camera.position.z = t * -1;
    this.camera.position.x = t * -1;
  }
}
