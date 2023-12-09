import { Box, Button, IconButton } from "@mui/material";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import {
  ToolbarProps,
  ToolbarSlot,
  defaultLayoutPlugin,
} from "@react-pdf-viewer/default-layout";
import React, { ReactElement } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PDFReader = ({ data }: { data: any }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    renderToolbar,
    sidebarTabs: (defaultTabs) => [defaultTabs[0]],
  });

  console.log({ data });

  return (
    <Box>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Box
          sx={{
            height: {
              lg: "850px",
              md: "650px",
              xs: "450px",
            },
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "10px",
          }}
        >
          <Viewer
            fileUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/${data?.document}`}
            plugins={[defaultLayoutPluginInstance]}
          />
        </Box>
      </Worker>
    </Box>
  );
};

export default PDFReader;

const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
  <Toolbar>
    {(slots: ToolbarSlot) => {
      const {
        ZoomOut,
        ZoomIn,
        NumberOfPages,
        GoToPreviousPage,
        GoToNextPage,
        CurrentPageInput,
        CurrentScale,
      } = slots;
      return (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: { xs: 1.5, md: 2 },
              ml: 1,
            }}
          >
            <Box sx={{}}>
              <ZoomIn>
                {(props) => (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      {...props}
                      startIcon={<AddCircleOutlineIcon />}
                      sx={{ display: { xs: "none", md: "flex" } }}
                    >
                      Zoom In
                    </Button>
                    <IconButton
                      size="small"
                      {...props}
                      sx={{
                        display: { xs: "grid", md: "none" },
                        placeItems: "center",
                      }}
                    >
                      <ZoomInIcon />
                    </IconButton>
                  </>
                )}
              </ZoomIn>
            </Box>

            <Box sx={{ mx: { xs: 0, md: 2 } }}>
              <CurrentScale>
                {(props) => <span>{`${Math.round(props.scale * 100)}%`}</span>}
              </CurrentScale>
            </Box>
            <Box sx={{}}>
              <ZoomOut>
                {(props) => (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      {...props}
                      startIcon={<RemoveCircleOutlineIcon />}
                      sx={{ display: { xs: "none", md: "flex" } }}
                    >
                      Zoom Out
                    </Button>
                    <IconButton
                      size="small"
                      {...props}
                      sx={{
                        display: { xs: "grid", md: "none" },
                        placeItems: "center",
                      }}
                    >
                      <ZoomOutIcon />
                    </IconButton>
                  </>
                )}
              </ZoomOut>
            </Box>
          </Box>

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              // justifyContent: "flex-end",
              ml: { xs: 2, sm: 6, md: 10 },
              gap: { xs: 1.5, md: 2 },
            }}
          >
            <Box>
              <GoToPreviousPage>
                {(props) => (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      {...props}
                      sx={{
                        cursor: props.isDisabled ? "not-allowed" : "pointer",
                        display: { xs: "none", md: "flex" },
                      }}
                      disabled={props.isDisabled}
                    >
                      Previous
                    </Button>
                    <IconButton
                      size="small"
                      {...props}
                      sx={{
                        display: { xs: "grid", md: "none" },
                        placeItems: "center",
                        cursor: props.isDisabled ? "not-allowed" : "pointer",
                      }}
                      disabled={props.isDisabled}
                    >
                      <NavigateBeforeIcon />
                    </IconButton>
                  </>
                )}
              </GoToPreviousPage>
            </Box>
            <Box
              sx={{
                padding: "0px 0px",
                width: { xs: "2rem", md: "4rem" },
                ml: { xs: 0, md: 2 },
              }}
            >
              <CurrentPageInput />
            </Box>
            <Box
              sx={{
                padding: "0px 0px",
                mr: { xs: 0, md: 2 },
                ml: { xs: 0, md: 1 },
              }}
            >
              / <NumberOfPages />
            </Box>
            <Box>
              <GoToNextPage>
                {(props) => (
                  <>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      sx={{
                        cursor: props.isDisabled ? "not-allowed" : "pointer",
                        display: { xs: "none", md: "flex" },
                      }}
                      {...props}
                      disabled={props.isDisabled}
                    >
                      Next
                    </Button>
                    <IconButton
                      size="small"
                      {...props}
                      sx={{
                        display: { xs: "grid", md: "none" },
                        placeItems: "center",
                        cursor: props.isDisabled ? "not-allowed" : "pointer",
                      }}
                      disabled={props.isDisabled}
                    >
                      <NavigateNextIcon />
                    </IconButton>
                  </>
                )}
              </GoToNextPage>
            </Box>
          </Box>
        </Box>
      );
    }}
  </Toolbar>
);
