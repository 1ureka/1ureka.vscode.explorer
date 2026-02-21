import type { SxProps } from "@mui/material";
import { colorMix } from "@view/utils/style";

/**
 * 右鍵選單的容器樣式
 */
const contextMenuSx: SxProps = {
  ".menu-bottom &": { mt: 0.5 },
  ".menu-top &": { mt: -0.5 },
  p: 1,
  bgcolor: "tooltip.background",
  border: 1,
  borderColor: "tooltip.border",
  borderRadius: 1,
  boxShadow: "0 2px 8px var(--vscode-widget-shadow)",
};

/**
 * 操作元件的大小
 */
const contextMenuSize = 30;

/**
 * 右鍵選單內操作元件的樣式
 */
const contextMenuButtonSx: SxProps = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: 1,
  minWidth: 150,
  height: contextMenuSize - 4,
  gap: 1.5,
  pr: 1.5,
  pl: 0.5,
  borderRadius: 0.5,
  bgcolor: "tooltip.background",
  "&:hover": { bgcolor: colorMix("tooltip.background", "text.primary", 0.95) },
  "&:active": { bgcolor: "action.active" },
  "&.active": { bgcolor: "action.active", "&:hover": { bgcolor: "action.active" } },
  "&.disabled": { color: "text.disabled" },
};

export { contextMenuSx, contextMenuButtonSx };
