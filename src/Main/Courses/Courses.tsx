import SearchIcon from "@mui/icons-material/Search";
import { Box, Container, FormControl, Grid, Typography } from "@mui/material";
import { ICourse } from "../../Interfaces/Course.interface";
import CardLoading from "../../components/Reused/CardLoading";
import EmptyUI from "../../components/Reused/EmptyUI";
import TopBanner from "../../components/Reused/TopBanner/TopBanner";
import { useCourses } from "../../hooks/useCourses";
import TrainingCourseCard from "./TrainingCourseCard";
import { useState } from "react";

const Courses = () => {
  const [search, setSearch] = useState("");
  const { data: courseData, isLoading } = useCourses({ searchTerm: search });
  return (
    <Box>
      <Container fixed sx={{ my: 16, minHeight: "57vh" }}>
        <TopBanner
          title="Training"
          description="Fuel your UX journey with a treasure trove of virtual events, exclusively curated for passionate practitioners."
        />
        {/* Title & Filter */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            my: 6,
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: "18px", lg: "32px" },
              width: "100%",
            }}
            variant="h3"
          >
            All Training Courses
          </Typography>
          <SearchBar search={search} setSearch={setSearch} />
        </Box>
        <Box sx={{ mt: 5 }}>
          {isLoading ? (
            <CardLoading row={3} />
          ) : !courseData.total ? (
            <EmptyUI
              title="Currently there's no course available
            at this moment."
              img="/icons/empty_course.png"
            />
          ) : (
            <Grid container spacing={3}>
              {courseData?.courses?.map((course: ICourse) => (
                <Grid item xs={12} sm={6} md={4} key={course?._id}>
                  <TrainingCourseCard course={course} />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Courses;

const SearchBar = ({ search, setSearch }) => {
  return (
    <FormControl
      sx={{
        minWidth: 312,
        height: "52px",
        position: "relative",
        "& input": {
          height: "100%",
          borderRadius: "8px",
          outline: "none",
          border: "1px solid",
          borderColor: "grey.300",
          pl: "16px",
          pr: "48px",
          fontSize: "16px",
          fontWeight: 500,
          color: "text.primary",
        },
      }}
    >
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <SearchIcon
        sx={{
          position: "absolute",
          right: "16px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "grey.600",
        }}
      />
    </FormControl>
  );
};
