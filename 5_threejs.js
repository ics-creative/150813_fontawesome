window.addEventListener("load", preload);
/** シーンオブジェクトです。 */
let scene;
/** カメラオブジェクトです。(PerspectiveCamera のみ) */
let camera;
/** レンダラーオブジェクトです。(WebGL のみ) */
let renderer;
/**
 * 初期化前に必要な素材を読み込みます。
 */
function preload() {
  // JSライブラリ「WebFont」を使って、フォントの読み込み完了を検知
  WebFont.load({
    custom: {
      // フォントファミリーを指定
      families: ["FontAwesome"],
      // CSS の URL を指定
      urls: [
        "https://netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css"
      ],
      // 他のフォントでは不要だが、FontAwesome のフォントを利用するには必要な指定
      testStrings: {
        // FontAwesome の検証用テキストを指定
        FontAwesome: "\uf001" // グラスアイコンを指定 (任意で支障ない)
      }
    },
    // Web Fontが使用可能になったとき
    active: init
  });
}
/**
 * コンテンツを初期化します。
 */
function init() {
  // --------------------------------
  // 3D の初期化
  // --------------------------------
  // 3D空間の作成
  scene = new THREE.Scene();
  // カメラの作成
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    200000
  );
  // レンダラーの作成
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor(0x000000);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  // --------------------------------
  // コンテンツの作成
  // --------------------------------
  // アイコンの Unicode を指定
  const iconUnicode = "f26b";
  // Unicode から文字コードに変換
  const iconInt = parseInt(iconUnicode, 16);
  // 文字コードから文字列に変換する
  const iconStr = String.fromCharCode(iconInt);
  // CreateJS のテキストを作成
  const iconText = new createjs.Text(iconStr, "256px FontAwesome", "#00F");
  // Canvas 要素としてレンダリングさせる
  iconText.cache(0, 0, 256, 256);
  // Three.js のテクスチャに展開する(GPU にアップロードする)
  const texture = new THREE.Texture(iconText.cacheCanvas);
  texture.needsUpdate = true;
  // 平面を作成する
  const geometry = new THREE.PlaneBufferGeometry(40, 40);
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });
  // メッシュオブジェクトを作成し、3D空間に追加する
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  // 地面
  const grid = new THREE.GridHelper(100, 10);
  grid.position.y = -30;
  scene.add(grid);
  // 画面のアップデート
  render();
}
/**
 * エンターフレームイベントです。
 */
function render() {
  requestAnimationFrame(render);
  // カメラは円周上を移動させる
  camera.position.x = 100 * Math.sin(Date.now() / 1000);
  camera.position.z = 100 * Math.cos(Date.now() / 1000);
  camera.position.y = 20 * Math.cos(Date.now() / 2000);
  camera.lookAt(scene.position);
  // Three.js のレンダリング
  renderer.render(scene, camera);
}
