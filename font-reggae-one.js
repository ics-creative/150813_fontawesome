const REGGAE_ONE_SOURCE =
  'url("https://fonts.gstatic.com/s/reggaeone/v19/7r3DqX5msMIkeuwJwOJt_a4.ttf") format("truetype")';

/**
 * Google Fonts 配信の Reggae One を FontFace で登録します。
 *
 * DOM / Canvas / WebGPU のすべてで同じ font-family 名を使うため、
 * stylesheet 経由ではなくフォントファイル自体を明示的に読み込みます。
 *
 * @returns {Promise<void>}
 */
export async function loadReggaeOneFont() {
  // Google Fonts 配信の ttf を FontFace として生成します。
  const reggaeOneFont = new FontFace("Reggae One", REGGAE_ONE_SOURCE, {
    style: "normal",
    weight: "400",
  });

  // バイナリの取得と解析が終わるまで待ちます。
  const loadedReggaeOneFont = await reggaeOneFont.load();

  // 読み込み済みの font を document 配下へ登録します。
  document.fonts.add(loadedReggaeOneFont);

  // 登録後に利用可能状態へ入るまで待ってから呼び出し元へ返します。
  await document.fonts.ready;
}
