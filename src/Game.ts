import * as Three from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class Game {
  private scene!: Three.Scene;
  private camera!: Three.PerspectiveCamera;
  private renderer!: Three.WebGLRenderer;
  private cameraControls!: OrbitControls;

  constructor() {
    this.createScene();
    this.createCamera();
    this.createObjects();
    this.createRenderer();
    this.createCameraControls();
  }

  start() {
    this.gameLoop();
  }

  private gameLoop() {
    requestAnimationFrame(() => this.gameLoop());
    this.cameraControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  private createScene() {
    this.scene = new Three.Scene();
    const axesHelper = new Three.AxesHelper(5);
    const gridHelper = new Three.GridHelper(10, 10);
    const light = new Three.DirectionalLight(0xffffff, 1);
    light.position.set(-2, 3, 5);
    light.castShadow = true;
    const lightHelper = new Three.DirectionalLightHelper(light, 1);
    this.scene.add(axesHelper, gridHelper, lightHelper, light);
  }

  private createCamera() {
    this.camera = new Three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(5, 5, 5);
    this.camera.lookAt(0, 0, 0);
  }

  private createObjects() {
    const geometry = new Three.BoxGeometry(1, 1, 1);
    const material = new Three.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new Three.Mesh(geometry, material);
    cube.castShadow = true;
    cube.position.y = 0.5;
    const floorGeometry = new Three.PlaneGeometry(10, 10);
    const floorMaterial = new Three.MeshStandardMaterial({ color: 0xffffff });
    const floor = new Three.Mesh(floorGeometry, floorMaterial);
    floor.receiveShadow = true;
    floor.rotation.x = -Math.PI / 2;
    this.scene.add(cube, floor);
  }

  private createRenderer() {
    this.renderer = new Three.WebGLRenderer();
    this.renderer.setSize(800, 600);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);
  }

  private createCameraControls() {
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.cameraControls.target.set(0, 0, 0);
    this.cameraControls.update();
  }
}
