import React, { useEffect, useState } from "react";
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
import {
  acceptRequest,
  findCarDetails,
  findUserDetails,
  rejectRequest
} from "../../hooks";
import { useSelector } from "react-redux";
import { IUser } from "../../types/userTypes";
import { useDispatch } from "react-redux";
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

const CarRequestComponent = () => {
  const { userSlice, usersSlice, carsSlice, requestsSlice } = useSelector(
    (state: any) => state
  );
  const user: IUser = userSlice.user;
  const users: IUser[] = usersSlice.users;
  const requests = requestsSlice.requests;
  const { allCars } = carsSlice;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Admin | Requests";
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
              {[...requests]
                ?.sort((a: any, b: any) => {
                  return (
                    (new Date(b?.createdAt) as any) -
                    (new Date(a?.createdAt) as any)
                  );
                })
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <StyledTableRow key={row.id + Math.random()}>
                    <StyledTableCell>
                      {findCarDetails(row.carId, allCars)?.name}
                    </StyledTableCell>
                    <StyledTableCell>
                      {findUserDetails(row.userId, users)?.names}
                      <span>
                        {findUserDetails(row.userId, users)?.role == "admin" &&
                          " (Admin)"}
                      </span>
                    </StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell>
                      {findCarDetails(row.carId, allCars)?.price}
                    </StyledTableCell>
                    <StyledTableCell>
                      {findCarDetails(row.carId, allCars)?.currency}
                    </StyledTableCell>
                    <StyledTableCell>
                      {findCarDetails(row.userId, users)?.telephone}
                    </StyledTableCell>
                    <StyledTableCell>{row.startDate}</StyledTableCell>
                    <StyledTableCell>{row.endDate}</StyledTableCell>
                    <StyledTableCell className="flex items-center justify-center">
                      <button
                        title="Reject"
                        className="delete p-2 mx-2  hover:rotate-12 rounded-full bg-red-600 text-white disabled:bg-gray-500"
                        disabled={loading}
                        onClick={() =>
                          rejectRequest(
                            `${user.token}`,
                            row.id,
                            dispatch,
                            toast,
                            setLoading
                          )
                        }
                      >
                        <BiTrash size={20} />
                      </button>
                      <button
                        title="Grant"
                        className="delete p-2 mx-2  hover:rotate-12 rounded-full bg-green-500 text-white disabled:bg-gray-500"
                        disabled={loading}
                        onClick={() =>
                          acceptRequest(
                            `${user.token}`,
                            row.id,
                            dispatch,
                            toast,
                            setLoading
                          )
                        }
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
