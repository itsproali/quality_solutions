import { Stack, Button, Box } from "@mui/material";
import { useState } from "react";
import { ICourse, IVideo } from "../../Interfaces/Course.interface";

const tabs = [
  { label: "Overview", value: "overview" },
  { label: "Resources", value: "resources" },
  // { label: "Review", value: "review" },
];

interface IProps {
  courseInfo: ICourse;
  selectedVideo: IVideo;
}
const CourseTabs = ({ courseInfo, selectedVideo }: IProps) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        spacing={4}
        sx={{
          mt: 2,
          borderBottom: "1px solid",
          borderColor: "divider",
          p: 1.5,
        }}
      >
        {tabs?.map((item) => (
          <Button
            key={item?.value}
            size="large"
            variant={activeTab === item?.value ? "contained" : "text"}
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              color: activeTab === item?.value ? "white" : "text.secondary",
            }}
            onClick={() => setActiveTab(item?.value)}
          >
            {item?.label}
          </Button>
        ))}
      </Stack>

      {/* Description */}
      <Box sx={{ mt: 6 }}>
        {activeTab === "overview" ? (
          <Box
            sx={{ width: "100%" }}
            dangerouslySetInnerHTML={{ __html: courseInfo?.description }}
          />
        ) : activeTab === "resources" ? (
          <Box
            sx={{
              borderRadius: 4,
              border: "1px solid",
              borderColor: "divider",
              p: 4,
            }}
          >
            {selectedVideo?.resource || "No Resources Available!"}
          </Box>
        ) : activeTab === "review" ? (
          <Box></Box>
        ) : null}
      </Box>
    </>
  );
};

export default CourseTabs;
