import React, { useContext, useEffect, useState } from "react";
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
import { deleteUserByAdmin } from "./../../hooks";
import { useSelector } from "react-redux";
import { IUser } from "../../types/userTypes";
import { useDispatch } from "react-redux";
import { deleteUserRedux } from "../../redux/slices/usersSlice";
import { toast } from "react-toastify";

const AllCustomerComponent = () => {
  const userSlice = useSelector((state: any) => state.userSlice);
  const usersSlice = useSelector((state: any) => state.usersSlice);
  const user: IUser = userSlice.user;
  const users: IUser[] = usersSlice.users;
  const [loading, setLoading] = useState<boolean>(false)
  const customers = [...users];
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = "Admin | Customers";
  }, []);
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

  const columns: string[] = ["Names", "Email", "Phone", "Address", "Action"];

  const rows = [...customers];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  return (
    <div>
      <div className="w-full  flex flex-col mt-2 px-4 lg:px-12 items-center justify-start">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column: string, index: number) => (
                    <StyledTableCell key={index}>{column}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <StyledTableRow key={row.id ? row.id : 1 + Math.random()}>
                      <StyledTableCell>
                        {row.names} {row.role == "admin" && "(Admin)"}
                      </StyledTableCell>
                      <StyledTableCell>{row.email}</StyledTableCell>
                      <StyledTableCell>{row.telephone}</StyledTableCell>
                      <StyledTableCell>{row.address}</StyledTableCell>
                      <StyledTableCell className="flex items-center justify-center">
                        <button
                          title="Delete"
                          className="delete p-2 hover:rotate-12 rounded-full bg-red-600 text-white disabled:bg-gray-500"
                          disabled={loading}
                          onClick={async () => {
                            await deleteUserByAdmin(
                              `${user?.token}`,
                              `${row.id}`,
                              toast,
                              setLoading
                            );
                            dispatch(deleteUserRedux(`${row.id}`));
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
    </div>
  );
};

export default AllCustomerComponent;
