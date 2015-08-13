///<reference path="easeljs/easeljs.d.ts" />
///<reference path="threejs/three.d.ts" />
declare var WebFont;
module demo {

	window.addEventListener("load", preload);

	/** シーンオブジェクトです。 */
	var scene:THREE.Scene;
	/** カメラオブジェクトです。(PerspectiveCamera のみ) */
	var camera:THREE.PerspectiveCamera;
	/** レンダラーオブジェクトです。(WebGL のみ) */
	var renderer:THREE.WebGLRenderer;

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
		renderer = new THREE.WebGLRenderer({antialias: true});
		renderer.setClearColor(0x000000);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);


		// --------------------------------
		// コンテンツの作成
		// --------------------------------

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
		var texture = new THREE.Texture(<HTMLCanvasElement> iconText.cacheCanvas);
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

		// 地面
		var grid = new THREE.GridHelper(100, 10);
		grid.setColors(0x888888, 0x888888);
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
}