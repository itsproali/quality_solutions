import { Box, LinearProgress } from "@mui/material";
import { Router } from "next/router";
import { useEffect, useState } from "react";

const PageProgress = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    Router.events.on("routeChangeStart", startLoading);
    Router.events.on("routeChangeComplete", stopLoading);
    Router.events.on("routeChangeError", stopLoading);

    return () => {
      Router.events.off("routeChangeStart", startLoading);
      Router.events.off("routeChangeComplete", stopLoading);
      Router.events.off("routeChangeError", stopLoading);
    };
  }, []);
  return (
    <>
      {loading ? (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 20000,
          }}
        >
          <LinearProgress />
        </Box>
      ) : null}
    </>
  );
};

export default PageProgress;
