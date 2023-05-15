import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export function AlignItemsList({ data }) {
    return (
        <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
            {
                data.map((product) => {
                    return (
                        <>
                            <ListItem alignItems="flex-start">
                                <ListItemText align='right'
                                    primary={product.name}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: "inline" }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {product.company}
                                            </Typography>
                                            {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    )
                })
            }
        </List>
    );
}


export default function SearchResults({ openSetting, data }) {
    const [open, setOpen] = React.useState(openSetting);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AlignItemsList data={data}></AlignItemsList>
                </Box>
            </Modal>
        </div>
    );
}
