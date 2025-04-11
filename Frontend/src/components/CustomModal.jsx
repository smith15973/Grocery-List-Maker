import { useState } from "react";
import {
    Button,
    Modal,
    Box,
    Typography,
} from "@mui/material";
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
export function CustomModal({ onConfirm,
    title = "Title",
    content,
    confirmBtnColor = "primary",
    confirmBtnTitle = "Testing",
    modalButtonTitle = "Open Modal"
}) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        handleClose();
    };
    return (
        <>
            <Button variant="outlined" onClick={handleOpen} >{modalButtonTitle}</Button>
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
                    {content}
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
                            color={confirmBtnColor}
                            sx={{ minWidth: 100 }}
                        >
                            {confirmBtnTitle}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
}