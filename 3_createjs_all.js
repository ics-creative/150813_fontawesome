window.addEventListener("load", init);
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
    createjs.Ticker.addEventListener("tick", stage);
}
