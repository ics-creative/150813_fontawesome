///<reference path="easeljs/easeljs.d.ts" />
window.addEventListener("load", init);
/**
 * コンテンツを初期化します。
 */
function init() {
    var stage = new createjs.Stage("myCanvas");
    // アイコンの Unicode を指定
    var iconUnicode = "f26b";
    // Unicode から文字コードに変換
    var iconInt = parseInt(iconUnicode, 16);
    console.log(iconInt); // 「62059」が出力される
    // 文字コードから文字列に変換する
    var iconStr = String.fromCharCode(iconInt);
    console.log(iconStr); // 該当のアイコン文字
    // CreateJS のテキストを作成
    var text = new createjs.Text(iconStr, "540px FontAwesome", "black");
    stage.addChild(text);
    // 画面のアップデート
    createjs.Ticker.addEventListener("tick", stage);
}
//# sourceMappingURL=2_createjs.js.map