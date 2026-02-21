import { ButtonBase, Typography } from "@mui/material";
import { contextMenuButtonSx } from "@view/layout-menu/config";
import { centerTextSx } from "@view/utils/style";

/**
 * 右鍵選單按鈕的 props 類型
 */
type ContextMenuButtonProps = {
  actionIcon: `codicon codicon-${string}`;
  actionName: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
};

/**
 * 右鍵選單內的按鈕元件
 */
const ContextMenuButton = (props: ContextMenuButtonProps) => {
  const { actionIcon, actionName, onClick, active, disabled } = props;

  let className = "";
  if (active) className += "active ";
  if (disabled) className += "disabled ";

  return (
    <ButtonBase disableRipple className={className} onClick={onClick} disabled={disabled} sx={contextMenuButtonSx}>
      <i className={actionIcon} style={{ display: "block" }} />
      <Typography variant="caption" sx={{ color: "inherit", ...centerTextSx }}>
        {actionName}
      </Typography>
    </ButtonBase>
  );
};

export { ContextMenuButton };
