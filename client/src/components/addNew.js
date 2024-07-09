import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const AddNewComp = ({
  open,
  handleClose,
  addNewEmail,
  addNewMobile,
  addNewName,
  setAddNewEmail,
  setAddNewMobile,
  setAddNewName,
  handleSubmit,
  title = undefined,
  values = {},
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Enter Name"
          fullWidth
          variant="standard"
          value={addNewName ?? values.name}
          onChange={(e) => setAddNewName(e.target.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Enter Email"
          type="email"
          fullWidth
          variant="standard"
          value={addNewEmail ?? values.email}
          onChange={(e) => {
            setAddNewEmail(e.target.value);
          }}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Enter Mobile"
          fullWidth
          variant="standard"
          value={addNewMobile ?? values.mobile}
          onChange={(e) => {
            setAddNewMobile(e.target.value);
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Add New</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewComp;
