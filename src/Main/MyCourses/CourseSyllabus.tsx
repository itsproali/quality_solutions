import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { IChapter, IVideo } from "../../Interfaces/Course.interface";
import { useRouter } from "next/router";
import Image from "next/image";

interface IProps {
  chapters: any;
}

type ChapterWithVideos = IChapter & { videos: IVideo[] };

const CourseSyllabus = ({ chapters }: IProps) => {
  const router = useRouter();
  const selectedChapterId = router?.query?.chapter as string;
  const [expanded, setExpanded] = useState<string | false>(
    selectedChapterId || false
  );
  const selectedVideoId = router?.query?.video as string;

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleSelectVideo = (video: IVideo) => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, chapter: video?.chapter, video: video?._id },
    });
  };
  return (
    <div
      style={{ overflowY: "auto", height: "65vh" }}
      className="custom-scroll"
    >
      <Stack spacing={2}>
        {chapters?.map((chapter: ChapterWithVideos, i: number) => (
          <Accordion
            key={chapter?._id}
            expanded={expanded === chapter?._id}
            onChange={handleChange(chapter?._id)}
            sx={{
              bgcolor: "rgb(85, 108, 214, 0.05)",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow:
                expanded === chapter?._id
                  ? "1px 2px 8px rgba(85, 108, 214, 0.2)"
                  : "1px 2px 5px rgba(0, 0, 0, 0.1)",
              py: 1,
              "&::before": { display: "none" },
            }}
            square={false}
            disableGutters={true}
            variant="elevation"
            elevation={0}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
              sx={{ borderBottom: "1px solid", borderColor: "divider" }}
            >
              <Stack
                direction="row"
                alignItems="flex-start"
                spacing={1}
                sx={{
                  width: "100%",
                  fontWeight: 600,
                  fontSize: 21,
                  color: expanded === chapter?._id ? "primary.main" : "inherit",
                }}
              >
                <Typography variant="inherit" sx={{ flexShrink: 0 }}>
                  Chapter {i + 1}:
                </Typography>
                <Typography variant="inherit">{chapter?.title}</Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                direction="column"
                alignItems="flex-start"
                spacing={2}
                sx={{ px: 1 }}
              >
                {chapter?.videos?.map((video: IVideo, videoIndex: number) => (
                  <Stack
                    key={video?._id}
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    onClick={() => handleSelectVideo(video)}
                    sx={{
                      width: "100%",
                      cursor: "pointer",
                      color:
                        video?._id === selectedVideoId
                          ? "primary.main"
                          : "inherit",
                      "&:hover": {
                        color: "primary.main",
                      },
                      "& img": {
                        filter:
                          video?._id === selectedVideoId
                            ? "invert(0)"
                            : "invert(0.5)",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="h6" fontWeight={500}>
                        {i + 1}.{videoIndex + 1}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={500}
                        title={video?.title}
                      >
                        {video?.title?.length > 30
                          ? video?.title?.slice(0, 30) + "..."
                          : video?.title}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Typography variant="h6" fontWeight={500}>
                        1:56
                      </Typography>
                      <Image
                        src="/icons/play.png"
                        alt="play"
                        width={15}
                        height={15}
                      />
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </div>
  );
};

export default CourseSyllabus;
