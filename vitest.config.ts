import { defineConfig } from "vitest/config";
import path from "path";

/**
 * 來自 tsconfig.json 的路徑別名設定
 */
const alias = {
  "@vscode/utils": path.resolve(__dirname, "src/vscode"),
  "@shared/utils": path.resolve(__dirname, "src/utils/shared"),
  "@host/utils": path.resolve(__dirname, "src/utils/host"),
  "@view/utils": path.resolve(__dirname, "src/utils/webview"),
  "@assets": path.resolve(__dirname, "src/assets"),
  "@host": path.resolve(__dirname, "src/host"),
  "@view": path.resolve(__dirname, "src/webview"),
  "@tests": path.resolve(__dirname, "tests"),
};

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "dist"],
    testTimeout: 10000, // 測試超時時間（檔案系統操作可能較慢）
  },
  resolve: { alias },
});
