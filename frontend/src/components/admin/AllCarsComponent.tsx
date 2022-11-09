import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";
import { BiTrash } from "react-icons/bi";
import { deleteCar, formatDate } from "../../hooks";
import { useSelector } from "react-redux";
import { IUser } from "../../types/userTypes";
import { useDispatch } from "react-redux";
import { removeCar } from "../../redux/slices/carsSlice";
import { toast } from "react-toastify";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#161829",
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0
  }
}));

const AllCarsComponent: React.FC = () => {
  const { userSlice, carsSlice } = useSelector((state: any) => state);
  const { allCars } = carsSlice;
  const user: IUser = userSlice.user;
  const dispatch = useDispatch();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const rows = [...allCars]?.sort((a: any, b: any) => {
    return (new Date(b?.createdAt) as any) - (new Date(a?.createdAt) as any);
  });

  useEffect(() => {
    document.title = "Admin | Cars ";
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const columns = [
    "Car Name",
    "Brand",
    "Price",
    "Currency",
    "Created At",
    "Actions"
  ];
  return (
    <div className="w-full  flex flex-col mt-2 px-4 lg:px-12 items-center justify-start">
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <StyledTableCell key={index}>{column}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <StyledTableRow key={row.id + Math.random()}>
                    <StyledTableCell>{row.name}</StyledTableCell>
                    <StyledTableCell>{row.brand}</StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
                    <StyledTableCell>
                      {row.currency.toUpperCase()}
                    </StyledTableCell>
                    <StyledTableCell>
                      {formatDate(new Date(row.createdAt))}
                    </StyledTableCell>
                    <StyledTableCell className="flex items-center justify-center">
                      <button
                        title="Delete"
                        className="delete p-2 mx-2  hover:rotate-12 rounded-full bg-red-600 text-white"
                        onClick={async () => {
                          await deleteCar(
                            `${user.token}`,
                            row.id,
                            dispatch,
                            toast
                          );
                          dispatch(removeCar(row.id));
                        }}
                      >
                        <BiTrash size={20} />
                      </button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default AllCarsComponent;
