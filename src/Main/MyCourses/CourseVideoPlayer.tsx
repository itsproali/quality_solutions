import { Box, Stack, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { ICourse, IVideo } from "../../Interfaces/Course.interface";

interface IProps {
  courseInfo: ICourse | undefined;
  selectedVideo: IVideo;
}

const CourseVideoPlayer = ({ courseInfo, selectedVideo }: IProps) => {
  return (
    <>
      <Box sx={{ aspectRatio: "16/9" }}>
        {selectedVideo?._id ? (
          <>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <ReactPlayer
                width="100%"
                height="100%"
                url={selectedVideo?.link}
                playing={false}
                controls={true}
                config={{
                  youtube: {
                    embedOptions: {
                      host: "https://www.youtube-nocookie.com",
                      embedPath: "/embed/",
                    },
                  },
                  file: {
                    attributes: {
                      // Remove download button
                      controlsList: "nodownload",
                    },
                  },
                }}
              />
            </Box>

            <Stack
              direction="row"
              justifyContent="flex-start"
              sx={{ mt: 2, mb: 6 }}
            >
              <Typography variant="h5" fontWeight={600}>
                {selectedVideo?.title}
              </Typography>
            </Stack>
          </>
        ) : (
          <Box
            component="img"
            sx={{
              height: "100%",
              width: "100%",
              objectFit: "cover",
            }}
            alt="course"
            src={courseInfo?.image}
          />
        )}
      </Box>
    </>
  );
};

export default CourseVideoPlayer;
