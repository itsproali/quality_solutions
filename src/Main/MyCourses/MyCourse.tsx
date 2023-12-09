import {
  Box,
  Container,
  Grid,
  LinearProgress,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  useChapters,
  useSingleCourseInfo,
  useSingleVideo,
} from "../../hooks/useCourses";
import CourseSyllabus from "./CourseSyllabus";
import CourseVideoPlayer from "./CourseVideoPlayer";
import CourseTabs from "./CourseTabs";

interface IProps {
  courseId: string;
}

const MyCourse = ({ courseId }: IProps) => {
  const [courseContentProgress, setCourseContentProgress] = useState(20);
  const router = useRouter();
  const selectedVideoId = router?.query?.video as string;
  const { data: selectedVideo, isLoading: videoLoading } =
    useSingleVideo(selectedVideoId);
  const { data: courseInfo, isLoading: infoLoading } =
    useSingleCourseInfo(courseId);
  // const { data: course, isLoading: courseLoading } = useSingleCourse(courseId);
  const { data: chapters, isLoading: chaptersLoading } = useChapters({
    courseId,
  });

  // Tabs
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const tabProps = (index: number) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    tabValue: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, tabValue, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={tabValue !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {tabValue === index && <Box>{children}</Box>}
      </div>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ my: 16 }}>
      <Box>
        <Stack direction={{ xs: "column-reverse", lg: "row" }} spacing={4}>
          {/* Left Side */}
          <Box sx={{ flexBasis: { xs: "100%", lg: "35%" } }}>
            {chaptersLoading ? (
              <>
                {Array.from({ length: 5 }).map((a, i) => (
                  <Skeleton
                    key={i}
                    variant="rounded"
                    animation="wave"
                    width="100%"
                    height="100px"
                    sx={{ my: 2 }}
                  />
                ))}
              </>
            ) : (
              <>
                <Box sx={{ mb: 4 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h6" fontWeight={600}>
                      Course Content
                    </Typography>
                    <Typography variant="h6" fontWeight={600}>
                      {courseContentProgress}% Done
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={courseContentProgress}
                    sx={{ borderRadius: 10, mt: 1, height: 5 }}
                  />
                </Box>
                <CourseSyllabus chapters={chapters?.data || []} />
              </>
            )}
          </Box>

          {/* Right Side */}
          <Box sx={{ flexBasis: { xs: "100%", lg: "65%" } }}>
            {infoLoading ? (
              <Skeleton
                variant="rounded"
                animation="wave"
                width="100%"
                height="65vh"
              />
            ) : (
              <>
                <CourseVideoPlayer
                  courseInfo={courseInfo || undefined}
                  selectedVideo={selectedVideo}
                />
                <CourseTabs
                  courseInfo={courseInfo}
                  selectedVideo={selectedVideo}
                />
              </>
            )}
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default MyCourse;
