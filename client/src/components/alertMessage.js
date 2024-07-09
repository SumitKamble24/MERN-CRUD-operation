import { Alert, Snackbar } from "@mui/material";

const AlertComponent = ({ alertMessage, alertHandle }) => {
  <Snackbar open={alertMessage} autoHideDuration={6000} onClose={alertHandle}>
    <Alert onClose={alertHandle} severity="success" sx={{ width: "100%" }}>
      This is a success message!
    </Alert>
  </Snackbar>;
};

export default AlertComponent;
