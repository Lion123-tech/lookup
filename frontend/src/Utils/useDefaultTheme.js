import { useMediaQuery } from "@material-ui/core";

const useDefaultTheme = () => {
  const darkPref = useMediaQuery("(prefers-color-scheme: dark)");
  return darkPref ? "dark" : "light";
};

export default useDefaultTheme;
