/**
 * 単体デモで使う Font Awesome アイコンの unicode です。
 *
 * デモでは見分けやすいシンプルなニコちゃんを使います。
 *
 * @type {string}
 */
export const singleIconUnicode = "f118";

/**
 * 一覧デモで使う solid icon の unicode 一覧を取得します。
 *
 * 返り値は Font Awesome の metadata から作る文字コード配列です。
 *
 * @returns {Promise<string[]>}
 */
export async function loadDemoUnicodes() {
  // 公式パッケージに含まれる icon metadata を取得します。
  const response = await fetch(
    "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/metadata/icon-families.json",
  );

  // metadata は icon 名をキーに持つ object なので、まず JSON 化します。
  const icons = await response.json();

  // Canvas と WebGPU に流し込める solid glyph だけを取り出します。
  return (
    Object.values(icons)
      .filter(
        (icon) => icon.unicode && parseInt(icon.unicode, 16) >= 0xf000 && icon.svgs?.classic?.solid,
      )
      // 描画に使うのは unicode だけなので文字コードへ絞ります。
      .map((icon) => icon.unicode)
      // 一覧表示が安定するように unicode 順へ並べ替えます。
      .sort((a, b) => parseInt(a, 16) - parseInt(b, 16))
      // Canvas と 3D の密度が過剰にならない数に抑えます。
      .slice(0, 641)
  );
}
