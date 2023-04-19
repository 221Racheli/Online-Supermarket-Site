import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import MessageIcon from '@mui/icons-material/Message';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import { Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";



export default function BottomAppBar() {
	const navigate = useNavigate();

	return (
		<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
			<Toolbar>
				<IconButton color="inherit" aria-label="שירות לקוחות בטלפון">
					<LocalPhoneIcon />
				</IconButton>
				<Typography>0512369524</Typography>
				<IconButton sx={{ marginLeft: '30px' }} color="inherit" aria-label="שליחת פנייה לשירות לקוחות" onClick={()=>{navigate('/review')}}>
					<MessageIcon />
				</IconButton>
				<Box sx={{ flexGrow: 1 }} />
				<FacebookIcon sx={{ marginRight: '5px' }} />
				<TwitterIcon sx={{ marginRight: '5px' }} />
				<EmailIcon sx={{ marginRight: '5px' }} />
			</Toolbar>
		</AppBar>
	);
}


