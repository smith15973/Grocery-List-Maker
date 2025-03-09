import { useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  IconButton
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

// Define styles
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const buttonContainerStyle = {
  mt: 3,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 2,
};

export default function ConfirmDeleteModal({ onConfirm, title, message }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={handleOpen}
      >
        <DeleteIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ mb: 2 }}
          >
            {title}
          </Typography>

          <Typography
            id="modal-modal-description"
            variant="body1"
            color="text.secondary"
          >
            {message}
          </Typography>

          <Box sx={buttonContainerStyle}>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="primary"
              sx={{ minWidth: 100 }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              variant="contained"
              color="error"
              sx={{ minWidth: 100 }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}