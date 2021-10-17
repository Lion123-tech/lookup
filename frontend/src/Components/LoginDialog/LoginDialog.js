import { Button, Grid } from "@material-ui/core";
import { googleLogin } from "../../services/services";

const GoogleLoginButton = () => (
  <Button variant="contained" color="primary" onClick={googleLogin}>
    Sign in with Google
  </Button>
);

export const LoginDialog = () => (
  <Grid container>
    <Grid item container xs={12} justifyContent="center">
      <GoogleLoginButton />
    </Grid>
  </Grid>
);
