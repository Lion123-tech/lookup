import { createTheme,responsiveFontSizes  } from "@material-ui/core";
import { blue, yellow } from "@material-ui/core/colors";

const CSSOverrides = {
  MuiPaper: {
    rounded: {
      borderRadius: "8px",
    },
  },
  MuiButton: {
    root: {
      textTransform: "none",
      fontWeight: "600",
      borderRadius: "999px",
      color: "white",
    },
  },
};

const propOverrides = {
  MuiPaper: {
    elevation: 3,
  },
  MuiButton: {
    variant: "outlined",
    size: "small",
  },
};


// theme.typography.h3 = {
//   fontSize: '1.2rem',
//   '@media (min-width:600px)': {
//     fontSize: '1rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '2.4rem',
//   },
// };

export const darkTheme = createTheme({
  props: propOverrides,
  overrides: CSSOverrides,

  palette: {
    type: "dark",
    primary: {
      main: yellow[700],
    },
  },
});

export const lightTheme = createTheme({
  props: propOverrides,
  overrides: CSSOverrides,
  palette: {
    type: "light",
    primary: {
      main: blue[700],
      yellow:"#DBFD04"
    },
    secondary: {
      main: "#00ad0b"
    }
  },
});
