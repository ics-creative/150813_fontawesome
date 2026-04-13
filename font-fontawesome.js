/**
 * Font Awesome の webfont を読み込みます。
 *
 * Canvas と WebGPU の両方で同じ font-family 名を使うため、
 * 先に FontFace を登録してから描画へ進みます。
 *
 * @returns {Promise<void>}
 */
export async function loadIconFont() {
  // CDN 上の solid webfont を FontFace として生成します。
  const fontFace = new FontFace(
    "Font Awesome 7 Free",
    'url("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7.2.0/webfonts/fa-solid-900.woff2") format("woff2")',
    { style: "normal", weight: "900" },
  );

  // バイナリの取得と解析が終わるまで待ちます。
  const loadedFontFace = await fontFace.load();

  // 読み込み済みの font を document 配下へ登録します。
  document.fonts.add(loadedFontFace);

  // 登録後に利用可能状態へ入るまで待ってから呼び出し元へ返します。
  await document.fonts.ready;
}
