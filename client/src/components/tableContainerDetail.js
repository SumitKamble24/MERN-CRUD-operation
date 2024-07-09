import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./commonFile.css";
import { Button } from "@mui/material";
import AddNewComp from "./addNew";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userAction } from "../redux/userAction";

const TableContainerDetail = ({ data }) => {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const [addNewDialog, setAddNewDialog] = React.useState(false);
  const [addNewName, setAddNewName] = React.useState(null);
  const [addNewEmail, setAddNewEmail] = React.useState(null);
  const [addNewMobile, setAddNewMobile] = React.useState(null);
  const [values, setValues] = React.useState({});
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const handleEditButton = (values) => {
    setValues(values);
    setAddNewDialog(true);
  };
  const handleClose = (_, reason) => {
    if (reason !== "backdropClick") {
      setAddNewDialog(false);
      setAddNewEmail(null);
      setAddNewMobile(null);
      setAddNewName(null);
    }
  };
  const handleSubmit = async () => {
    const newData = {
      _id: values._id,
      name: addNewName ?? values.name,
      email: addNewEmail ?? values.email,
      mobile: addNewMobile ?? values.mobile,
    };
    axios
      .put("http://localhost:8080/update", newData)
      .then((response) => {
        // Handle successful response
        dispatch(userAction(user.token));
        handleClose();
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating resource:", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/delete/${id}`)
      .then((response) => {
        // Handle successful response
        dispatch(userAction(user.token));
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating resource:", error);
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Mobile</StyledTableCell>
              <StyledTableCell align="right">Action</StyledTableCell>
              {/* <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, ind) => (
              <StyledTableRow key={row.ind}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.email}</StyledTableCell>
                <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                <StyledTableCell align="right">
                  <span>
                    <Button
                      color="secondary"
                      onClick={() => handleEditButton(row)}
                    >
                      EDIT
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(row._id)}
                    >
                      DELETE
                    </Button>
                  </span>
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.protein}</StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddNewComp
        open={addNewDialog}
        handleClose={handleClose}
        addNewName={addNewName}
        addNewEmail={addNewEmail}
        addNewMobile={addNewMobile}
        setAddNewMobile={setAddNewMobile}
        setAddNewEmail={setAddNewEmail}
        setAddNewName={setAddNewName}
        handleSubmit={handleSubmit}
        title={"Edit Contact"}
        values={values}
      />
    </>
  );
};

export default TableContainerDetail;
