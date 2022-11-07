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
import { requests } from "../../utils/sampledata";
import { BsCheck2 } from "react-icons/bs";

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
  const rows = requests;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
    "Customer Name",
    "Status",
    "Price",
    "Start Date",
    "End Date",
    "Actions"
  ];

  return (
    <div className="w-full  flex flex-col mt-24 px-12 items-center justify-start">
      <span className="font-semibold text-2xl font-poppins my-4 mb-8">
        All Requests
      </span>

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
                .map((row) => (
                  <StyledTableRow key={row.id + Math.random()}>
                    <StyledTableCell>{row.carId}</StyledTableCell>
                    <StyledTableCell>{row.customerId}</StyledTableCell>
                    <StyledTableCell>{row.status}</StyledTableCell>
                    <StyledTableCell>{row.price}</StyledTableCell>
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
                        className="delete p-2 mx-2  hover:rotate-12 rounded-full bg-green-500  text-white"
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

export default CarRequestComponent;
