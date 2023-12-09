import { Container, Grid, Skeleton } from "@mui/material";

import { ICourse } from "../../../Interfaces/Course.interface";
import SectionHeading from "../../../components/Reused/Section/SectionHeading";
import { useFeaturedCourses } from "../../../hooks/useCourses";
import CourseCard from "../../Courses/CourseCard";

const FeaturedCourses = () => {
  const { data: featuredCourses, isLoading } = useFeaturedCourses();
  return (
    <>
      {featuredCourses?.length > 0 && (
        <Container
          fixed
          sx={{
            py: 10,
            borderLeft: {
              xs: 0,
              lg: `1px solid #E8E8E8`,
            },
          }}
        >
          <SectionHeading
            title="Featured Courses"
            rightSide={true}
            color="primary"
            buttonLink="/courses"
            buttonVariant="text"
          />
          <Grid container sx={{ mt: 5 }} spacing={2}>
            {isLoading ? (
              <>
                {[1, 2, 3].map((item: any, index: number) => (
                  <Grid
                    key={index}
                    item
                    lg={4}
                    sm={6}
                    xs={12}
                    sx={{
                      mb: 5,
                      width: {
                        xl: 350,
                        lg: 320,
                      },
                      mx: "auto",
                    }}
                  >
                    <Skeleton
                      variant="rectangular"
                      height={300}
                      sx={{
                        mr: 2,
                        ml: 2,
                      }}
                    />
                  </Grid>
                ))}
              </>
            ) : (
              <>
                {featuredCourses?.map((course: ICourse) => (
                  <CourseCard key={course?._id} course={course} />
                ))}
              </>
            )}
          </Grid>
        </Container>
      )}
    </>
  );
};

export default FeaturedCourses;
