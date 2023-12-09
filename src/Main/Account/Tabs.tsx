import { Box, Stack, Tab, Typography } from "@mui/material";

type CustomTabProps = {
  icon?: React.ReactNode;
  label: string;
  [x: string]: any;
};

export const CustomTab = ({ icon, label, ...rest }: CustomTabProps) => {
  return (
    <Tab
      label={
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          justifyContent="flex-start"
          width="100%"
        >
          {icon}
          <Typography variant="body2">{label}</Typography>
        </Stack>
      }
      sx={{ "&.Mui-selected": { bgcolor: "rgba(45, 119, 255, 0.2)" } }}
      {...rest}
    />
  );
};

interface CustomTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel = (props: CustomTabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
