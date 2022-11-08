import React, { useContext, useEffect } from "react";
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
import { BsCheck2 } from "react-icons/bs";
import { CommonContext } from "../../context";
import {
  findCarDetails,
  findCarName,
  findUserDetails,
  findUserName,
  getRequest
} from "../../hooks";
import { useSelector } from "react-redux";
import { IUser } from "../../types/userTypes";

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

const CarRequestComponent = () => {
  const userSlice = useSelector((state: any) => state.userSlice);
  const user: IUser = userSlice.user;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { requests, setRequests, cars, users } = useContext(CommonContext);
  useEffect(() => {
    document.title = "Admin | Requests";
    getRequest(`${user.token}`, setRequests);
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
  console.log(requests);
  console.log(cars);
  console.log(users);
  const columns = [
    "Car Name",
    "Customer Name",
    "Status",
    "Price",
    "Currency",
    "Telephone",
    "Start Date",
    "End Date",
    "Actions"
  ];

  return (
    <div className="w-full  flex flex-col mt-5 px-12 items-center justify-start">
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
              {requests
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <StyledTableRow key={row.id + Math.random()}>
                    <StyledTableCell>
                      {findCarDetails(row.carId, cars)?.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {findUserDetails(row.userId, users)?.names}
                    </StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell>
                      {findCarDetails(row.carId, cars)?.price}
                    </StyledTableCell>
                    <StyledTableCell>
                      {findCarDetails(row.carId, cars)?.currency}
                    </StyledTableCell>
                    <StyledTableCell>
                      {findCarDetails(row.userId, users)?.telephone}
                    </StyledTableCell>
                    <StyledTableCell>{row.startDate}</StyledTableCell>
                    <StyledTableCell>{row.endDate}</StyledTableCell>
                    <StyledTableCell className="flex items-center justify-center">
                      <button
                        title="Grant"
                        className="delete p-2 mx-2  hover:rotate-12 rounded-full bg-red-600 text-white"
                      >
                        <BiTrash size={20} />
                      </button>
                      <button
                        title="Decline"
                        className="delete p-2 mx-2  hover:rotate-12 rounded-full bg-green-500 text-white"
                      >
                        <BsCheck2 size={20} />
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
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default CarRequestComponent;
