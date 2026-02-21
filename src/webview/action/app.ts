import { appStateStore } from "@view/store/data";
import { tableClass } from "@view/layout-table/config";
import { tableRowIndexAttr } from "@view/layout-table/TableRow";

/**
 * 根據事件獲取對應的資料列索引
 */
const getIndexFromEvent = (e: PointerEvent) => {
  const target = e.target as HTMLElement;

  const indexStr = target.closest(`.${tableClass.row}`)?.getAttribute(tableRowIndexAttr);
  if (indexStr === undefined) return null;

  const index = Number(indexStr);
  if (isNaN(index)) return null;

  return index;
};

/**
 * 處理右鍵選單事件
 */
const registerContextMenu = () => {
  const handleContextMenu = (e: PointerEvent) => {
    if (window.getSelection()?.type === "Range") return; // 有文字選取時不觸發右鍵選單

    e.preventDefault();
    e.stopPropagation();
    if (!e.target) return;

    const index = getIndexFromEvent(e);
    appStateStore.setState({
      contextMenuAnchor: { x: e.clientX, y: e.clientY },
      contextMenuIndex: index,
    });
  };

  window.addEventListener("contextmenu", handleContextMenu, true);
};

/**
 * 關閉右鍵選單
 */
const closeContextMenu = () => {
  appStateStore.setState({ contextMenuAnchor: null, contextMenuIndex: null });
};

/**
 * 開啟內容對話框
 */
const openContentDialog = () => {
  appStateStore.setState({ showContentDialog: true });
};

/**
 * 關閉內容對話框
 */
const closeContentDialog = () => {
  appStateStore.setState({ showContentDialog: false });
};

export { registerContextMenu, closeContextMenu, openContentDialog, closeContentDialog };
