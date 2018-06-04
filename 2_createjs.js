window.addEventListener("load", init);
/**
 * コンテンツを初期化します。
 */
function init() {
  const stage = new createjs.Stage("myCanvas");
  // アイコンの Unicode を指定
  const iconUnicode = "f030";
  // Unicode から文字コードに変換
  const iconInt = parseInt(iconUnicode, 16);
  console.log(iconInt); // 「62059」が出力される
  // 文字コードから文字列に変換する
  const iconStr = String.fromCharCode(iconInt);
  console.log(iconStr); // 該当のアイコン文字
  // CreateJS のテキストを作成
  const text = new createjs.Text(iconStr, "540px FontAwesome", "black");
  stage.addChild(text);
  // 画面のアップデート
  createjs.Ticker.addEventListener("tick", stage);
}
