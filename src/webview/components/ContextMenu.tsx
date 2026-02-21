import { useState } from "react";
import { Menu, MenuItem, Divider, ListItemIcon, ListItemText } from "@mui/material";
import { appStateStore, dataStore, selectionStore, clipboardStore, viewDataStore } from "@view/store/data";
import { openInEnvironment, navigateUp } from "@view/action/navigation";
import { writeClipboard, readClipboard } from "@view/action/clipboard";
import { openFile, createNewFolder, createNewFile } from "@view/action/operation";
import { PropertyDialog } from "@view/layout-dialog/PropertyDialog";

/**
 * 右鍵選單元件
 */
export const ContextMenu = () => {
  const clickedIndex = appStateStore((state) => state.contextMenuIndex);
  const contextMenuAnchor = appStateStore((state) => state.contextMenuAnchor);

  const isCurrentRoot = dataStore((state) => state.isCurrentRoot);
  const selected = selectionStore((state) => state.selected);
  const clipboardEntries = clipboardStore((state) => state.entries);
  const entries = viewDataStore((state) => state.entries);

  const [propertyDialogOpen, setPropertyDialogOpen] = useState(false);

  const open = Boolean(contextMenuAnchor);
  const hasSelection = selected.some((s) => s === 1);
  const hasClipboard = Object.keys(clipboardEntries).length > 0;
  const isOnItem = clickedIndex !== null;

  const clickedEntry = clickedIndex !== null ? entries[clickedIndex] : null;

  const handleClose = () => {
    appStateStore.setState({ contextMenuAnchor: null, contextMenuIndex: null });
  };

  const handleOpenHere = () => {
    openInEnvironment("workspace");
    handleClose();
  };

  const handleNavigateUp = () => {
    navigateUp();
    handleClose();
  };

  const handleOpenInTab = () => {
    if (clickedEntry) {
      openFile(clickedEntry.filePath);
    }
    handleClose();
  };

  const handleShowProperties = () => {
    if (clickedEntry) {
      setPropertyDialogOpen(true);
    }
    handleClose();
  };

  const handleCopy = () => {
    writeClipboard();
    handleClose();
  };

  const handlePaste = () => {
    readClipboard();
    handleClose();
  };

  const handleCreateFolder = () => {
    createNewFolder();
    handleClose();
  };

  const handleCreateFile = () => {
    createNewFile();
    handleClose();
  };

  if (!contextMenuAnchor) return null;

  return (
    <>
      <Menu
        open={open}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: contextMenuAnchor.y, left: contextMenuAnchor.x }}
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
        <MenuItem onClick={handleOpenHere}>
          <ListItemIcon>
            <i className="codicon codicon-folder-library" />
          </ListItemIcon>
          <ListItemText>在此開啟...</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleNavigateUp} disabled={isCurrentRoot}>
          <ListItemIcon>
            <i className="codicon codicon-arrow-up" />
          </ListItemIcon>
          <ListItemText>上層</ListItemText>
        </MenuItem>

        <Divider />

        {/* Item-specific actions - only shown when clicking on an item */}
        {isOnItem && (
          <>
            <MenuItem onClick={handleOpenInTab}>
              <ListItemIcon>
                <i className="codicon codicon-go-to-file" />
              </ListItemIcon>
              <ListItemText>在分頁開啟</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleShowProperties}>
              <ListItemIcon>
                <i className="codicon codicon-info" />
              </ListItemIcon>
              <ListItemText>內容</ListItemText>
            </MenuItem>

            <Divider />
          </>
        )}

        {/* Create actions */}
        <MenuItem onClick={handleCreateFolder}>
          <ListItemIcon>
            <i className="codicon codicon-new-folder" />
          </ListItemIcon>
          <ListItemText>新增資料夾</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleCreateFile}>
          <ListItemIcon>
            <i className="codicon codicon-new-file" />
          </ListItemIcon>
          <ListItemText>新增檔案</ListItemText>
        </MenuItem>

        <Divider />

        {/* Clipboard operations - always shown */}
        <MenuItem onClick={handleCopy} disabled={!hasSelection}>
          <ListItemIcon>
            <i className="codicon codicon-copy" />
          </ListItemIcon>
          <ListItemText>複製</ListItemText>
        </MenuItem>
        <MenuItem onClick={handlePaste} disabled={!hasClipboard}>
          <ListItemIcon>
            <i className="codicon codicon-clippy" />
          </ListItemIcon>
          <ListItemText>貼上</ListItemText>
        </MenuItem>
      </Menu>
      <PropertyDialog open={propertyDialogOpen} onClose={() => setPropertyDialogOpen(false)} />
    </>
  );
};
