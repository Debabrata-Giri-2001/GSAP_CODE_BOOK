import * as THREE from "three";

class Scene {
  modelGroup: THREE.Group;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  views: any[];
  light: THREE.PointLight;
  softLight: THREE.AmbientLight;
  w?: number;
  h?: number;

  constructor(model: any) {
    this.views = [
      { bottom: 0, height: 1 },
      { bottom: 0, height: 0 },
    ];

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);

    document.body.appendChild(this.renderer.domElement);

    // scene

    this.scene = new THREE.Scene();

    for (var ii = 0; ii < this.views.length; ++ii) {
      var view = this.views[ii];
      var camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );
      camera.position.fromArray([0, 0, 180]);
      camera.layers.disableAll();
      camera.layers.enable(ii);
      view.camera = camera;
      camera.lookAt(new THREE.Vector3(0, 5, 0));
    }

    //light

    this.light = new THREE.PointLight(0xffffff, 2);
    this.light.position.set(100, 100, 200);
    this.scene.add(this.light);
    this.softLight = new THREE.AmbientLight(0xffffff, 1.5);
    this.scene.add(this.softLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(50, 50, 100);
    this.scene.add(directionalLight);
    this.light.layers.enableAll();
    this.softLight.layers.enableAll();

    // group
    this.onResize();
    window.addEventListener("resize", this.onResize, false);
    var edges = new THREE.EdgesGeometry(model.children[0].geometry);
    let line = new THREE.LineSegments(edges);
    (line.material as THREE.LineBasicMaterial).depthTest = false;
    (line.material as THREE.LineBasicMaterial).opacity = 0.5;
    (line.material as THREE.LineBasicMaterial).transparent = true;
    line.position.x = 0.5;
    line.position.z = -1;
    line.position.y = 0.2;

    this.modelGroup = new THREE.Group();

    this.modelGroup.position.set(0, 0, 0);
    this.modelGroup.scale.set(0.5, 0.5, 0.5);

    model.layers.set(0);
    line.layers.set(1);

    this.modelGroup.add(model);
    this.modelGroup.add(line);
    this.scene.add(this.modelGroup);
  }

  render = () => {
    for (var ii = 0; ii < this.views.length; ++ii) {
      var view = this.views[ii];
      var camera = view.camera;

      var bottom = Math.floor((this.h ?? window.innerHeight) * view.bottom);
      var height = Math.floor((this.h ?? window.innerHeight) * view.height);

      this.renderer.setViewport(0, 0, this.w, this.h);
      this.renderer.setScissor(0, bottom, this.w, height);
      this.renderer.setScissorTest(true);

      camera.aspect =
        (this.w ?? window.innerWidth) / (this.h ?? window.innerHeight);
      this.renderer.render(this.scene, camera);
    }
  };

  onResize = () => {
    this.w = window.innerWidth;
    this.h = window.innerHeight;

    for (var ii = 0; ii < this.views.length; ++ii) {
      var view = this.views[ii];
      var camera = view.camera;
      camera.aspect = this.w / this.h;
      let camZ = (screen.width - this.w * 1) / 3;
      camera.position.z = camZ < 180 ? 180 : camZ;
      camera.updateProjectionMatrix();
    }

    this.renderer.setSize(this.w, this.h);
    this.render();
  };
}

export default Scene;
