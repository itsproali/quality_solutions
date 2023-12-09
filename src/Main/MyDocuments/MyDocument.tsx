import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePurchaseDocuments } from "../../hooks/useProducts";

const MyDocument = ({ document }: any) => {
  const router = useRouter();

  const { data, isLoading, isFetching, error } = usePurchaseDocuments(
    document?._id
  );

  // const handleViewMyDocument = () => {
  //   dispatch(setMyDocument(data));
  // };

  return (
    <>
      {data ? (
        <Grid
          item
          lg={4}
          sm={6}
          xs={12}
          sx={{
            // textAlign: "center",
            mb: 5,
          }}
        >
          <Card
            sx={{
              boxShadow: 0,
              border: "1px solid",
              borderColor: "grey.300",
              p: 1,
              borderRadius: 3,
              height: "100%",
              overflow: "hidden",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                height: "100%",
              }}
            >
              <Box>
                <CardMedia
                  component="img"
                  sx={{
                    objectFit: "contain",
                    aspectRatio: "300/200",
                  }}
                  image={data?.image}
                  alt="Thumbnail"
                />
                <CardContent sx={{ p: 1 }}>
                  <Typography
                    sx={{
                      fontSize: {
                        md: "16px",
                        xs: "14px",
                      },
                      fontWeight: 600,
                    }}
                  >
                    {data?.title}
                  </Typography>
                </CardContent>
              </Box>

              <CardActions>
                <Link href={"/my-documents/" + data?._id}>
                  <Button fullWidth variant="contained" color="primary">
                    View Document
                  </Button>
                </Link>
              </CardActions>
            </Box>
          </Card>
        </Grid>
      ) : null}
    </>
  );
};

export default MyDocument;
