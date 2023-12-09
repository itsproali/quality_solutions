import { Skeleton, TableCell, TableRow } from "@mui/material";

const TableLoading = () => {
  return (
    <>
      <TableRow>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
        <TableCell colSpan={2} align="center">
          <Skeleton animation="wave" />
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableLoading;
