import { Box, Grid, Typography } from "@mui/material";
import CardLoading from "../../components/Reused/CardLoading";
import EmptyUI from "../../components/Reused/EmptyUI";
import { useMyDocument } from "../../hooks/useOrder";
import MyDocument from "./MyDocument";

const MyDocuments = () => {
  const { data, isLoading, error } = useMyDocument();

  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        My Documents
      </Typography>
      <Box>
        {isLoading ? (
          <CardLoading row={3} />
        ) : !data?.length ? (
          <EmptyUI title="Currently you don't have any documents!" />
        ) : (
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {data?.map((document: any) =>
              document?.product ? (
                <MyDocument document={document?.product} key={document?._id} />
              ) : null
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default MyDocuments;
