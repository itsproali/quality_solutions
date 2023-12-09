import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useSingleCourseInfo } from "../../hooks/useCourses";
import Link from "next/link";

interface IProps {
  courseId: string;
}

const MyCourseCard = ({ courseId }: IProps) => {
  const router = useRouter();
  const { data: course } = useSingleCourseInfo(courseId);
  return (
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
            image={course?.thumbnail}
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
              {course?.title}
            </Typography>
          </CardContent>
        </Box>

        <CardActions>
          <Link href={"/my-courses/" + course?._id}>
            <Button fullWidth variant="contained" color="primary">
              Continue
            </Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export default MyCourseCard;
