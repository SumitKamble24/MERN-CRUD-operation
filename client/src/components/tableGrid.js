// import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "./commonFile.css";
import TableContainerDetail from "./tableContainerDetail";
import { Button } from "@mui/material";
import AddNewComp from "./addNew";
import AlertComponent from "./alertMessage";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "../redux/userAction";
import { useNavigate } from "react-router-dom";

const TableGrid = (props) => {
  const [addNewDialog, setAddNewDialog] = useState(false);
  const [addNewName, setAddNewName] = useState("");
  const [addNewEmail, setAddNewEmail] = useState("");
  const [addNewMobile, setAddNewMobile] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user =
    localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (user?.auth) {
      dispatch(userAction(user.token));
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, user?.auth, user.token]);
  const Data = useSelector((state) => state.userReducer) ?? [];

  const addNewContact = () => {
    setAddNewDialog(true);
  };
  const handleClose = (_, reason) => {
    if (reason !== "backdropClick") {
      setAddNewDialog(false);
      setAddNewEmail("");
      setAddNewMobile("");
      setAddNewName("");
    }
  };
  const handleSubmit = async () => {
    await axios({
      method: "post",
      url: "http://localhost:8080/create",
      data: {
        name: addNewName,
        email: addNewEmail,
        mobile: addNewMobile,
      },
    })
      .then((res) => {
        if (res?.data?.success) {
          handleClose();
          setAlertMessage(true);
          dispatch(userAction(user.token));
        } else {
          handleClose();
        }
      })
      .catch((err) => console.log(err));
  };
  const alertHandle = () => {
    setAlertMessage(false);
  };

  return (
    <>
      <div className="header_class">
        <h2>Contact Mangement App</h2>
        <Button
          variant="contained"
          color="success"
          className="header_add_button"
          onClick={addNewContact}
        >
          Add New
        </Button>
      </div>

      <TableContainerDetail data={Data} />
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
        title={"Add New Contact"}
      />
      <AlertComponent alertMessage={alertMessage} alertHandle={alertHandle} />
    </>
  );
};

export default TableGrid;
