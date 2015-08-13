///<reference path="easeljs/easeljs.d.ts" />
///<reference path="threejs/three.d.ts" />
var demo;
(function (demo) {
    window.addEventListener("load", preload);
    /** シーンオブジェクトです。 */
    var scene;
    /** カメラオブジェクトです。(PerspectiveCamera のみ) */
    var camera;
    /** レンダラーオブジェクトです。(WebGL のみ) */
    var renderer;
    /** 3D のコンテナーオブジェクトの配列です。 */
    var wraps = [];
    /** 3D の文字メッシュオブジェクトの配列です。 */
    var words = [];
    var ROUND = 2000;
    var CAMERA_POSITION = 2500;
    var COLOR_LIST = [0x003399, 0x0066CC, 0x0099FF, 0x33CCFF];
    /**
     * 初期化前に必要な素材を読み込みます。
     */
    function preload() {
        // JSライブラリ「WebFont」を使って、フォントの読み込み完了を検知
        WebFont.load({
            custom: {
                // フォントファミリーを指定
                families: ['FontAwesome'],
                // CSS の URL を指定
                urls: [
                    'http://netdna.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.css'
                ],
                // 他のフォントでは不要だが、FontAwesome のフォントを利用するには必要な指定
                testStrings: {
                    // FontAwesome の検証用テキストを指定
                    'FontAwesome': '\uf001' // グラスアイコンを指定 (任意で支障ない)
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
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 200000);
        // レンダラーの作成
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0x000000);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        // --------------------------------
        // コンテンツの作成
        // --------------------------------
        // FontAwesome 4.4 が取り得る文字コードは 61440〜62080 の間
        for (var i = 0; i < 641; i++) {
            // Unicode から文字コードに変換
            var iconInt = 61440 + i;
            // 文字コードから文字列に変換する
            var iconStr = String.fromCharCode(iconInt);
            // CreateJS のテキストを作成
            var iconText = new createjs.Text(iconStr, "200px FontAwesome", "#FFF");
            // Canvas 要素としてレンダリングさせる
            iconText.cache(0, 0, 256, 256);
            // Three.js のテクスチャに展開する(GPU にアップロードする)
            var texture = new THREE.Texture(iconText.cacheCanvas);
            texture.needsUpdate = true;
            // 平面を作成する
            var geometry = new THREE.PlaneBufferGeometry(200, 200);
            var material = new THREE.MeshBasicMaterial({
                color: COLOR_LIST[COLOR_LIST.length * Math.random() >> 0],
                map: texture,
                transparent: true,
                side: THREE.DoubleSide
            });
            // メッシュオブジェクトを作成し、3D空間に追加する
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.z = 1000 * Math.random() + 500;
            mesh.rotation.y = 360 * Math.random();
            mesh.scale.multiplyScalar(0.5 * Math.random() + 0.5);
            var wrap = new THREE.Object3D();
            wrap.position.y = ROUND * Math.random();
            wraps.push(wrap);
            scene.add(wrap);
            wrap.add(mesh);
            // 配列にも保存しておく
            words.push(mesh);
        }
        // 地面
        var grid = new THREE.GridHelper(2000, 200);
        grid.setColors(0x888888, 0x888888);
        grid.position.y = -30;
        scene.add(grid);
        // 画面のアップデート
        render();
        window.addEventListener('resize', handleResize);
    }
    /**
     * エンターフレームイベントです。
     */
    function render() {
        requestAnimationFrame(render);
        // アイコンの回転
        var i = wraps.length;
        while (i--)
            wraps[i].rotation.y += (i / wraps.length * Math.PI / 180);
        i = words.length;
        while (i--)
            words[i].rotation.y += (0.5 * Math.PI / 180);
        // カメラは円周上を移動させる
        camera.position.x = CAMERA_POSITION * Math.sin(Date.now() / 1000);
        camera.position.z = CAMERA_POSITION * Math.cos(Date.now() / 1000);
        camera.position.y = 100 + 50 * Math.cos(Date.now() / 2000);
        camera.lookAt(new THREE.Vector3(0, 200, 0));
        // Three.js のレンダリング
        renderer.render(scene, camera);
    }
    /**
     * リサイズイベント発生時の処理です。
     * @param event
     */
    function handleResize(event) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
})(demo || (demo = {}));
//# sourceMappingURL=6_threejs_all.js.map