/**
 * 初期化前に必要な素材を読み込みます。
 */
function preload() {
  // JSライブラリ「WebFont」を使って、フォントの読み込み完了を検知
  WebFont.load({
    // (一部省略)
    // Web Fontが使用可能になったとき
    active: init
  });
}

/**
 * コンテンツを初期化します。
 */
function init() {
  // アイコンの Unicode を指定
  var iconUnicode = "f26b";
  // Unicode から文字コードに変換
  var iconInt = parseInt(iconUnicode, 16);
  // 文字コードから文字列に変換する
  var iconStr = String.fromCharCode(iconInt);
  // CreateJS のテキストを作成
  var iconText = new createjs.Text(iconStr, "256px FontAwesome", "#00F");
  // Canvas 要素としてレンダリングさせる
  iconText.cache(0, 0, 256, 256);

  // Three.js のテクスチャに展開する(GPU にアップロードする)
  var texture = new THREE.Texture(iconText.cacheCanvas);
  texture.needsUpdate = true;

  // 平面を作成する
  var geometry = new THREE.PlaneBufferGeometry(40, 40);
  var material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide
  });

  // メッシュオブジェクトを作成し、3D空間に追加する
  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
}
