import { createTheme } from "@mui/material/styles";

// Declare to add new color to palette
declare module "@mui/material/styles/createPalette" {
  interface TypeBackground {
    primary?: string;
    secondary?: string;
  }
  interface SimplePaletteColorOptions {
    lighter?: string;
    darker?: string;
  }
  interface PaletteColor {
    lighter?: string;
    darker?: string;
    dark_hover?: string;
    contrastText: string;
  }
}

// All Color Pallete
const PRIMARY = {
  lighter: "#e6f0ff",
  light: "#b0cfff",
  main: "#0065FF",
  dark: "#004cbf",
  dark_hover: "#003D99",
  darker: "#002359",
  contrastText: "#fff",
};

const SECONDARY = {
  lighter: "#c5cae9", // indigo[100]
  light: "#7986cb", // indigo[300]
  main: "#3f51b5", // indigo[500]
  dark: "#283593", // indigo[800]
  darker: "#1a237e", // indigo[900]
  contrastText: "#fff",
};

const INFO = {
  lighter: "#CAFDF5",
  light: "#61F3F3",
  main: "#00B8D9",
  dark: "#006C9C",
  darker: "#003768",
  contrastText: "#fff",
};

const SUCCESS = {
  lighter: "#E7F8F0",
  light: "#86E8AB",
  main: "#12B76A",
  dark: "#1B806A",
  darker: "#0A5554",
  contrastText: "#fff",
};

const WARNING = {
  lighter: "#FFF7E6",
  light: "#FFD666",
  main: "#FFAA00",
  dark: "#B76E00",
  darker: "#7A4100",
  contrastText: "#212B36",
};

const ERROR = {
  lighter: "#FEECEB",
  light: "#FFAC82",
  main: "#F04438",
  dark: "#B71D18",
  darker: "#7A0916",
  contrastText: "#fff",
};

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: PRIMARY,
    secondary: SECONDARY,
    info: INFO,
    success: SUCCESS,
    warning: WARNING,
    error: ERROR,
    divider: "#E6E6E6",

    text: {
      primary: "#212B36",
      secondary: "#002359",
    },
    background: {
      paper: "#FCFDFF",
      primary: "#FCFDFF",
      secondary: "#002359",
    },
  },

  typography: {
    fontFamily: ["Manrope", "Nunito", "sans-serif"].join(","),
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          "&.Mui-disabled": {
            cursor: "not-allowed",
          },
        },
      },
    },
  },
});

export default theme;
