window.addEventListener("DOMContentLoaded", preload);
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
  // アイコンの Unicode を指定
  const iconUnicode = "f26b";
  // Unicode から文字コードに変換
  const iconInt = parseInt(iconUnicode, 16);
  console.log(iconInt); // 「62059」が出力される
  // 文字コードから文字列に変換する
  const iconStr = String.fromCharCode(iconInt);
  console.log(iconStr); // 該当のアイコン文字

  // コンテキストを取得
  const canvas = document.querySelector("#myCanvas");
  const context = canvas.getContext("2d");

  // 文字を描く
  context.font = "540px FontAwesome";
  context.fill = "black";
  context.textBaseline = "top";
  context.fillText(iconStr, 0, 0);
}
