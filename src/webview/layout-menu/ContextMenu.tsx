import { Menu, MenuItem, Divider, ListItemIcon, ListItemText } from "@mui/material";
import { appStateStore, dataStore, selectionStore, clipboardStore, viewDataStore } from "@view/store/data";
import { openInEnvironment, navigateUp } from "@view/action/navigation";
import { writeClipboard, readClipboard } from "@view/action/clipboard";
import { openFile, createNewFolder, createNewFile } from "@view/action/operation";
import { closeContextMenu, openPropertyDialog } from "@view/action/app";

/**
 * 創建給右鍵選單用的 handler (包裝)
 */
const createContextMenuHandler = (handler: () => void) => {
  return () => {
    handler();
    closeContextMenu();
  };
};

/**
 * 右鍵選單元件
 */
export const ContextMenu = () => {
  const lastSelectedIndex = selectionStore((state) => state.lastSelectedIndex);
  const contextMenuAnchor = appStateStore((state) => state.contextMenuAnchor);

  const isCurrentRoot = dataStore((state) => state.isCurrentRoot);
  const selected = selectionStore((state) => state.selected);
  const clipboardEntries = clipboardStore((state) => state.entries);
  const entries = viewDataStore((state) => state.entries);

  const hasSelection = selected.some((s) => s === 1);
  const hasClipboard = Object.keys(clipboardEntries).length > 0;
  const isOnItem = lastSelectedIndex !== null;

  const clickedEntry = lastSelectedIndex !== null ? entries[lastSelectedIndex] : null;

  return (
    <>
      <Menu
        open={Boolean(contextMenuAnchor)}
        onClose={closeContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={contextMenuAnchor!}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "tooltip.background",
              border: 1,
              borderColor: "tooltip.border",
              borderRadius: 1,
              boxShadow: "0 2px 8px var(--vscode-widget-shadow)",
            },
          },
        }}
      >
        {/* Navigation section - always shown */}
        <MenuItem onClick={createContextMenuHandler(() => openInEnvironment("workspace"))}>
          <ListItemIcon>
            <i className="codicon codicon-folder-library" />
          </ListItemIcon>
          <ListItemText>在此開啟...</ListItemText>
        </MenuItem>
        <MenuItem onClick={createContextMenuHandler(navigateUp)} disabled={isCurrentRoot}>
          <ListItemIcon>
            <i className="codicon codicon-arrow-up" />
          </ListItemIcon>
          <ListItemText>上層</ListItemText>
        </MenuItem>

        <Divider />

        {/* Item-specific actions - only shown when clicking on an item */}
        {isOnItem && (
          <>
            <MenuItem onClick={createContextMenuHandler(() => clickedEntry && openFile(clickedEntry.filePath))}>
              <ListItemIcon>
                <i className="codicon codicon-go-to-file" />
              </ListItemIcon>
              <ListItemText>在分頁開啟</ListItemText>
            </MenuItem>
            <MenuItem onClick={createContextMenuHandler(() => clickedEntry && openPropertyDialog())}>
              <ListItemIcon>
                <i className="codicon codicon-info" />
              </ListItemIcon>
              <ListItemText>內容</ListItemText>
            </MenuItem>

            <Divider />
          </>
        )}

        {/* Create actions */}
        <MenuItem onClick={createContextMenuHandler(createNewFolder)}>
          <ListItemIcon>
            <i className="codicon codicon-new-folder" />
          </ListItemIcon>
          <ListItemText>新增資料夾</ListItemText>
        </MenuItem>
        <MenuItem onClick={createContextMenuHandler(createNewFile)}>
          <ListItemIcon>
            <i className="codicon codicon-new-file" />
          </ListItemIcon>
          <ListItemText>新增檔案</ListItemText>
        </MenuItem>

        <Divider />

        {/* Clipboard operations - always shown */}
        <MenuItem onClick={createContextMenuHandler(writeClipboard)} disabled={!hasSelection}>
          <ListItemIcon>
            <i className="codicon codicon-copy" />
          </ListItemIcon>
          <ListItemText>複製</ListItemText>
        </MenuItem>
        <MenuItem onClick={createContextMenuHandler(readClipboard)} disabled={!hasClipboard}>
          <ListItemIcon>
            <i className="codicon codicon-clippy" />
          </ListItemIcon>
          <ListItemText>貼上</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};
