import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SxProps,
} from "@mui/material";

type IProps = {
  category: string;
  setCategory: (category: string) => void;
  categories: any;
  sx?: SxProps;
};

const CategoryFilter = ({ category, setCategory, categories, sx }: IProps) => {
  return (
    <>
      <FormControl sx={{ width: "50%", ...sx }}>
        <InputLabel id="demo-simple-select-label">Select Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Select Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          defaultOpen={false}
          variant="outlined"
          sx={{
            borderRadius: 2,
            "&:focus": {
              border: "1px solid",
              borderColor: "primary.main",
            },
          }}
          MenuProps={{
            sx: {
              mt: 1,
              "& .MuiPaper-root": {
                borderRadius: 2,
                border: "1px solid",
                borderColor: "primary.main",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
              },
              "& .MuiMenuItem-root": {
                fontWeight: 500,
              },
            },
          }}
        >
          <MenuItem value="all">All</MenuItem>
          {categories?.map((category: any) => (
            <MenuItem key={category._id} value={category._id}>
              {category.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CategoryFilter;
