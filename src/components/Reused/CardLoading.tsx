import { Grid, Skeleton } from "@mui/material";

const CardLoading = ({ row }: { row: number }) => {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: row }).map((item: any, index: number) => (
        <Grid key={index} item lg={12 / row} sm={row * 2} xs={12}>
          <Skeleton
            variant="rectangular"
            height={300}
            sx={{ borderRadius: 2 }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CardLoading;
