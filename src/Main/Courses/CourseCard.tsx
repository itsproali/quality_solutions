import CategoryIcon from "@mui/icons-material/Category";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { ICourse } from "../../Interfaces/Course.interface";

const CourseCard = ({ course }: { course: ICourse }) => {
  return (
    <Grid
      item
      lg={4}
      sm={6}
      xs={12}
      sx={{
        mb: 5,
      }}
    >
      <Card sx={{ maxWidth: { xl: 400, lg: 320 }, mx: "auto", height: "100%" }}>
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
              image={course?.thumbnail}
              alt="course Image"
            />
            <CardContent>
              <Typography
                sx={{
                  fontSize: {
                    md: "16px",
                    xs: "14px",
                  },
                  fontWeight: 600,
                }}
              >
                {course?.title}
              </Typography>

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2 }}
              >
                <>
                  {course?.isFree ? (
                    <Box
                      component="span"
                      sx={{
                        px: 2,
                        py: 1,
                        bgcolor: "#e0bf48",
                        borderRadius: "10px",
                      }}
                    >
                      Free
                    </Box>
                  ) : (
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "primary.main",
                      }}
                    >
                      {`$ ${course?.price_usd} or ৳ ${course?.price_bdt}`}
                    </Typography>
                  )}
                </>
                <Stack direction="row" spacing={1} alignItems="center">
                  <CategoryIcon color="primary" />
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontSize: {
                        md: "14px",
                        xs: "12px",
                      },
                    }}
                  >
                    {course?.type}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Box>

          <CardActions sx={{ p: 1 }}>
            <Link href={"/courses/" + course?._id}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ fontWeight: 600, textTransform: "none" }}
              >
                View Details
              </Button>
            </Link>
          </CardActions>
        </Box>
      </Card>
    </Grid>
  );
};

export default CourseCard;
