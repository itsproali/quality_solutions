import Link from "next/link";
import { ICourse } from "../../Interfaces/Course.interface";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";

const TrainingCourseCard = ({ course }: { course: ICourse }) => {
  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: "grey.300",
        p: { xs: 1, md: 2 },
        borderRadius: 4,
        height: "100%",
        overflow: "hidden",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <Link href={`/courses/${course?._id}`}>
        <Box sx={{ cursor: "pointer" }}>
          <Box
            sx={{
              aspectRatio: "344/234",
              position: "relative",
              objectFit: "contain",
            }}
          >
            <Image
              style={{ borderRadius: "16px" }}
              src={course?.image}
              alt="Course Image"
              layout="fill"
            />
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ my: 3 }}
          >
            <Box
              sx={{
                p: 1,
                bgcolor: course?.isFree ? "#E7F8F0" : "#E6F0FF",
                color: course?.isFree ? "success.main" : "primary.main",
                borderRadius: "4px",
                display: "flex",
                alignItems: "flex-end",
                gap: 0.5,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: 14,
                  fontWeight: 800,
                }}
              >
                {course?.isFree ? "Free" : "BDT"}
              </Typography>
              {course?.isFree || (
                <Typography
                  variant="h6"
                  sx={{
                    lineHeight: 1.2,
                    fontWeight: 800,
                  }}
                >
                  {course?.price_bdt}
                </Typography>
              )}
            </Box>

            <Box
              sx={{
                py: 0.75,
                px: 2,
                border: "1px solid",
                borderColor: "primary.main",
                color: "primary.main",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Image
                src={
                  course?.type === "tutorial"
                    ? "/icons/play.png"
                    : "/icons/document.png"
                }
                alt="icon"
                width={20}
                height={20}
              />

              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  textTransform: "capitalize",
                }}
              >
                {course?.type}
              </Typography>
            </Box>
          </Stack>

          <Typography
            variant="h5"
            sx={{
              my: 2,
              color: "text.secondary",
              fontWeight: 800,
              "&:hover": {
                color: "primary.main",
              },
            }}
          >
            {course?.title}
          </Typography>
        </Box>
      </Link>
    </Box>
  );
};

export default TrainingCourseCard;
