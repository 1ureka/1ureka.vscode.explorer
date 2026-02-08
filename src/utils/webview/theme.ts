import { colord } from "colord";
import { createTheme } from "@mui/material";
import { getVarValue } from "@view/utils/style";

// ----------------------------------------------------------------------------

import type {} from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface TypeBackground {
    default: string;
    paper: string;
    content: string;
    input: string;
  }
  interface TypeAction {
    button: string;
    dropdown: string;
    active: string;
    border: string;
  }
  interface Palette {
    tooltip: {
      background: string;
      border: string;
    };
  }
  interface PaletteOptions {
    tooltip: {
      background: string;
      border: string;
    };
  }
}

// ----------------------------------------------------------------------------

const theme = createTheme({
  cssVariables: true,
  defaultColorScheme: "dark", // 這與實際主題無關，因為是用 var(--vscode-xxx) 來取色，用 dark 是為了只需要定義一組色彩
  colorSchemes: {
    dark: {
      palette: {
        primary: {
          main: colord(getVarValue("editor-selectionBackground")).alpha(1).lighten(0.1).toHex(),
        },
        background: {
          default: getVarValue("editor-background"),
          paper: getVarValue("menu-background"),
          content: getVarValue("sideBar-background"),
          input: colord(getVarValue("sideBar-background")).darken(0.05).toHex(),
        },
        action: {
          button: colord(getVarValue("editor-background")).lighten(0.15).toHex(),
          dropdown: colord(getVarValue("sideBar-background")).darken(0.025).toHex(),
          active: getVarValue("editor-selectionBackground"),
          border: getVarValue("menu-background"),
        },
        text: {
          primary: getVarValue("foreground"),
          secondary: getVarValue("descriptionForeground"),
          disabled: getVarValue("disabledForeground"),
        },
        tooltip: {
          background: getVarValue("editorHoverWidget-background"),
          border: getVarValue("editorHoverWidget-border"),
        },
        info: {
          main: getVarValue("editor-selectionBackground"),
        },
        divider: getVarValue("disabledForeground"),
      },
    },
  },
  typography: {
    fontFamily: getVarValue("editor-font-family"),
  },
  shape: {
    borderRadius: 6,
  },
});

export { theme };
