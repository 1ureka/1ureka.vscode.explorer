import type { SxProps } from "@mui/material";

/**
 * 從 VSCode CSS 變數中取得值
 */
const getVarValue = (varName: string) => {
  const rootElement = document.documentElement;
  const computedStyle = window.getComputedStyle(rootElement);

  const fullVarName = `--vscode-${varName}`;
  const value = computedStyle.getPropertyValue(fullVarName).trim();

  if (!value) throw new Error(`無法取得 VSCode CSS 變數值: ${fullVarName}`);
  return value;
};

/**
 * 混合兩種 MUI 顏色，weight 為 color1 的比例 (0-100)
 */
const colorMix = (color1: string, color2: string, weight: number) => {
  if (weight < 1) weight = weight * 100;
  const color1CSSVar = `var(--mui-palette-${color1.replace(/\./g, "-")})`;
  const color2CSSVar = `var(--mui-palette-${color2.replace(/\./g, "-")})`;
  return `color-mix(in srgb, ${color1CSSVar} ${weight}%, ${color2CSSVar} ${100 - weight}%)`;
};

/**
 * 將任意 CSS 可接受的顏色設置不透明度
 */
const colorWithAlpha = (color: string, alpha: number) => {
  return `hsl(from ${color} h s l / ${alpha})`;
};

/**
 * 讓文字必定只會有一行，超出部分自動用省略號表示
 *
 * 可使用 `{...ellipsisSx, WebkitLineClamp: n}` 來設定多行省略
 */
const ellipsisSx: SxProps = {
  display: "-webkit-box",
  WebkitLineClamp: 1,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  textOverflow: "ellipsis",
  wordBreak: "break-all",
};

/**
 * 讓文字置中對齊，對英文效果最明顯
 */
const centerTextSx: SxProps = {
  textBox: "trim-both cap alphabetic",
};

export { getVarValue, colorMix, colorWithAlpha, ellipsisSx, centerTextSx };
