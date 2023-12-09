import {
  Box,
  Card,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { useMyCourses } from "../../hooks/useCourses";
import MyCourseCard from "./MyCourseCard";
import CardLoading from "../../components/Reused/CardLoading";
import EmptyUI from "../../components/Reused/EmptyUI";

const MyCourses = () => {
  const { data, isLoading, error } = useMyCourses();

  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        My Courses
      </Typography>

      <Box
        sx={{
          width: "100%",
        }}
      >
        {isLoading ? (
          <CardLoading row={3} />
        ) : !data?.length ? (
          <EmptyUI title="Currently you aren't enrolled any courses!" />
        ) : (
          <Grid container spacing={2} sx={{ mt: 4 }}>
            {data?.map((item: any) => (
              <Grid item lg={4} md={6} xs={12} key={item?._id}>
                <MyCourseCard courseId={item?.course?._id} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default MyCourses;
