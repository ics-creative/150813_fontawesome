window.addEventListener("DOMContentLoaded", init);

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
