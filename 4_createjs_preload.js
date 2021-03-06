window.addEventListener("load", preload);
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
  const stage = new createjs.Stage("myCanvas");
  // FontAwesome 4.4 が取り得る文字コードは 61440〜62080 の間
  for (let i = 0; i < 641; i++) {
    // Unicode から文字コードに変換
    const iconInt = 61440 + i;
    // 文字コードから文字列に変換する
    const iconStr = String.fromCharCode(iconInt);
    // CreateJS のテキストを作成
    const text = new createjs.Text(iconStr, "24px FontAwesome", "black");
    text.x = (i % 34) * 28;
    text.y = Math.floor(i / 34) * 28;
    stage.addChild(text);
  }
  // 画面のアップデート
  stage.update(); // 1回だけの更新でもOK
}
