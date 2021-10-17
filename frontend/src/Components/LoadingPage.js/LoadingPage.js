import { Typography } from "@material-ui/core";
import { LinearProgress, CircularProgress } from "@material-ui/core";

const LoadingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "100vh",
        flexDirection: "column",
        flexShrink: "0.5",
      }}
    >
      <div style={{ display: "flex", textAlign: "center" }}>
        <Typography color="primary" variant="h2">
          Camp Yellow
        </Typography>
      </div>
      <div>
        <LinearProgress style={{ width: "100px" }} />
      </div>
    </div>
  );
};

export default LoadingPage;
