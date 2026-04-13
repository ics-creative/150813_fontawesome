import { fas } from "https://cdn.jsdelivr.net/npm/@fortawesome/free-solid-svg-icons@7.2.0/index.mjs";

// free-solid-svg-icons の各定義を配列にして使います。
const iconDefinitions = Object.values(fas);

/**
 * 単体デモで使う Font Awesome アイコンです。
 *
 * デモでは見分けやすいシンプルなニコちゃんを使います。
 * Font Awesome の定義値は "f118" のような 16 進文字列なので、
 * Canvas や WebGPU で描ける実際の 1 文字へ先に変換しておきます。
 * parseInt(..., 16) は 16 進文字列を数値へ直すために使い、
 * String.fromCodePoint(...) は数値になったコードポイントから文字を作るために使います。
 *
 * @type {string}
 */
export const singleIcon = String.fromCodePoint(parseInt("f118", 16));

/**
 * 一覧デモで使うアイコン文字列の一覧です。
 *
 * Canvas と WebGPU の一覧は同じ並びを使います。
 * 件数だけを絞って、そのまま描画へ渡します。
 * icon.icon[3] に入っている値も "f0f3" のような 16 進文字列なので、
 * 一覧側でも同じ変換を 1 回だけ行い、描画側では文字列をそのまま使います。
 *
 * @type {string[]}
 */
export const demoIcons = iconDefinitions
  // 16 進文字列をコードポイントへ変換してから、描画用の 1 文字へ直します。
  .map((icon) => String.fromCodePoint(parseInt(icon.icon[3], 16)))
  .slice(0, 641);
