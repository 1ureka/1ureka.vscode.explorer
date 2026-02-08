import { createRoot } from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "@view/utils/theme";

/**
 * 啟動 React 應用程式
 */
const startReactApp = async (params: { App: React.FC; beforeRender?: () => Promise<void> | void }) => {
  const { App, beforeRender } = params;
  const container = document.getElementById("root");

  if (!container) {
    throw new Error("找不到 root 容器，無法啟動 React 應用程式。");
  }

  if (beforeRender) {
    const result = beforeRender();
    if (result instanceof Promise) {
      console.warn("等待 beforeRender 完成...");
      await result;
    }
  }

  createRoot(container).render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>,
  );
};

export { startReactApp };
